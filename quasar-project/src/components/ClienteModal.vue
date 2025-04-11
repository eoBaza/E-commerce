<template>
    <q-dialog v-model="show">
      <q-card style="min-width: 400px">
        <q-card-section class="row items-center q-pb-none">
          <q-avatar icon="person" color="primary" text-color="white" />
          <div class="text-h6 q-ml-sm">Identificação Cliente</div>
        </q-card-section>
  
        <q-card-section>
          <q-input
            v-model="cpf"
            label="CPF"
            outlined
            dense
            prepend-inner-icon="person"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </q-card-section>
  
        <q-card-section align="right">
          <q-btn flat label="Cadastrar Cliente" to="/CadastroCliente" />
          <q-btn label="Buscar" color="primary" @click="buscarClientePorCPF" />
        </q-card-section>
  
      </q-card>
    </q-dialog>
  </template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const show = ref(false)
const cpf = ref('')
const clientelogado = ref(null)

const emit = defineEmits(['cliente-logado'])

const buscarClientePorCPF = async () => {
  try {
    const cpfLimpo = cpf.value.replace(/\D/g, '')
    const response = await axios.get(`http://localhost:3000/clientes/${cpfLimpo}`)
    clientelogado.value = response.data
    console.log('Cliente logado:', clientelogado.value)

    // Salvando cliente completo e o id_cliente separado
    localStorage.setItem('clienteLogado', JSON.stringify(clientelogado.value))
    localStorage.setItem('id_cliente', clientelogado.value.id_cliente)

    emit('cliente-logado', clientelogado.value)
    show.value = false // fecha o modal
  } catch (error) {
    console.error('Cliente não encontrado ou erro ao buscar:', error)
  }
}

onMounted(() => {
  const clienteSalvo = localStorage.getItem('clienteLogado')
  if (clienteSalvo) {
    clientelogado.value = JSON.parse(clienteSalvo)
    emit('cliente-logado', clientelogado.value)
  }
})

defineExpose({ show })
</script>