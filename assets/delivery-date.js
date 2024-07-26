jQuery(document).ready(function(){

    const hasDuplicateDate = (arr) =>{
        arr = arr.map(item =>{
            const htmlString = item;
            const modifiedHtml = htmlString.replace(/ index=\d+/, '');
            return modifiedHtml;
        })
        return  arr.length !== new Set(arr).size;
    };
    
    jQuery(window).on("load" ,function(){ 
        var co_delivery_date_options = jQuery("#co_delivery_date_options").val();
        var arr = JSON.parse(co_delivery_date_options);
        var arrhtml = arr.map((item , index)=>{
       
            return "<li index="+ index +"> <button class='remove-item-date'> X </button> " + get_word_day_interval(item.day_interval) +
             get_word_date_interval(item.date_interval)  +  item.date_period + "</li>";
        })
        console.table(arrhtml);
        jQuery("#co_delivery_date_options_list").html(arrhtml.join(''));
       
      });

    jQuery("body").on("change" , "select#co_delivery_date_period_item" , function(e){
    
        var date_period = jQuery(this).val();
    
        if(date_period === "day"){
            jQuery("select#co_delivery_day_interval_item").val(-1);
            jQuery("select#co_delivery_day_interval_item").hide();
        }else{
           
                jQuery("select#co_delivery_day_interval_item").val(1); 
                jQuery("select#co_delivery_day_interval_item").show();
             
        }
        
    })

    jQuery("body").on("click" , ".remove-item-date" , function(e){
        e.preventDefault();
        var indexattr = jQuery(this).parents("li").attr("index");

        var co_delivery_date_options = jQuery("#co_delivery_date_options").val();
        var arr = JSON.parse(co_delivery_date_options);

        arr = arr.filter((item , index) => indexattr !=  index);

        var arrhtml = arr.map((item , index)=>{
            return "<li index="+ index +"> <button class='remove-item-date'> X </button> " + get_word_day_interval(item.day_interval) +
             get_word_date_interval(item.date_interval)  +  item.date_period + "</li>";
        })
        jQuery("#co_delivery_date_options").val(JSON.stringify(arr));
        jQuery("#co_delivery_date_options_list").html(arrhtml.join(''));
    })
    jQuery("body").on("click" , ".datedeliveryadd" , function(e){
        var day_interval = jQuery("#co_delivery_day_interval_item").val();
        var date_interval = jQuery("#co_delivery_date_interval_item").val();
        var date_period = jQuery("#co_delivery_date_period_item").val();
        var co_delivery_date_options = jQuery("#co_delivery_date_options").val();
        
        if(co_delivery_date_options === "" || co_delivery_date_options === null ){
            var arr = [{
                "day_interval" : day_interval,
                "date_interval" : date_interval,
                "date_period" : date_period
            }];
           
           
        }else{
            var arr = JSON.parse(co_delivery_date_options);
            arr = [...arr , {
                "day_interval" : day_interval,
                "date_interval" : date_interval,
                "date_period" : date_period
            }];
           
          
            // jQuery("#co_delivery_date_options").val(JSON.stringify(arr));
        }
        
        var arrhtml = arr.map((item , index)=>{
           
            return "<li index="+ index +"> <button class='remove-item-date'> X </button>" + get_word_day_interval(item.day_interval) +
             get_word_date_interval(item.date_interval)  +  item.date_period + "</li>";
        })
     

        if(arrhtml.length > 3){
            alert("A count exceeding three");
            return "";
        }
        if(hasDuplicateDate(arrhtml)){
            alert("Contains duplicate data");
            return "";
        }
        console.table(arrhtml);
        jQuery("#co_delivery_date_options").val(JSON.stringify(arr));
        jQuery("#co_delivery_date_options_list").html(arrhtml.join(''));
    })
})

function get_word_day_interval($i){
    if($i === null) return "";
    $lastDigit = $i  % 10;

    return "every " + ($i) + ($lastDigit === 1 ? 'st' : ($lastDigit === 2 ? 'nd' : ($lastDigit === 3 ? 'rd' : 'th')) ) + " Day of ";
}
function get_word_date_interval($i){
   
    if($i == 1)return "every ";
    
    $lastDigit = $i  % 10;
    return "every " + ($i) + ($lastDigit === 1 ? 'st' : ($lastDigit === 2 ? 'nd' : ($lastDigit === 3 ? 'rd' : 'th')) ) + " ";
}
