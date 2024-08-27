import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { RestaurantsContext } from '../context/RestaurantsContext';
import RestaurantFinder from '../apis/RestaurantFinder';
import StarRating from '../components/StarRating';
import Reviews from '../components/Reviews';
import AddReview from '../components/AddReview';

const RestaurantDetailPage = () => {
  const {id} = useParams();
  const {selectedRestaurant, setSelectedRestaurant} = useContext(RestaurantsContext);  
  useEffect(()=>{
      const FetchData = async() =>{
       try{
        const response = await RestaurantFinder.get(`/${id}`);
        //console.log(response.data.data);
        //after integrating reviews api call, response.data.data contains restaurant and reviews
        setSelectedRestaurant(response.data.data); 
       }catch(err){
        console.log(err);
       }         
      };
    FetchData();
  },[])
  
  return (
    <div>
      {/* multi-line jsx expression with fragments */}
      {selectedRestaurant && (
        <>
        <h1 className="text-center display-1">
          {selectedRestaurant.restaurant.name}
        </h1>
        <div className="text-center">
          <StarRating rating = {selectedRestaurant.restaurant.average_rating}/>
          {selectedRestaurant.restaurant.count ? `(${selectedRestaurant.restaurant.count})`: "(0)"}
        </div>
        <div className="mt-3">
          {/* add a prop called rating with the selectedRestaurant state to reviews, in such a way
          Reviews component has access to the restaurant selected and all other reviews */}
          <Reviews reviews = {selectedRestaurant.reviews}/>
        </div>
        <AddReview/>
        </>
      )}
    </div>
  );
}

export default RestaurantDetailPage;
