import NProgress from 'nprogress'
import * as store from '@/store'

export default {
  name: "ProductList",
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
    s_productList: () => store.productStore().getItemList,    
  },   
  mounted() {
    this.init()
  },
  methods: {
    init(){
      try {
        NProgress.start()
        this.isLoading = true
        this.getProductList(true, true)
      } finally {
        NProgress.done()
        this.isLoading = false
      }      
    },
    
    /**
     * Listar Registros
     */
    getProductList(resetPageConfig, resetFilterConfig){
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
        store.productStore().index(this.pageConfig, this.filterConfig)        
      } catch (error) {
        console.log(error)
      }
    },

    /**
     * Incluir Novo Registro
     */
    openProductCreateRoute(){
      this.$router.push({
        name: 'product.create',
        params: {}
      })
    },

    /**
     * Editar Registro
     * @param {Integer} id 
     */
    openProductEditRoute(id) {
      this.$router.push({
        name: 'product.edit',
        params: {id}
      })
    },


    /**
     * Deletar Registro
     * @param {integer} id 
     */
    destroyProduct(id){
      this.$helper.swal.confirmDelete().then( async (result) => {
        if (result.isConfirmed) {
          try {
            await store.productStore().destroy(id)
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
      if (direction === 'last')  this.pageConfig.current = this.s_productList.last_page
      this.getProductList()
    },
  }
}