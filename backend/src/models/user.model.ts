import { model, Schema } from 'mongoose';
interface IUser {
        _id?: string;
        full_name: string;
        user_name: string;
        gender: string;
        phone: string;
        email: string;
        password: string;
        status?: string;
}


const userSchema: Schema = new Schema({
        full_name: {
                type: String,
                required: [true, 'Full name is required'],
                trim: true
        },
        user_name: {
                type: String,
                required: [true, 'Username is required'],
                unique: true,
                trim: true
        },
        gender: {
                type: String,
                enum:['Male', 'Female'],
                required: [true, 'Gender is required']
        },
        phone: {
                type: String,
                required: [true, 'Phone number is required'],
                trim: true
        },
        email: {
                type: String,
                required: [true, 'Email is required'],
                unique: true,
                trim: true,
                lowercase: true,
                validate: {
                        validator: (value: string) => /^\S+@\S+\.\S+$/.test(value),
                        message: 'Invalid email format'
                }
        },
        address: {
                type: String,
                required: [true, 'Address is required'],
                trim: true
        },
        qualification: {
                type: String,
                required: [true, 'Qualification is required'],
                trim: true
        },
        password: {
                type: String,
                required: [true, 'Password is required'],
                minlength: [6, 'Password must be at least 6 characters long']
        },
        role: {
                type: String,
                enum: ['admin', 'user'],
                default: 'user'
        },
        verified: {
                type: Boolean,
                default: false
        }
}, { timestamps: true });
const userModel = model<IUser>('User', userSchema);

export default userModel 