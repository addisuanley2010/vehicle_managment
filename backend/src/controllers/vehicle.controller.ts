
import { Request, Response } from "express";
import VehicleService from "../services/vehicle.service";
import { respond } from "../utils/error.respond.utils";


class VehicleController {

private service
  constructor() {
    this.service = new VehicleService()
  }

  addNewVehicle = async (req: Request, res: Response): Promise<void> => {
    try {
      const data = req.body
      const newVehicle = await this.service.addVehicle(data);
      respond(res, 201, true, 'Vehicle created successfully!', newVehicle);

    } catch (error: any) {
      respond(res, 500, false, error.message);

    } 
  }

  updateVehicle = async (req: Request, res: Response): Promise<void> => {
    const {id}=req.params
    try {
      const data = req.body
      const updatedVehicle = await this.service.updateVehicle(id,data);
      respond(res, 201, true, 'Vehicle updated successfully!', updatedVehicle);

    } catch (error: any) {
      respond(res, 500, false, error.message);

    } 
  }
  getAllVehicle = async (req: Request, res: Response): Promise<void> => {
    try {
      const Vehicles = await this.service.getAllVehicle();
      respond(res, 200, true, 'Vehicles fetched successfully!', Vehicles);

    } catch (error: any) {
      respond(res, 500, false, error.message);

    }
  }
  deleteVehicle = async (req: Request, res: Response): Promise<void> => {
    const {id} =req.params
    try {
      const Vehicles = await this.service.deleteVehicle(id);
      respond(res, 200, true, 'Vehicles deleted successfully!', Vehicles);

    } catch (error: any) {
      respond(res, 500, false, error.message);

    }
  }

}


export default new VehicleController();
