import jwt from "jsonwebtoken"

export const generateToken = (userId , res) => {

    const token = jwt.sign({userId},process.env.JWT_SECRET, {
        expiresIn : "7d"
    })

    res.cookie("jwt",token,{
        maxAge : 7 * 24 * 60 * 60 * 1000,
        httpOnly : true,  // prevent XSS attacks Cross-Site Scripting attack
        sameSite : "strict", // prevent CSRF attacks
        secure : process.env.NODE_ENV !== "developent" // only send cookie over HTTPS in production

    })
    return token;
}

