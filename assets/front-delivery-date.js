jQuery(document).ready(function(){
    jQuery( document ).on( "ajaxComplete", function( event, xhr, settings ) {
   
        url_string = settings.url + "?" + settings.data;
        url = new URL(url_string);
        update_cart = url.searchParams.getAll("update_cart");
        wp_http_referer = url.searchParams.getAll("_wp_http_referer");
    
        if(update_cart[0] === "Update Cart" && wp_http_referer[0] === "/cart/"){
            if(jQuery(".woocommerce-cart-form__contents").length === 0){
                jQuery(document.body).trigger('wc_update_cart');
            }
            
        }
          
       } );
})
