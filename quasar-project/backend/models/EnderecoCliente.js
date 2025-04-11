import db from '../db.js';
class EnderecoCliente{
    static async getAll() {
        const sql = 'SELECT * FROM EnderecoCliente';
        return db.all(sql);
    }
    static async getById(id) {
        const sql = 'SELECT * FROM EnderecoCliente WHERE id_endereco_cliente = ?';
        return db.get(sql, [id]);
    }
    static async create(id_cliente, logradouro, bairro, uf, estado, cep, Numero) {
        const sql = 'INSERT INTO EnderecoCliente (id_cliente, logradouro, bairro, uf, estado, cep, Numero) VALUES (?, ?, ?, ?, ?, ?, ?)';
        return await db.run(sql, [id_cliente, logradouro, bairro, uf, estado, cep, Numero]);
      }
    static async update(id_cliente, logradouro, bairro,  uf, estado, cep, Numero) {
        const sql = 'UPDATE EnderecoCliente SET id_cliente = ?, logradouro = ?, bairro = ?, uf = ?, estado = ?, cep = ?, Numero = ? WHERE id_endereco_cliente = ?';
        return await db.run(sql, [id_cliente,logradouro, bairro,  uf, estado, cep, Numero]);
    }
    static async delete(id) {
        const sql = 'DELETE FROM EnderecoCliente WHERE id_endereco_cliente = ?';
        return await db.run(sql, [id]);
    }

};

export default EnderecoCliente;

