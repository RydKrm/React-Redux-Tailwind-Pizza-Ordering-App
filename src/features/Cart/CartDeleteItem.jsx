import React from 'react';
import Button from '../../Ui/Button';
import {deleteItem} from './CartSlice';
import { useDispatch } from 'react-redux';

const CartDeleteItem = ({pizzaId}) => {
    const dispatch = useDispatch();
    return (
        <Button type="small" onClick={()=>{dispatch(deleteItem(pizzaId))}}> Delete </Button>
    );
};

export default CartDeleteItem;