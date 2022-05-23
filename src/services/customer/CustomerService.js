/**
 * date: 14/05/2022
 * description: Requisições HTTP de Customer na API
 * author: Leonam J. Lima <leonamjlima88@gmail.com>
 */
import Api from '@/services/Api'
import * as apiFunctions from '@/services/Api'

export default {
  /**
   * Deletar registro
   * (DELETE): baseURL/customer/:id
   * 
   * @param {integer} id 
   * @returns Promise<AxiosResponse<any, any>>
   */
  async destroy(id){
    const response = await Api().delete(`/customer/${id}`)
    return response.data
  },
 
  /**
   * Listar todos os registros
   * (GET): baseURL/customer
   * 
   * @returns Promise<AxiosResponse<any, any>>
   */
  async index(pageConfig, filterConfig){
    const axiosParams = new URLSearchParams()

    // Configuração da página
    apiFunctions.loadAxiosParamsByDefault(pageConfig, axiosParams);

    // Filtro de dados
    if (filterConfig) {
      // Pesquisa por vários campos ao mesmo tempo
      if (filterConfig.customSearch) {
        [ 
          'customer.id',
          'customer.business_name', 
          'customer.alias_name', 
          'customer.ein', 
          'customer.address', 
          'customer.city', 
          'customer.district', 
          'customer.phone', 
          'customer.email'
        ].forEach(el => {
          axiosParams.append(`filter[orWhere][${el}][likeAnywhere]`, filterConfig.customSearch);
        });      
      }
      
      // Ordenação de registros
      if (filterConfig.orderBy) {
        axiosParams.append('filter[orderBy]', filterConfig.orderBy);      
      } else {
        axiosParams.append('filter[orderBy]', 'customer.business_name');
      }
    }
    
    // Enviar Requisição
    const response = await Api().get('customer', {params: axiosParams})
    return response.data
  },
 
  /**
   * Localizar registro por Id
   * (GET): baseURL/customer/:id
   * 
   * @param {integer} id 
   * @returns Promise<AxiosResponse<any, any>>
   */ 
  async show(id){
    const response = await Api().get(`/customer/${id}`)
    return response.data     
  },
 
  /**
   * Incluir um novo registro
   * (POST): baseURL/customer
   * 
   * @param {data?} payload 
   * @returns Promise<AxiosResponse<any, any>>
   */
  async store(payload){
    const response = await Api().post('/customer/', payload)
    return response.data
  },
 
  /**
   * Atualizar registro
   * (PUT): baseURL/customer/:id
   * 
   * @param {integer} id 
   * @param {data?} payload 
   * @returns Promise<AxiosResponse<any, any>>
  */
  async update(id, payload){
    const response = await Api().put(`/customer/${id}`, payload)
    return response.data
  },   
}