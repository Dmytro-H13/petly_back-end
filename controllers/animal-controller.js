const { ApiErrorsTemplate } = require("../helpers/errors");
const animalCtrl = require("../services/animal-service");

const addAnimalController = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await animalCtrl.addAnimal(req.body, owner);
  res.status(201).json(result);
};

const listAnimalController = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await animalCtrl.listAnimal(req.body, owner);
  res.json(result);
};

const removeAnimalController = async (req, res) => {
  const { id } = req.params;
  const result = await animalCtrl.removeAnimal(id);
  if (!result) {
    throw ApiErrorsTemplate(404, "Not found");
  }
  res.json({
    message: "Animal remove",
  });
};

module.exports = {
  addAnimalController,
  removeAnimalController,
  listAnimalController,
};
