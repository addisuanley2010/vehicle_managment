import userModel from '../models/user.model';

class UserService {
  async getAllUser() {
    return await userModel.find();
  }

  async signIn(email: string) {
    return await userModel.findOne({email});
  }

  async signUp(userModelData: any) {
    const newUser = new userModel<any>(userModelData);
    return await newUser.save();
  }

  async updateUser(id: string, userData: any) {
    return await userModel.findByIdAndUpdate(id, userData, { new: true });
  }

  async deleteUser(id: string) {
    return await userModel.findByIdAndDelete(id);
  }
}
export default UserService