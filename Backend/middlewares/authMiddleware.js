import jwt from "jsonwebtoken";



const TOKEN_EXPIRATION = 7 * 24 * 60 * 60 * 1000;
export const generateJWT = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "development",
        expires: new Date(Date.now() + TOKEN_EXPIRATION),
        sameSite: "strict"
    })
    return token;
};


export const authenticateUser = (req, res, next) => {
    // Check if the token is present in cookies
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Append the userId to the request object
        req.userId = decoded.userId;

        next(); // Pass control to the next middleware/controller
    } catch (error) {
        res.status(400).json({ error: 'Invalid token.' });
    }
};







