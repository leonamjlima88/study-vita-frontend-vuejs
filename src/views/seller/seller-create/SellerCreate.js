import { sellerStore } from '@/store'
import useVuelidate from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'

export default {
  name: "SellerCreate",
  components:{
  },
  setup () {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      isLoading: false,
      isLoadingZipCode: false,
      seller: {
        id: null,
        name: null,
        ein: null,
        note: null,
        zipcode: null,
        address: null,
        address_number: null,
        complement: null,
        district: null,
        city: null,
        reference_point: null,
        phone: null,
        email: null,
      },
    }
  },
  validations () {
    return {
      seller: {
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
      await this.storeSeller(this.seller)        

      // Ir para página de Listagem
      this.$router.push({
        name: 'seller.list',
        params: {}
      })
    },

    /**
     * Incluir Novo Registro
     * @param {seller} seller 
     */
    async storeSeller(seller){
      try {
        this.isLoading = true
        await sellerStore().store(seller)
        this.$helper.swal.savedWithSuccess()
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
          this.seller.address = response.data.logradouro
          this.seller.district = response.data.bairro
          this.seller.city = response.data.localidade
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