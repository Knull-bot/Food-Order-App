import Button from "../components/UI/Button.jsx";
export default function DishItem({ id, description, image, name, price }) {
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
          <Button>Add to cart</Button>
        </p>
      </article>
    </li>
  );
}
