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

                <!-- <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link">
                    More
                    </a>

                    <div class="navbar-dropdown">
                    <a class="navbar-item">
                        About
                    </a>
                    <a class="navbar-item">
                        Jobs
                    </a>
                    <a class="navbar-item">
                        Contact
                    </a>
                    <hr class="navbar-divider">
                    <a class="navbar-item">
                        Report an issue
                    </a>
                    </div>
                </div> -->
                </div>

                <div class="navbar-end">
                <div class="navbar-item">
                    <div class="buttons">
                    <a class="button is-primary">
                        <strong>Sign up</strong>
                    </a>
                    <a class="button is-light">
                        Log in
                    </a>
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