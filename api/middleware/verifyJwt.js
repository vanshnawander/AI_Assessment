const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const token = req.cookies?.token;
    if(token){
        jwt.verify(token,jwtsecret,{},(err,userdata)=>{
            //console.log(userdata);
            if(err) {
                console.log(err);
                throw err;}
            //const {id,username} = userdata;
            next();
    
        });
    }
    else{
        res.status(401).send('Unauthorized');
    }
    
}

module.exports = verifyJWT;