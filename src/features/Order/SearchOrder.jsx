import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchOrder = () => {
   const [query,setQuery] = useState('');
   const navigate = useNavigate();
   const handleSubmit = (e)=>{
     e.preventDefault();
     if(query==='') return;
     navigate(`order/${query}`);
     setQuery('');
   }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" 
             onChange={(e)=>{setQuery(e.target.value)}} 
             placeholder='Search for Order'
             value={query}
             />
        </form>
    );
};

export default SearchOrder;