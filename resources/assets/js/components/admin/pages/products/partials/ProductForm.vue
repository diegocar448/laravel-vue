<template>
    <div>
        <form class="form" @submit.prevent="onSubmit">
            <div :class="['form-group', { 'has-error': errors.name}]">
                <div v-if="errors.name">{{ errors.name[0] }}</div>
                <input type="text" v-model="product.name" class="form-control" placeholder="Nome do Produto">
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
            //prop update para saber se vamos atualizar ou não
            update: {
                require: false,
                type: Boolean,
                default: false
            },
            product:{
                require: false,
                type:Object,
                default: () => {
                    return{
                        id: '',
                        name: '',
                        description:'',
                        //image:'',
                        category_id: 1,
                    }
                }
            }
        },
        
        data(){
            return {
                product:{},                
                errors:{}                
            }
        },
        methods: {
            //Aqui chamamos a action storeProduct
            onSubmit(){
                this.$store.dispatch('storeProduct', this.product)
                .then(() => {
                    this.$snotify.success('Sucesso ao cadastrar')

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
