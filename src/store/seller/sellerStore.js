import SellerService from '@/services/seller/SellerService'
import { defineStore } from 'pinia'
import * as helper from '@/helpers'

export const sellerStore = defineStore({
  id: 'seller',
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
      await SellerService.destroy(id)        
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
      const response = await SellerService.index(pageConfig, filterConfig)
      this.$state.itemList = helper.util.copyObject(response.result, true)
    },

    /**
     * Visualizar registro por ID da API e atualizar estado
     * @param {integer} id 
     * @returns void
     */
    async show(id){
      const response = await SellerService.show(id);
      this.$state.item = helper.util.copyObject(response.result)
    },

    /**
     * Incluir novo registro na API e atualizar estado
     * @param {object} seller 
     * @returns void
     */
    async store(seller){
      const response = await SellerService.store(seller)
      this.$state.itemList.data.push(response.result)
    },
  
    /**
     * Atualizar registro da API e atualizar estado
     * @param {integer} id 
     * @param {object} seller 
     */
    async update(id, seller){
      const response = await SellerService.update(id, seller)
      let foundIndex = this.$state.itemList.data.findIndex((item) => item.id === id)
      this.$state.itemList.data.splice(foundIndex, 1, response.result)
    },
  }
})