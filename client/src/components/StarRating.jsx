import React from 'react';

//de-structure the prop rating
const StarRating = ({rating}) => {
    // rating = 4
    const stars = [];
    for(let i =1; i<= 5; i++){
        if(i <= rating){
            stars.push(<i key = {i} className="fa-solid fa-star text-warning" ></i>);
        }else if (!Number.isInteger(rating) && i === Math.ceil(rating)){
            stars.push(<i key = {i} className="fa-solid fa-star-half text-warning"></i>)
        }
        else{
            stars.push(<i key = {i} className="fa-regular fa-star text-warning"></i>);
        }
    };
  return (
    <>
      {stars}
    </>
  );
}

export default StarRating;
