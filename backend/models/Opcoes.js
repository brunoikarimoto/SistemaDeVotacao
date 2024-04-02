import db from "../config/db.js";

class Opcoes {
  constructor(opcao, enquete_id) {
    this.opcao = opcao;
    this.enquete_id = enquete_id;
    this.votos = 0;
  }

  async save() {
    let query = `INSERT INTO Opcoes(Opcao, Enquete_Id, Votos) VALUE('${this.opcao}', ${this.enquete_id}, ${this.votos});`;

    return db.execute(query);
  }

  async update(id, opcao) {
    let query = `UPDATE Opcoes SET Opcao = '${opcao.opcao}' WHERE Opcao_Id = ${id};`;

    return db.execute(query);
  }

  static async deleteAllFromEnquete(id) {
    let query = `DELETE FROM Opcoes WHERE Enquete_Id = ${id}`;

    return db.execute(query);
  }

  static async delete(id) {
    let query = `DELETE FROM Opcoes WHERE Opcao_Id = ${id};`;

    return db.execute(query);
  }

  static async updateVotos(id, num) {
    let query = `UPDATE Opcoes SET Votos = ${num} WHERE Opcao_Id = ${id};`;

    return db.execute(query);
  }

  static findFromEnqueteId(id) {
    let query = `SELECT * FROM Opcoes WHERE Enquete_Id = ${id}`;

    return db.execute(query);
  }

  static findById(id) {
    let query = `SELECT * FROM Opcoes WHERE Opcao_Id = ${id}`;

    return db.execute(query);
  }
}

export default Opcoes;
