import { Request, Response } from "express";

export interface AuthControllerContract {
    registerAction(req: Request, res: Response): Promise<void>;
    loginAction(req: Request, res: Response): Promise<void>;
}