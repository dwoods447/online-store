<template>
    <div class="container">
        <section>
            <h2>My Orders: </h2>
            <div class="columns">
                <div class="column" v-if="orders">
                    <b-table :data="ordersData" :columns="columns"></b-table>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
import OrderService from '../services/OrderService'
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
        }
    }
}
</script>