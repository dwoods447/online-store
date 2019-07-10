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
                                <b-input v-model="formData.password" v-validate="{required: true}" name="password"></b-input>
                            </b-field>
                             <span>{{ errors.first('password') }}</span>
                           <b-button type="is-info" @click="attemptLogin">Login</b-button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
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
                if(loginSuccess){
                    this.$router.push({name: 'home'})
                }
            } catch(error){
                console.log(error)
            }
           
        }
    }
}
</script>
