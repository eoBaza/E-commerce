<template>
    <q-page class="q-pa-md">
      <div v-if="cartStore.produtos.length === 0">
        Seu carrinho está vazio 😢
      </div>
  
      <q-list v-else>
        <q-item 
        v-for="produto in cartStore.produtos" 
        :key="produto.id_produto"
        >
          <q-item-section>
            
            <q-item-label><q-img :src="produto.imagem" style="width: 70px; height: 70px;" /> {{ produto.nome_produto }}</q-item-label>
            <q-item-label caption>
              Quantidade: {{ produto.quantidadeSelecionada }} | Preço unitário: R$ {{ produto.preco.toFixed(2) }}
            </q-item-label>
            <div>
                <q-btn dense flat icon="remove" color="red" @click="cartStore.removerProduto(produto)"/>
            </div>
          </q-item-section>
          <q-item-section side>
            <div class="text-weight-bold">
              R$ {{ (produto.preco * produto.quantidadeSelecionada).toFixed(2) }}
            </div>
          </q-item-section>
        </q-item>
      </q-list>
      <div>
        <div class="text-weight-bold" v-if="cartStore.produtos.length > 0">
                Total: R$ {{ cartStore.valorTotal(produto) }}
            </div>
            <q-btn label="Voltar" color="red" to="/"/>
            <q-btn label="Confirmar Carrinho" color="green" v-if="cartStore.produtos.length > 0" @click="confirmarCarrinho" />
            
        </div>
    </q-page>
  </template>

<script setup>
import { cartStore } from 'src/stores/cartStore';

import { useQuasar } from 'quasar';
import axios from 'axios';

const $q = useQuasar();


const confirmarCarrinho = async () =>{
  const id_funcionario = localStorage.getItem('id_funcionario');
  const id_cliente = localStorage.getItem('id_cliente');

  if (!id_funcionario || !id_cliente) {
    alert('Sessão expirada! Faça login novamente.');
    return;
  }
  const produtos = cartStore.produtos.map(p => ({
    id_produto: p.id_produto,
    quantidade: p.quantidadeSelecionada,
    preco_total: (p.preco * p.quantidadeSelecionada).toFixed(2)
  }));

  try {
    await axios.post('http://localhost:3000/carrinho', {
      id_funcionario,
      id_cliente,
      produtos
    });

    $q.notify({
      type: 'positive',
      message: 'Carrinho confirmado com sucesso!',
      position: 'top-right'
    });
    cartStore.limparCarrinho(); // Limpa o carrinho após confirmação
  } catch (err) {
    console.error('Erro ao confirmar carrinho:', err.message);
    alert('Erro ao confirmar carrinho');
  }


};


</script>