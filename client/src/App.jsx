import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './routes/Home';
import RestaurantDetailPage from './routes/RestaurantDetailPage';
import RestaurantUpdatePage from './routes/RestaurantUpdatePage';
import { RestaurantsContextProvider } from './context/RestaurantsContext';

const App = () => {
    return(
    <RestaurantsContextProvider>
        <div className='container'>
        <Router>
            <Routes>
                <Route exact path = '/'  Component={Home}></Route>
                <Route exact path = '/restaurants/:id'  Component={RestaurantDetailPage}></Route>
                <Route exact path = '/restaurants/:id/update'  Component={RestaurantUpdatePage}></Route>
            </Routes>
            </Router>        
    </div>
    </RestaurantsContextProvider>
    )
    
}

export default App;