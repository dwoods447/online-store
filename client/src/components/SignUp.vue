<template>
    <div class="container">
        <section>
              <form action="" style="width: 50%; margin: 0 auto;">
                    <b-field label="First Name">
                        <b-input v-model="formdata.first_name" v-validate="{required: true}" name="firstname"></b-input>
                    </b-field>
                    <span class="error">{{ errors.first('firstname') }}</span>
                    <br/>
                    <b-field label="Last Name">
                        <b-input v-model="formdata.last_name" v-validate="{required: true}" name="lastname"></b-input>
                    </b-field>
                    <span class="error">{{ errors.first('lastname') }}</span>
                    <br/>
                    <b-field label="Phone">
                        <b-input v-model="formdata.phone" v-validate="{required: true}" name="phone"></b-input>
                    </b-field>
                    <span class="error">{{ errors.first('phone') }}</span>
                    <br/>
                     <b-field label="Address">
                        <b-input v-model="formdata.address" v-validate="{required: true}" name="address"></b-input>
                    </b-field>
                    <span class="error">{{ errors.first('address') }}</span>
                    <br/>
                    <b-field label="City">
                        <b-input v-model="formdata.city" v-validate="{required: true}" name="city"></b-input>
                    </b-field>
                    <span class="error">{{ errors.first('city') }}</span>
                    <br/>
                    <b-field label="Country">
                        <b-input v-model="formdata.country" v-validate="{required: true}" name="country"></b-input>
                    </b-field>
                    <span class="error">{{ errors.first('country') }}</span>
                    <br/>
                    <b-field label="Email">
                        <b-input v-model="formdata.email" v-validate="{required: true}" name="email"></b-input> 
                    </b-field>
                    <span class="error">{{ errors.first('email') }}</span>
                    <br/>
                    <b-field label="Password">
                        <b-input v-model="formdata.password" v-validate="{required: true}" name="password" type="password"></b-input>
                    </b-field>
                    <br/>
                     <span class="error">{{ errors.first('password') }}</span>
                     <b-field label="Confirm Password">
                        <b-input v-model="formdata.confirm_password" v-validate="{required: true, confirmed:formdata.password}" name="password_confirmation" type="password"></b-input>
                    </b-field>
                    <span class="error">{{ errors.first('password_confirmation') }}</span>
                    <br/>
                    <span v-if="message">{{ message}}</span>
                    <router-link :to="{name: 'login'}" style="text-decoration:none;" v-if="message"><b-button>Login</b-button></router-link>
                    <b-button type="is-primary" @click="signup" v-if="!message">Sign Up</b-button>
             </form>        
        </section>
    </div>
</template>
<script>
import SignUpService from '../services/SignUpService'
import AuthenticationService from '../services/AuthenticationService'
import { Validator } from 'vee-validate';
const dict = {
    custom: {
        firstname: {
            required: 'Please enter your First Name' 
        },
        lastname: {
            required: 'Please enter your Last Name' 
        },
        phone:{
            required: 'Please enter you Phone Number'
        },
        address:{
            required: 'Please enter you Address'
        },
        city: {
            required: 'Please enter your City'
        },
        country:{
            required: 'Please enter your Country'
        },
        email: {
            required: 'Please enter your email'
        },
        password: {
            required: 'Please enter your password'
        },
        password_confirmation: {
            required: 'Please re-enter your password',
            confirmed: 'Passwords do not match'
        }
    }
};
Validator.localize('en', dict);
export default {
    created(){
    },
    mounted() {
    },
    data(){
        return {
            message: '',
            formdata: {
                first_name: '',
                last_name: '',
                phone: '',
                address: '',
                city: '',
                country: '',
                email: '',
                password: '',
                confirm_password: '',
            }
        }
    },
    methods: {
        signup(){
            this.$validator.validate().then(valid => {
                if (!valid) {
                // do stuff if not valid.
                } else {  
                     this.submitInfo();   
                }
             });
           
        },
        async submitInfo(){
            try {
              const registration = (await SignUpService.signUp(this.formdata)).data;
              if(registration.error){
                this.message = registration.error;
              } else {
                  // Registration successful
                   this.$router.push({name: 'login'})
              }
            } catch (error){
                console.log(`An error occurred: ${JSON.stringify(error)}`);
            }
            
        },
        
    },
    computed: {
    }
}
</script>
<style scoped>
  .error{
      color: red;
      font-weight: bold;
  }  
</style>