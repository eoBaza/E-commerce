
<template>
    <q-dialog v-model="show">
      <q-card style="min-width: 400px">
        <q-card-section class="row items-center q-pb-none">
          <q-avatar icon="login" color="primary" text-color="white" />
          <div class="text-h6 q-ml-sm">Identificação Colaborador</div>
        </q-card-section>
  
        <q-card-section>
          <q-input
            v-model="matricula"
            label="Matrícula"
            outlined
            dense
            prepend-inner-icon="person"
          />
          <q-input
            v-model="senha"
            label="Senha"
            type="password"
            outlined
            dense
            class="q-mt-md"
            prepend-inner-icon="lock"
          />
        </q-card-section>
  
        <q-card-actions align="right">
          <q-btn flat label="Esqueci minha senha" @click="esqueciSenha" />
          <q-btn label="Log in" color="primary" @click="verificiarlogin" />
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useQuasar } from 'quasar'


const show = ref(false);
const matricula = ref('')
const senha = ref('')
const $q = useQuasar()
const userlogado = ref(null);
const emit = defineEmits(['user-logado'])



const verificiarlogin = async () =>{
  try{
    const response = await axios.post(`http://localhost:3000/login`, {
      matricula: matricula.value,
      senha: senha.value
    })
    userlogado.value = response.data.funcionario
    console.log('Usuário logado:', userlogado.value)

    localStorage.setItem('sessaoAtual', JSON.stringify({
      funcionario: response.data.funcionario,
      id_sessao: response.data.id_sessao
    }));
    
    emit('user-logado', userlogado.value)
    show.value = false
    console.log(response.data)

    $q.notify({
      message: 'Login realizado com sucesso!',
      type: 'positive',
      icon: 'check_circle'
    })
    


  }catch(error){
    console.error('Erro ao buscar funcionario:', error)
  }
}

defineExpose({ show });
</script>