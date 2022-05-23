<template>
  <div class="container p-0">
    <div class="row">
      <div class="col-md-12">
        <!-- INICIO DO card -->
        <div class="card">
          <div class="card-header p-2">
            <h4>
              Editar Oportunidade
              <!-- Voltar -->
              <a @click="$router.back()" class="btn btn-danger ms-2 float-end">
                <fa icon="rotate-left" class="mx-1"></fa>
                Voltar
              </a>
            </h4>
            <div class="card-body p-2">
              <!-- INICIO DO form -->
              <form v-if="!this.isLoading && s_opportunity">
                <div class="row">
                  <!-- INICIO DO CAMPO customer_id -->
                  <div class="form-group mb-3 col-md-4">
                    <label>* Cliente</label>
                    <custom-select
                      v-model="v$.s_opportunity.customer_id.$model"
                      :items="s_customerList"
                      label="business_name"
                      placeholder="Selecione o cliente"
                    />
                    <div
                      v-if="v$.s_opportunity.customer_id.$errors.length"
                      class="alert alert-danger d-flex align-items-center mt-2"
                      role="alert"
                    >
                      <div>* Campo obrigatório!</div>
                    </div>
                  </div>
                  <!-- FIM DO CAMPO customer_id -->

                  <!-- INICIO DO CAMPO seller_id -->
                  <div class="form-group mb-3 col-md-4">
                    <label>* Vendedor</label>
                    <custom-select
                      v-model="v$.s_opportunity.seller_id.$model"
                      :items="s_sellerList"
                      label="name"
                      placeholder="Selecione o vendedor"
                    />
                    <div
                      v-if="v$.s_opportunity.seller_id.$errors.length"
                      class="alert alert-danger d-flex align-items-center mt-2"
                      role="alert"
                    >
                      <div>* Campo obrigatório!</div>
                    </div>
                  </div>
                  <!-- FIM DO CAMPO seller_id -->

                  <!-- INICIO DO CAMPO status -->
                  <div class="form-group mb-3 col-md-2">
                    <label>* Status</label>
                    <custom-select
                      v-model="v$.s_opportunity.status.$model"
                      :items="statusList"
                      label="name"
                      placeholder="Selecione o status"
                    />
                    <div v-if="v$.s_opportunity.status.$errors.length" class="alert alert-danger d-flex align-items-center mt-2" role="alert">
                      <div>* Campo obrigatório!</div>
                    </div>
                  </div>
                  <!-- FIM DO CAMPO status -->

                  <!-- INICIO DO CAMPO approval -->
                  <div class="form-group mb-3 col-md-2">
                    <label>* Status</label>
                    <custom-select
                      v-model="v$.s_opportunity.approval.$model"
                      :items="approvalList"
                      label="name"
                      placeholder="Selecione a aprovação"
                    />
                    <div
                      v-if="v$.s_opportunity.approval.$errors.length"
                      class="alert alert-danger d-flex align-items-center mt-2"
                      role="alert"
                    >
                      <div>* Campo obrigatório!</div>
                    </div>
                  </div>
                  <!-- FIM DO CAMPO approval -->
                </div>

                <div class="card mb-3">
                  <div class="card-header">Lançamento de Produtos</div>
                  <div class="card-body">
                    <div class="row">
                      <!-- INICIO DO CAMPO DE LANÇAMENTO DO PRODUTO - productSelected.product_id -->
                      <div class="form-group mb-3 col-md-6">
                        <label>Pesquisa de Produtos</label>
                        <custom-select
                          v-model="productSelected.product_id"
                          :items="s_productList"
                          label="name"
                          placeholder="Selecione o produto"
                        />
                      </div>
                      <!-- FIM DO CAMPO DE LANÇAMENTO DO PRODUTO - productSelected.product_id -->

                      <!-- INICIO DO CAMPO DE LANÇAMENTO DO PRODUTO - productSelected.sale_quantity -->
                      <div class="form-group mb-3 col-md-2">
                        <label>Quantidade</label>
                        <input
                          v-model="productSelected.sale_quantity"
                          @blur="productSelected.sale_quantity = $helper.util.formatNumber($event.target.value)"
                          @keypress="$helper.util.keyPressJustDecimal($event)"
                          type="text"
                          class="form-control"
                        />
                      </div>
                      <!-- FIM DO CAMPO DE LANÇAMENTO DO PRODUTO - productSelected.sale_quantity -->

                      <!-- INICIO DO CAMPO DE LANÇAMENTO DO PRODUTO - productSelected.sale_price -->
                      <div class="form-group mb-3 col-md-2">
                        <label>Preço de Venda</label>
                        <input
                          v-model="productSelected.sale_price"
                          @blur="productSelected.sale_price = $helper.util.formatNumber($event.target.value)"
                          @keypress="$helper.util.keyPressJustDecimal($event)"
                          type="text"
                          class="form-control"
                        />
                      </div>
                      <!-- FIM DO CAMPO DE LANÇAMENTO DO PRODUTO - productSelected.sale_price -->

                      <!-- OPPORTUNITY_PRODUCT_ADD BUTTON -->
                      <div class="form-group mb-3 col-md-2 mt-md-4">
                        <button
                          @click.prevent="opportunityProductAdd()"
                          class="btn btn-primary float-start"
                          v-if="
                            productSelected.product_id &&
                            productSelected.sale_quantity &&
                            productSelected.sale_price &&
                            $helper.util.strToNum(productSelected.sale_quantity) > 0
                          "
                        >
                          <fa icon="circle-plus"></fa>
                          Incluir Produto
                        </button>
                        <button v-else class="btn btn-primary disabled float-start">
                          <fa icon="circle-plus"></fa>
                          Incluir Produto
                        </button>
                      </div>
                    </div>

                    <!-- INICIO DA table opportunity_product -->
                    <table v-if="s_opportunity.opportunity_product" class="table table-bordered table-striped">
                      <thead>
                        <tr>
                          <th class="col-sm-6 col-lg-9">Produto</th>
                          <th class="col-sm-2 col-lg-2 text-end">Qde</th>
                          <th class="col-sm-2 col-lg-2 text-end">Preço</th>
                          <th class="col-sm-2 col-lg-2 text-end">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in s_opportunity.opportunity_product" :key="item.product_id">
                          <td>
                            {{ item.product.name }}
                            <a @click="opportunityProductDelete(item.product_id)" class="btn btn-button btn btn-outline-danger btn-sm mx-1">
                              <fa icon="trash-can"></fa>
                            </a>
                          </td>
                          <td class="text-end">{{ this.$helper.util.formatNumber(item.sale_quantity) }}</td>
                          <td class="text-end">{{ this.$helper.util.formatNumber(item.sale_price) }}</td>
                          <td v-if="this.$helper.util.strToNum(item.sale_amount) > 0" class="text-end">
                            {{ this.$helper.util.formatNumber(item.sale_amount) }}
                          </td>
                          <td v-else class="text-center"><fa icon="gift"></fa></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="card-footer">
                    <div class="row">
                      <div class="col-6 text-start">Volumes: {{ getOpportunityProductSum.saleQuantity }}</div>
                      <div class="col-6 text-end">Total: R$ {{ getOpportunityProductSum.saleAmout }}</div>
                    </div>
                  </div>
                </div>

                <!-- SUBMIT BUTTON -->
                <div class="form-group mb-3">
                  <button :disabled="v$.s_opportunity.$invalid" @click.prevent="submitAndClose()" class="btn btn-primary">
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

<script src="./OpportunityEdit.js"></script>
<style src="./OpportunityEdit.css" scoped></style>
