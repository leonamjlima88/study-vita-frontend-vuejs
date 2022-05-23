import CustomerCreate from "@/views/customer/customer-create/CustomerCreate.vue"
import CustomerEdit from "@/views/customer/customer-edit/CustomerEdit.vue"
import CustomerList from "@/views/customer/customer-list/CustomerList.vue"

// Customer Routes
const CustomerRoute = [
  {
    path: '/customer-create',
    name: 'customer.create',
    component: CustomerCreate
  },
  {
    path: '/customer-edit/:id',
    name: 'customer.edit',
    component: CustomerEdit,
  },
  {
    path: '/customer-list',
    name: 'customer.list',
    component: CustomerList,
  },
]
export default CustomerRoute