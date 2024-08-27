import React from 'react';
import StarRating from '../components/StarRating';


//de-structure the reviews prop
const Reviews = ({reviews}) => {
  return (
    <div className="row row-cols-3 mb-2"> 

    {reviews.map((review) => {
        return(
            <div key = {review.id} className="card text-white bg-primary mb-3 mr-4" style={{maxWidth:"30%"}}>
        <div className="card-header d-flex justify-content-between">
          <span>{review.name}</span>
          <span><StarRating rating={review.rating}/></span>
        </div>
        <div className="card-body">
          <p className="card-text">{review.review}</p>
        </div>
     </div> 

        );
    })}

     {/* <div className="card text-white bg-primary mb-3 mr-4" style={{maxWidth:"30%"}}>
        <div className="card-header d-flex justify-content-between">
          <span>John</span>
          <span><StarRating rating={3}/></span>
        </div>
        <div className="card-body">
          <p className="card-text">This restaurant is awesome</p>
        </div>
     </div> 

     <div className="card text-white bg-primary mb-3 mr-4" style={{maxWidth:"30%"}}>
        <div className="card-header d-flex justify-content-between">
          <span>John</span>
          <span><StarRating rating={3}/></span>
        </div>
        <div className="card-body">
          <p className="card-text">This restaurant is awesome</p>
        </div>
     </div>

     <div className="card text-white bg-primary mb-3 mr-4" style={{maxWidth:"30%"}}>
        <div className="card-header d-flex justify-content-between">
          <span>John</span>
          <span><StarRating rating={3}/></span>
        </div>
        <div className="card-body">
          <p className="card-text">This restaurant is awesome</p>
        </div>
     </div>

     <div className="card text-white bg-primary mb-3 mr-4" style={{maxWidth:"30%"}}>
        <div className="card-header d-flex justify-content-between">
          <span>John</span>
          <span><StarRating rating={3}/></span>
        </div>
        <div className="card-body">
          <p className="card-text">This restaurant is awesome</p>
        </div>
     </div> */}

    </div>
  );
}

export default Reviews;
