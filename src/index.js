import OptionElements from "./components/option-element";
import { render } from '@wordpress/element';

/**
 * Import the stylesheet for the plugin.
 */
import './style/main.scss';
console.log("fasdfas");
// Render the App component into the DOM

    



const el_selector = document.querySelectorAll('.co_recurring_delivery_date');

if(el_selector !== undefined){

document.querySelectorAll('.co_recurring_delivery_date').forEach(function (e) {
    
             e.innerHTML = '';

             const divElement = document.createElement('div');

            const options = e.getAttribute('data-date-option') !== null ? e.getAttribute('data-date-option') : [];
            const selected = e.getAttribute('data-date-option') !== null ? e.getAttribute('data-selected-option') : [];
            const start_date_default = e.getAttribute('data-start-date-default') !== null ? e.getAttribute('data-start-date-default') : [];
       
            const data_key = e.getAttribute('data-key') !== null ? e.getAttribute('data-key') : "";
           
            divElement.setAttribute('data-date-option', options);
            divElement.setAttribute('data-selected-option', selected);
            divElement.setAttribute('data-start-date-default', start_date_default);
            divElement.setAttribute('data-key', data_key); 
           e.parentNode.replaceChild(divElement, e);

          //  

           const root = ReactDOM.createRoot(divElement);

           
            root.render(
                <React.Fragment>
                
                     <OptionElements 
                     options_list={options} 
                     selected_options={selected} 
                     data_key={data_key}
                     start_date_default={start_date_default}
                      /> 
                    
                </React.Fragment>
            );  
})


}




const woocommerceEleme = document.querySelectorAll('.woocommerce');
const woocommerceElemeForm = document.querySelector('form.woocommerce-cart-form');

// Create a MutationObserver instance with a more specific configuration
const observer = new MutationObserver(mutations => {
  console.log(mutations); 
  mutations.forEach(mutation => {
    if (mutation.type === 'childList') {
        // jQuery(document.body).trigger('wc_update_cart');
    //  
        
    const el_selector = document.querySelectorAll('.co_recurring_delivery_date');

    if(el_selector !== undefined){

    document.querySelectorAll('.co_recurring_delivery_date').forEach(function (e) {
        console.log("Content of the WooCommerce div has changed!");
            // e.innerHTML = '';
            const divElement = document.createElement('div');

            const options = e.getAttribute('data-date-option') !== null ? e.getAttribute('data-date-option') : [];
            const selected = e.getAttribute('data-date-option') !== null ? e.getAttribute('data-selected-option') : [];
            const start_date_default = e.getAttribute('data-start-date-default') !== null ? e.getAttribute('data-start-date-default') : [];
       
            const data_key = e.getAttribute('data-key') !== null ? e.getAttribute('data-key') : "";
           
            divElement.setAttribute('data-date-option', options);
            divElement.setAttribute('data-selected-option', selected);
            divElement.setAttribute('data-start-date-default', start_date_default);
            divElement.setAttribute('data-key', data_key); 
           e.parentNode.replaceChild(divElement, e);

          //  

           const root = ReactDOM.createRoot(divElement);

           
            root.render(
                <React.Fragment>
                
                     <OptionElements 
                     options_list={options} 
                     selected_options={selected} 
                     data_key={data_key}
                     start_date_default={start_date_default}
                      /> 
                    
                </React.Fragment>
            );   
    })

    

    }
    } 
  });
});

/* if(woocommerceElemeForm !== null){
   observer.observe(woocommerceElemeForm, { 
    attributes: true,
    characterData: true,
    childList: true,
    // subtree: true,
    attributeOldValue: true,
    characterDataOldValue: true
  }); 
} */
if(document.querySelector('.woocommerce-cart') !== null){
    woocommerceEleme.forEach((child) =>{
	  
        observer.observe(child, { 
          attributes: true,
          characterData: true,
          childList: true,
          // subtree: true,
          attributeOldValue: true,
          characterDataOldValue: true
        }); 
    })
    
    
}


const order_reviewEleme = document.querySelector('#order_review');

// Create a MutationObserver instance with a more specific configuration
const order_review_observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    if (mutation.type === 'childList') {
        // jQuery(document.body).trigger('wc_update_cart');
    //  
        
    const el_selector = document.querySelectorAll('.co_recurring_delivery_date');

    if(el_selector !== undefined){

    document.querySelectorAll('.co_recurring_delivery_date').forEach(function (e) {
        console.log("Content of the WooCommerce div has changed!");
            // e.innerHTML = '';
            const divElement = document.createElement('div');

            const options = e.getAttribute('data-date-option') !== null ? e.getAttribute('data-date-option') : [];
            const selected = e.getAttribute('data-date-option') !== null ? e.getAttribute('data-selected-option') : [];
            const start_date_default = e.getAttribute('data-start-date-default') !== null ? e.getAttribute('data-start-date-default') : [];
       
            const data_key = e.getAttribute('data-key') !== null ? e.getAttribute('data-key') : "";
           
            divElement.setAttribute('data-date-option', options);
            divElement.setAttribute('data-selected-option', selected);
            divElement.setAttribute('data-start-date-default', start_date_default);
            divElement.setAttribute('data-key', data_key); 
           e.parentNode.replaceChild(divElement, e);

          //  

           const root = ReactDOM.createRoot(divElement);

           
            root.render(
                <React.Fragment>
                
                     <OptionElements 
                     options_list={options} 
                     selected_options={selected} 
                     data_key={data_key}
                     start_date_default={start_date_default}
                      /> 
                    
                </React.Fragment>
            );  
    })


    }
    } 
  });
});

if(document.querySelector('.woocommerce-checkout') !== null){
    order_review_observer.observe(order_reviewEleme, { childList : true });
}
 



