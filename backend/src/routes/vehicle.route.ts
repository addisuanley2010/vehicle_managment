
import { Router } from "express";
// import  VehicleController  from "../controllers/vehicle.controller";
import VehicleController from '../controllers/vehicle.controller'
const router =Router()
router.post('/add-vehicles',VehicleController.addNewVehicle)
router.get('/get-vehicles',VehicleController.getAllVehicle)
router.delete('/delete-vehicles/:id',VehicleController.deleteVehicle)
router.put('/update-vehicles/:id',VehicleController.updateVehicle)

export default router