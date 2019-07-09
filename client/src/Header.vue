<template>
    <div>
        <nav class="navbar" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
             <router-link :to="{name:'home'}" class="navbar-item"><img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"></router-link>
                <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarBasicExample" class="navbar-menu">
                <div class="navbar-start">
                 <router-link :to="{name: 'home'}" class="navbar-item">Home</router-link>
                 <router-link :to="{name: 'book.categories'}" class="navbar-item">Browse Categories</router-link>
                </div>
                <div class="navbar-end">
                <div class="navbar-item">
                    <div class="buttons">
                    <router-link :to="{name: 'signup'}" class="button is-primary">Sign up</router-link>
                    <router-link :to="{name: 'login'}" class="button is-light">Login</router-link>
                    <router-link :to="{name:'cart'}" class="button is-light"><i class="fas fa-shopping-cart"></i><span style="color:red; padding: 0 5px; vertical-align: top;">{{ this.$store.state.shoppingCartCount }}</span></router-link>                  
                    </div>
                </div>
                </div>
            </div>
      </nav>
    </div>
</template>
<script>
export default {
    data(){
        return {

        }
    }
}
</script>