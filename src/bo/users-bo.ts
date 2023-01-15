import { injectable } from "inversify";
import UserModel from "../db/models/usermodel";
import { User, UserDetail } from "../models/user.model";
import { UsersBoContract } from "./users-bo.contract";
import 'reflect-metadata';
import { createToken } from "../middlewares/jwt-middleware";

@injectable()
export class UsersBo implements UsersBoContract {
    async create(user: UserDetail): Promise<UserDetail> {
        try {
            const session = await UserModel.startSession()
            const data = await session.withTransaction(
                async () => {
                    const found = await UserModel.findOne({ username: user.username })
                    if (found) {
                        session.abortTransaction()
                        throw new Error('user already exists')
                    } else {
                        await UserModel.create({ ...user })
                        session.commitTransaction()
                        return user
                    }
                }
            )
            await session.endSession()
            return data as UserDetail
        } catch (error) {
            throw error
        }
    }
    async validate(user: User): Promise<string> {
        try {
            const found = await UserModel.findOne({ username: user.username, password: user.password })
            if (found) {
                return createToken(found as User)
            } else {
                throw new Error('invalid user')
            }
        } catch (error) {
            throw error
        }
    }

}