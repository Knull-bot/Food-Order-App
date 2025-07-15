import { useEffect, useState } from "react";
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
        <li key={dish.id}>{dish.name}</li>
      ))}
    </ul>
  );
}
