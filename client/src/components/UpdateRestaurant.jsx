import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';
import { useNavigate } from "react-router-dom";

const UpdateRestaurant = (props) => {
    const {id} = useParams();
    const navigate = useNavigate();

    //when we work with forms within react, make it a controlled form by making all the inputs controlled
    //define a state for each of the input

    const [name, setName] = useState("");
    const [location,setLocation] = useState("");
    const [priceRange,setPriceRange] = useState("");

    useEffect(() => {
      const fetchData = async() =>{
          const response = await RestaurantFinder.get(`/${id}`);
          console.log(response.data.data);
          setName(response.data.data.restaurant.name);
          setLocation(response.data.data.restaurant.location);
          setPriceRange(response.data.data.restaurant.price_range);
      }
      fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedRestaurant = await RestaurantFinder.put(`/${id}`,{
          name:name,
          location:location,
          price_range:priceRange
         });
        console.log(updatedRestaurant);
        // to take the user back to the restaurant list page or home page
        navigate("/");
    };


  return (
    <div>
      <form action = "">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input value = {name} onChange = {(e) => setName(e.target.value)} 
            id = "name" className="form-control" type="text"  />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input value = {location} onChange = {(e) => setLocation(e.target.value)} 
            id = "location" className="form-control" type="text"  />
          </div>
          <div className="form-group">
            <label htmlFor="price_range">Price Range</label>
            <input value = {priceRange} onChange = {(e) => setPriceRange(e.target.value)} 
            id = "price_range" className="form-control" type="number"  />
          </div>
          <button type = "submit" onClick = {handleSubmit} className="btn btn-primary">
            Submit
            </button>

      </form>
     
    </div>
  );
}

export default UpdateRestaurant;
