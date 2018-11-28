import axios from 'axios'
import { URL_BASE } from '../../../config/configs'
 

const RESOURCE = 'products'

export default {
    //action de listagem de produtos
    loadProducts(context, params){
        context.commit('PRELOADER', true)

        axios.get(`${URL_BASE}${RESOURCE}`, {params})
        .then(response =>  context.commit('LOAD_PRODUCTS', response.data))
        .catch(error => console.log(error))
        .finally(() => context.commit('PRELOADER', false))
    },
    //action para criar novos produtos
    storeProduct(context, params){
        context.commit('PRELOADER', true)

        //retorna informações se deu certo ou não
        return new Promise((resolve, reject) => {
            axios.post('/api/v1/products', params)
                .then(response => resolve())
                .catch(error => reject(error.response))
                //.finally(() => context.commit('PRELOADER', false))
        })
    }
}