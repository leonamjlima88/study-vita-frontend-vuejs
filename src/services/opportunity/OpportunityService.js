/**
 * date: 16/05/2022
 * description: Requisições HTTP de Opportunity na API
 * author: Leonam J. Lima <leonamjlima88@gmail.com>
 */
import Api from '@/services/Api'
import * as apiFunctions from '@/services/Api'
import * as helper from '@/helpers'
 
export default {
  /**
   * Deletar registro
   * (DELETE): baseURL/opportunity/:id
   * 
   * @param {integer} id 
   * @returns Promise<AxiosResponse<any, any>>
  */
  async destroy(id){
    const response = await Api().delete(`/opportunity/${id}`)
    return response.data
  },
  
  /**
   * Listar todos os registros
   * (GET): baseURL/opportunity
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
          'opportunity.id',
          'customer.alias_name',
          'seller.name',
        ].forEach(el => {
          axiosParams.append(`filter[orWhere][${el}][likeAnywhere]`, filterConfig.customSearch)
        })      
      }

      // Pesquisar por vendedor
      if (filterConfig.sellerId) {
        axiosParams.append(`filter[where][opportunity.seller_id][equal]`, filterConfig.sellerId)
      }

      // Pesquisa por período de cadastro (Sem buscar por hora)
      if ((filterConfig.initialCreatedAt) && (filterConfig.finalCreatedAt)) {
        axiosParams.append(`filter[where][opportunity.created_at][greaterOrEqual]`, `${filterConfig.initialCreatedAt}T00:00:00`)
        axiosParams.append(`filter[where][opportunity.created_at][lessOrEqual]`, `${filterConfig.finalCreatedAt}T23:59:59`)        
      }
       
      // Ordenação de registros
      if (filterConfig.orderBy) {
        axiosParams.append('filter[orderBy]', filterConfig.orderBy)      
      } else {
        axiosParams.append('filter[orderBy]', 'opportunity.id')
      }
    }
     
    // Enviar Requisição
    const response = await Api().get('opportunity', {params: axiosParams})
    return response.data
  },
  
  /**
   * Localizar registro por Id
   * (GET): baseURL/opportunity/:id
   * 
   * @param {integer} id 
   * @returns Promise<AxiosResponse<any, any>>
  */ 
  async show(id){
    const response = await Api().get(`/opportunity/${id}`)
    return response.data     
  },
  
  /**
   * Incluir um novo registro
   * (POST): baseURL/opportunity
   * 
   * @param {data?} payload 
   * @returns Promise<AxiosResponse<any, any>>
  */
  async store(payload){
    this.beforeSaveOpportunity(payload)
    const response = await Api().post('/opportunity/', payload)
    return response.data
  },
  
  /**
   * Atualizar registro
   * (PUT): baseURL/opportunity/:id
   * 
   * @param {integer} id 
   * @param {data?} payload 
   * @returns Promise<AxiosResponse<any, any>>
  */
  async update(id, payload){
    this.beforeSaveOpportunity(payload)
    const response = await Api().put(`/opportunity/${id}`, payload)
    return response.data
  },

  /**
   * Antes de salvar/enviar requisição 
   * @param {object} opportunity 
  */
  beforeSaveOpportunity(opportunity){
    // Converter numbers que possam estar como string
    let strToNum = helper.util.strToNum
    opportunity.opportunity_product.forEach(item => {
      item.sale_quantity = strToNum(item.sale_quantity)
      item.sale_price = strToNum(item.sale_price)
      item.sale_amount = strToNum(item.sale_amount)
    });
  },   
}