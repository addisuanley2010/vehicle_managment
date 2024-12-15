import vehicleModel from '../models/vehicle.model';

class VehicleService {
  async getAllVehicle() {
    return await vehicleModel.find();
  }
  async deleteVehicle(id:string) {
    return await vehicleModel.deleteOne({_id:id});
  }


  async addVehicle(vehicleModelData: any) {
    const newVehicle = new vehicleModel<any>(vehicleModelData);
    return await newVehicle.save();
  }

async updateVehicle(id: string, vehicleModelData: Partial<any>) {
  return await vehicleModel.findByIdAndUpdate(id, vehicleModelData, { new: true });
}


}
export default VehicleService