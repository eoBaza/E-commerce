
create table Funcionario (
    id_funcionario integer PRIMARY Key AUTOINCREMENT,
    nome text not null,
    matricula text not null,
    id_cargo integer  not null,
    senha text not null,
    FOREIGN key (id_cargo) references Cargo(id_cargo)
);

create table Cargo(
    id_cargo integer PRIMARY Key AUTOINCREMENT,
    nome_cargo text not null
);

create table Produto (
    id_produto integer PRIMARY Key AUTOINCREMENT,
    nome_produto text not null,
    quantidade integer not null,
    preco real not null
);

create table Pedido(
    id_pedido integer PRIMARY Key AUTOINCREMENT,
    id_funcionario integer not null,
    id_produto integer not null,
    quantidade integer not null,
    preco real not null,
    data_pedido text not null,
    FOREIGN key (id_funcionario) references Funcionario(id_funcionario),
    FOREIGN key (id_produto) references Produto(id_produto)
);

create table Sessoes(
    id_sessao integer Primary Key AUTOINCREMENT,
    id_funcionario integer not null,
    data_inicio text not null,
    data_fim text not null,
    FOREIGN key (id_funcionario) references Funcionario(id_funcionario)
);
    
CREATE TABLE Cliente (
    id_cliente INTEGER PRIMARY KEY AUTOINCREMENT,
    nome_cliente TEXT NOT NULL,
    cpf TEXT NOT NULL,
    telefone TEXT NOT NULL
);

Create table EnderecoCliente(
    id_endereco integer Primary Key AUTOINCREMENT,
    id_cliente integer not null,
    logradouro text not null,
    bairro text not null,
    uf text not null,
    estado text not null,
    cep text not null,
    Numero integer not null,
    FOREIGN key (id_cliente) references Cliente(id_cliente)
);