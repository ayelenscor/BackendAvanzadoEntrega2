import Pet from './models/petModel.js';

class PetRepository {
  async getAllPets() {
    return await Pet.find();
  }

  async getPetById(petId) {
    const pet = await Pet.findOne({ _id: petId });

    if (!pet) throw new Error(`La mascota ${petId} no existe!`);

    return pet;
  }

  async createPet(petData) {
    const { name, type, age, breed, owner } = petData;

    if (!name || !type || age === undefined || !breed || !owner) {
      throw new Error('Error al crear la mascota');
    }

    return await Pet.create({ name, type, age, breed, owner });
  }

  async createMultiplePets(petsData) {
    return await Pet.insertMany(petsData);
  }

  async updatePet(petId, petUpdate) {
    return await Pet.updateOne({ _id: petId }, petUpdate);
  }

  async deletePet(petId) {
    const result = await Pet.deleteOne({ _id: petId });

    if (result.deletedCount === 0) throw new Error(`La mascota ${petId} no existe!`);

    return result;
  }
}

export { PetRepository };
