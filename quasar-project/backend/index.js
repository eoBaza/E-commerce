import db from './db.js';
import express from 'express';
import cors from 'cors';
import Cliente from './models/Cliente.js';
import Produto from './models/Produto.js';
import EnderecoCliente from './models/EnderecoCliente.js';
import Login from './models/Login.js';
import Carrinho from './models/Carrinho.js';


const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());


app.get('/produtos', async (req, res) => {
  try {
    const produtos = await Produto.getAll();
    res.json(produtos);
  } catch (err) {
    console.error('Erro ao obter produtos:', err.message);
    res.status(500).json({ error: 'Erro ao obter produtos' });
  }
});


app.post('/clientes', async (req, res) => {
  const { nome_cliente, cpf, telefone } = req.body;

  try {
    const resultado = await Cliente.create(nome_cliente, cpf, telefone);
    res.status(201).json({ mensagem: 'Cliente cadastrado com sucesso', id_cliente: resultado.id });
  } catch (err) {
    console.error('Erro ao cadastrar cliente:', err.message);
    res.status(500).json({ erro: 'Erro ao cadastrar cliente' });
  }
});
app.get('/clientes/:cpf', async (req, res) => {
  const { cpf } = req.params;
  try {
    const cliente = await Cliente.getByCPF(cpf);

    if (cliente) {
      res.json(cliente);
    } else {
      res.status(404).json({ erro: 'Cliente não encontrado' });
    }
  } catch (err) {
    console.error('Erro ao buscar cliente por CPF:', err.message);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});

app.post('/enderecos', async (req, res) => {
  console.log(req.body);
  const { id_cliente, logradouro, bairro, uf, estado, cep, Numero } = req.body;

  try {

    const result = await EnderecoCliente.create(id_cliente, logradouro, bairro, uf, estado, cep, Numero);
    res.status(201).json({ id_endereco_cliente: result.id });
  } catch (err) {
    console.error('Erro ao cadastrar endereço:', err.message);
    res.status(500).json({ error: 'Erro ao cadastrar endereço' });
  }
});

app.post('/login', async (req, res) => {
  const { matricula, senha } = req.body;

  try {
    const usuario = await Login.getByMatricula(matricula);

    if (!usuario) {
      return res.status(404).json({ error: 'Funcionário não encontrado' });
    }

    if (usuario.senha !== senha) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    
    const sql = 'INSERT INTO Sessoes (id_funcionario, data_inicio) VALUES (?, datetime("now"))';
    const result = await db.run(sql, [usuario.id_funcionario]);

    const id_sessao = result.lastID;

    
    res.status(200).json({
      mensagem: 'Login realizado com sucesso',
      funcionario: {
        id_funcionario: usuario.id_funcionario,
        nome: usuario.nome,
        matricula: usuario.matricula
      },
      id_sessao: id_sessao
    });

  } catch (err) {
    console.error('Erro no login:', err.message);
    res.status(500).json({ error: 'Erro ao processar login' });
  }
});

app.put('/sessao/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const sql = 'UPDATE Sessoes SET data_fim = datetime("now") WHERE id_sessao = ?';
    await db.run(sql, [id]);
    res.status(200).json({ mensagem: 'Sessão encerrada com sucesso' });
  } catch (err) {
    console.error('Erro ao encerrar sessão:', err.message);
    res.status(500).json({ erro: 'Erro ao encerrar sessão' });
  }
});

app.post('/carrinho', async (req, res) => {
  const { id_funcionario, id_cliente, produtos } = req.body;

  if (!id_funcionario || !id_cliente || !Array.isArray(produtos)) {
    return res.status(400).json({ error: 'Dados incompletos para criação do carrinho' });
  }

  const quantidade_total = produtos.reduce((acc, item) => acc + Number(item.quantidade), 0);
  const preco_total = produtos.reduce((acc, item) => acc + parseFloat(item.preco_total), 0);
  const data_criacao = new Date().toISOString();

  try {
    await Carrinho.create(
      id_funcionario,
      id_cliente,
      produtos,
      quantidade_total,
      preco_total,
      data_criacao
    );

    res.status(201).json({ mensagem: 'Carrinho salvo com sucesso!' });
  } catch (err) {
    console.error('Erro ao salvar carrinho:', err.message);
    res.status(500).json({ error: 'Erro ao salvar carrinho' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
