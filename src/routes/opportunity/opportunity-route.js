import OpportunityCreate from "@/views/opportunity/opportunity-create/OpportunityCreate.vue"
import OpportunityEdit from "@/views/opportunity/opportunity-edit/OpportunityEdit.vue"
import OpportunityList from "@/views/opportunity/opportunity-list/OpportunityList.vue"

// Opportunity Routes
const OpportunityRoute = [
  {
    path: '/opportunity-create',
    name: 'opportunity.create',
    component: OpportunityCreate
  },
  {
    path: '/opportunity-edit/:id',
    name: 'opportunity.edit',
    component: OpportunityEdit,
  },
  {
    path: '/opportunity-list',
    name: 'opportunity.list',
    component: OpportunityList,
  },
]
export default OpportunityRoute