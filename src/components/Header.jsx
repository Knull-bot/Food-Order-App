import logo from "../assets/logo.jpg";
import Button from "./UI/Button.jsx";
import { useContext } from "react";
import { CartContext } from "../store/CartContext.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";

/**
 * The Header component is responsible for rendering the main header of the
 * application. It contains the logo of the restaurant and a link to the cart.
 *
 */
export default function Header() {
  const { items } = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const numberOfItems = items.reduce((totalNumberOfTheItems, item) => {return totalNumberOfTheItems + item.quantity}, 0);

  function handleShowCart() {
    userProgressCtx.showCart();
  }
  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="A restaurant logo" />
        <h1>ReactFood</h1>
      </div>
      <nav>
        <Button textOnly={true} onClick={handleShowCart}>Cart ({numberOfItems})</Button>
      </nav>
    </header>
  );
}
