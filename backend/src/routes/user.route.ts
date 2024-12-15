
import { Router } from "express";
import UserController from "../controllers/user.controller";
import dashboardController from "../controllers/dashboard.controller";
import authMiddleware from "../middlewares/auth.middleware";
import roleAuth from "../middlewares/role.auth.middleware";

const router = Router()
router.post('/sign-up', UserController.signUp)
router.post('/sign-in', UserController.signIn)
router.get('/dashboard', authMiddleware, dashboardController.create)
router.get('/dashboard-role', authMiddleware, roleAuth(['user']), dashboardController.update)
router.get("/check-auth", authMiddleware, (req: any, res) => {
        const user = req.user;
        res.send({ success: true, message: "authenticated user", user, token: "", isAuthenticated: true })

});
export default router