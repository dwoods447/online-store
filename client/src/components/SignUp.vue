<template>
    <div class="container">
        <section>
              <form action="" style="width: 50%; margin: 0 auto;">
                    <b-field label="First Name">
                        <b-input v-model="formdata.first_name" v-validate="{required: true}" name="firstname"></b-input>
                    </b-field>
                    <span>{{ errors.first('firstname') }}</span>
                      <b-field label="Last Name">
                        <b-input v-model="formdata.last_name" v-validate="{required: true}" name="lastname"></b-input>
                    </b-field>
                    <span>{{ errors.first('lastname') }}</span>
                    <b-field label="Phone">
                        <b-input v-model="formdata.phone" v-validate="{required: true}" name="phone"></b-input>
                    </b-field>
                    <span>{{ errors.first('phone') }}</span>
                     <b-field label="Address">
                        <b-input v-model="formdata.address" v-validate="{required: true}" name="address"></b-input>
                    </b-field>
                    <span>{{ errors.first('address') }}</span>
                      <b-field label="City">
                        <b-input v-model="formdata.city" v-validate="{required: true}" name="city"></b-input>
                    </b-field>
                    <span>{{ errors.first('city') }}</span>
                    <b-field label="Country">
                        <b-input v-model="formdata.country" v-validate="{required: true}" name="country"></b-input>
                    </b-field>
                    <span>{{ errors.first('country') }}</span>
                    <b-field label="Email">
                        <b-input v-model="formdata.email" v-validate="{required: true}" name="email"></b-input> 
                    </b-field>
                    <span>{{ errors.first('email') }}</span>
                    <b-field label="Password">
                        <b-input v-model="formdata.password" v-validate="{required: true}" name="password" type="password"></b-input>
                    </b-field>
                     <b-field label="Confirm Password">
                        <b-input v-model="formdata.confirm_password" v-validate="{required: true, confirmed:formdata.password}" name="password_confirmation" type="password"></b-input>
                    </b-field>
                    <span>{{ errors.first('password') }}</span>
                    <span v-if="message">{{ message}}</span>
                    <router-link :to="{name: 'login'}" style="text-decoration:none;" v-if="message"><b-button>Login</b-button></router-link>
                    <b-button type="is-primary" @click="signup" v-if="!message">Sign Up</b-button>
             </form>        
        </section>
    </div>
</template>
<script>
import SignUpService from '../services/SignUpService'
export default {
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
              console.log(`Registration: ${JSON.stringify(registration)}`)
              if(registration.error){
                this.message = registration.error;
              } else {
                  // Registration successful
                   this.$router.push({name: 'login'})
              }
            } catch (error){
                console.log(`An error occurred: ${JSON.stringify(error)}`);
            }
            
        }
    }
}
</script>