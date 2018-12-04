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

    loadProduct(context, id) {
        context.commit('PRELOADER', true)

        return new Promise((resolve, reject) => {
            //axios.post('/api/v1/products', params)
            axios.get(`${URL_BASE}${RESOURCE}/${id}`)
                .then(response => resolve(response.data))
                .catch(error => reject())
                .finally(() => context.commit('PRELOADER', false))
        })
    },

    //action para criar novos produtos
    storeProduct(context, params){
        context.commit('PRELOADER', true)

        //retorna informações se deu certo ou não
        return new Promise((resolve, reject) => {
            //axios.post('/api/v1/products', params)
            axios.post(`${URL_BASE}${RESOURCE}`, params)
                .then(response => resolve())
                .catch(error => reject(error.response))                
                .finally(() => context.commit('PRELOADER', false))
        })
    },

    //action para editar registros de produtos existentes
    updateProduct(context, params) {
        context.commit('PRELOADER', true)

        //retorna informações se deu certo ou não
        return new Promise((resolve, reject) => {
            //axios.post('/api/v1/products', params)
            axios.put(`${URL_BASE}${RESOURCE}/${params.id}`, params)
                .then(response => resolve())
                .catch(error => reject(error.response))
                .finally(() => context.commit('PRELOADER', false))
        })
    },

    destroyProduct(context, id){

        //primeiro inicia o preloader
        context.commit('PRELOADER', true)

        //retorna informações se deu certo ou não
        return new Promise((resolve, reject) => {
            //axios.post('/api/v1/products', params)
            axios.delete(`${URL_BASE}${RESOURCE}/${id}`)
                .then(response => {
                    resolve()
                    context.commit('PRELOADER', false)
                    }
                )
                .catch(error => {
                    reject()
                    context.commit('PRELOADER', false)
                })
                //.finally(() => context.commit('PRELOADER', false))
        })
    }


    
}

