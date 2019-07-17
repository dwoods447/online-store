import Api from './Api'

export default{
    orderProduct(order){
        return Api.post(`/orders/order`, order)
    },
    getOrders(customerId){
        return Api.get(`/orders/customer/${customerId}`)
    },
    getOrderProductsByOrderId(orderId){
        return Api.get(`/orders/order/${orderId}`);
    },
    getOrderInformationById(orderId){
        return Api.get(`/orders/order/ordernumber/${orderId}`);
    }
}