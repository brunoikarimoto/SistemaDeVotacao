import Enquete from "../models/Enquete.js";

const novaEnquete = async (req, res) => {
  const { titulo, inicio, termino } = req.body;

  try {
    let enquete = new Enquete(titulo, inicio, termino);

    let [result] = await enquete.save();

    res.status(200).json({
      enquete: enquete,
      resultado: result,
    });
  } catch (error) {
    res.status(201).json({
      error: error,
    });
  }
};

const todasEnquetes = async (req, res) => {
  try {
    const [enquetes] = await Enquete.findAll();

    res.status(200).json({
      enquetes: enquetes,
    });
  } catch (error) {
    res.status(201).json({
      error: error,
    });
  }
};

const umaEnquete = async (req, res) => {
  const { id } = req.params;

  try {
    const [enquete] = await Enquete.findById(id);

    res.status(200).json({
      enquete: enquete,
    });
  } catch (error) {
    res.status(201).json({
      error: error,
    });
  }
};

const deletaEnquete = async (req, res) => {
  const { id } = req.params;

  try {
    let [result] = await Enquete.delete(id);

    res.status(200).json({
      resultado: result,
    });
  } catch (error) {
    res.status(201).json({
      error: error,
    });
  }
};

const atualizaEnquete = async (req, res) => {
  const { id } = req.params;
  const { titulo, inicio, termino } = req.body;

  try {
    let enqueteNova = new Enquete(titulo, inicio, termino);

    let [result] = await enqueteNova.update(id, enqueteNova);

    res.status(200).json({
      enquete: enqueteNova,
      resultado: result,
    });
  } catch (error) {
    res.status(201).json({
      error: error,
    });
  }
};

export {
  novaEnquete,
  todasEnquetes,
  umaEnquete,
  deletaEnquete,
  atualizaEnquete,
};
