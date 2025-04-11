import db from '../db.js';

class Produto {
   static async getAll() {
      const sql = 'SELECT * FROM Produto';
      return db.all(sql);
   }
   static async getById(id) {
      const sql = 'SELECT * FROM Produto WHERE id_produto = ?';
      return db.get(sql, [id]);
   }
    static async create(nome_produto, quantidade, preco) {
        const sql = 'INSERT INTO Produto (nome_produto, quantidade, preco) VALUES (?, ?, ?)';
        return await db.run(sql, [nome_produto, quantidade, preco]);
    }

    static async update(id, nome_produto, quantidade, preco) {
        const sql = 'UPDATE Produto SET nome_produto = ?, quantidade = ?, preco = ? WHERE id_produto = ?';
        return await db.run(sql, [nome_produto, quantidade, preco, id]);
    }
}    
export default Produto;