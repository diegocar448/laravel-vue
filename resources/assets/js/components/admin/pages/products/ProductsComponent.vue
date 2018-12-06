<template>
    <div>
        <h1>Listagem de Produtos</h1>

        <div class="row">
            <div class="col">
                 <button class="btn btn-success" @click.prevent="create">
                     Novo
                 </button>
                 
                 <vodal
                    :show="showModal"
                    animation="rotate"
                    @hide="hideModal"
                    :width="600"
                    :height="400"
                    >#content
                    <product-form 
                        :product="product"
                        :update="update"
                        @success="success"
                        >
                    </product-form>
                    
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
                        <a @click.prevent="edit(product.id)" class="btn btn-info">Editar</a>
                        <destroy :item="product" @destroy="destroy" />
                    </td>                       
                </tr>
            </tbody>
        </table>

        <!-- :pagintation contem os items a ser listados recebe os produtos -->
        <!-- :offset a quantidade de items que queremos que exiba -->
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
import ButtonDestroyComponent from '../../layouts/ButtonDestroyComponent'

 
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
                page: this.products.current_page,
                filter: this.search,
            } 
        }        
    },

    data(){
        return{
            search:'',
            showModal: false,
            product:{
                id: '',
                name: '',
                description:'',
                //image:'',
                category_id: '',
            },
            update:false,

        }
    },
    
    methods:{        
        loadProducts(page){
            //quando o valor não for o valor padrão passado pelo created 1 aqui passamos  o novo valor com (,page)
            this.$store.dispatch('loadProducts', {...this.params, page})
        },
        create(){
            //mudar o status de update para create
            this.update = false     
            
            //abrir modal
            this.showModal=true
            
            //resetar o estado limpando os campos do formulário
            this.reset()

        },

        edit(id){

            this.reset()

            //carrega da action o metodo loadProduct passando id
            this.$store.dispatch('loadProduct', id)
                .then(response => {
                    console.log(response)

                    //products recebe valor do BD
                    this.product = response

                    //mostrar modal
                    this.showModal = true
                    
                    //altera o update para true para atualizar
                    this.update = true
                })
                .catch(() => {
                    this.$snotify.error("Erro ao carregar Produto")
                })
            
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
        },
        
        reset(){
            this.product = {
                id: '',
                name: '',
                description:'',
                //image:'',
                category_id: '',
            }
        },
        /* confirmDelete(product){
            this.$snotify.error(`Deseja realmente deletar o produto ${product.name}`,              
            product.name,
            {
                timeout:0,
                showProgressBar:true,
                closeOnClick: true,
                pauseOnHover:true,
                //aqui vamos passar os botões q vamos usar
                buttons:[
                    {text: 'Nao', action: () => console.log('Não...')},
                    {text: 'Sim', action: () => this.$emit('destroy', item.id)}
                ]
            
            })
        }, */

        destroy(id){
            //console.log('Vou deletar '+id)
            //aqui ele vai pegar o metodo da nossa action para deletar o o produto
            this.$store.dispatch('destroyProduct', id)
                .then(() => {
                        this.$snotify.success('Deletado com sucesso!')                       
                        
                        this.loadProducts(1)
                    })
                .catch(() => this.$snotify.error('Erro ao deletar')) 

        }

    },
    //registrar componentes
    components:{
        paginate: PaginationComponent,        
        search: SearchComponent,
        Vodal,
        ProductForm,
        destroy: ButtonDestroyComponent,
    }

}
</script>

<style scoped>

</style>
