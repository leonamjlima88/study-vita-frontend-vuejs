import ProductService from '@/services/product/ProductService'
import { defineStore } from 'pinia'
import * as helper from '@/helpers'

export const productStore = defineStore({
  id: 'product',
  state: () => {
    return {
      item: [],
      itemList: []
    }
  },
  getters: {
    getItem: state => state.item,
    getItemList: state => state.itemList,
  },
  actions: {
    /**
     * Apagar registro da API e atualizar estado
     * @param {integer} id 
     * @returns void
     */
    async destroy(id){
      await ProductService.destroy(id)        
      let foundIndex = this.$state.itemList.data.findIndex((item) => item.id === id)
      this.$state.itemList.data.splice(foundIndex, 1)      
    },
  
    /**
     * Listar registros da API e atualizar estado
     * @param {object} pageConfig 
     * @param {object} filterConfig 
     * @returns void
     */
    async index(pageConfig, filterConfig){
      const response = await ProductService.index(pageConfig, filterConfig)
      this.$state.itemList = helper.util.copyObject(response.result, true)
    },

    /**
     * Visualizar registro por ID da API e atualizar estado
     * @param {integer} id 
     * @returns void
     */
    async show(id){
      const response = await ProductService.show(id);
      this.$state.item = helper.util.copyObject(response.result)
    },

    /**
     * Incluir novo registro na API e atualizar estado
     * @param {object} product 
     * @returns void
     */
    async store(product){
      const response = await ProductService.store(product)
      this.$state.itemList.data.push(response.result)
    },
  
    /**
     * Atualizar registro da API e atualizar estado
     * @param {integer} id 
     * @param {object} product 
     */
    async update(id, product){
      const response = await ProductService.update(id, product)
      let foundIndex = this.$state.itemList.data.findIndex((item) => item.id === id)
      this.$state.itemList.data.splice(foundIndex, 1, response.result)
    },
  }
})