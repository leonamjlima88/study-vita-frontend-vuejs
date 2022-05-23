import { customerStore } from '@/store'
import useVuelidate from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'

export default {
  name: "CustomerCreate",
  components:{
  },
  setup () {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      isLoading: false,
      isLoadingZipCode: false,
      customer: {
        id: null,
        business_name: null,
        alias_name: null,
        ein: null,
        state_registration: null,
        is_icms_taxpayer: null,
        municipal_registration: null,
        note: null,
        internet_page: null,
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
      customer: {
        business_name: { required },
        alias_name: { required },  
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
      this.$refs.business_name.focus()
    },
    
    /**
     * Salvar e fechar formulário
     */
    async submitAndClose()
    {      
      // Salvar Registro
      await this.storeCustomer(this.customer)        

      // Ir para página de Listagem
      this.$router.push({
        name: 'customer.list',
        params: {}
      })
    },

    /**
     * Incluir Novo Registro
     * @param {customer} customer 
     */
    async storeCustomer(customer){
      try {
        this.isLoading = true
        await customerStore().store(customer)
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
          this.customer.address = response.data.logradouro
          this.customer.district = response.data.bairro
          this.customer.city = response.data.localidade
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