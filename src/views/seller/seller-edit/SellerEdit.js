import SellerService from "@/services/seller/SellerService"
import NProgress from 'nprogress'
import useVuelidate from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
import { sellerStore } from '@/store'

export default {
  name: "SellerEdit",
  components: {
    NProgress,  
  },
  setup () {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      isLoading: false,
      isLoadingZipCode: false,
    }
  },
  computed: {
    s_seller: () => sellerStore().getItem,
  },
  validations () {
    return {
      s_seller: {
        name: { required },
        ein: { 
          required, 
          minLength: 11, 
          name_validation: {
            $validator: this.validationForCpfCnpj,
            $message: 'Documento inválido.'
          }
        },
        email: { email },  
      }
    }
  },
  mounted(){
    this.init()    
  },
  methods: {
    async init(){
      try {
        NProgress.start()
        this.isLoading = true
        await this.getSellerById(this.$route.params.id)
      } finally {
        NProgress.done()
        this.isLoading = false
      }
      window.scrollTo(0, 0)
      this.$refs.name.focus()
    },

    /**
     * Localizar Registro por Id
     */
     async getSellerById(id){
      try {
        await sellerStore().show(id)
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
       await this.updateSeller(this.s_seller)         

       // Ir para página de Listagem
       this.$router.push({
         name: 'seller.list',
         params: {}
       })
     },

     /**
     * Atualizar Registro
     * @param {seller} seller 
     */
      async updateSeller(seller){
        try {
          this.isLoading = true
          await sellerStore().update(seller.id, seller)
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
     * Procurar endereço por cep e carregar em formulário
     * @param {string} zipcode 
     */
     getAddressByZipCode(zipcode) {
      this.isLoadingZipCode = true
      try {        
        this.$helper.util.viacep(zipcode).then((response) => {
          this.s_seller.address = response.data.logradouro
          this.s_seller.district = response.data.bairro
          this.s_seller.city = response.data.localidade
        }).catch((error) => {
          console.log(error)
        })
      } finally {
        this.isLoadingZipCode = false
      }      
    },

    /**
     * Validar CPF/CNPJ (Vuelidate)
     * @param {string} document 
     * @returns boolean
     */
     validationForCpfCnpj(document) {
      return this.$helper.util.cpfCnpjIsValid(document)
    },
  }    
}