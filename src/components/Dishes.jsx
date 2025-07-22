import DishItem from "./DishItem.jsx";
import useHttp from "../hooks/useHttp.jsx";
/**
 * A component that fetches the list of dishes from the backend and renders them as DishItem components.
 *
 * The component will render a "Loading..." message until the data has been fetched from the backend.
 *

 */

const requestConfig = {};
export default function Dishes() {
  const {
    isFetching,
    error,
    fetchedData: dishesData,
  } = useHttp("http://localhost:3000/meals", requestConfig, []);
  return isFetching ? (
    <p>"Loading..."</p>
  ) : (
    <ul id="meals">
      {dishesData.map((dish) => (
        <DishItem
          key={dish.id}
          id={dish.id}
          description={dish.description}
          image={dish.image}
          name={dish.name}
          price={dish.price}
        />
      ))}
    </ul>
  );
}
