const jwt =require('jsonwebtoken');
const jwtAuthMiddleware =(req,res,next)=>{
    //Extract the jwt token from the request header
    const token = req.headers.authorization.split(' ')(1);
    if(!token) return res.status(401).json({error: 'Unauthorized'});
try{
//veryfi jwt
const decoded = jwt.verify(token, process.env.SECRET_KEY);
//attach user information to the request oject
req.user = decoded;

} catch(err){
    console.error(err);
    res.status(401).json({error: 'Invalid token'});
}
}

//function to genrate token
const generateToken = (userData) =>{
    //generate a new JWT token using user data
    return jwt.sign(userData,process.env.SECRET_KEY);
}
module.exports={jwtAuthMiddleware,generateToken};