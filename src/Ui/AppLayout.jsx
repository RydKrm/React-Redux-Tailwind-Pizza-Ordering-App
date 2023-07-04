import React from 'react';
import Header from './Header';
import CartOverview from '../features/Cart/CartOverview'
import { Outlet, useNavigation } from 'react-router-dom';
import Loader from './Loader';

const AppLayout = () => {
    const navigation = useNavigation();
    const isLoading = navigation.state==='loading';
    return (
        <div className='layout'>
            {isLoading && <Loader/>}
          <Header/>
           <CartOverview />
           <main> <Outlet/> </main>
        </div>
    );
};

export default AppLayout;