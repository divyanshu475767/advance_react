import { useEffect } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { uiActions } from "./store/ui-slice";
import Notification from "./components/UI/Notification";
import { useSelector  , useDispatch} from "react-redux";

let isInitial = true;//so that we dont send cart for the first time because it will be empty na


function App() {

  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
const notification = useSelector(state=>state.ui.notification)
  // for handling async things

  const cart = useSelector((state) => state.cart);

  useEffect(() => {
  const sendCartData =async()=> { 
    
    dispatch(uiActions.showNotification({
      status:'pending',
      title:'Sending..',
      message:"sending cart data!"
    }))

    const response = await fetch("http://localhost:3000/postCart", {
      method: "put",
      body: JSON.stringify(cart),
    })
 
    if(!response.ok){
      dispatch(uiActions.showNotification({
        status:'error',
        title:'Error..',
        message:"Error sending file data!"
      }))
  
    }

    dispatch(uiActions.showNotification({
      status:'success',
      title:'Success..',
      message:"sent cart data successfully!"
    }))

  
  }

  if(isInitial){
    isInitial = false;
  return;
  }
  sendCartData();
  }, [cart,dispatch]);

  return (
    <>
    {notification && <Notification status={notification.status} message={notification.message} title={notification.title}/>}
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
    
</>
  );
}

export default App;
