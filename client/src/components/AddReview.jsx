import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';

const AddReview = () => {
    
    const {id} = useParams();
    const location = useLocation();
    console.log(location);
    const navigate = useNavigate();
    const[name,setName] = useState("");
    const[rating,setRating] = useState("rating");
    const[reviewText,setReviewText] = useState("");

    const handleSubmitReview = async(e) => {
        //prevent the page from re-loading
        e.preventDefault();
        try{
            const response = await RestaurantFinder.post(`/${id}/addReview`,{
                name: name,
                review : reviewText,
                rating : rating
            });
            //console.log(response);
            //Navigate to the home page and then quickly navigate to the restaurant detail page, in such a way
            //quick refresh happens.
            navigate(0);
            //location.pathname: '/restaurants/2'
            //navigate(location.pathname);

        }catch(err){
            console.log(err);
        };
    }


    

  return (
    <div className='mb-2'>
        <form action="">
            <div className="form-row">
                <div className="from-group col-8">
                    <label htmlFor="name">Name</label>
                    <input value = {name} onChange={(e) => setName(e.target.value)}
                    id="name" placeholder="name" type="text" className="form-control" />
                </div>
                <div className="form-group col-4">
                <label htmlFor="Reating">Rating</label>
                    <select value = {rating} onChange={(e) => setRating(e.target.value)}
                    id="rating" className="custom-select">
                    <option disabled>rating</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>   
                    </select>
                </div>                       
            </div>
            
           <div className="form-group">
           <label htmlFor="review">Review</label>
                <textarea value = {reviewText} onChange={(e) => setReviewText(e.target.value)}
                id="review" className='form-control'></textarea>
           </div>
            <button type = "submit" onClick = {handleSubmitReview} className="btn btn-primary">Submit</button>
        </form> 
    </div>
  );
}



export default AddReview;
