import { Request, Response } from 'express';

interface CustomResponse extends Response {
    locals: {
        user?: any;
    };
}

export const currentUser = (req: Request, res: CustomResponse) => { 
        const user = res.locals.user;
        console.log("🚀 ~~ user:", user)
        return user;
}