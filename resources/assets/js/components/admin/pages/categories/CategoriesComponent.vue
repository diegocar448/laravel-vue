<template>
    <div>
        <h1>Listagem das Categorias</h1>



        <div class="row">
            <div class="col">
                <router-link class="btn btn-success" :to="{name: 'admin.categories.create'}">Cadastrar</router-link>
            </div>
            <div class="col">
                <search @searchCategory="search">

                </search>    
            </div>

        </div>

        <table class="table table-dark">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NOME</th>
                    <th width="200">AÇÕES</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(category, index) in categories.data" :key="index">
                    <td v-text="category.id"></td>
                    <td v-text="category.name"></td>
                    <td>
                        <router-link class="btn btn-info" :to="{name: 'admin.categories.edit', params: {id: category.id}}">Editar</router-link>                        
                    
                        <a href="#" class="btn btn-danger" @click.prevent="confirmDestroy(category)">Remover</a>
                    </td>

                    
                </tr>
            </tbody>

        </table>
    



    </div>
</template>

<script>
import axios from 'axios'

import SearchCategoryComponent from './partials/SearchCategoryComponent'

export default {
    created(){
        //this.$store.dispatch('loadCategories')
        this.loadCategories()
    },
    data(){
        return{
            name:'',
        }
    },
    computed:{
        categories(){
            return this.$store.state.categories.items
        }
    },
    methods:{
        loadCategories(){
            this.$store.dispatch('loadCategories', {name: this.name})
        },

        confirmDestroy(category){
            this.$snotify.error(`Deseja realmente deletar a categoria: ${category.name}`, `Deletar?`, {
                timeout: 10000,
                showProgressBar:true,
                closeOnClick:true,
                buttons:[
                    {text: 'Não', action: (toast) => {console.log('Clicked: Later'); this.$snotify.remove(toast.id); } },
                    {text:'Sim', action: (toast) => {this.destroy(category); this.$snotify.remove(toast.id);}}
                    //{text:'Sim', action: () => this.destroy(category)}
                ]      
            })
        },
        destroy(category) {
            this.$store.dispatch('destroyCategory', category.id)
                .then(() => {
                    this.$snotify.success(`Sucesso ao deletar a categoria: ${category.name}`)

                    this.loadCategories()
                })
                .catch(error => {
                    console.log(error)                 

                    this.$snotify.error('Erro ao deletar a categoria', 'Falha')
                })
        },

        search(filter){
           this.name = filter

           this.loadCategories()
        }
    },
    components:{
        search: SearchCategoryComponent
    }

}
</script>

<style>

</style>
