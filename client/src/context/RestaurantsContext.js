import React, {useState, createContext} from 'react';

export const RestaurantsContext = createContext();

export const RestaurantsContextProvider = props => {

    const[restaurants,setRestaurants] = useState([]);
    const[selectedRestaurant,setSelectedRestaurant] = useState(null);

    const addRestaurants =(restaurant) => {
        //copy the existing restaurant array 
        //and add the newly created restaurant that got passed in
        setRestaurants([...restaurants,restaurant]);
    };

    //pass the value restaurants to all the componetns and setRestaurant to update the state
    return(
        // adding addRestaurants will make this function avaialable to all the components
        <RestaurantsContext.Provider value={{restaurants,setRestaurants, addRestaurants,
        selectedRestaurant,setSelectedRestaurant}}>
            {props.children}
        </RestaurantsContext.Provider>
    )
}