import validator from 'validator';
import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from 'cloudinary';
import appointmentModel from '../models/appointmentModel.js';
import doctorModel from '../models/doctorModel.js';
import razorpay from 'razorpay';

// api to register user

const registerUser = async (req, res) => {

   try {

      const { name, email, password } = req.body;

      if (!name || !email || !password) {
         return res.status(400).json({ success: false, message: "Missing Details" });
      }
      if (!validator.isEmail(email)) {
         return res.status(400).json({ success: false, message: "Invalid Email" });
      }
      if (password.length < 8) {
         return res.status(400).json({ success: false, message: "enter the strong password" })
      }

      // hashing user password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const userData = {
         name,
         email,
         password: hashedPassword
      }

      const newUser = new userModel(userData)
      const user = await newUser.save()

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

      res.json({ success: true, token })


   } catch (error) {
      console.log(error)
      res.status(500).json({ success: false, message: error.message })
   }
}

// api for user login 

const loginUser = async (req, res) => {

   try {

      const { email, password } = req.body;

      const user = await userModel.findOne({ email })
      if (!user) {
         return res.status(400).json({ success: false, message: "Invalid Email or Password" })
      }
      const isMatch = await bcrypt.compare(password, user.password)
      if (isMatch) {
         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
         res.json({ success: true, token })
      }
      else {
         return res.status(400).json({ success: false, message: "Invalid Email or Password" })
      }

   } catch (error) {
      console.log(error)
      res.status(500).json({ success: false, message: error.message })
   }
}

// api to get user profile data

const getProfile = async (req, res) => {

   try {

      const userId = req.userId

      const userData = await userModel.findById(userId).select('-password')

      res.json({ success: true, userData })

   } catch (error) {
      console.log(error)
      res.status(500).json({ success: false, message: error.message })
   }
}

// api to update user profile data

const updateProfile = async (req, res) => {
   try {
      const userId = req.userId

      const { name, phone, address, dob, gender } = req.body

      const imageFile = req.file



      if (!name || !phone || !address || !dob || !gender) {
         return res.status(400).json({ success: false, message: "Data is missing" })
      }

      await userModel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), dob, gender })
      if (imageFile) {
         // upload image to cloudinary

         const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' })
         const imageURL = imageUpload.secure_url

         await userModel.findByIdAndUpdate(userId, { image: imageURL })


      }
      res.json({ success: true, message: "Profile Updated" })

   } catch (error) {
      console.log(error)
      res.status(500).json({ success: false, message: error.message })
   }
}


// api to book appointment

const bookAppointment = async (req, res) => {
   try {
      const userId = req.userId
      const { docId, slotDate, slotTime } = req.body
      if (!docId || !slotDate || !slotTime) {
         return res.status(400).json({ success: false, message: "Missing fields" });
      }

      const docData = await doctorModel.findById(docId).select('-password')
      if (!docData.available) {
         return res.status(400).json({ success: false, message: "Doctor is not available" })
      }

      //let slots_booked = docData.slots_booked 
      let slots_booked = { ...docData.slots_booked };

      // checking for slot availability
      if (slots_booked[slotDate]) {
         if (slots_booked[slotDate].includes(slotTime)) {
            return res.json({ success: false, message: "Slot is not available" })
         } else {
            slots_booked[slotDate].push(slotTime)
         }

      } else {
         slots_booked[slotDate] = []
         slots_booked[slotDate].push(slotTime)
      }

      const userData = await userModel.findById(userId).select('-password')
      delete docData.slots_booked

      const appointmentData = {
         userId,
         docId,
         userData,
         docData,
         amount: docData.fees,
         slotDate,
         slotTime,
         date: Date.now()
      }

      const newAppointment = new appointmentModel(appointmentData)
      await newAppointment.save()

      // save new slots data in docData
      await doctorModel.findByIdAndUpdate(docId, { slots_booked }, { new: true })

      res.json({ success: true, message: "Appointment Booked" })

   } catch (error) {
      console.log(error)
      res.status(500).json({ success: false, message: error.message })
   }
}

/// api to get user appointments for frontend my-appointment page

const listAppointment = async (req, res) => {


   try {

      const userId = req.userId
      const appointments = await appointmentModel.find({ userId })
      res.json({ success: true, appointments })

   } catch (error) {

      console.log(error)
      res.json({ success: false, message: error.message })
   }

}

// api to cancel appointment

const cancelAppointment = async (req, res) => {


   try {

      const userId = req.userId
      const { appointmentId } = req.body

      const appointmentData = await appointmentModel.findById(appointmentId)

      // verify appointment

      if (appointmentData.userId !== userId) {
         return res.json({ success: false, message: "unauthorized action" })
      }

      await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })


      // releasing doctor slot

      const { docId, slotDate, slotTime } = appointmentData

      const doctorData = await doctorModel.findById(docId)

      let slots_booked = doctorData.slots_booked

      slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

      await doctorModel.findByIdAndUpdate(docId, { slots_booked })

      res.json({ success: true, message: 'Appointment Cancelled' })

   } catch (error) {
      console.log(error)
      res.json({ success: false, message: error.message })
   }

}

const razorpayInstance = new razorpay({
   key_id:process.env.RAZORPAY_KEY_ID,
   key_secret: process.env.RAZORPAY_SECRET_KEY

})

// api to payment by razorpay

const paymentRazorpay = async (req, res) => {

   try {
      
  const {appointmentId}=req.body

  const appointmentData = await appointmentModel.findById(appointmentId)

  if(!appointmentData || appointmentData.cancelled){
   return res.json({success:false,message:'Appointment not found or cancelled.'})
  }

  // creating options for razorpay payment gateway

  const options ={
   amount: appointmentData.amount*100,
   currency : process.env.CURRENCY,
   receipt: appointmentId
  }

  // CREATION OF AN ORDER

   const order = await razorpayInstance.orders.create(options)

   res.json({success:true,order})

   } catch (error) {
       console.log(error)
      res.json({ success: false, message: error.message })
   }

}

// api to verify razorpay payment gateway

const verifyRazorpay = async (req, res) => {

   try {
      const { response } = req.body;
      
      if (!response || !response.razorpay_order_id) {
         return res.status(400).json({ success: false, message: "Invalid payment response" });
      }

      const razorpay_order_id = response.razorpay_order_id;
      const razorpay_payment_id = response.razorpay_payment_id;
      const razorpay_signature = response.razorpay_signature;

      // Verify the payment signature
      const crypto = await import('crypto');
      const expectedSignature = crypto
         .createHmac('sha256', process.env.RAZORPAY_SECRET_KEY)
         .update(razorpay_order_id + "|" + razorpay_payment_id)
         .digest('hex');

      if (expectedSignature !== razorpay_signature) {
         return res.json({ success: false, message: "Invalid payment signature" });
      }

      // Fetch order details from Razorpay
      const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

      if (orderInfo.status === 'paid') {
         // Update appointment with payment details
         await appointmentModel.findByIdAndUpdate(
            orderInfo.receipt,
            { 
               payment: true,
               paymentId: razorpay_payment_id,
               orderId: razorpay_order_id
            }
         );
         res.json({ success: true, message: "Payment Successful" });
      } else {
         res.json({ success: false, message: "Payment Failed" });
      }
      
   } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: error.message });
   }

}

export { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment,paymentRazorpay,verifyRazorpay }