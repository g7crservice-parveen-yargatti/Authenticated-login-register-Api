import { Router } from "express";
import diTokens from "../constants/di-tokens";

import { injectable, inject } from "inversify";
import 'reflect-metadata'
import { AuthControllerContract } from "../controller/auth-controller.contract";
import { verifyToken } from "../middlewares/jwt-middleware";

const PRODUCTS_BASE_URL = process.env.PRODUCTS_BASE_URL || '/api/products'
const AUTH_BASE_URL = process.env.AUTH_BASE_URL || '/api/auth'

@injectable()
export class AppRoutes {

    constructor(
      
        @inject(diTokens.AUTH_CONTROLLER_TOKEN)
        private authController: AuthControllerContract
    ) {

    }

    registerRoutes(): Router {
        const routerMiddleware = Router()

        routerMiddleware.post(`${AUTH_BASE_URL}/register`, this.authController.registerAction)
        routerMiddleware.post(`${AUTH_BASE_URL}/login`, this.authController.loginAction)

       

        return routerMiddleware
    }
}