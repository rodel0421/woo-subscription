<?php
/**
 * Class AdminDeliverySettingProduct
 *
 * Handles the delivery date settings for products in the WooCommerce admin.
 * Adds custom fields to the product edit page for configuring delivery options.
 *
 * @package Delivery Plugin
 * @subpackage classes
 * @author Your Name/Company (if applicable)
 * @since 1.0.0
 */

class AdminDeliverySettingProduct {

  public function __construct() {
    add_action( 'woocommerce_product_options_general_product_data', array( $this, 'woo_add_co_delivery_date_item') );
	add_action( 'woocommerce_variation_options_pricing', array( $this, 'woo_add_co_delivery_date_item') );
    add_action( 'woocommerce_process_product_meta', array( $this, 'woo_add_custom_general_field_save'), 10);
  }

  
/**
     * Adds custom fields for delivery date settings to product edit page.
     *
     * This function displays the custom fields for configuring delivery options
     * on both simple and variable products.
     */
  public function woo_add_co_delivery_date_item() {
		global $woocommerce, $post;
			
		$date_interval = (int)get_post_meta( $post->ID, 'co_delivery_date_interval_item', true ); 
		$day_interval = (int)get_post_meta( $post->ID, 'co_delivery_day_interval_item', true ); 
		$date_period = get_post_meta( $post->ID, 'co_delivery_date_period_item', true ); 
		$co_delivery_date_options = get_post_meta( $post->ID, 'co_delivery_date_options', true );
		?>
		
		<p class="form-field co_delivery_date_item_field form-field-wide">
			<label for="co_delivery_date_item">Delivery Date</label>

			<select id="co_delivery_day_interval_item" name="co_delivery_day_interval_item" class="wc_input_delivery_date_period_interval wc-enhanced-select enhanced" style="margin-right:12px;">
				
				<?php
					// Loop through days 1 to 31
					for ($i = 1; $i <= 28; $i++) {
						$selected = ($i === $day_interval && false) ? 'selected="selected"' : '';
						$lastDigit = $i  % 10;
						echo "<option value='{$i}' {$selected}>every {$i}".($lastDigit === 1 ? 'st' : ($lastDigit === 2 ? 'nd' : ($lastDigit === 3 ? 'rd' : 'th')) )." Day of</option>";
					}
				?>
			</select>

			<select id="co_delivery_date_interval_item" name="co_delivery_date_interval_item" class="wc_input_delivery_date_period_interval wc-enhanced-select enhanced" style="margin-right:12px;">
				
				<option value="1">every</option>
				<option value="2" >every 2nd</option>
				<option value="3" >every 3rd</option>
				<option value="4" >every 4th</option>
				<option value="5" >every 5th</option>
				<option value="6" >every 6th</option>
			</select>
			<select id="co_delivery_date_period_item" name="co_delivery_date_period_item" class="wc_input_delivery_date_period_interval wc-enhanced-select enhanced" ">
				<option value="day">day</option>
				<option value="week" selected="selected" >week</option>
				<option value="month" >month</option>
				<option value="year" >year</option>
			</select>
			
			
			<input type="button" class="button datedeliveryadd" value="Add date" style="margin:0;margin-top:5px;">
			<input type="hidden" id="co_delivery_date_options" name="co_delivery_date_options" value='<?=$co_delivery_date_options?>'>
		
			
			
			<ul id="co_delivery_date_options_list"> 

			</ul>
		</p>
		
		
		<?php
	}


 /**
     * Saves custom delivery date settings.
     *
     * This function handles saving the custom delivery date settings when a product is saved.
     *
     * @param int $post_id The post ID of the product being saved.
     */
	public function woo_add_custom_general_field_save( $post_id  ) {

		if($_POST["post_type"] !== "product")return;

		$co_delivery_date_options = 'co_delivery_date_options';
		$co_delivery_date_options_value = isset( $_POST[ $co_delivery_date_options ] ) ? sanitize_text_field( $_POST[ $co_delivery_date_options ] ) : '';
		update_post_meta( $post_id, $co_delivery_date_options, $co_delivery_date_options_value );


	}


}

