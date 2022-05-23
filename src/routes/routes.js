import Home from "../views/Home.vue"
import CustomerRoute from "./customer/customer-route"
import SellerRoute from "./seller/seller-route"
import ProductRoute from "./product/product-route"
import OpportunityRoute from "./opportunity/opportunity-route"

// Home
const HomeRoute = [ { path: '/', name: 'home', component: Home } ]

// Demais Rotas
const routes = [
  ...HomeRoute,
  ...CustomerRoute,
  ...SellerRoute,
  ...ProductRoute,
  ...OpportunityRoute,
]
export default routes