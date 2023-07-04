import { useLoaderData } from 'react-router-dom';
import {getMenu} from './../../Services/apiRestaurant'
import MenuItem from './MenuItem';
function Menu() {
  const menu = useLoaderData();
  return (
    <div>
      <ul>
        {menu.map((pizza,index)=><li><MenuItem key={index} pizza={pizza}></MenuItem></li>)}
      </ul>
    </div>
  );
}

export const  loader = async()=>{
  return await getMenu();
}


export default Menu;
