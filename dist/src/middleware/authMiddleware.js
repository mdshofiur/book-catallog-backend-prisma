"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authUtils_1 = require("../../utils/authUtils");
// Authenticate the user
function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).send({ message: "Authorization header missing" });
        return;
    }
    const token = authHeader.split(" ")[1];
    try {
        const decodedToken = (0, authUtils_1.verifyAuthToken)(token);
        if (typeof decodedToken === 'string') {
            throw new Error('Invalid token');
        }
        if ('userId' in decodedToken && 'role' in decodedToken) {
            const user = {
                userId: decodedToken.userId,
                role: decodedToken.role
            };
            res.locals.user = user;
            if (res.locals.user.role === 'admin') {
                next();
            }
            else {
                res.status(401).send({ message: "This Route Only allow For Admin" });
            }
        }
    }
    catch (error) {
        res.status(401).send({ message: "Invalid token" });
    }
}
exports.default = authenticate;
