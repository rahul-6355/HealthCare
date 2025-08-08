import jwt from 'jsonwebtoken';


// User authentication middleware
const authUser = (req, res, next) => {
    try {

       const {token} = req.headers;
       if(!token) {
            return res.status(401).json({success: false, message: 'unauthorized access, Login Again'});
        }

        const token_decode = jwt.verify(token, process.env.JWT_SECRET);

       req.userId = token_decode.id
 
        next();

    } catch (error) {
        console.error( error);
        res.json({ success: false, message: error.message });
    }
}

export default authUser;