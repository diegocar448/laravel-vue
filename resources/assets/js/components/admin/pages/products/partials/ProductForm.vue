<template>
    <div>
        <form class="form" @submit.prevent="onSubmit">
            <div :class="['form-group', { 'has-error': errors.name}]">
                <div v-if="errors.name">{{ errors.name[0] }}</div>
                <input type="text" v-model="product.name" class="form-control" placeholder="Nome do Produto">
            </div>

            <div :class="['form-group', { 'has-error': errors.category_id}]">
                <div v-if="errors.category_id">{{ errors.category_id[0] }}</div>
                <select class="form-control" v-model="product.category_id">
                    <option value="">Selecione a Categoria</option>
                    <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
                </select>
            </div>

            <div :class="['form-group', { 'has-error': errors.description}]">
                <div v-if="errors.description">{{ errors.description[0] }}</div>
                <textarea v-model="product.description" id="" cols="30" rows="10" class="form-control" placeholder="Descrição do Produto"></textarea>
            </div>

            <div class="form-group">
                <button type="submit" class="btn btn-primary">Enviar</button>
            </div>
            

        </form>
    </div>

</template>


<script>
    export default{
        props:{
            //direcionar para store ou update na action
            //prop update para saber se vamos atualizar ou não
            update: {
                require: false,
                type: Boolean,
                default: false
            },
            product:{
                require: false,
                type:Object,                
            }
        },

        data(){
            return {                
                //product:{},                
                errors:{}                
            }
        },

        computed:{
            categories(){
                //Aqui vai retornar as nossas categorias
                return this.$store.state.categories.items.data
            }
        },  
        
        methods: {
            //Aqui chamamos a action storeProduct
            onSubmit(){   
                
                 //ser receber true criará um registro se false vai para o atualizar 
                let action = this.update ? 'updateProduct' : 'storeProduct'

                this.$store.dispatch(action, this.product)
                .then(() => {
                    this.$snotify.success('Sucesso')
                    //quando fizer o cadastro com sucesso rodará o reset
                    this.reset()
  
                    this.$emit('success')
                })
                .catch(errors => {
                    this.$snotify.error('Algo Errado', 'Erro')                  
                    
                    this.errors = errors.data.errors                    
                })
            },

            

            reset(){
                this.errors = {}
                this.product = {
                    id: '',
                    name: '',
                    description:'',
                    //image:'',
                    category_id: 1,
                }
            }
        }
    }

</script>
