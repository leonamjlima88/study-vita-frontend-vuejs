import SellerCreate from "@/views/seller/seller-create/SellerCreate.vue"
import SellerEdit from "@/views/seller/seller-edit/SellerEdit.vue"
import SellerList from "@/views/seller/seller-list/SellerList.vue"

// Seller Routes
const SellerRoute = [
  {
    path: '/seller-create',
    name: 'seller.create',
    component: SellerCreate
  },
  {
    path: '/seller-edit/:id',
    name: 'seller.edit',
    component: SellerEdit,
  },
  {
    path: '/seller-list',
    name: 'seller.list',
    component: SellerList,
  },
]
export default SellerRoute