alter table Cliente add column CEP text not null; 

ALTER TABLE Cliente RENAME TO Cliente_old;

Alter table EnderecoCliente add column Numero integer not null;

Alter table EnderecoCliente Rename TO EnderecoCliente_old;

Alter table Produto add COLUMN imagem TEXT;

Alter table Funcionario Rename To Funcionario_old;
alter table CargoFuncao Rename To CargoFuncao_old;
alter table Sessoes Rename To Sessoes_old;