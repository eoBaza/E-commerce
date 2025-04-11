import db from '../db.js';

class Carrinho{

    static async getAll() {
        const sql = 'SELECT * FROM Carrinho';
        return await db.all(sql);
      }

      static async create(id_funcionario, id_cliente, produtos, quantidade_total, preco_total, data_criacao) {
        const sql = `
          INSERT INTO Carrinho (id_funcionario, id_cliente, produtos, quantidade_total, preco_total, data_criacao)
          VALUES (?, ?, ?, ?, ?, ?)
        `;
        return db.run(sql, [
          id_funcionario,
          id_cliente,
          JSON.stringify(produtos),
          quantidade_total,
          preco_total,
          data_criacao
        ]);
      }
}   

export default Carrinho;