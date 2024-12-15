import { model, Schema } from 'mongoose';

 interface IVehicle{

        _id?: string;
        vehicle_name: string
        Status?: string
}

const VehicleSchema: Schema = new Schema({
        vehicle_name: {
                type: String,
                required: [true, ' vehicle name is required'],
                trim: true
        },
        
        Status: {
                type: String,
                default:'active'
       }
        
}, { timestamps: true });
const vehicleModel = model<IVehicle>('vehicle', VehicleSchema);

export default vehicleModel 