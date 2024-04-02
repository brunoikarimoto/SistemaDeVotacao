import Opcoes from "../models/Opcoes.js";

const novaOpcao = async (req, res) => {
  const { opcoes, enquete_id } = req.body;

  try {
    for (let i = 0; i < opcoes.length; i++) {
      if (opcoes[i].trim() != "") {
        let aux = new Opcoes(opcoes[i], enquete_id);

        await aux.save();
      }
    }

    res.status(200).json({
      opcoes: opcoes,
    });
  } catch (error) {
    res.status(201).json({
      error: error,
    });
  }
};

const findOne = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await Opcoes.findById(id);

    res.status(200).json({
      opcao: result,
    });
  } catch (error) {
    res.status(201).json({
      error: error,
    });
  }
};

const findByEnquete = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await Opcoes.findFromEnqueteId(id);

    res.status(200).json({
      opcoes: result,
    });
  } catch (error) {
    res.status(201).json({
      error: error,
    });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { opcao, enquete_id } = req.body;

  try {
    const opcoes = new Opcoes(opcao, enquete_id);

    const [result] = await opcoes.update(id, opcoes);

    res.status(200).json({
      opcao: opcoes,
      resultado: result,
    });
  } catch (error) {
    res.status(201).json({
      error: error,
    });
  }
};

const updateVotos = async (req, res) => {
  const { id } = req.params;
  const { votos } = req.body;

  try {
    const [result] = await Opcoes.updateVotos(id, votos);

    res.status(200).json({
      resultado: result.affectedRows,
    });
  } catch (error) {
    res.status(201).json({
      error: error,
    });
  }
};

const deleteOne = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await Opcoes.delete(id);

    res.status(200).json({
      resultado: result,
    });
  } catch (error) {
    res.status(201).json({
      error: error,
    });
  }
};

const deleteAllFromEnquete = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await Opcoes.deleteAllFromEnquete(id);

    res.status(200).json({
      resultado: result,
    });
  } catch (error) {
    res.status(201).json({
      error: error,
    });
  }
};

export {
  novaOpcao,
  findOne,
  findByEnquete,
  update,
  updateVotos,
  deleteOne,
  deleteAllFromEnquete,
};
