<template>
  <q-page class="q-pa-md">
    <!-- Carousel -->
    <div class="q-pa-md" style="background-color: #f5f5f5;">
      <div style="max-width: 900px; margin-left: 2rem;">
        <q-carousel
          animated
          v-model="slide"
          navigation
          infinite
          :autoplay="autoplay"
          arrows
          transition-prev="slide-right"
          transition-next="slide-left"
          @mouseenter="autoplay = false"
          @mouseleave="autoplay = true"
        >
          <q-carousel-slide :name="1" class="column flex-center bg-primary text-white">
            <div class="text-h4">Bem-vindo ao E-commerce do BAZA</div>
            <div class="text-subtitle1">Os melhores produtos estão aqui!</div>
          </q-carousel-slide>

          <q-carousel-slide :name="2" class="column flex-center bg-secondary text-white">
            <div class="text-h4">Frete Grátis</div>
            <div class="text-subtitle1">Em compras acima de R$ 1000,00</div>
          </q-carousel-slide>

          <q-carousel-slide :name="3" class="column flex-center bg-accent text-white">
            <div class="text-h4">Promoções da Semana</div>
            <div class="text-subtitle1">Aproveite ofertas imperdíveis!</div>
          </q-carousel-slide>
        </q-carousel>
      </div>
    </div>

    <div class="q-pa-md" style="background-color: #f5f5f5;">
      <div class="row q-col-gutter-md">
        <div
          v-for="produto in produtos"
          :key="produto.id_produto"
          class="col-xs-12 col-sm-6 col-md-4"
        >
          <q-card class="my-card" bordered>
            <q-card-section>
              <div> <q-img :src="produto.imagem" style="height: 200px;" fit="contain" /> </div>
              <div class="text-h6">{{ produto.nome_produto }}</div>
              <div class="text-body1">Quantidade: {{ produto.quantidade }}</div>
              <div class="text-body1">Preço: R$ {{ produto.preco.toFixed(2) }}</div>
            </q-card-section>

            <q-card-actions align="between" class="q-gutter-sm q-pa-sm">
              <div class="row items-center q-gutter-sm">
                <q-btn dense flat icon="remove" color="red" @click="() => del(produto)" />
                <q-input
                  v-model.number="produto.quantidadeSelecionada"
                  dense
                  type="number"
                  style="width: 70px"
                  :min="1"
                  :max="produto.quantidade"
                  placeholder="1"
                  @update:model-value="(val) => limitarQuantidade(val, produto)"
                  
                />
                <q-btn dense flat icon="add" color="green" @click="()=> add(produto)" />
              </div>
              <q-btn color="primary" label="Adicionar" @click="() => increment(produto)" />
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { cartStore } from 'src/stores/cartStore'


const $q = useQuasar()
const produtos = ref([])
const slide = ref(1)
const autoplay = ref(true)

const fetchProdutos = async () => {
  try {
    const response = await axios.get('http://localhost:3000/produtos')
    produtos.value = response.data
  } catch (error) {
    console.error('Erro ao buscar produtos:', error)
  }
};

const increment = (produto) => {
  if (produto.quantidadeSelecionada > produto.quantidade) {
    $q.notify({
      message: `Quantidade máxima de ${produto.quantidade} atingida`,
      type: 'negative',
      icon: 'error',
    });
    return;
  }
  // valida se o user nao digitou a quantidade que deseja, apenas clicou em adicionar, ai ele adiciona 1 por padrao.
  if(produto.quantidadeSelecionada < 1 || isNaN(produto.quantidadeSelecionada)) {
    produto.quantidadeSelecionada = 1;
  }
  cartStore.adicionarProduto(produto);

  $q.notify({
    message: `Adicionado ${produto.quantidadeSelecionada}x ${produto.nome_produto} ao carrinho`,
    icon: 'shopping_cart',
    color: 'green',
    textColor: 'white',
  });
};
const add = (produto) => {
    if(produto.quantidadeSelecionada > produto.quantidade){
      $q.notify({
        message: `Quantidade máxima de ${produto.quantidade} atingida`,
        icon: 'error',
        color: 'red',
        textColor: 'white'
      })
    }
    else(
      produto.quantidadeSelecionada ++
    )
};
const del = (produto) => {
  if (produto.quantidadeSelecionada > 0) {
    produto.quantidadeSelecionada --
  } 
};

const limitarQuantidade = (val, produto) => {
  if (val > produto.quantidade) {
    produto.quantidadeSelecionada = produto.quantidade;
    $q.notify({
      message: `Quantidade máxima de ${produto.quantidade} atingida`,
      color: 'red',
      icon: 'warning',
      position: 'bottom-left',
      badgeStyle: 'font-size: 14px'
    });
  } else if (val < 1 || isNaN(val)) {
    produto.quantidadeSelecionada = 1;
  } else {
    produto.quantidadeSelecionada = val;
  }
};

onMounted(() => {
  fetchProdutos()
})
</script>
