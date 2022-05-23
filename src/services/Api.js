/**
 * date: 14/05/2022
 * description: Inicializar 'axios' e as requisições HTTP da Api
 * author: Leonam J. Lima <leonamjlima88@gmail.com>
 */

import axios from 'axios'

export default () => axios.create({
  baseURL: process.env.VUE_APP_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
    'X-Locale': process.env.VUE_APP_LOCALE,
  }
})

/**
 * Carregar parâmetros do axios com pageConfig (Default)
 * @param {object} pageConfig 
 * @param {URLSearchparams} axiosParams 
 */
export function loadAxiosParamsByDefault(pageConfig, axiosParams){
  // Configuração de página
  if (pageConfig) {
    // Limite de registros por página
    if (pageConfig.limit) {
      axiosParams.append('page[limit]', pageConfig.limit)
    }
    // Página atual
    if (pageConfig.current) {
      axiosParams.append('page[current]', pageConfig.current)
    }
    // Tipo de paginação
    if (pageConfig.paginate) {
      axiosParams.append('page[paginate]', pageConfig.paginate)
    }
    // CursorPaginate
    if (pageConfig.cursor) {
      axiosParams.append('page[cursor]', pageConfig.cursor)
    }
    // Exibir Colunas específicas
    if (pageConfig.columns) {
      axiosParams.append('page[columns]', pageConfig.columns)
    }
    // Mostrar somente os dados
    if (pageConfig.onlyData) {
      axiosParams.append('page[onlyData]', pageConfig.onlyData)
    }
  }
}