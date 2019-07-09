<template>
    <div class="container">
        <section>
            <div class="columns">
                <div class="column">
                        <form action="">
                             <b-field label="Email">
                                <b-input v-model="formData.email"></b-input>
                            </b-field>
                             <b-field label="Password">
                                <b-input v-model="formData.password"></b-input>
                            </b-field>
                           <b-button type="is-info">Login</b-button>
                        </form>
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
    }
}
</script>
