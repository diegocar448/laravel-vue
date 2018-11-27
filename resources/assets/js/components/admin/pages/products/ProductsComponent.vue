<template>
    <div>
        <h1>Listagem de Produtos</h1>


        <table class="table table-dark">
            <thead>
                <tr>
                    <th>Imagem</th>
                    <th>Nome</th>
                    <th width="200">Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in products.data" :key="product.id">
                    <td>...</td>
                    <td>{{ product.name }}</td>
                    <td>
                        <a href="#" class="btn btn-info">Editar</a>
                        <a href="#" class="btn btn-danger">Deletar</a>
                    </td>                       
                </tr>
            </tbody>
        </table>

        <ul v-if="products.last_page > 1">
            <li v-if="products.current_page != 1">
                <a href="" @click.prevent="loadProducts(products.current_page - 1)">Anterior</a>
            </li>
            <li v-if="products.current_page < products.last_page">
                <a href="" @click.prevent="loadProducts(products.current_page + 1)">Próxima</a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    created(){
        //deixar a loading page para pegar a pagina 1 como padrão
        this.loadProducts(1)
    },
    computed:{
        products(){
            return this.$store.state.products.items
        },
        //vai retornar um objeto com informações que serão enviadas
        //como parametros dinamicamente
        params(){
            return{
                //vai pegar apenas a pagina atual
                page: this.products.current_page
            }
        }        
    },
    methods:{        
        loadProducts(page){
            //quando o valor não for o valor padrão passado pelo created 1 aqui passamos  o novo valor com (,page)
            this.$store.dispatch('loadProducts', {...this.params, page})
        }
    }

}
</script>

<style scoped>

</style>
