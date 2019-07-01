// import store from '../store/store'
import Home from '../components/Home'
import ShoppingCart from '../components/ShoppingCart'
import ProductDetail from '../components/ProducDetail'

const routes = [
  {path:'/', component: Home, name:'home'},
  {path: '/cart', component: ShoppingCart, name: 'cart'},
  {path: '/product/:productId/detail', component: ProductDetail, name: 'product.detail'},
 // {path: '/checkout', component: CheckOut, name: 'checkout'}

]

export default routes