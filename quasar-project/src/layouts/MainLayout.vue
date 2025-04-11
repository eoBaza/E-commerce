<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-primary text-white q-px-md q-py-sm">
      <div class="row items-center justify-between full-width">

        <div class="text-h6 q-mr-md">
          <router-link to="/">
            <q-img
              src="/images/logo.jpg"
              alt="Logo"
              style="width: 140px; height: auto; cursor: pointer;"
            />
          </router-link>
            
          <q-btn-dropdown icon="menu" flat>
            <q-list>
              <q-item>
                <q-item-section>
                  <q-btn flat label="Tela de Pedido" to="/" />
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section>
                  <q-btn flat label="Controle de Estoque" to="/" />
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown> 
        </div>

        <q-input
          rounded
          dense
          outlined
          bg-color="white"
          placeholder="Pesquisar produto..."
          class="q-mx-md"
          style="max-width: 400px; flex: 1;"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>

        <div class="row items-center q-gutter-sm">
          <q-btn flat dense label="Home" to="/" />
          <q-btn flat dense label="Promoção" to="/products" />
          <q-input 
          v-if="userlogado"
          readonly 
          dense
          standout
          bg-color="white"
          text-color="black"
          style="max-width: 300px"
          :model-value="`${userlogado.matricula} - ${userlogado.nome}`">
          <template v-slot:prepend>
            <q-icon name="badge" />
          </template>
          <template v-slot:append>
            <q-btn
            color="negative"
            icon="logout"
            @click="encerrarSessaoFuncionario"
            unelevated
            class="q-ml-sm q-px-md q-py-xs"
            style="border-radius: 12px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); width: 25px;"
          />
          </template>
        </q-input>
          <q-btn flat dense label="Login" @click="abrirLogin" />
          <LoginModal ref="loginDialog" @user-logado="handleUserLogado" />

          <!-- Cliente Logado exibido no header -->
          <q-input
            v-if="clienteLogado"
            readonly
            dense
            standout
            bg-color="white"
            text-color="black"
            style="max-width: 300px"
            :model-value="`${clienteLogado.cpf} - ${clienteLogado.nome_cliente}`"
          >
            <template v-slot:prepend>
              <q-icon name="badge" />
            </template>
            <template v-slot:append>
              <q-btn icon="close" flat class="cursor-pointer" @click="encerrarSessaoCliente" />
            </template>
          </q-input>

          <q-btn flat dense label="Cliente" @click="abrirCliente" v-if="!clienteLogado" />
          <ClienteModal @cliente-logado="handleClienteLogado" ref="clienteModal" />

          <q-btn flat dense icon="shopping_cart" to="/carrinho">
            <q-badge color="green" floating>
              {{ cartStore.count }}
            </q-badge>
          </q-btn>

          
        </div>

      </div>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { cartStore } from 'src/stores/cartStore'
import LoginModal from 'src/components/LoginModal.vue'
import ClienteModal from 'src/components/ClienteModal.vue'
import axios from 'axios'

const userlogado = ref(null)
const clienteLogado = ref(null)
const loginDialog = ref(null)
const clienteModal = ref(null)

const abrirCliente = () => {
  clienteModal.value.show = true
}

const abrirLogin = () => {
  loginDialog.value.show = true
}

const handleClienteLogado = (cliente) => {
  clienteLogado.value = cliente
  console.log('Cliente recebido no layout:', cliente)
}
const handleUserLogado = (user) => {
  userlogado.value = user
  console.log('Usuário logado no layout:', user)
  localStorage.setItem('id_funcionario', user.id_funcionario);
}

onMounted(() => {
  const sessao = JSON.parse(localStorage.getItem('sessaoAtual'));
  if (sessao?.funcionario) {
    userlogado.value = sessao.funcionario;
  }

  const cliente = localStorage.getItem('clienteLogado');
  if (cliente) {
    clienteLogado.value = JSON.parse(cliente);
  }
});

const encerrarSessaoFuncionario = async () => {
  const sessaoAtual = JSON.parse(localStorage.getItem('sessaoAtual'))

  if (sessaoAtual?.id_sessao) {
    try {
      await axios.put(`http://localhost:3000/sessao/${sessaoAtual.id_sessao}`, {
        status: 'encerrada'
      })
    } catch (error) {
      console.error('Erro ao encerrar a sessão no backend:', error)
    }
  } else {
    console.warn('Nenhuma sessão ativa encontrada.')
  }

  localStorage.removeItem('sessaoAtual')
  localStorage.removeItem('FuncionarioLogado')
  userlogado.value = null
}

const encerrarSessaoCliente = () => {
  localStorage.removeItem('clienteLogado')
  clienteLogado.value = null
}
</script>
