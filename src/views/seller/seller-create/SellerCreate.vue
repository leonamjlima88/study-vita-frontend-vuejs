<template>
  <div class="container p-0">
    <div class="row">
      <div class="col-md-12">
        <!-- INICIO DO card -->
        <div class="card">
          <div class="card-header p-2">
            <h4>
              Novo Vendedor
              <a @click="$router.back()" class="btn btn-danger float-end">
                <fa icon="rotate-left" class="mx-1"></fa>
                Voltar
              </a>
            </h4>
            <div class="card-body">
              <!-- INICIO DO form -->
              <form>
                <div class="row">
                  <!-- INICIO DO CAMPO name -->
                  <div class="form-group mb-3 col-md-6">
                    <label>* Nome</label>
                    <input v-model="v$.seller.name.$model" type="text" class="form-control" ref="name" />
                    <div v-if="v$.seller.name.$errors.length" class="alert alert-danger d-flex align-items-center mt-2" role="alert">
                      <div>* Campo obrigatório!</div>
                    </div>
                  </div>
                  <!-- FIM DO CAMPO name -->

                  <!-- INICIO DO CAMPO ein -->
                  <div class="form-group mb-3 col-md-6">
                    <label>* CPF/CNPJ</label>
                    <input
                      v-model="v$.seller.ein.$model"
                      v-on:blur="seller.ein = $helper.util.formatCpfCnpj($event.target.value)"
                      maxlength="18"
                      type="text"
                      class="form-control"
                    />
                    <div v-if="v$.seller.ein.$errors.length" class="alert alert-danger d-flex align-items-center mt-2" role="alert">
                      <div>CPF/CNPJ Inválido!</div>
                    </div>
                  </div>
                  <!-- FIM DO CAMPO ein -->
                </div>

                <!-- INICIO DO CAMPO note -->
                <div class="form-group mb-3">
                  <label>Observações</label>
                  <textarea v-model="seller.note" type="text" class="form-control" rows="2" />
                </div>
                <!-- FIM DO CAMPO note -->

                <!-- INICIO DO CAMPO zipcode -->
                <div class="form-group mb-3 col-md-2">
                  <label>CEP - </label><span class="h6 text-muted small ms-1">Pesquisa automática</span>
                  <input
                    v-model="seller.zipcode"
                    type="text"
                    class="form-control"
                    v-on:blur="getAddressByZipCode($event.target.value)"
                    @keypress="$helper.util.keyPressJustNumbers($event)"
                  />
                </div>
                <!-- FIM DO CAMPO zipcode -->

                <!-- APARECE ENQUANTO CARREGA O CEP -->
                <div v-if="isLoadingZipCode" class="text-center m-5">
                  <div class="spinner-border text-info" role="status"></div>
                  <h4 class="text-info">Carregando...</h4>
                </div>

                <div v-if="!isLoadingZipCode">
                  <div class="row">
                    <!-- INICIO DO CAMPO address -->
                    <div class="form-group mb-3 col-md-6">
                      <label>Endereço</label>
                      <input v-model="seller.address" type="text" class="form-control" />
                    </div>
                    <!-- FIM DO CAMPO address -->

                    <!-- INICIO DO CAMPO address_number -->
                    <div class="form-group mb-3 col-md-2">
                      <label>Número</label>
                      <input
                        v-model="seller.address_number"
                        type="text"
                        class="form-control"
                        @keypress="$helper.util.keyPressJustNumbers($event)"
                      />
                    </div>
                    <!-- FIM DO CAMPO address_number -->

                    <!-- INICIO DO CAMPO complement -->
                    <div class="form-group mb-3 col-md-4">
                      <label>Complemento</label>
                      <input v-model="seller.complement" type="text" class="form-control" />
                    </div>
                    <!-- FIM DO CAMPO complement -->
                  </div>

                  <div class="row">
                    <!-- INICIO DO CAMPO district -->
                    <div class="form-group mb-3 col-md-4">
                      <label>Bairro</label>
                      <input v-model="seller.district" type="text" class="form-control" />
                    </div>
                    <!-- FIM DO CAMPO district -->

                    <!-- INICIO DO CAMPO city -->
                    <div class="form-group mb-3 col-md-4">
                      <label>Cidade</label>
                      <input v-model="seller.city" type="text" class="form-control" />
                    </div>
                    <!-- FIM DO CAMPO city -->

                    <!-- INICIO DO CAMPO reference_point -->
                    <div class="form-group mb-3 col-md-4">
                      <label>Ponto de Referência</label>
                      <input v-model="seller.reference_point" type="text" class="form-control" />
                    </div>
                    <!-- FIM DO CAMPO reference_point -->
                  </div>
                </div>

                <div class="row">
                  <!-- INICIO DO CAMPO phone -->
                  <div class="form-group mb-3 col-md-2">
                    <label>Telefone</label>
                    <input v-model="seller.phone" type="text" class="form-control" />
                  </div>
                  <!-- FIM DO CAMPO phone -->

                  <!-- INICIO DO CAMPO email -->
                  <div class="form-group mb-3 col-md-10">
                    <label>E-mail</label>
                    <input v-model="v$.seller.email.$model" type="text" class="form-control" />
                    <div v-if="v$.seller.email.$errors.length" class="alert alert-danger d-flex align-items-center mt-2" role="alert">
                      <div>E-mail inválido!</div>
                    </div>
                  </div>
                  <!-- FIM DO CAMPO email -->
                </div>

                <!-- SUBMIT BUTTON -->
                <div class="form-group mb-3">
                  <button :disabled="v$.seller.$invalid" @click.prevent="submitAndClose()" class="btn btn-primary">
                    <div v-if="isLoading" class="spinner-border spinner-border-sm me-1" role="status"></div>
                    <fa v-else icon="floppy-disk" class="mx-1"></fa>
                    Salvar
                  </button>
                </div>
              </form>
              <!-- FIM DO form -->
            </div>
          </div>
        </div>
        <!-- FIM DO card -->
      </div>
    </div>
  </div>
</template>

<script src="./SellerCreate.js"></script>
<style src="./SellerCreate.css" scoped></style>
