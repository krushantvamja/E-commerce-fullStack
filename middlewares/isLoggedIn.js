
import { verifyToken } from "../utils/verifyToken.js"
import { getTokenFromHeader } from "../utils/getTokenFromHeader.js"

export const isLoggedIn = (req,res,next) => {
    const token = getTokenFromHeader(req);

    const decodedUser = verifyToken(token);

    if(!decodedUser){
        throw new Error("invalid user");

    }else{
        req.userAuthId = decodedUser?.id;
        next();
    }
}