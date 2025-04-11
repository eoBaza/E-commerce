import db from '../db.js';

class Cliente {
  static async getAll() {
    const sql = 'SELECT * FROM Cliente';
    return db.all(sql);
  }

  static async getById(id_cliente) {
    const sql = 'SELECT * FROM Cliente WHERE id_cliente = ?';
    return db.get(sql, [id_cliente]);
  }
  static async getByCPF(cpf) {
    const sql = `
      SELECT * FROM Cliente 
      WHERE REPLACE(REPLACE(REPLACE(cpf, '.', ''), '-', ''), ' ', '') = ?
    `;
    return db.get(sql, [cpf]);
  }

  static async create(nome_cliente, cpf, telefone) {
    const sql = 'INSERT INTO Cliente (nome_cliente, cpf, telefone) VALUES (?, ?, ?)';
    return await db.run(sql, [nome_cliente, cpf, telefone]);
  }

  static async update(nome_cliente, cpf, telefone, id_cliente) {
    const sql = 'UPDATE Cliente SET nome_cliente = ?, cpf = ?, telefone = ? WHERE id_cliente = ?';
    return await db.run(sql, [nome_cliente, cpf, telefone, id_cliente]);
  }
}

export default Cliente; 