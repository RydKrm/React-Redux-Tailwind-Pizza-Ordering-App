import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../Services/apiRestaurant";
import Button from "../../Ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { getCart, getTotalCartPrice } from "../Cart/CartSlice";
import { formatCurrency } from "../../Utilits/helpers";
import { useState } from "react";
import { fetchAddress } from "../User/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);

  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state) => state.user);
  const isLoadingAddress = addressStatus === 'loading';
 
  const dispatch = useDispatch();
  const cart = useSelector(getCart);
  const navigation = useNavigation();
  const isSubmitting = navigation.state==='submitting';
  const formError = useActionData();
  let totalPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalPrice*0.2 : 0;
  totalPrice += priorityPrice;

  return (
 <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>
      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input className="input grow" type="text" name="customer" required />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            {formError?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formError.phone}
              </p>
            )}
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              required
            />
          </div>
          <Button type="small" className="border-2 border-slate-800 p-3" onClick={(e)=>{
           e.preventDefault();
           dispatch(fetchAddress());
          }} >Get position</Button>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
             value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button disabled={isSubmitting} type="primary" >
            {isSubmitting ? 'Placing order....' : `Order now with price ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export const action = async({request})=>{
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart:JSON.parse(data.cart),
    priority:data.priority==="true"
  }

  const errors={};
  if(!isValidPhone(order.phone)){
    errors.phone = "phone number is not valid, please give correct one";
  }
  //if(Object.keys(errors.length>0)) return errors;
  const newOrder = await createOrder(order);
  console.log("checking ",newOrder.id);
    // Do NOT overuse
  //store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`); 

}

export default CreateOrder;
