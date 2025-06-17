import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const generateToken = (id) => {

    return jwt.sign({id}, process.env.JWT_KEY, {expiresIn:"7d"});
}

export default generateToken;


// json web token
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OTNjMDFiN2MwZjg4M2U5MGUwNmM3MiIsImlhdCI6MTczNzczNzgwMiwiZXhwIjoxNzM3OTk3MDAyfQ.5bjBEKnr0YAk8eIjX1_QtBH1EFZK9aifRFD4slGrjVc