<template>
    <a @click.prevent="confirmDelete(item)" class="btn btn-danger">
        Deletar
    </a>
</template>

<script>
    export default{
        props:{
            item:{
                require:true,
                type:Object
            }
        },

        methods:{
            confirmDelete(item){
                this.$snotify.error(`Deseja realmente deletar o registro ${item.name}`,              
                'Confirma?',
                {
                    timeout:0,
                    showProgressBar:true,
                    closeOnClick: true,
                    pauseOnHover:true,
                    //aqui vamos passar os botões q vamos usar
                    buttons:[
                        {text: 'Nao', action: () => console.log('Não...')},
                        {text: 'Sim', action: () => this.destroy(item.id)}
                    ]
                
            })
            },
        }
    }

</script>