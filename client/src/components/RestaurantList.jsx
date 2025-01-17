import React,{ useContext, useEffect } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import {RestaurantsContext } from "../context/RestaurantsContext";
import { useNavigate } from "react-router-dom";
import StarRating from "./StarRating";

const RestaurantList = (props) => {

  //destructure the two properties we want, which comes from the value obj passed to Restaurantcontext.provider

  const { restaurants, setRestaurants } = useContext(RestaurantsContext);

  //let history = useHistory();
  const navigate = useNavigate();

  //arrow function and empty dependency list
 
  useEffect(()=> {
    const FetchData = async() => {
      try{
        const response = await RestaurantFinder.get("/");
        console.log(response.data.data);
        setRestaurants(response.data.data.restaurants);
          }catch(err){ }
    }
      FetchData();  

  },[]);

  const handleDelete =  async (e,id) => {
    e.stopPropagation();;
     try{
      const response = await RestaurantFinder.delete(`/${id}`);
      //call filter method on restaurants state by calling setRestaurants method
      // and pass in the restaurant array.
      //if the condition returns true add that restaurant to the restaurant array
      //Otherwise, leave that restaurant.

      setRestaurants(restaurants.filter(restaurant =>
        {
            return restaurant.id !== id;
        }));

     }
     catch(err){
      console.log(err);
     }
  };

  const handleUpdate = (e,id) => {
    e.stopPropagation();
    //history.push(`restaurants/${id}/update`);
    navigate(`restaurants/${id}/update`);
  };

  const handleRestaurantSelect = (id) => {
    navigate(`/restaurants/${id}`)
  };

  const renderRating = (restaurant) => {
    if(!restaurant.count) {
      return <span className="text-warning">0 reviews</span>
    }
    return (
      <>
        <StarRating rating = {restaurant.average_rating}/>
        <span className="text-warning ml-1">({restaurant.count})</span>
      </>
    );
  };


  return (
    <div className='list-group'>
        <table className="table table-hover table-dark">
            <thead>
            <tr className="bg-primary">
                <th scope="col">Restaurant</th>
                <th scope="col">Location</th>
                <th scope="col">Price Range</th>
                <th scope="col">Ratings</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
            </tr>
            </thead>
            <tbody>
                {restaurants && 
                  restaurants.map((restaurant) => {
                  return(
                    <tr onClick= {() => handleRestaurantSelect(restaurant.id)} key = {restaurant.id}>
                      <td>{restaurant.name}</td>
                      <td>{restaurant.location}</td>
                      <td>{"$".repeat(restaurant.price_range)}</td>
                      <td>{renderRating(restaurant)}</td>
                      
                      <td>
                        <button 
                      onClick ={(e) => handleUpdate(e,restaurant.id)}
                      className="btn btn-warning">
                        Update
                        </button>
                        </td>
                      {/*while passing in the argument for the function, 
                      pass in as the reference arrow function*/}
                       
                      <td><button 
                      onClick = {(e) => handleDelete(e,restaurant.id)} 
                      className="btn btn-danger">Delete</button></td>
                    </tr>
                  )
                })}

               {/*  <tr>
                <td>Mac Donalds</td>
                <td>New York</td>
                <td>$$</td>
                <td>Ratings</td>
                <td><button className="btn btn-warning">Update</button></td>
                <td><button className="btn btn-danger">Delete</button></td>
                </tr>

                <tr>
                <td>Mac Donalds</td>
                <td>New York</td>
                <td>$$</td>
                <td>Ratings</td>
                <td><button className="btn btn-warning">Update</button></td>
                <td><button className="btn btn-danger">Delete</button></td>
                </tr> */}
                
            </tbody>
        </table>
      
    </div>
  );
}

export default RestaurantList;
