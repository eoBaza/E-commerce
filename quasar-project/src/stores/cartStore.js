import { reactive } from "vue";

export const cartStore = reactive({
    count: 0,
    produtos:[],
    adicionarProduto(produto){
        const existeProdutocarrinho = this.produtos.find(p => p.id_produto === produto.id_produto)
        if(existeProdutocarrinho){
            existeProdutocarrinho.quantidadeSelecionada += produto.quantidadeSelecionada

        }else{
            this.produtos.push(produto)
        }
        this.count += produto.quantidadeSelecionada;
    },
    valorTotal(){
        let total = 0
        this.produtos.forEach(p => {
            total += p.preco * p.quantidadeSelecionada
        })
        return total.toFixed(2)
    },
    removerProduto(produto){
        const produtoIndex = this.produtos.findIndex(p => p.id_produto === produto.id_produto)
        if(produtoIndex !== -1){
            this.count -= this.produtos[produtoIndex].quantidadeSelecionada
            this.produtos.splice(produtoIndex, 1)
        }

    },

    adicionar(qtd =1){
        this.count += qtd
    },
    resetar(){
        this.count = 0
    },  
    limparCarrinho(){
        this.produtos = []
        this.count = 0
    },
});