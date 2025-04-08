-- insert into Produto (nome_produto, quantidade, preco) values ('Televisao TCL 43, Smart', 4, 2300);
-- insert into Produto (nome_produto, quantidade, preco) values ('Notebook Dell Inspiron 15', 2, 5000);
-- insert into Produto(nome_produto, quantidade, preco) values ('Celular Samsung Galaxy S21', 10, 3500);
insert into Produto (nome_produto, quantidade, preco) values ('Fone de Ouvido JBL', 15, 300);
insert into Produto (nome_produto, quantidade, preco) values ('Cadeira Gamer', 5, 1200);

insert into Funcao (nome_funcao)values('Venda');
insert into Funcao (nome_funcao)values('Devolucao');
insert into Funcao (nome_funcao)values('Cadastrar Cliente');
insert into Funcao (nome_funcao)values('Cadastrar Funcionario');
insert into Funcao (nome_funcao)values('Tela Estoque');
insert into Funcao (nome_funcao)values('Desconto');
insert into Funcao(nome_funcao) VALUES ('Operar Caixa');


insert into Cargo(nome_cargo) VALUES ('Vendedor');
insert into Cargo(nome_cargo) VALUES ('Administrador');
insert into Cargo(nome_cargo) VALUES ('Gerente');
insert into Cargo(nome_cargo) VALUES ('Estoquista');
insert into Cargo(nome_cargo) VALUES ('Caixa');

-- VENDEDOR
insert into CargoFuncao (id_cargo, id_funcao) VALUES (1, 1);
insert into CargoFuncao (id_cargo, id_funcao) VALUES (1, 2);
insert into CargoFuncao (id_cargo, id_funcao) VALUES (1, 3);

-- ADMIN
insert into CargoFuncao (id_cargo, id_funcao) VALUES (2, 1);
insert into CargoFuncao (id_cargo, id_funcao) VALUES (2, 2);
insert into CargoFuncao (id_cargo, id_funcao) VALUES (2, 3);
insert into CargoFuncao (id_cargo, id_funcao) VALUES (2, 5);
insert into CargoFuncao (id_cargo, id_funcao) VALUES (2, 6);
--GERENTE 
insert into CargoFuncao (id_cargo, id_funcao) VALUES (3, 1);
insert into CargoFuncao (id_cargo, id_funcao) VALUES (3, 2);
insert into CargoFuncao (id_cargo, id_funcao) VALUES (3, 3);
insert into CargoFuncao (id_cargo, id_funcao) VALUES (3, 4);
insert into CargoFuncao (id_cargo, id_funcao) VALUES (3, 5);
insert into CargoFuncao (id_cargo, id_funcao) VALUES (3, 6);
insert into CargoFuncao (id_cargo, id_funcao) VALUES (3, 7);
--ESTOQUISTAS
insert into CargoFuncao (id_cargo, id_funcao) VALUES (4, 2);
insert into CargoFuncao (id_cargo, id_funcao) VALUES (4, 5);
--CAIXA 
insert into CargoFuncao (id_cargo, id_funcao) VALUES (5, 7);



insert into Funcionario (nome, matricula, id_cargo, senha)VALUES('User_teste_vendas', '9999', 1, '9999');





