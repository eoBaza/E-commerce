import db from '../db.js';

class Login {
    static async getALL() {
        const sql = 'SELECT * FROM Funcionario';
        return db.all(sql);
    }
    static async getByMatricula(matricula) {
        const sql = 'SELECT * FROM Funcionario WHERE matricula = ?';
        return db.get(sql, [matricula]);
    }
    static async create(nome, matricula, id_cargofuncao, senha){
        const sql = 'INSERT INTO Funcionario (nome, matricula, id_cargofuncao, senha) VALUES (?, ?, ?, ?)';
        return await db.run(sql, [nome, matricula, id_cargofuncao, senha]);
    }
    static async update(nome, matricula, id_cargofuncao, senha, id_funcionario) {
        const sql = 'UPDATE Funcionario SET nome = ?, matricula = ?, id_cargofuncao = ?, senha = ? WHERE id_funcionario = ?';
        return await db.run(sql, [nome, matricula, id_cargofuncao, senha, id_funcionario]);
    }   

}

export default Login;