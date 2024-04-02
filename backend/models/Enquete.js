import db from "../config/db.js";

class Enquete {
  constructor(titulo, inicio, termino) {
    this.titulo = titulo;
    this.inicio = inicio;
    this.termino = termino;
  }

  async save() {
    let query = `INSERT INTO Enquete(Titulo, Inicio,Termino) VALUE("${this.titulo}","${this.inicio}", "${this.termino}");`;

    return db.execute(query);
  }

  static async delete(id) {
    let sql = `DELETE FROM Opcoes WHERE Enquete_Id = ${id}`;
    db.execute(sql);

    let query = `DELETE FROM Enquete WHERE ID = ${id};`;

    return db.execute(query);
  }

  async update(id, enquete) {
    let query = `UPDATE Enquete SET Titulo = '${enquete.titulo}', Inicio = '${enquete.inicio}', Termino = '${enquete.termino}' WHERE ID = ${id};`;

    return db.execute(query);
  }

  static findAll() {
    let query = "SELECT * FROM Enquete";

    return db.execute(query);
  }

  static findById(id) {
    let query = `SELECT * FROM Enquete WHERE ID = ${id}`;

    return db.execute(query);
  }
}

export default Enquete;
