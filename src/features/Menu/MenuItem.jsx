import { formatCurrency } from "../../Utilits/helpers";
import Button from "../../Ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { addItem, getCurrentQuantityById } from "../Cart/CartSlice";
import CartDeleteItem from "../Cart/CartDeleteItem";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();
  const currentQuantity = useSelector(getCurrentQuantityById(id));
  const isInCart = currentQuantity>0;

  const handleSubmit = ()=> {
    const newItem = {
            pizzaId:id,
            name,
            quantity:1,
            unitPrice,
            totalPrice: unitPrice*1,
        }
    dispatch(addItem(newItem));    
  }

  return (
 <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? 'opacity-70 grayscale' : ''}`}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(', ')}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}
          {isInCart  && <CartDeleteItem pizzaId={id}/>}

          {!soldOut && !isInCart && <Button onClick={handleSubmit} type="small">Add to cart</Button>}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
