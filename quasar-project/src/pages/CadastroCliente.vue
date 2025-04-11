<template>
    <q-page>
        <div>     
        <q-btn icon="arrow_back_ios" flat to="/"/>
        </div>
        <div class="q-gutter-md" style="max-width: 600px;">
            <q-form @submit.prevent="cadastrarCliente">
                <q-input label="Nome Completo" outlined dense v-model="nome_cliente">
                    <template v-slot:prepend>
                        <q-icon name="person" />
                    </template>
                </q-input>
                <q-input 
                label="CPF" 
                outlined 
                dense 
                v-model="cpf"
                mask="###.###.###-##"
                fill-mask>
                    <template v-slot:prepend>
                        <q-icon name="assignment_ind" />
                    </template>
                </q-input>
                <q-input 
                label="Telefone" 
                outlined 
                dense 
                v-model="telefone"
                mask="(##) #####-####"
                fill-mask>
                    <template v-slot:prepend>
                        <q-icon name="phone" />
                    </template>
                </q-input>
                <q-input
                    label="CEP"
                    outlined
                    dense
                    v-model="cep"
                    mask="#####-###"
                    fill-mask
                    >
                    <template v-slot:prepend>
                        <q-icon name="place" />
                    </template>
                </q-input>
                <div style="max-width: 900px; display: flex; flex-direction: row; gap: 10px;">
                    <q-input label="Nome da Rua" outlined dense v-model="logradouro" ></q-input>
                    <q-input label="Bairro" outlined dense v-model="bairro"></q-input>
                    <q-input label="UF" outlined dense v-model="uf"></q-input>
                    <q-input label="Estado" outlined dense v-model="estado"></q-input>
                    <q-input label="Numero" outlined dense v-model="Numero"></q-input>
                </div>
                <div>
                    <q-btn label="Cadastrar" color="green" type="submit"/>
                </div>

            </q-form>
        </div>
        
    </q-page>
</template>


<script setup>
import { ref, watch } from 'vue'
import axios from 'axios'
import { useQuasar } from 'quasar'



    // dados do cliente 
const nome_cliente = ref('')
const cpf = ref('')
const telefone = ref('')
const cep = ref('')
const logradouro = ref('')
const bairro = ref('')
const uf = ref('')
const estado = ref('')
const Numero = ref('')
const $q = useQuasar()


 // Consultar CEP do cliente 
watch(cep, async (newCep) => {
  const cleanCep = newCep.replace(/\D/g, '') // remove tudo que não for número do CEP quando o user digitar
  if (cleanCep.length === 8) {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cleanCep}/json/`)
      if (!response.data.erro) {
        logradouro.value = response.data.logradouro
        bairro.value = response.data.bairro
        uf.value = response.data.uf
        estado.value = response.data.localidade
      } else {
        console.warn('CEP não encontrado')
      }
    } catch (error) {
      console.error('Erro ao consultar o CEP:', error)
    }
  }
})

const cadastrarCliente = async () => {
    try{
        const clienteResponse = await axios.post('http://localhost:3000/clientes',{
            nome_cliente: nome_cliente.value,
            cpf: cpf.value,
            telefone: telefone. value

        });

        // pegar o ultimo ID do cliente cadastrado
        const id_cliente = clienteResponse.data.id_cliente

        await axios.post('http://localhost:3000/enderecos',{
            logradouro: logradouro.value,
            bairro: bairro.value,
            uf: uf.value,
            estado: estado.value,
            cep:cep.value,
            Numero: Numero.value,
            id_cliente: id_cliente,

        });
        $q.notify({
            message: 'Cliente cadastrado com sucesso!',
            type: 'positive',
            icon: 'check_circle',
        });

        // quando gerar o cliente com sucesso, vai limpar os campos do formulario
        nome_cliente.value = ''
        cpf.value = ''
        telefone.value = ''
        cep.value = ''
        logradouro.value = ''
        bairro.value = ''
        uf.value = ''
        estado.value = ''
        Numero.value = ''

    } catch (error) {
        console.error('Erro ao cadastrar cliente:', error)
    }
}
</script>