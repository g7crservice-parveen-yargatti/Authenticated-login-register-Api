import { User, UserDetail } from "../models/user.model";

export interface UsersBoContract {
    create(user: User): Promise<UserDetail>;
    validate(user: User): Promise<string>;
}