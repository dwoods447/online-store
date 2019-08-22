<template>
    <div>
        <nav class="navbar" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
             <router-link :to="{name:'home'}" class="navbar-item"><h2><strong>Online Book-Store</strong></h2></router-link>
                <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample"  @click="showMenu = !showMenu"
          :class="{ 'is-active' : showMenu }">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarBasicExample" class="navbar-menu" :class="{ 'is-active' : showMenu }">
                <div class="navbar-start">
                 <router-link :to="{name: 'home'}" class="navbar-item">Home</router-link>
                 <router-link :to="{name: 'book.categories'}" class="navbar-item">Browse Categories</router-link>
                </div>
                <div class="navbar-end">
                <div class="navbar-item">
                    <div class="buttons">
                    <router-link :to="{name: 'signup'}" class="button is-primary" v-if="!isLoggedIn">Sign up</router-link>
                    <router-link :to="{name: 'login'}" class="button is-light" v-if="!isLoggedIn">Login</router-link>
                    <span v-if="isLoggedIn === true && customer !== null" style="padding: 1.2em;"><span>Welcome, </span>&nbsp;<span><strong>{{ customer.first_name }}</strong></span>&nbsp;<span><strong>{{ customer.last_name }}</strong></span>&nbsp;&nbsp;</span>
                     <b-dropdown aria-role="list" v-if="isLoggedIn === true">
                        <button slot="trigger" class="button is-light">
                            <span style="margin: 0 auto; font-size: 1.3em;"><i class="far fa-user-circle"></i></span>
                        </button>
                        <b-dropdown-item aria-role="listitem" v-if="customer !== null"><router-link :to="{name: 'view.orders', params: {customerId: customer.id}, query: {customerId: customer.id}}"> View My Orders </router-link></b-dropdown-item>
                    </b-dropdown>
                    &nbsp;&nbsp;
                    <button @click="logout" class="button is-light" v-if="isLoggedIn === true">Logout</button>
                    <router-link :to="{name:'cart'}" class="button is-light"><i class="fas fa-shopping-cart"></i><span style="color:red; padding: 0 5px; vertical-align: top;">{{ count }}</span></router-link>                  
                    </div>
                </div>
                </div>
            </div>
      </nav>
    </div>
</template>
<script>
import AuthenticationService from './services/AuthenticationService'
import { mapState } from  'vuex'
import { mapGetters } from  'vuex'
import { mapActions} from  'vuex'
export default {
    data(){
        return {
            showMenu: false,
        }
    },
    methods: {
    async logout(){
            this.$store.dispatch('cart/clearAllInCart');
            this.$store.dispatch('setLogOut');
            this.$store.dispatch('clearJWTtokenAction');
            AuthenticationService.logout();
            this.$router.push({name: 'home'});
           
     },
    },
    computed:{
        // isLoggedIn(){
        //     return this.$store.getters.isLoggedIn
        // },
         ...mapGetters({
            isLoggedIn: 'isLoggedIn',
            customer : 'getCustomer',
            count: 'cart/getShoppingCartCount'
        }),
         ...mapState([
           'cart',
        ]),
        ...mapActions([
             'setCurrentLoggedInCustomer',
             'cart/clearAllInCart'
        ])
    }
}
</script>