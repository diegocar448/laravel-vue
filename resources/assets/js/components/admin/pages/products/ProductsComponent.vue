<template>
    <div>
        <h1>Listagem de Produtos</h1>

        <div class="row">
            <div class="col">
                 <button class="btn btn-success" @click.prevent="showModal = true">
                     Novo
                 </button>
                 
                 <vodal
                    :show="showModal"
                    animation="zoom"
                    @hide="hideModal"
                    :width="600"
                    :height="400"
                    >#content
                    <product-form @success="success"></product-form>
                    
                 </vodal>
            </div>
            <div class="col">
                <search @search="searchForm">

                </search>
            </div>
        </div>



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

        <paginate
            :pagination="products"
            :offset="6"
            @paginate="loadProducts"
        >

        </paginate>

        <!-- <ul v-if="products.last_page > 1">
            <li v-if="products.current_page != 1">
                <a href="" @click.prevent="loadProducts(products.current_page - 1)">Anterior</a>
            </li>
            <li v-if="products.current_page < products.last_page">
                <a href="" @click.prevent="loadProducts(products.current_page + 1)">Próxima</a>
            </li>
        </ul> -->
    </div>
</template>

<script>
//import para usar o Vodal nesse component
import Vodal from 'vodal'

import PaginationComponent from '../../../layouts/PaginationComponent'
import SearchComponent from '../../layouts/SearchComponent'
import ProductForm from './partials/ProductForm'


export default {
    created(){
        //deixar a loading page para pegar a pagina 1 como padrão
        this.loadProducts(1)
    },
    data(){
        return{
            search:'',
            showModal: false,

        }
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
                page: this.products.current_page,
                filter: this.search,
            } 
        }        
    },
    methods:{        
        loadProducts(page){
            //quando o valor não for o valor padrão passado pelo created 1 aqui passamos  o novo valor com (,page)
            this.$store.dispatch('loadProducts', {...this.params, page})
        },
        searchForm(filter){
            this.search = filter


            this.loadProducts(1)
        },
        hideModal(){
            this.showModal =false 
        },
        success(){
            //após gerar um novo registro com sucesso fechar o modal
            this.hideModal()
            //carregar tbm a listagem na paginação - pagina 1
            this.loadProducts(1)
        }

    },
    //registrar componentes
    components:{
        paginate: PaginationComponent,        
        search: SearchComponent,
        Vodal,
        ProductForm,
    }

}
</script>

<style scoped>

</style>
