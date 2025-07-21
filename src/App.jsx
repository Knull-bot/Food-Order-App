import Header from "./components/Header.jsx";
import Dishes from "./components/Dishes.jsx";
import { CartContextProvider } from "../store/CartContext.jsx";

function App() {

  return (
    <>
    <CartContextProvider>
      <Header />
      <Dishes />
    </CartContextProvider>
    </>
  );
}

export default App;
