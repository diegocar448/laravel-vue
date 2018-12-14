import axios from 'axios'
import { URL_BASE } from '../../../config/configs'
 

const RESOURCE = 'products'

//Criamos essa propriedade que são as informações do HEADER necessárias para o upload de aruivos
//nesse caso são as configuraçoes de header upload do storeProduct cria novo registro de upload
const CONFIGS = {
    headers:{
        'content-type': 'multipart/form-data',
    }
}

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
    storeProduct(context, formData){
        context.commit('PRELOADER', true)

        //retorna informações se deu certo ou não
        return new Promise((resolve, reject) => {
            //axios.post('/api/v1/products', params)

            //quando trabalhamos com upload de imagens é preciso passar um terceiro parametro
            //no caso de upload é necessário passar os HEADER com o terceiro parametro CONFIGS no inicio do arquivo
            axios.post(`${URL_BASE}${RESOURCE}`, formData, CONFIGS)
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
                .catch(error => {
                    reject(error.response)
                     context.commit('PRELOADER', false)
                })
                //.finally(() => context.commit('PRELOADER', false))
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

