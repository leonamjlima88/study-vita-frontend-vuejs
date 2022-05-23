import OpportunityService from '@/services/opportunity/OpportunityService'
import { defineStore } from 'pinia'
import * as helper from '@/helpers'

export const opportunityStore = defineStore({
  id: 'opportunity',
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
      await OpportunityService.destroy(id)        
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
      const response = await OpportunityService.index(pageConfig, filterConfig)
      this.$state.itemList = helper.util.copyObject(response.result, true)
    },

    /**
     * Visualizar registro por ID da API e atualizar estado
     * @param {integer} id 
     * @returns void
     */
    async show(id){
      const response = await OpportunityService.show(id);
      this.$state.item = helper.util.copyObject(response.result)
    },

    /**
     * Incluir novo registro na API e atualizar estado
     * @param {object} opportunity 
     * @returns void
     */
    async store(opportunity){
      const response = await OpportunityService.store(opportunity)
      this.$state.itemList.data.push(response.result)
    },
  
    /**
     * Atualizar registro da API e atualizar estado
     * @param {integer} id 
     * @param {object} opportunity 
     */
    async update(id, opportunity){
      const response = await OpportunityService.update(id, opportunity)
      let foundIndex = this.$state.itemList.data.findIndex((item) => item.id === id)
      this.$state.itemList.data.splice(foundIndex, 1, response.result)
    },
  }
})