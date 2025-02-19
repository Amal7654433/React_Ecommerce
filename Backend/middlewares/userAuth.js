
import jwt from 'jsonwebtoken'
const verifyToken = (req, res, next) => {
    const token = req.cookies.userToken
  if (!token) {
      return res.status(401).json({ message: 'unauthorized' });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.userId = decoded.userId;
      next()
  
    } catch (error) {
      console.log(error)
      return res.status(401).json({ message: 'unauthorized' });
    }
  
  };

  export default verifyToken
