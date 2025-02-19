import jwt from 'jsonwebtoken'
const adminVerifyToken = (req, res, next) => {
    const token = req.cookies.adminToken
    if (!token) {
        return res.status(401).json({ error: 'No token, authorization denied' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.adminId = decoded.adminId;
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        return res.status(401).json({ error: 'Token is not valid' });
    }
};
export default adminVerifyToken