import React from 'react';
import Button from '../../Ui/Button';
import { useDispatch } from 'react-redux';
import { decreaseItemQuantity, increaseItemQuantity } from './CartSlice';

const CartUpdateQuantity = ({pizzaId}) => {
    const dispatch = useDispatch();
    return (
        <div className='flex gap-1 items-center md:gap-3'>
            <Button type="round" onClick={()=>{dispatch(increaseItemQuantity(pizzaId))}}>+</Button>
            <Button type="round" onClick={()=>{dispatch(decreaseItemQuantity (pizzaId))}}>-</Button>
        </div>
    );
};

export default CartUpdateQuantity;