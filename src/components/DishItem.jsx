import Button from "../components/UI/Button.jsx";
import { useContext } from "react";
import { CartContext } from "../store/CartContext.jsx";
/**
 * A component to display a dish item in the menu.
 * It displays a photo of the dish, the name, the price, a description and an "Add to cart" button.
 * The price is formatted according to the locale "de-DE" and the currency "EUR".
 */
export default function DishItem({ id, description, image, name, price }) {
  const { addItem } = useContext(CartContext);

  function handleAddDishToCart(id, name, price) {
    addItem({ id, name, price });
  }
  return (
    <li className="meal-item" key={id}>
      <article>
        <img src={`../../backend/public/${image}`} alt={name} />
        <div>
          <h3>{name}</h3>
          <p className="meal-item-price">
            {new Intl.NumberFormat("de-DE", {
              style: "currency",
              currency: "EUR",
            }).format(price)}
          </p>
          <p className="meal-item-description">{description}</p>
        </div>

        <p className="meal-item-actions">
          <Button onClick={() =>handleAddDishToCart(id, name, price)}>Add to cart</Button>
        </p>
      </article>
    </li>
  );
}
