// import store from '../store/store'
import Home from '../components/Home'
import ShoppingCart from '../components/ShoppingCart'
import ProductDetail from '../components/ProducDetail'
import Categories from '../components/Categories.vue'
import CategoryDetail from '../components/CategoryDetail.vue'
import SignUp from '../components/SignUp.vue'
import Login from '../components/Login.vue'
// import store from '../store/store'

const routes = [
  {path:'/', component: Home, name:'home'},
  {path: '/cart', component: ShoppingCart, name: 'cart'},
  {path: '/signup', component: SignUp, name: 'signup'},
  {path: '/login', component: Login, name: 'login'},
  {path: '/product/:bookId/detail', component: ProductDetail, name: 'product.detail'},
  {path: '/categories', component: Categories, name: 'book.categories'},
  {path: '/category/:categoryId/detail', component: CategoryDetail, name: 'category.detail'}
 //{path: '/checkout', component: CheckOut, name: 'checkout'}

]

export default routes