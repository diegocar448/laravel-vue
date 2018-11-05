<template>
    <div>

        <h1>Listagem de Categorias</h1>
        <table class="table table-dark">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NOME</th>
                    <th width="100">AÇÕES</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(category, index) in categories.data" :key="index">
                    <td v-text="category.id"></td>
                    <td v-text="category.name"></td>
                    <td></td>
                </tr>
            </tbody>

        </table>
    



    </div>
</template>

<script>
import axios from 'axios'

export default {
    created(){
        this.$store.dispatch('loadCategories')
    },
    computed:{
        categories(){
            return this.$store.state.categories.items
        }
    }

}
</script>

<style>

</style>
