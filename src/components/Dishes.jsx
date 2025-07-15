import { useEffect, useState } from "react";
import DishItem from "./DishItem.jsx";
/**
 * A component that fetches the list of dishes from the backend and renders them as DishItem components.
 *
 * The component will render a "Loading..." message until the data has been fetched from the backend.
 *

 */
export default function Dishes() {
  const [dishesData, setDishesData] = useState();
  useEffect(() => {
    /**
     * Fetches the list of dishes from the backend API.
     *
     * Makes a GET request to the "/meals" endpoint to retrieve the available dishes.
     * On success, updates the state with the fetched data.
     * Logs an error message to the console if the request fails.
     */

    async function fetchDishes() {
      try {
        const response = await fetch("http://localhost:3000/meals");
        const dishes = await response.json();
        console.log(dishes);
        setDishesData(dishes);
      } catch (error) {
        console.log("Error: ", error);
      }
    }
    fetchDishes();
  }, []);
  return !dishesData ? (
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
