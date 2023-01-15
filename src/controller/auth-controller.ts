import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { inject, injectable } from "inversify";
import { ParsedQs } from "qs";
import { AuthControllerContract } from "./auth-controller.contract";
import 'reflect-metadata'
import diTokens from "../constants/di-tokens";
import { UsersBoContract } from "../bo/users-bo.contract";
import { User, UserDetail } from "../models/user.model";
import generateResponse from "../utils/response-generator";
import { uuid } from 'uuidv4';



@injectable()
export class AuthController implements AuthControllerContract {
    constructor(
        @inject(diTokens.USERS_BO_TOKEN)
        private _userBo: UsersBoContract
    ) { }

    registerAction = async (req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> => {
        try {
            const user =<UserDetail> req.body
            const id=uuid()
            user.userID=id
            
            const added = await this._userBo.create(user)
            const response = generateResponse<UserDetail>('registered successfully', 201, added)
            res.send(response)
        } catch (error: any) {
            const errResponse = generateResponse<null>(error.message, 500)
          res.send(errResponse)
        }
    }

    loginAction = async (req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> => {
        try {
            const user = <User>req.body
            const token = await this._userBo.validate(user)
            const response = generateResponse<string>('authenticated successfully', 201, token)
            res.send(response)
        } catch (error: any) {
            const errResponse = generateResponse<null>(error.message, 500)
            res.send(errResponse)
        }
    }
}