import React, { useContext, useState } from 'react';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';

const AddRestaurant = () => {
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [priceRange, setPriceRange] = useState("price range");

    //destructure the restaurant context from the context
    const {addRestaurants }= useContext(RestaurantsContext);


    const handleSubmit = async (e) => {
        //following LOC prevents the default behaviour of the form i.e., prevents the page from 
        //re-loading and the state will be preserved and won't be lost.

        e.preventDefault();
        try{
            const response = await RestaurantFinder.post("/",{
                name:name,
                location:location,
                price_range:priceRange
            });
            console.log(response.data.data);
            // To update the UI with the recently added restaurant
            addRestaurants(response.data.data.restaurant);
        } catch(err){
            console.log(err);
        }
    };


  return (
    <div className="mb-4">
        <form action="">
            <div className="form-row">
                <div className="col">
                    <input value = {name} onChange = {e => {setName(e.target.value)}} type="text" className='form-control' placeholder='Name' />
                </div>
                <div className="col">
                    <input value = {location} onChange = {e => {setLocation(e.target.value)}} type="text" className='form-control' placeholder='Location' />
                </div>
                <div className="col">
                    <select value = {priceRange} onChange = {e => {setPriceRange(e.target.value)}}
                    className='custom-select my-1 mr-sm-2'>
                        <option disabled>price range</option>
                        <option value="1">$</option>
                        <option value="2">$$</option>
                        <option value="3">$$$</option>
                        <option value="4">$$$$</option>
                        <option value="5">$$$$$</option>
                    </select>
                </div>
                <button  onClick = {handleSubmit} type = "submit" className="btn btn-primary">Add</button>
            </div>
        </form>
      
    </div>
  );
}

export default AddRestaurant;
