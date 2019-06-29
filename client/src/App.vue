<template>
  <div id="app">
    <app-header></app-header>
    <router-view></router-view>
  </div>
</template>
<script>
import Header from './Header'
export default {
   name:'App',
   components: {
     'app-header': Header
   },
   data(){
     return {

     }
   }
}
</script>