import { opportunityStore, customerStore, sellerStore, productStore } from '@/store'
import NProgress from 'nprogress'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import CustomSelect from "@/components/CustomSelect"

export default {
  name: "OpportunityEdit",
  components: {
    NProgress,
    CustomSelect,    
  },
  setup () {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      isLoading: false,
      isLoadingZipCode: false,      
      statusList: [
        { id: 0, name: 'Normal' },
        { id: 1, name: 'Perdida' },
        { id: 2, name: 'Expirada' },
      ],
      approvalList: [
        { id: 0, name: 'Pendente' },
        { id: 1, name: 'Aprovada' },
        { id: 2, name: 'Recusada' },        
      ],
      productSelected: {
        product_id: null,
        product: {name: null},
        sale_quantity: null,
        sale_price: null,
        sale_amount: null,
      },
    }
  },
  computed: {
    s_opportunity: () => opportunityStore().getItem,
    s_customerList: () => customerStore().getItemList,
    s_sellerList: () => sellerStore().getItemList,
    s_productList: () => productStore().getItemList,
    getOpportunityProductSum() {
      let sumSaleQuantity = 0
      let sumSaleAmount = 0
      if (this.s_opportunity && this.s_opportunity.opportunity_product) {
        this.s_opportunity.opportunity_product.forEach(item => {
          sumSaleQuantity += this.$helper.util.strToNum(item.sale_quantity)
          sumSaleAmount += (this.$helper.util.strToNum(item.sale_quantity) * this.$helper.util.strToNum(item.sale_price))
        })  
      }
            
      return {
        saleQuantity: this.$helper.util.formatNumber(sumSaleQuantity),
        saleAmout: this.$helper.util.formatNumber(sumSaleAmount),
      }      
    }    
  },
  validations () {
    return {
      s_opportunity: {
        customer_id: { required },
        seller_id: { required },
        status: { required },
        approval: { required },
        opportunity_product: { required },
      }
    }
  },
  mounted(){
    this.init()    
  },
  watch: {
    "productSelected.product_id": {
      handler: function (value) {
        const productListFound = this.s_productList.find(item => item.id === value)
        if (productListFound) {
          this.productSelected.product.name = productListFound.name
          this.productSelected.sale_quantity = '1,00'
          this.productSelected.sale_price = this.$helper.util.formatNumber(productListFound.sale_price)          
          this.productSelected.sale_amount = this.$helper.util.formatNumber(
            this.$helper.util.strToNum(productListFound.sale_price) * this.$helper.util.strToNum(productListFound.sale_price)
          )
          return
        }

        // Limpar produto selecionado
        this.productSelected.product.name = null
        this.productSelected.sale_quantity = null
        this.productSelected.sale_price = null
        this.productSelected.sale_amount = null
      },
    },
  },
  methods: {
    init(){
      try {
        NProgress.start()
        this.isLoading = true
        this.getCustomerList()
        this.getSellerList()
        this.getProductList()
        this.getOpportunityById(this.$route.params.id)
      } finally {
        NProgress.done()
        this.isLoading = false
      }
      window.scrollTo(0, 0)      
    },

    /**
     * Localizar Registro por Id
     */
     getOpportunityById(id){
      try {
        opportunityStore().show(id)
      } catch (error) {
        console.log(error)
      }
    },
    
    /**
     * Atualizar e fechar formulário
     */
     async submitAndClose()
     {      
       // Atualizar Registro
       await this.updateOpportunity(this.s_opportunity)         

       // Ir para página de Listagem
       this.$router.push({
         name: 'opportunity.list',
         params: {}
       })
     },

     /**
     * Atualizar Registro
     * @param {opportunity} opportunity 
     */
    async updateOpportunity(opportunity){
      try {
        this.isLoading = true
        await opportunityStore().update(opportunity.id, opportunity)
        this.$helper.swal.updatedWithSuccess()
      } catch (error) {
        // Interromper execução posterior
        this.$helper.swal.error(this.$helper.util.arrayToStr(error.response.data.result))       
        throw error
      } finally {
        this.isLoading = false
      }
    }, 
    
    /**
     * Carregar Lista de Clientes
     */
     getCustomerList(){
      try {
        customerStore().index({
          paginate: 3, 
          onlyData: true, 
          columns: 'customer.id, customer.business_name'
        })
      } catch (error) {
        console.log(error)
      }
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

    /**
     * Carregar Lista de Produtos
     */
     getProductList(){
      try {
        productStore().index({
          paginate: 3, 
          onlyData: true, 
          columns: 'product.id, product.name, product.sale_price'
        })        
      } catch (error) {
        console.log(error)
      }
    },

    opportunityProductAdd(){
      this.productSelected.sale_amount = 
      this.$helper.util.strToNum(this.productSelected.sale_quantity) * this.$helper.util.strToNum(this.productSelected.sale_price)
      this.s_opportunity.opportunity_product.push(this.$helper.util.copyObject(this.productSelected))
      this.productSelected.product_id = null
    },

    opportunityProductDelete(product_id){
      this.$helper.swal.confirmDelete().then( async (result) => {
        if (result.isConfirmed) {
          try {
            this.s_opportunity.opportunity_product.splice(
              this.s_opportunity.opportunity_product.findIndex(item => item.product_id === product_id), 
              1
            )
          } catch (error) {
            this.$helper.swal.error(error.response.data.result)
            throw error
          }              
        }
      })
    }
  }    
}