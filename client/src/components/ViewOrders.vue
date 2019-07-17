<template>
    <div class="container">
        <section>
            <h2>My Orders: </h2>
            <div class="columns">
                <div class="column" v-if="orders">
                    <b-table :data="ordersData" :columns="columns">
                    
                        <template slot-scope="props">
                            <b-table-column field="id" label="Order Number" sortable>
                                {{ props.row.id }}
                            </b-table-column>
                             <b-table-column field="order_date" label="Order Date" sortable>
                                {{ props.row.order_date | date }}
                            </b-table-column>
                             <b-table-column field="status" label="Status">
                                {{ props.row.status }}
                            </b-table-column>
                             <b-table-column field="status" label="Status" >
                                <router-link :to="{name: 'view.order.products', params:{orderId:  props.row.id }, query: {orderId:  props.row.id, customerId: customerId }}">View Details</router-link>
                            </b-table-column>
                        </template>    
                    </b-table>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
import OrderService from '../services/OrderService'
import moment from 'moment'
export default {
    created(){
        this.getOrders();
    },
    data(){
        return {
            orders: [],
            columns: [
                { field: 'id', label: 'Order Number' },
                { field: 'order_date', label: 'Order Date'},
                { field: 'status', label: 'Status' },
            ],
        }
    },
    methods: {
       async getOrders(){
           console.log(`Getting Orders....`);
           const customerID = this.$route.query.customerId;
           console.log(`Customer ID: ${customerID}`);
           const orders = (await OrderService.getOrders(customerID)).data.data;
           console.log(`Orders Returned: ${JSON.stringify(orders)}`);
           if(orders.length > 0){
               this.orders = orders
           }
       }  
    },
    computed:{
        ordersData(){
            return this.orders;
        },
        customerId(){
            return this.$route.query.customerId;
        }
    },
     filters: {
        date(date){
            return moment(date).format('MMMM Do YYYY')
        },
        
    }
}
</script>
<style scoped>
h2{
    font-size: 2.3em;
}
</style>
