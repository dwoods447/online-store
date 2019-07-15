<template>
    <div class="container">
        <section style="height: 100vh; padding: 0; display: flex; flex-wrap: nowrap; justify-content: center; align-items: center;">
            <div class="columns">
                <div class="column is-12">
                    <h2 style="text-align:center; font-size: 2em;">Login</h2>
                     <div class="block" style="margin: 0 auto; width: 30%;">
                        
                    </div>
                    <div class="card" style="width: 500px; padding: 1em;">
                        <form action="" >
                             <b-field label="Email">
                                <b-input v-model="formData.email" v-validate="{required: true}" name="email"></b-input>
                            </b-field>
                             <span>{{ errors.first('email') }}</span>
                             <b-field label="Password">
                                <b-input v-model="formData.password" v-validate="{required: true}" name="password" type="password"></b-input>
                            </b-field>
                             <span>{{ errors.first('password') }}</span>
                             <div class="columns">
                                 <div class="column is-2">
                                       <b-button type="is-info" @click="attemptLogin">Login</b-button>
                                 </div>
                                  <div class="column is-10">
                                    <p>Don't have and Account. Please sign up <router-link :to="{name: 'signup'}">here</router-link></p>
                                  </div>
                             </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
import AuthenticationService from '../services/AuthenticationService'
import { mapState } from  'vuex'
import { mapGetters } from  'vuex'
import { mapActions} from  'vuex'
export default {
    data(){
        return {
            formData: {
                email: '',
                password: '',
            }
        }
    },
    methods: {
        attemptLogin(){
             this.$validator.validate().then(valid => {
                if (!valid) {
                // do stuff if not valid.
                } else {
                     this.submitCredentials();   
                }
             });
        },
        async submitCredentials(){
            try {
                const loginSuccess = await AuthenticationService.login({
                    email: this.formData.email,
                    password: this.formData.password
                });
                console.log(`Login Response: ${JSON.stringify(loginSuccess)}`);
                if(loginSuccess){
                    this.$router.push({name: 'cart'});
                    this.$store.dispatch('setLogIn');
                    this.$store.dispatch('setCurrentLoggedInCustomer', loginSuccess.data.data);
                }
            } catch(error){
                console.log(error)
            }
           
        }
    },
    computed: {
        ...mapGetters({
           
        }),
        ...mapActions([
             'setLogIn',
             'setCurrentLoggedInCustomer'
        ])
    }
}
</script>
