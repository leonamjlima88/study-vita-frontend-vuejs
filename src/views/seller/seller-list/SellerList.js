import { sellerStore } from '@/store'
import NProgress from 'nprogress'

export default {
  name: "SellerList",
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
    s_sellerList: () => sellerStore().getItemList,    
  },   
  mounted() {
    this.init()
  },
  methods: {
    async init(){
      try {
        NProgress.start()
        this.isLoading = true
        await this.getSellerList(true, true)
      } finally {
        NProgress.done()
        this.isLoading = false
      }      
    },
    
    /**
     * Listar Registros
     */
    async getSellerList(resetPageConfig, resetFilterConfig){
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
        await sellerStore().index(this.pageConfig, this.filterConfig)        
      } catch (error) {
        console.log(error)
      }
    },

    /**
     * Incluir Novo Registro
     */
    openSellerCreateRoute(){
      this.$router.push({
        name: 'seller.create',
        params: {}
      })
    },

    /**
     * Editar Registro
     * @param {Integer} id 
     */
    openSellerEditRoute(id) {
      this.$router.push({
        name: 'seller.edit',
        params: {id}
      })
    },

    /**
     * Deletar Registro
     * @param {integer} id 
     */
     destroySeller(id){
      this.$helper.swal.confirmDelete().then( async (result) => {
        if (result.isConfirmed) {
          try {
            await sellerStore().destroy(id)
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
      if (direction === 'last')  this.pageConfig.current = this.s_sellerList.last_page
      this.getSellerList()
    },
  }
}