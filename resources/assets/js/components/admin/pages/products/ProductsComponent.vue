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
    </div>
</template>

<script>
export default {
    created(){
        this.loadProducts()
    },
    computed:{
        products(){
            return this.$store.state.products.items
        }        
    },
    methods:{
        loadProducts(){
            this.$store.dispatch('loadProducts')
        }
    }

}
</script>

<style scoped>

</style>
