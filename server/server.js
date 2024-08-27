require('dotenv').config();
const express = require("express");
const cors = require("cors");
const db = require('./db');

const morgan = require('morgan');

const app = express();

app.use(cors());
app.use(express.json());
/**app.get("/getRestaurants",(req,res) => {
    //console.log("get all restaurants");
    //res.send("these are the restaurants");
    //res.json({
    //    status:"success",
    //    restaurant:"macdonalds"
    //})
    res.status(404).json({
        status:"success",
        restaurant:"macdonalds"
    })

}); **/

//get all restaurants
app.get("/api/v1/restaurants",async(req,res) => {
    try{
        //const restaurants = await db.query("SELECT * from restaurants");
        const restaurantRatingsData = await db.query(
            "select * from restaurants left join (select restaurant_id,count(rating),trunc(avg(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id;")
        //console.log("restaurants:",restaurants);
        //console.log("restaurant review data:",restaurantRatingsData);
        res.status(200).json({
            status:"success",
            results: restaurantRatingsData.rowCount,
            data :{
                restaurants : restaurantRatingsData.rows
            }
        })
    }
    catch(err){
        console.log(err);
    }

})

//get a restaurant
app.get("/api/v1/restaurants/:id",async(req,res) => {
    //console.log(req.params.id);
    try{
        //SELECT * from restaurants WHERE id = req.params.id
        //const restaurant = await db.query("SELECT * from restaurants WHERE id = $1",[req.params.id]);
        const restaurant = await db.query(
            "select * from restaurants left join (select restaurant_id,count(rating),trunc(avg(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id where id = $1;",
            [req.params.id]);      
        const reviews = await db.query("SELECT * from reviews WHERE restaurant_id = $1",[req.params.id]);
        res.status(200).json({
            status:"success",
            data :{
                restaurant : restaurant.rows[0],
                reviews: reviews.rows
            }
        })
    }catch(err){
        console.log(err);
    }
    
})



//create a restaurant
app.post("/api/v1/restaurants",async(req,res) => {
    try{
        //console.log(req.body);
        const results = await db.query("INSERT INTO restaurants(name,location,price_range) VALUES ($1,$2,$3) returning *",
        [req.body.name,req.body.location,req.body.price_range]);
        res.status(201).json({
        status:"success",
        data :{
            restaurant : results.rows[0]
        }
    })
    }catch(err){
        console.log(err);
    }

    
})

//update a restaurant
app.put("/api/v1/restaurants/:id",async(req,res) => {
    try{
        //console.log(req.params.id);
        //console.log(req.body);
        const results = await db.query("UPDATE restaurants SET name = $1,location = $2, price_range = $3 WHERE id = $4 returning *",
        [req.body.name,req.body.location, req.body.price_range,req.params.id]);
        res.status(200).json({
            status:"success",
            data :{
                restaurant : results.rows[0]
            }
        })
    }
    catch(err){
        console.log(err);
    }
})

//delete a restaurant
app.delete("/api/v1/restaurants/:id",async(req,res) => {

    try{
        await db.query("DELETE FROM restaurants WHERE id = $1",[req.params.id]);
        res.status(204).json({
            status:"success"
        })
    }
    catch(err){
        console.log(err);
    }
    
})

//add a review
app.post("/api/v1/restaurants/:id/addReview", async (req,res) => {
    try{
        const newReview = await db.query("INSERT INTO reviews (restaurant_id,name,review,rating) values ($1,$2,$3,$4) returning *",
        [req.params.id,req.body.name,req.body.review,req.body.rating]);
        //console.log(newReview)

        res.status(201).json({
            status:"success",
            data: {
                review : newReview.rows[0]
            }
        })

    }catch(err){
        console.log(err);
    }
})


const port = process.env.PORT || 3001;
app.listen(port,() => {
    console.log(`server is up and listening on the port ${port}`);
});