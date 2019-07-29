<template>
    <div class="container">
        <section style="height: 100vh; padding: 0; display: flex; flex-wrap: nowrap; justify-content: center; align-items: center;">
            <div class="columns">
                <div class="column is-12">
                    <h2 style="text-align:center; font-size: 2em;">Login</h2>
                     <div class="block" style="margin: 0 auto; width: 30%;">
                        
                    </div>
                    <div class="card" style="width: 100%; padding: 1.2em; margin: 0 auto;">
                        <form action="" >
                             <b-field label="Email">
                                <b-input v-model="formData.email" v-validate="{required: true}" name="email" @keyup="clearInvalid"></b-input>
                            </b-field>
                             <span>{{ errors.first('email') }}</span>
                             <b-field label="Password">
                                <b-input v-model="formData.password" v-validate="{required: true}" name="password" type="password" @keyup="clearInvalid"></b-input>
                            </b-field>
                             <span>{{ errors.first('password') }}</span>
                             <br/>
                              <div class="columns">
                                 <div class="column">
                                     <div class="centered">
                                         <h4>Demo Credentials:</h4>
                                         <p><strong>Email:</strong> &nbsp;<span style="color: green;">user1@email.com</span></p>
                                         <p><strong>Password:</strong> &nbsp;<span style="color: green;">pass</span></p>
                                     </div>
                                 </div>
                             </div>
                             <div class="columns">
                                 <div class="column" v-if="invlaidCredentials">
                                     <div class="centered">
                                         <strong><span style="color: red;">{{ message }}</span></strong>
                                     </div>
                                 </div>
                             </div>
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
            },
            message: 'Invalid email or password. Please try again.',
            invlaidCredentials: false,
        }
    },
    methods: {
        clearInvalid(){
         this.invlaidCredentials = false;
        },
        attemptLogin(){
            this.invlaidCredentials = false;
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
                const user = (await AuthenticationService.login({
                    email: this.formData.email,
                    password: this.formData.password
                }));
                let token = user.data.token;
                let userData = user.data.data;
                if(userData){
                     if(token){
                         this.$store.dispatch('setJWTtokenAction', token); 
                         this.$store.dispatch('setCurrentLoggedInCustomer', userData);
                         this.$store.dispatch('setLogIn');
                         window.location = "/";
                         this.$router.push({name: 'home'});
                     }
                    
                }
            } catch(error){
                this.invlaidCredentials = true;
                console.log(`an error occured: ${JSON.stringify(error)}`);
            }
           
        }
    },
    computed: {
        
    }
}
</script>
