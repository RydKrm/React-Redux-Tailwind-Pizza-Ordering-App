import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalCartPrice, getTotalCartQuantity} from "./CartSlice";
import { formatCurrency } from "../../Utilits/helpers";

function CartOverview() {
  const quantity = useSelector(getTotalCartQuantity);
  const price = useSelector(getTotalCartPrice);
  if(!price) return null;
  return (
    <div className="flex items-center justify-between bg-stone-800 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
        <span>{quantity} pizzas</span>
        <span>{formatCurrency(price)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
