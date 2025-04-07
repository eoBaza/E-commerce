alter table Cliente add column CEP text not null; 

ALTER TABLE Cliente RENAME TO Cliente_old;

Alter table EnderecoCliente add column Numero integer not null;

Alter table EnderecoCliente Rename TO EnderecoCliente_old;