import { customerStore } from '@/store'
import NProgress from 'nprogress'

export default {
  name: "CustomerList",
  components: {
    NProgress,    
  },  
  data() {
    return {
      isLoading: true,
      pageConfig: {
        limit: null,
        current: null,
      },
      filterConfig: {
        customSearch: null,
        orderBy: null,
      },
    }
  },
  computed: {
    s_customerList: () => customerStore().getItemList,    
  },   
  mounted() {
    this.init()
  },
  methods: {
    async init(){
      try {
        NProgress.start()
        this.isLoading = true
        await this.getCustomerList(true, true)
      } finally {
        NProgress.done()
        this.isLoading = false
      }      
    },
    
    /**
     * Listar Registros
     */
    async getCustomerList(resetPageConfig, resetFilterConfig){      
      // Resetar Configuração de Página
      if (resetPageConfig) {
        this.pageConfig = {
          limit: process.env.VUE_APP_PAGE_CONFIG_LIMIT,
          current: 1,
        }  
      }

      // Resetar Filtro de Pesquisa
      if (resetFilterConfig) {
        this.filterConfig = {
          customSearch: null,
          orderBy: null,
        }
      }
      
      // Efetuar Pesquisa
      try {
        await customerStore().index(this.pageConfig, this.filterConfig)        
      } catch (error) {
        console.log(error)
      }
    },

    /**
     * Incluir Novo Registro
     */
    openCustomerCreateRoute(){
      this.$router.push({
        name: 'customer.create',
        params: {}
      })
    },

    /**
     * Editar Registro
     * @param {Integer} id 
     */
    openCustomerEditRoute(id) {
      this.$router.push({
        name: 'customer.edit',
        params: {id}
      })
    },

    /**
     * Deletar Registro
     * @param {integer} id 
     */
     destroyCustomer(id){
      this.$helper.swal.confirmDelete().then( async (result) => {
        if (result.isConfirmed) {
          try {
            await customerStore().destroy(id)
          } catch (error) {
            this.$helper.swal.error(error.response.data.result)
            throw error
          }              
        }
      })
    },

    /**
     * Trocar de Página
     * [first, next, prior, last]
     * @param {string} direction 
     */
    changePage(direction){
      if (direction === 'first') this.pageConfig.current = 1
      if (direction === 'next')  this.pageConfig.current++
      if (direction === 'prior') this.pageConfig.current--
      if (direction === 'last')  this.pageConfig.current = this.s_customerList.last_page
      this.getCustomerList()
    },
  }
}