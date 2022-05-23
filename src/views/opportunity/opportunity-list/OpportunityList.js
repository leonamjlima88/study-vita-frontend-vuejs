import { opportunityStore, sellerStore } from '@/store'
import NProgress from 'nprogress'
import CustomSelect from "@/components/CustomSelect"

export default {
  name: "OpportunityList",
  components: {
    NProgress,
    CustomSelect,
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
        sellerId: null,
        initialCreatedAt: null,
        finalCreatedAt: null,        
      },      
    }
  },
  computed: {
    s_opportunityList: () => opportunityStore().getItemList,    
    s_sellerList: () => sellerStore().getItemList,    
  },   
  mounted() {
    this.init()
  },
  methods: {
    init(){
      try {
        NProgress.start()
        this.isLoading = true
        this.getOpportunityList(true, true)
        this.getSellerList()
      } finally {
        NProgress.done()
        this.isLoading = false
      }      
    },
    
    /**
     * Listar Registros
     */
    async getOpportunityList(resetPageConfig, resetFilterConfig){
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
        opportunityStore().index(this.pageConfig, this.filterConfig)        
      } catch (error) {
        console.log(error)
      }
    },

    /**
     * Incluir Novo Registro
     */
    openOpportunityCreateRoute(){
      this.$router.push({
        name: 'opportunity.create',
        params: {}
      })
    },

    /**
     * Editar Registro
     * @param {Integer} id 
     */
    openOpportunityEditRoute(id) {
      this.$router.push({
        name: 'opportunity.edit',
        params: {id}
      })
    },

    /**
     * Deletar Registro
     * @param {integer} id 
     */
     destroyOpportunity(id){
      this.$helper.swal.confirmDelete().then( async (result) => {
        if (result.isConfirmed) {
          try {
            await opportunityStore().destroy(id)
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
      if (direction === 'last')  this.pageConfig.current = this.s_opportunityList.last_page
      this.getOpportunityList()
    },

    /**
     * Carregar Lista de Vendedores
    */
    getSellerList(){
      try {
        sellerStore().index({
          paginate: 3, 
          onlyData: true, 
          columns: 'seller.id, seller.name'
        })        
      } catch (error) {
        console.log(error)
      }
    },    
  }
}