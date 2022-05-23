<template>
  <div class="container p-0">
    <div class="row">
      <div class="col-md-12">
        <!-- INICIO DO card -->
        <div class="card">
          <div class="card-header p-2">
            <h4>
              Editar Produto
              <!-- Voltar -->
              <a @click="$router.back()" class="btn btn-danger ms-2 float-end">
                <fa icon="rotate-left" class="mx-1"></fa>
                Voltar
              </a>
            </h4>
            <div class="card-body p-2">
              <!-- INICIO DO form -->
              <form v-if="s_product">
                <!-- INICIO DO CAMPO name -->
                <div class="form-group mb-3">
                  <label>* Nome</label>
                  <input
                    v-model="v$.s_product.name.$model"
                    type="text"
                    class="form-control"
                    ref="name"
                  />
                  <div
                    v-if="v$.s_product.name.$errors.length"
                    class="alert alert-danger d-flex align-items-center mt-2"
                    role="alert"
                  >
                    <div>* Campo obrigatório!</div>
                  </div>
                </div>
                <!-- FIM DO CAMPO name -->

                <!-- INICIO DO CAMPO reference_code -->
                <div class="form-group mb-3">
                  <label>Código de Referência</label>
                  <input
                    v-model="s_product.reference_code"
                    type="text"
                    class="form-control"
                  />                  
                </div>
                <!-- FIM DO CAMPO reference_code -->

                <!-- INICIO DO CAMPO ean_code -->
                <div class="form-group mb-3">
                  <label>Código de barras</label>
                  <input
                    v-model="s_product.ean_code"
                    @keypress="$helper.util.keyPressJustNumbers($event)"
                    type="text"
                    class="form-control"
                  />                  
                </div>
                <!-- FIM DO CAMPO ean_code -->

                <!-- INICIO DO CAMPO cost_price -->
                <div class="form-group mb-3">
                  <label>Preço de Custo</label>
                  <input
                    v-model="s_product.cost_price"
                    @blur="s_product.cost_price = $helper.util.formatNumber($event.target.value)"
                    @keypress="$helper.util.keyPressJustDecimal($event)"
                    type="text"
                    class="form-control"
                  />                  
                </div>
                <!-- FIM DO CAMPO cost_price -->

                <!-- INICIO DO CAMPO sale_price -->
                <div class="form-group mb-3">
                  <label>Preço de Venda</label>
                  <input
                    v-model="s_product.sale_price"
                    @blur="s_product.sale_price = $helper.util.formatNumber($event.target.value)"
                    @keypress="$helper.util.keyPressJustDecimal($event)"
                    type="text"
                    class="form-control"
                  />                  
                </div>
                <!-- FIM DO CAMPO sale_price -->

                <!-- INICIO DO CAMPO minimum_quantity -->
                <div class="form-group mb-3">
                  <label>Quantidade Mínima</label>
                  <input
                    v-model="s_product.minimum_quantity"
                    @blur="s_product.minimum_quantity = $helper.util.formatNumber($event.target.value)"
                    @keypress="$helper.util.keyPressJustDecimal($event)"
                    type="text"
                    class="form-control"
                  />                  
                </div>
                <!-- FIM DO CAMPO minimum_quantity -->

                <!-- INICIO DO CAMPO current_quantity -->
                <div class="form-group mb-3">
                  <label>Quantidade em Estoque</label>
                  <input
                    v-model="s_product.current_quantity"
                    @blur="s_product.current_quantity = $helper.util.formatNumber($event.target.value)"
                    @keypress="$helper.util.keyPressJustDecimal($event)"
                    type="text"
                    class="form-control"
                  />                  
                </div>
                <!-- FIM DO CAMPO current_quantity -->

                <!-- INICIO DO CAMPO note -->
                <div class="form-group mb-3">
                  <label>Observações</label>
                  <textarea v-model="s_product.note" type="text" class="form-control" rows="2" />
                </div>
                <!-- FIM DO CAMPO note -->

                <!-- INICIO DO CAMPO is_discontinued -->
                <div class="form-group mb-3">
                  <div class="form-check form-switch">
                    <input
                      v-model="s_product.is_discontinued"
                      class="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="flexSwitchCheckDefault"
                    />
                    <label class="form-check-label" for="flexSwitchCheckDefault">Mercadoria Descontinuada</label>
                  </div>
                </div>
                <!-- FIM DO CAMPO is_discontinued -->
              
                <!-- SUBMIT BUTTON -->
                <div class="form-group mb-3">
                  <button :disabled="v$.s_product.$invalid" @click.prevent="submitAndClose()" class="btn btn-primary">
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

<script src="./ProductEdit.js"></script>
<style src="./ProductEdit.css" scoped></style>