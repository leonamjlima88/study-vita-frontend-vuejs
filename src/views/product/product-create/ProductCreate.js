import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { productStore } from '@/store'

export default {
  name: "ProductCreate",
  components:{
  },
  setup () {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      isLoading: false,
      isLoadingZipCode: false,
      product: {
        id: null,
        name: null,
        reference_code: null,
        ean_code: null,
        cost_price: '0,00',
        sale_price: '0,00',
        minimum_quantity: '0,00',
        current_quantity: '0,00',
        note: null,
        is_discontinued: null,
      },
    }
  },
  validations () {
    return {
      product: {
        name: { required },
      }
    }
  },
  mounted(){
    this.init()    
  },
  methods: {
    init(){
      this.v$.$touch()
      window.scrollTo(0, 0)
      this.$refs.name.focus()
    },
    
    /**
     * Salvar e fechar formulário
     */
    async submitAndClose()
    {      
      // Salvar Registro
      await this.storeProduct(this.product)        

      // Ir para página de Listagem
      this.$router.push({
        name: 'product.list',
        params: {}
      })
    },

    /**
     * Incluir Novo Registro
     * @param {product} product 
     */
    async storeProduct(product){
      try {
        this.isLoading = true
        await productStore().store(product)
        this.$helper.swal.savedWithSuccess()
      } catch (error) {
        // Interromper execução posterior
        this.$helper.swal.error(this.$helper.util.arrayToStr(error.response.data.result))       
        throw error
      } finally {
        this.isLoading = false
      }
    },      
  }    
}