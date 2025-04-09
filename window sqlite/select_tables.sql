select * from Cliente;

select * from Carrinho;

SELECT 
  C.id_carrinho, 
  F.nome AS nome_funcionario, 
  F.matricula, 
  CC.nome_cliente,
  C.produtos  
FROM Carrinho C
JOIN Funcionario F ON C.id_funcionario = F.id_funcionario
JOIN Cliente CC ON C.id_cliente = CC.id_cliente;

select * from Funcionario;
