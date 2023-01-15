import { Container } from "inversify";
import diTokens from '../constants/di-tokens'







import { AuthControllerContract } from "../controller/auth-controller.contract";
import { AuthController } from "../controller/auth-controller";
import { UsersBo } from "../bo/users-bo";
import { UsersBoContract } from "../bo/users-bo.contract";

const diContainer = new Container()




diContainer.bind<UsersBoContract>(diTokens.USERS_BO_TOKEN).to(UsersBo)

diContainer.bind<AuthControllerContract>(diTokens.AUTH_CONTROLLER_TOKEN).to(AuthController)

export default diContainer