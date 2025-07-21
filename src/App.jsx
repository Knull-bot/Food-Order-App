import Header from "./components/Header.jsx";
import Dishes from "./components/Dishes.jsx";
import Cart from "./components/Cart.jsx";
import { CartContextProvider } from "./store/CartContext.jsx";
import { UserProgressContextProvider } from "./store/UserProgressContext.jsx";

function App() {

  return (
    <>
    <CartContextProvider>
      <UserProgressContextProvider>
        <Header />
        <Dishes />
        <Cart />
      </UserProgressContextProvider>
    </CartContextProvider>
    </>
  );
}

export default App;
