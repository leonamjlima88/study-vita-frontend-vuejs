import NProgress from 'nprogress'
import useVuelidate from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
import { customerStore } from '@/store'

export default {
  name: "CustomerEdit",
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
    s_customer: () => customerStore().getItem,
  },
  validations () {
    return {
      s_customer: {
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
      try {
        NProgress.start()
        this.isLoading = true
        this.getCustomerById(this.$route.params.id)
      } finally {
        NProgress.done()
        this.isLoading = false
      }
      window.scrollTo(0, 0)
      this.$refs.business_name.focus()
    },

    /**
     * Localizar Registro por Id
     */
     getCustomerById(id){
      try {
        customerStore().show(id)
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
      await this.updateCustomer(this.s_customer)         

      // Ir para página de Listagem
      this.$router.push({
        name: 'customer.list',
        params: {}
      })
    },

    /**
     * Atualizar Registro
     * @param {customer} customer 
     */
     async updateCustomer(customer){
      try {
        this.isLoading = true
        await customerStore().update(customer.id, customer)
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
          this.s_customer.address = response.data.logradouro
          this.s_customer.district = response.data.bairro
          this.s_customer.city = response.data.localidade
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