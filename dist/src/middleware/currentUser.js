"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentUser = void 0;
const authUtils_1 = require("../../utils/authUtils");
function CurrentUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const authHeader = req.headers.authorization;
        if (authHeader === undefined) {
            res.status(401).send({ message: "Authorization header missing" });
            return;
        }
        const token = authHeader.split(" ")[1];
        try {
            const decodedToken = (0, authUtils_1.verifyAuthToken)(token);
            if (typeof decodedToken === "string") {
                throw new Error("Invalid token");
            }
            if ("userId" in decodedToken && "role" in decodedToken) {
                const user = {
                    userId: decodedToken.userId,
                    role: decodedToken.role,
                };
                res.locals.user = user;
                next();
            }
        }
        catch (error) {
            res.status(401).send({ message: "Invalid token" });
        }
    });
}
exports.CurrentUser = CurrentUser;
