import Home from "./Ui/Home";
import Error from './Ui/Error'
import Menu,{loader as menuLoader} from "./features/Menu/Menu";
import Cart from "./features/Cart/Cart";
import Order,{Loader as orderLoader} from "./features/Order/Order.jsx";
import CreateOrder,{action as createOrderAction} from "./features/Order/CreateOrder";
import OrderItem from "./features/Order/OrderItem";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./Ui/AppLayout";

const router = createBrowserRouter([
  {
    element: <AppLayout></AppLayout>,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order",
        element: <Order />,
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
        action: createOrderAction,
      },
      {
        path: "/order/:orderId",
        element: <OrderItem />,
        loader: orderLoader,
        errorElement: <Error/>,
      },
    ],
  },
]);
function App() {
  return (
    <>
    <h2 className="text-2xl bg-green-700 ">Home Page made</h2>
    <RouterProvider router={router}> </RouterProvider>
    </>
  );
}

export default App;
