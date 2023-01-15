import { NextFunction, Request, Response } from "express";
import generateResponse from "../utils/response-generator";
import { sign, verify } from "jsonwebtoken";
import { User } from "../models/user.model";
import { config } from "dotenv";

config()
const SECRET_KEY = process.env.SECRET_KEY || 'mykey'

type PayloadType = {
    subject: string
}

export const createToken = (user: any): string => {
    let payloadData: PayloadType = { subject: user.fullname }
    const token = sign(
        payloadData,
        SECRET_KEY,
        { expiresIn: 300 }
    )
    return token
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    let response: string = '';
    try {
        if (!req.headers.authorization) {
            response = generateResponse<string>('no authorization header', 401)
            return res.send(response)
        } else {
            let token = req.headers.authorization.split(' ')[1]
            if (token === 'null' || !token) {
                response = generateResponse<string>('no token found', 401)
                return res.send(response)
            } else {
                try {
                    let payload = verify(token, SECRET_KEY) as PayloadType
                    if (!payload) {
                        response = generateResponse<string>('no payload found:unauthorized request', 401)
                        return res.send(response)
                    } else {
                        req.params.userId = payload.subject
                    }
                } catch (err) {
                    response = generateResponse<string>('invalid token', 401)
                    return res.send(response)
                }
            }
        }
    } catch (error: any) {
        console.log(error)
        response = generateResponse<string>(error.message, 401)
        return res.send(response)
    }
    next()
}