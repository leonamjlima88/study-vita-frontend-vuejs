import CustomerService from '@/services/customer/CustomerService'
import { defineStore } from 'pinia'
import * as helper from '@/helpers'

export const customerStore = defineStore({
  id: 'customer',
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
      await CustomerService.destroy(id)        
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
      const response = await CustomerService.index(pageConfig, filterConfig)
      this.$state.itemList = helper.util.copyObject(response.result, true)
    },

    /**
     * Visualizar registro por ID da API e atualizar estado
     * @param {integer} id 
     * @returns void
     */
    async show(id){
      const response = await CustomerService.show(id);
      this.$state.item = helper.util.copyObject(response.result)
    },

    /**
     * Incluir novo registro na API e atualizar estado
     * @param {object} customer 
     * @returns void
     */
    async store(customer){
      const response = await CustomerService.store(customer)
      this.$state.itemList.data.push(response.result)
    },
  
    /**
     * Atualizar registro da API e atualizar estado
     * @param {integer} id 
     * @param {object} customer 
     */
    async update(id, customer){
      const response = await CustomerService.update(id, customer)
      let foundIndex = this.$state.itemList.data.findIndex((item) => item.id === id)
      this.$state.itemList.data.splice(foundIndex, 1, response.result)
    },
  }
})