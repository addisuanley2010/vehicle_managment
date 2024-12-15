
import { Request, Response } from "express";


interface AuthenticatedRequest extends Request {
        user?: any;
}

class DashboardController {


        create = async (req: AuthenticatedRequest, res: Response): Promise<void> => {

                try {
                        const user = req.user;
                        res.status(201).json({ success: true, message: "Dashboard created successfully! to check authentication", user });
                } catch (error: any) {
                        res.status(500).json({ success: false, message: error.message });
                }
        }

        update = async (req: AuthenticatedRequest, res: Response): Promise<void> => {

                try {
                        const user = req.user;
                        res.status(201).json({ success: true, message: "Dashboard created successfully! to check role authentication", user });
                } catch (error: any) {
                        res.status(500).json({ success: false, message: error.message });
                }
        }

}


export default new DashboardController();
