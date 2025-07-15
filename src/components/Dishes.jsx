import { useEffect, useState } from "react";
import DishItem from "./DishItem.jsx";
export default function Dishes() {
  const [dishesData, setDishesData] = useState();
  useEffect(() => {
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
