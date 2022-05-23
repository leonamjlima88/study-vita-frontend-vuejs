<template>
  <div class="container p-0">
    <div class="row">
      <div class="col-md-12">
        <!-- INICIO DO card -->
        <div class="card">
          <div class="card-header">
            <h4>
              Oportunidades
              <button @click="openOpportunityCreateRoute()" class="btn btn-success float-end">
                <fa icon="circle-plus" class="mx-1"></fa>
                Incluir
              </button>
            </h4>
          </div>

          <!-- SIMULAÇÃO DE SKELETON -->
          <div v-if="isLoading" class="text-center m-5">
            <div class="spinner-border text-info" role="status"></div>
            <h4 class="text-info">Carregando...</h4>
          </div>

          <div class="card m-1" v-if="!isLoading">
            <div class="card-header">
              <h5>Filtros</h5>
            </div>
            <div class="card-body">
              <div class="row">
                <!-- PESQUISA CUSTOMIZADA -->
                <div class="col-md-4 mb-2">
                  <label>Pesquisa</label>
                  <input
                    v-model="filterConfig.customSearch"
                    @keyup.enter="getOpportunityList(true)"
                    type="search"
                    class="form-control"
                    placeholder="Pesquise por Cliente e/ou Vendedor"
                  />
                </div>

                <!-- PESQUISA DATA INICIAL -->
                <div class="col-md-2 mb-2">
                  <label>Data de Cad. Inicial</label>
                  <input v-model="filterConfig.initialCreatedAt" type="date" class="form-control" />
                </div>

                <!-- PESQUISA DATA FINAL -->
                <div class="col-md-2 mb-2">
                  <label>Data de Cad. Final</label>
                  <input v-model="filterConfig.finalCreatedAt" type="date" class="form-control" />
                </div>

                <!-- PESQUISA POR VENDEDOR -->
                <div class="col-md-4 mb-2">
                  <label>Filtrar por Vendedor</label>
                  <custom-select v-model="filterConfig.sellerId" :items="s_sellerList" label="name" placeholder="Pesquise por vendedor" />
                </div>
              </div>
              <div class="row">
                <!-- BOTAO PESQUISAR -->
                <div class="col-md-12">
                  <button @click="getOpportunityList(true)" class="btn btn-button btn-primary float-end ms-3">Pesquisar</button>
                  <button @click="getOpportunityList(true, true)" class="btn btn-button btn-secondary float-end ms-3">Limpar</button>
                </div>                
              </div>
            </div>

            <div class="card-body">
              <!-- INICIO DA table -->
              <table class="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th class="col-sm-3 col-lg-3">Cliente</th>
                    <th class="col-sm-3 col-lg-3">Vendedor</th>
                    <th class="col-sm-3 col-lg-3 text-center">Status</th>
                    <th class="col-sm-3 col-lg-3 text-center">Ação</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="currentOpportunity in s_opportunityList.data" :key="currentOpportunity.id">
                    <td>{{ currentOpportunity.customer_alias_name }}</td>
                    <td>{{ currentOpportunity.seller_name }}</td>

                    <td v-if="currentOpportunity.status === 0" class="text-center">Normal</td>
                    <td v-if="currentOpportunity.status === 1" class="text-center">Perdida</td>
                    <td v-if="currentOpportunity.status === 2" class="text-center">Expirada</td>
                    <td class="text-center">
                      <div class="row"></div>
                      <a
                        @click="openOpportunityEditRoute(currentOpportunity.id)"
                        class="btn btn-button btn btn-outline-primary btn-sm mx-1"
                      >
                        <fa icon="pen"></fa>
                      </a>
                      <a @click="destroyOpportunity(currentOpportunity.id)" class="btn btn-button btn btn-outline-danger btn-sm mx-1">
                        <fa icon="trash-can"></fa>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
              <!-- FIM DA table -->
            </div>

            <!-- INICIO DA paginação -->
            <nav aria-label="Page navigation example">
              <ul class="pagination justify-content-center">
                <!-- Primeira página -->
                <li :class="pageConfig.current != 1 && s_opportunityList.last_page > 0 ? 'page-item' : 'page-item disabled'">
                  <a class="page-link" @click="changePage('first')"><fa icon="angles-left" class="mx-1"></fa></a>
                </li>
                <!-- Página Anterior -->
                <li :class="pageConfig.current > 1 ? 'page-item' : 'page-item disabled'">
                  <a class="page-link" @click="changePage('prior')">Anterior</a>
                </li>
                <!-- Página Atual -->
                <li class="page-item disabled">
                  <a class="page-link" href="#">{{ pageConfig.current }}</a>
                </li>
                <!-- Próxima página -->
                <li :class="pageConfig.current != s_opportunityList.last_page ? 'page-item' : 'page-item disabled'">
                  <a class="page-link" @click="changePage('next')">Próxima</a>
                </li>
                <!-- Última página -->
                <li :class="pageConfig.current != s_opportunityList.last_page ? 'page-item' : 'page-item disabled'">
                  <a class="page-link" @click="changePage('last')"><fa icon="angles-right" class="mx-1"></fa></a>
                </li>
              </ul>
            </nav>
            <!-- FIM DA paginação -->
          </div>
          <!-- FIM DO card -->
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./OpportunityList.js"></script>
<style src="./OpportunityList.css" scoped></style>
