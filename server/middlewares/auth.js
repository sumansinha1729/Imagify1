import jwt from 'jsonwebtoken'

const userAuth=async(req,res,next)=>{
    const {token}=req.headers;

    if(!token){
        return res.json({success:false,message:"Not Authorized.Login Again"});
    }

    try {
        const tokenDecoded=jwt.verify(token,process.env.JWT_SECRET);

        if(tokenDecoded.id){
            req.body.userId=tokenDecoded.id;
        }else{
            return res.json({success:false,message:"Not Authorized.Login Again"});
        }
        next();
    } catch (error) {
        console.log(error)
        res.json({succes:false,message:error.message})
    }
}

export default userAuth;