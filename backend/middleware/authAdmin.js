import jwt from 'jsonwebtoken';


// admin authentication middleware
const authAdmin = (req, res, next) => {
    try {

       const {atoken} = req.headers;
       if(!atoken) {
            return res.status(401).json({success: false, message: 'unauthorized access, token not provided'});
        }

        const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);

        if(token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.status(401).json({success: false, message: 'Unauthorized access'});
        }

        // verify the token
        const decoded = jwt.verify(atoken, process.env.JWT_SECRET);
        
        // attach the admin info to the request object
        req.admin = decoded;

        next();

    } catch (error) {
        console.error( error);
        res.json({ success: false, message: error.message });
    }
}

export default authAdmin;