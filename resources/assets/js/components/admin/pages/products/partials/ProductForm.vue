<template>
    <div>
        <form class="form" @submit.prevent="onSubmit">

            <div :class="['form-group', { 'has-error': errors.image}]">
                <div v-if="errors.image">{{ errors.image[0] }}</div>
                <input type="file" class="form-control" @change="onFileChange">
            </div>

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
                <textarea v-model="product.description" id="" cols="30" rows="5" class="form-control" placeholder="Descrição do Produto"></textarea>
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
                errors:{},
                upload: null,                
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


                //tipo FormData uma class
                //abaixo só vamos fazer se upload for diferente de null
                //enviar o objeto de formData (é uma class do JS)
                const formData = new FormData()

                //se upload for diferente de null então entra nessa condição
                if(this.upload !== null)
                    //string que é o identificador da nossa string
                    formData.append('image', this.upload)
                //append é a string do identificador
                formData.append('id', this.product.id)
                formData.append('name', this.product.name)
                formData.append('description', this.product.description)
                formData.append('category_id', this.product.category_id)
                ///console.log(formData)

                //////////////////////////////////////////////////////////////////////////////
                ////FormData é o formato que javascript usa para fazer o envio de arquivos////
                //////////////////////////////////////////////////////////////////////////////

                //this.$store.dispatch(action, this.product)
                this.$store.dispatch(action, formData)
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
            },

            onFileChange(e){

                //adicionar valor a variável usando a propriedade target  ou a dataTransfer que faz o mesmo que o target
                let files = e.target.files || e.dataTransfer.files

                //se existe arquivo entre em return para encerrar
                if(!files.length)
                    return

                //se for diferente então existe arquivo e entrará aqui
                this.upload = files[0] //posição zero pq será apenas um arquivo
               
            }
        }
    }

</script>
