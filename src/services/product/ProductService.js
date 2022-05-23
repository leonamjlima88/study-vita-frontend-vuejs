/**
 * date: 16/05/2022
 * description: Requisições HTTP de Product na API
 * author: Leonam J. Lima <leonamjlima88@gmail.com>
 */
import Api from '@/services/Api'
import * as apiFunctions from '@/services/Api'
import * as helper from '@/helpers'
 
export default {
   /**
    * Deletar registro
    * (DELETE): baseURL/product/:id
    * 
    * @param {integer} id 
    * @returns Promise<AxiosResponse<any, any>>
    */
   async destroy(id){
     const response = await Api().delete(`/product/${id}`)
     return response.data
   },
  
   /**
    * Listar todos os registros
    * (GET): baseURL/product
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
           'product.id', 
           'product.name', 
           'product.reference_code', 
           'product.ean_code', 
           'product.note',            
         ].forEach(el => {
           axiosParams.append(`filter[orWhere][${el}][likeAnywhere]`, filterConfig.customSearch)
         })      
       }
       
       // Ordenação de registros
       if (filterConfig.orderBy) {
         axiosParams.append('filter[orderBy]', filterConfig.orderBy)      
       } else {
         axiosParams.append('filter[orderBy]', 'product.name')
       }
     }
     
     // Enviar Requisição
     const response = await Api().get('product', {params: axiosParams})
     return response.data
   },
  
   /**
    * Localizar registro por Id
    * (GET): baseURL/product/:id
    * 
    * @param {integer} id 
    * @returns Promise<AxiosResponse<any, any>>
    */ 
   async show(id){
     const response = await Api().get(`/product/${id}`)
     return response.data     
   },
  
   /**
    * Incluir um novo registro
    * (POST): baseURL/product
    * 
    * @param {data?} payload 
    * @returns Promise<AxiosResponse<any, any>>
    */
   async store(payload){
     this.beforeSaveProduct(payload)
     const response = await Api().post('/product/', payload)
     return response.data
   },
  
   /**
    * Atualizar registro
    * (PUT): baseURL/product/:id
    * 
    * @param {integer} id 
    * @param {data?} payload 
    * @returns Promise<AxiosResponse<any, any>>
   */
   async update(id, payload){
     this.beforeSaveProduct(payload)
     const response = await Api().put(`/product/${id}`, payload)
     return response.data
   },

   /**
    * Antes de salvar/enviar requisição 
    * @param {object} product 
    */
   beforeSaveProduct(product){
     // Converter numbers que possam estar como string
     let strToNum = helper.util.strToNum
     product.cost_price = strToNum(product.cost_price)
     product.current_quantity = strToNum(product.current_quantity)
     product.minimum_quantity = strToNum(product.minimum_quantity)
     product.sale_price = strToNum(product.sale_price)
   },

   /**
    * Converter numbers em string
    * @param {object} product 
    */
   formatNumbers(product){
     let formatNumber = helper.util.formatNumber
     product.cost_price = formatNumber(product.cost_price)
     product.current_quantity = formatNumber(product.current_quantity)
     product.minimum_quantity = formatNumber(product.minimum_quantity)
     product.sale_price = formatNumber(product.sale_price)
   },
}