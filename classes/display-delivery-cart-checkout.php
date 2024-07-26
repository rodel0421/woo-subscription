<?php
/**
 * Class DisplayDeliceryCartCheckout
 *
 * Handles the display and management of delivery date options for products in the WooCommerce cart and checkout.
 *
 * @package Delivery Plugin
 * @subpackage classes
 * @author Your Name/Company (if applicable)
 * @since 1.0.0
 */


class DisplayDeliceryCartCheckout {

  public function __construct() {
    add_filter( 'woocommerce_locate_template', array( $this, 'intercept_wc_template'), 10, 3 );
    add_filter( 'recurring_delivery_options_html', array( $this, 'recurring_delivery_options_html'), 10, 3 );
    add_filter('woocommerce_update_cart_action_cart_updated', array( $this, 'on_action_cart_updated'));
    add_action( 'woocommerce_checkout_create_order_line_item', array( $this, 'plugin_republic_checkout_create_order_line_item'), 10, 4 );
  }

  
    /**
     * Filter the cart template path to use cart.php in this plugin instead of the one in WooCommerce.
    *
    * @param string $template      Default template file path.
    * @param string $template_name Template file slug.
    * @param string $template_path Template file name.
    *
    * @return string The new Template file path.
    */
    public function intercept_wc_template( $template, $template_name, $template_path ) {
        if ( 'cart.php' === basename( $template ) ) {
            $template = trailingslashit( CO_PLUGIN_PATH ) . 'templates/woocommerce/cart/cart.php';
        } 
        if ( 'review-order.php' === basename( $template ) ) {
            $template = trailingslashit( CO_PLUGIN_PATH ) . 'templates/woocommerce/checkout/review-order.php';
        } 

        return $template;

    }


     /**
     * Renders the delivery date options HTML for each cart item.
     *
     * @param int $product_id The product ID.
     * @param array $cart_item The cart item data.
     * @param string $cart_item_key The cart item key.
     *
     * @return string The HTML output for the delivery date options.
     */
	public function recurring_delivery_options_html($product_id , $cart_item , $cart_item_key){

		$co_delivery_date_options = get_post_meta( $product_id, 'co_delivery_date_options', true );
		$co_recurring_delivery_date = "{}";
		if((isset($cart_item['co_recurring_delivery_date']) && $cart_item['co_recurring_delivery_date'] !== "")){
			$co_recurring_delivery_date = $cart_item['co_recurring_delivery_date']??"[{}]";
		}
		$co_start_delivery_date = "";
		if((isset($cart_item['co_start_delivery_date']) )){
			$co_start_delivery_date = $cart_item['co_start_delivery_date']??"";
		}
		
		ob_start();
		?>
		
		<select 
		data-start-date-default="<?php echo $co_start_delivery_date; ?>" 
		data-selected-option="<?php echo htmlspecialchars($co_recurring_delivery_date, ENT_QUOTES, 'UTF-8'); ?>" 
		data-date-option="<?php echo htmlspecialchars($co_delivery_date_options, ENT_QUOTES, 'UTF-8'); ?>" 
		data-key="<?=$cart_item_key?>"
		class="co_recurring_delivery_date">
			
		</select>

		<?php
		$output = ob_get_clean();
		return $output;
	 }


     /**
     * Updates the cart with delivery date options when the "Update Cart" button is clicked.
     *
     * @param bool $cart_updated Indicates if the cart has been updated.
     *
     * @return bool
     */
     public function on_action_cart_updated( $cart_updated ) {

        if(isset($_POST)){
            $cart = WC()->cart->cart_contents;
            // print_r($cart);
            foreach( $cart as $cart_item_id=>$cart_item ) {
                
                if(isset($_POST['cart'][$cart_item_id]['co_recurring_delivery_date'])){
                    $cart_item['co_recurring_delivery_date'] = sanitize_text_field($_POST['cart'][$cart_item_id]['co_recurring_delivery_date']);
                }
                if(isset($_POST['cart'][$cart_item_id]['co_start_delivery_date'])){
                    $cart_item['co_start_delivery_date'] = sanitize_text_field($_POST['cart'][$cart_item_id]['co_start_delivery_date']);
            
                }
                WC()->cart->cart_contents[$cart_item_id] = $cart_item;
            }
            WC()->cart->set_session();

        }
        return $cart_updated;

        exit; 
        
    }

    
     /**
     * Handles the saving of delivery options to the order.
     *
     * This function saves the delivery options as order meta when an order is created.
     *
     * @param WC_Order_Item $item The order item object.
     * @param string $cart_item_key The cart item key.
     * @param array $values The cart item data.
     * @param WC_Order $order The order object.
     */
    public function plugin_republic_checkout_create_order_line_item( $item, $cart_item_key, $values, $order ) {
        
        if( isset( $values['co_recurring_delivery_date'] ) ) {
    
        $recurring_delivery = json_decode(str_replace('\\"', '"', $values['co_recurring_delivery_date']) , true);

        $item->add_meta_data(
            __( 'Recurring Delivery', 'plugin-republic' ),
            get_word_day_interval($recurring_delivery['day_interval']) . " ".
            get_word_date_interval($recurring_delivery['date_interval']) . " " .
            $recurring_delivery['date_period'],
            false
        );
        
        $item->add_meta_data('_hidden_field', sanitize_text_field($values['co_recurring_delivery_date'])  , true);
        
        }

        if( isset( $values['co_start_delivery_date'] ) ) {
            $item->add_meta_data(
                __( 'Start Delivery', 'plugin-republic' ),sanitize_text_field($values['co_start_delivery_date']),
                false
            );
        }
        


    }


}

