var app = new Vue({
    el : '#app',
    data : {
        text : "hello vue",
        condition :true,
        max : 50,
        product :null,
        cart : [],
        style : {
            slide :false,
            hamburger : true,
            animated : false,
        }
    },
    mounted:function(){
            this.product = null
            fetch('https://hplussport.com/api/products/order/price')
            .then((responde) => responde.json())
            .then((data) => {
                this.product = data
                console.log(data)
            })
    },
    methods : {
        addItem : function(product){
            let productIndex ;
            let productExist = this.cart.filter(function(items,index){
                if(items.product.id == Number(product.id)){
                    productIndex = index;
                    return true
                }
                else {
                    return false
                }
            })
            if(productExist.length){
                this.cart[productIndex].qty++
            }
            else {
                this.cart.push({product : product , qty:1})
            }
        }, 
        deleteItem : function(key){
            if(this.cart[key].qty > 1){
                this.cart[key].qty--
            }
            else{
                this.cart.splice(key,1)
            }
        }
    },
    computed : {
        checkTotal:function(){
            var sum = 0;
            for(key in this.cart){
                sum = (this.cart[key].product.price * this.cart[key].qty)
            }
            return sum
        },
        checkQty : function(){
            var qty = 0;
            for(key in this.cart){
                qty = qty + this.cart[key].qty
            }
            return qty
        },
        show : function (){
            return this.style.slide ? 'flex' : 'hidden'
        },
        toggle : function (){
            return this.style.hamburger ? 'hidden' : 'block'
        },
        ping : function () {
            return this.style.animated  ? 'hidden' : 'inline-block'
        }
    },
    filters : {
        currently:function(value){
            return 'Rp.'+ Number.parseFloat(value).toFixed(3);
          }
    }
})