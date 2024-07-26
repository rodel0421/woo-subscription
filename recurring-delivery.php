<?php 
	/* 
	Plugin name: Recuring Delivery
	Plugin URI: https://example.com/recuring-delivery
	Description: A simple plugin 
	Author: Rodel Ednalan
	Author URI: https://website.com 
	Version: 0.5 
	*/  
	
	define( 'CO_PLUGIN_PATH', plugin_dir_path( __FILE__ ) );
	define( 'CO_PLUGIN_URL', plugin_dir_url( __FILE__ ) );


	require_once( CO_PLUGIN_PATH . 'classes/enqueue-delivery-scripts.php' );
	require_once( CO_PLUGIN_PATH . 'util/co-delivery-utility.php' );
	require_once( CO_PLUGIN_PATH . 'classes/admin-delivery-setting-product.php' );
	require_once( CO_PLUGIN_PATH . 'classes/display-delivery-cart-checkout.php' );

	if (class_exists('DeliveryScripts') &&
	 class_exists('AdminDeliverySettingProduct') &&
	  class_exists('DisplayDeliceryCartCheckout')) {
		new DeliveryScripts();
		new AdminDeliverySettingProduct();
		new DisplayDeliceryCartCheckout();
	}
	

?>
