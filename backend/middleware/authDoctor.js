import jwt from 'jsonwebtoken';


// Doctor authentication middleware
const authDoctor = (req, res, next) => {
    try {

       const {dtoken} = req.headers;
       if(!dtoken) {
            return res.status(401).json({success: false, message: 'unauthorized access, Login Again'});
        }

        const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET);

       req.docId = token_decode.id
 
        next();

    } catch (error) {
        console.error( error);
        res.json({ success: false, message: error.message });
    }
}

export default authDoctor;