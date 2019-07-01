<template>
    <div class="container">
        <div class="columns is-9">
            <div class="column">
                <div class="panel-heading"><strong>Your Items - {{ this.$store.shoppingCartCount }}</strong></div>
                    <div class="panel-block">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br/>
                        Nulla accumsan, metus ultrices eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. <br/>
                        Ut vulputate semper dui. Fusce erat odio, sollicitudin vel erat vel, interdum mattis neque.
                    </div>
            </div>
            <div class="column is-3">
                <div class="panel">
                    <div class="panel-heading">
                        <div class="columns">
                            <div class="column is-9"><strong>Order Summary</strong></div>
                             <div class="column is-3">USD</div>
                        </div>
                    </div>
                    <div class="panel-block" style="display: block;">
                        <ul>
                            <li>Order Total: &nbsp;&nbsp;33.33</li>
                        </ul>
                         <ul>
                            <li>Subtotal: &nbsp;&nbsp;33.33</li>
                        </ul>
                        <!-- Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br/>
                        Nulla accumsan, metus ultrices eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. <br/>
                        Ut vulputate semper dui. Fusce erat odio, sollicitudin vel erat vel, interdum mattis neque. -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'cart',
    data(){
        return {

        }
    }
}
</script>