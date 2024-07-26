import React from 'react'
import { useState , useEffect  } from 'react';
import DatePicker from 'react-datepicker'; 
import "react-datepicker/dist/react-datepicker.css";
import "../style/main.scss";

const OptionElements = ({options_list , selected_options , data_key , start_date_default}) => {

    const [optionList, setOptionList] = useState([]); 
    const [selected, setSelected] = useState([]); 
    const [selectedDate, setSelectedDate] = useState(null);
    
    useEffect(() => {
      
      /* console.log(JSON.parse(selected_options.replace(/\\"/g, '"')));
      console.log(JSON.parse(options_list)); */
     

      const defualt_recurring_delivery_op = JSON.parse(selected_options.replace(/\\"/g, '"') || selected_options)

      // console.log(defualt_recurring_delivery_op['day_interval'] !== undefined , "selected_optionsselected_options");

      const options_list_parse = JSON.parse(options_list);

      if(defualt_recurring_delivery_op['day_interval'] !== undefined){
        setSelected(defualt_recurring_delivery_op)
      }else{
        setSelected(options_list_parse[0])
      }
     
      setOptionList(options_list_parse);
      setSelectedDate(start_date_default);
      
        
    }, [])
    useEffect(() => {
      
      // console.log("setSelectedDate");
      if( document.querySelector("[name='update_cart']") !== null)document.querySelector("[name='update_cart']").disabled = false;
     

    }, [selectedDate])

        
    const get_word_day_interval = ($i) => {
     
      if($i === null) return "";
      const $lastDigit = $i  % 10;
    
      return "every " + ($i) + ($lastDigit === 1 ? 'st' : ($lastDigit === 2 ? 'nd' : ($lastDigit === 3 ? 'rd' : 'th')) ) + " Day of ";
    }
    const get_word_date_interval = ($i) =>{
    
      if($i == 1)return "every ";
      
      const $lastDigit = $i  % 10;
      return "every " + ($i) + ($lastDigit === 1 ? 'st' : ($lastDigit === 2 ? 'nd' : ($lastDigit === 3 ? 'rd' : 'th')) ) + " ";
    }


    const areJsonEqualLodash = (json1, json2) => {
      console.log(json1, "json1");
      console.log(json2, "json2");
      return _.isEqual(json1, json2);
    }

    
    const filterDate = (date) => {
      if(selected['date_period'] === 'year' ){ 
        // console.log(selected , "yearyearyear");
        const year = date.getFullYear();
        const day = date.getDate();
        
        return year % parseInt(selected['date_interval']) === 0 && day === parseInt(selected['day_interval']);
      }
      if(selected['date_period'] === 'month' ){
        // console.log(selected , "isValidDate");
        const month = date.getMonth();
        const day = date.getDate();
        
        return month % parseInt(selected['date_interval']) === 0 && day === parseInt(selected['day_interval']);
      }
      if (selected['date_period'] === 'week') {
        const dayOfMonth = date.getDate();
        const weekOfMonth = Math.ceil(dayOfMonth / 7);
        const dayOfWeek = date.getDay();
        return weekOfMonth % parseInt(selected['date_interval']) === 0 && dayOfWeek === parseInt(selected['day_interval']) ; // Adjust <= 14 based on your definition of 2nd week
      }
      if (selected['date_period'] === 'day') {
        const dayOfMonth = date.getDate();
        return dayOfMonth % parseInt(selected['date_interval']) === 0; // Allow only even days
      }
      return true;
    };

    const handleChangeRecurring = (event) => {
      setSelectedDate(null);
      setSelected(JSON.parse((event.target.value).replace(/\\"/g, '"') || event.target.value));
    };
    return (
        <>
      
       <div className='delivery-option'>
        <div>
          <label htmlFor="">Recurring Delivery</label>
            <select name={"cart["+data_key+"][co_recurring_delivery_date]"} 
            className="co_recurring_delivery_date" onChange={handleChangeRecurring}>
              {
                optionList.map((item , key)=>(
                  <option
                  value={JSON.stringify(item)} selected={areJsonEqualLodash(item , selected)} >
                      {get_word_day_interval(item.day_interval)}
                      {get_word_date_interval(item.date_interval)}
                      {item.date_period}
                    </option>
                ))
              }

            </select>
        </div>
        <div>
          <label htmlFor="">Start Delivery</label>
          <DatePicker
          showYearDropdown
          selected={selectedDate}
          onChange={setSelectedDate}
          filterDate={filterDate}
          name={"cart["+data_key+"][co_start_delivery_date]"}
          autoComplete = "off"
        /> 
        </div>
       </div>
       
         
        </>
     );
}

export default OptionElements;