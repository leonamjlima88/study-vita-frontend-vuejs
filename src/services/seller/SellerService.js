/**
 * date: 16/05/2022
 * description: Requisições HTTP de Seller na API
 * author: Leonam J. Lima <leonamjlima88@gmail.com>
 */
 import Api from '@/services/Api'
 import * as apiFunctions from '@/services/Api'
 import * as helper from '@/helpers'

 export default {
   /**
    * Deletar registro
    * (DELETE): baseURL/seller/:id
    * 
    * @param {integer} id 
    * @returns Promise<AxiosResponse<any, any>>
    */
   async destroy(id){
     const response = await Api().delete(`/seller/${id}`)
     return response.data
   },
  
   /**
    * Listar todos os registros
    * (GET): baseURL/seller
    * 
    * @returns Promise<AxiosResponse<any, any>>
    */
   async index(pageConfig, filterConfig){
     const axiosParams = new URLSearchParams()
 
     // Configuração da página
     apiFunctions.loadAxiosParamsByDefault(pageConfig, axiosParams)
 
     // Filtro de dados
     if (filterConfig) {
       // Pesquisa por vários campos ao mesmo tempo
       if (filterConfig.customSearch) {
         [ 
           'seller.id',
           'seller.name', 
           'seller.ein', 
           'seller.address', 
           'seller.city', 
           'seller.district', 
           'seller.phone', 
           'seller.email'
         ].forEach(el => {
           axiosParams.append(`filter[orWhere][${el}][likeAnywhere]`, filterConfig.customSearch)
         })      
       }
       
       // Ordenação de registros
       if (filterConfig.orderBy) {
         axiosParams.append('filter[orderBy]', filterConfig.orderBy)      
       } else {
         axiosParams.append('filter[orderBy]', 'seller.name')
       }
     }
     
     // Enviar Requisição
     const response = await Api().get('seller', {params: axiosParams})
     return response.data
   },
  
   /**
    * Localizar registro por Id
    * (GET): baseURL/seller/:id
    * 
    * @param {integer} id 
    * @returns Promise<AxiosResponse<any, any>>
    */ 
   async show(id){
     const response = await Api().get(`/seller/${id}`)
     return response.data     
   },
  
   /**
    * Incluir um novo registro
    * (POST): baseURL/seller
    * 
    * @param {data?} payload 
    * @returns Promise<AxiosResponse<any, any>>
    */
   async store(payload){
     const response = await Api().post('/seller/', payload)
     return response.data
   },
  
   /**
    * Atualizar registro
    * (PUT): baseURL/seller/:id
    * 
    * @param {integer} id 
    * @param {data?} payload 
    * @returns Promise<AxiosResponse<any, any>>
   */
   async update(id, payload){
     const response = await Api().put(`/seller/${id}`, payload)
     return response.data
   },
 }