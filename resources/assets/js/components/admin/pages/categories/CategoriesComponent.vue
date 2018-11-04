<template>
    <div>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NOME</th>
                    <th width="100">AÇÕES</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>...</td>
                    <td>...</td>
                    <td>...</td>
                </tr>
            </tbody>

        </table>
    



    </div>
</template>

<script>
import axios from 'axios'

export default {
    created(){
        this.loadCategories()
    },
    methods:{
        loadCategories(){
            axios.get('/api/v1/categories')
                .then(response => {
                    console.log(response)
                })
                .catch(errors => {
                    console.log(errors)
                })

        }
    }

}
</script>

<style>

</style>
