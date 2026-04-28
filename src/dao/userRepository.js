import User from './models/userModel.js';

class UserRepository {
  async getAllUsers() {
    return await User.find();
  }

  async getUserById(uid) {
    const user = await User.findOne({ _id: uid });

    if (!user) throw new Error(`El usuario ${uid} no existe!`);

    return user;
  }

  async createUser(userData) {
    const { first_name, last_name, email, age, password, role } = userData;

    if (!first_name || !last_name || !email || age === undefined || !password || !role) {
      throw new Error('Error al crear el usuario');
    }

    return await User.create({ first_name, last_name, email, age, password, role });
  }

  async createMultipleUsers(usersData) {
    return await User.insertMany(usersData);
  }

  async updateUser(uid, userUpdate) {
    return await User.updateOne({ _id: uid }, userUpdate);
  }

  async deleteUser(uid) {
    const result = await User.deleteOne({ _id: uid });

    if (result.deletedCount === 0) throw new Error(`El usuario ${uid} no existe!`);

    return result;
  }
}

export { UserRepository };
