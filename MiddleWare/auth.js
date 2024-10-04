import jwt from 'jsonwebtoken';
import UserModel from './../Modle/UserModule.js';

export const Roles = { // --> array تحتوي من له صلاحية للاستخدام
    Admin:'Admin',
    User:'User'
}

export const auth = (AccessRole = []) =>{

    return async (req,res,next)=>{
        const {authorization} = req.headers;
        
        if(!authorization.startsWith(process.env.BEARERKEY)){ // bearer token the before is named basic token
            //return res.json({message:"Invalid token"});
            return next(new Error (`Invalid token`,401));      //{ status: 401 }

        }
        
        
        const token = authorization.split(process.env.BEARERKEY)[1]; // [1] means after Wasan__
        
        const decoded =  jwt.verify(token,process.env.LOGINSIG)
        
        if(!decoded){ 
            return res.status(400).json({message:"Invalid authorization"});
        }
        
        // Query to fetch UserName and Role from the database
        const [rows] = await pool.query('SELECT UserName, Role FROM Users WHERE id = ?', [decoded.id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'User Not found' });
        }

        const authUser = rows[0]; // Get the first row from the results

        
        if(!authUser){ 
            return res.status(404).json({message:" User Not found"});
        }
        
        if(!AccessRole.includes(authUser.Role)){ // authUser.Role --> صلاحية المستخدم الحالي
            return res.status(403).json({message:" Not authorized User"});

        }
        
        req.user=authUser;
             next();
    }
}
 