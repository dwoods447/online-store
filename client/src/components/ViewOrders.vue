<template>
    <div class="container">
        <section>
            <h2>My Orders: </h2>
            <div class="columns">
                <div class="column" v-if="orders">
                    <div class="b-table">
                        <table class="table has-mobile-cards">
                        <thead>
                            <tr>
                                
                                    <th v-for="column in columns" :key="column.field" class="is-sortable"> 
                                        <div class="th-wrap">{{ column.label }}</div>
                                    </th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="order in ordersData" :key="order.id">
                                <td>{{ order.id }}</td>
                                <td>{{ order.order_date | date }}</td>
                                <td>{{ order.status }}</td>
                                <td><router-link :to="{name: 'view.order.products', params:{orderId:  order.id }, query: {orderId:  order.id, customerId: customerId }}">View Details</router-link></td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
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
           const customerID = this.$route.query.customerId;
           const orders = (await OrderService.getOrders(customerID)).data.data;
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
