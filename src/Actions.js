import React, { useState } from "react";
// read: https://fontawesome.com/how-to-use/on-the-web/using-with/react
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCarrot } from "@fortawesome/free-solid-svg-icons";
import { faLeaf } from "@fortawesome/free-solid-svg-icons";
import { faBacon } from "@fortawesome/free-solid-svg-icons";
import data from "./data.json";

const Actions = (props) => {
  const { restaurants, setRestaurants } = props; //===const setRestaurants=props.setRestaurants;
  const [showSortSelector1, setSortSelector1] = useState(false);
  const [showSortSelector2, setSortSelector2] = useState(false);
  const [showSortSelector3, setSortSelector3] = useState(false);
  const [food, setFood] = useState({
    vegan: false,
    vegetarian: false,
    "non vegan": false,
  });

  //---------------------General Sort-------------------------//
  //Sort only the choices you have on screen
  const handeGeneralSorting = (restaurants, sortBy) => {
    let sortedRestaurants;
    if (sortBy === "maxDeliveryTime") {
      sortedRestaurants = [...restaurants].sort(
        (a, b) => a[sortBy] - b[sortBy]
      );
    } else {
      sortedRestaurants = [...restaurants].sort(
        (a, b) => b[sortBy] - a[sortBy]
      );
    }
    setRestaurants(sortedRestaurants);
  };

  //---------------------Price Range-------------------------//
  const priceRange = (restaurants, target) => {
    let currentTarget = Number(target);

    let filteredRestaurants = [];
    restaurants.forEach((restaurant) => {
      let menu = restaurant.menu;

      let maxMenuPrices = menu.map((category) => {
        let items = category.items; //max prices del menu

        let prices = items.map((item) => {
          return item.price; //array de prices por item
        });

        let maxItemsPrice = Math.max(...prices); //max price of every item
        return maxItemsPrice;
      });

      let maxRestaurantPrice = Math.max(...maxMenuPrices); //max price por restaurant

      if (maxRestaurantPrice <= currentTarget) {
        filteredRestaurants.push(restaurant);
      }
    });

    setRestaurants(filteredRestaurants);
  };

  //see for checkbox https://medium.com/@tariqul.islam.rony/multiple-checkbox-handling-by-react-js-84b1d49a46c6
  const typeOfFood = (restaurants, optionFood) => {
    //array of restaurants
    let filteredRestaurants = restaurants.filter((restaurant) => {
      //array of menus
      let filteredMenus = restaurant.menu.filter((menu) => {
        //true- false for every typeOfMeal
        let isTrueTypeOfMeal = menu.items.some((item) => {
          //check the state
          if (item.typeOfMeal === "vegetarian") {
            return optionFood.vegetarian;
          } else if (item.typeOfMeal === "vegan") {
            return optionFood.vegan;
          } else if (item.typeOfMeal === "non vegan") {
            return optionFood["non vegan"];
          } else {
            return false;
          }
        });

        return isTrueTypeOfMeal;
      });

      if (filteredMenus.length > 0) {
        return true;
      } else {
        return false;
      }
    });

    setRestaurants(filteredRestaurants);
  };

  return (
    <div className="actions">
      <span className="button-group">
        <button onClick={() => setSortSelector1(!showSortSelector1)}>
          <span>Sort</span> <FontAwesomeIcon icon={"chevron-down"} />
        </button>
        {showSortSelector1 && (
          <div>
            <label>
              Most popular
              <input
                value="popularity"
                type="radio"
                name="generalSort"
                onChange={(event) =>
                  handeGeneralSorting(
                    props.restaurants,
                    event.currentTarget.value
                  )
                }
              />
            </label>
            <label>
              Rating{" "}
              <input
                value="rating"
                type="radio"
                name="generalSort"
                onChange={(event) =>
                  handeGeneralSorting(
                    props.restaurants,
                    event.currentTarget.value
                  )
                }
              />
            </label>
            <label>
              Delivery time{" "}
              <input
                value="maxDeliveryTime"
                type="radio"
                name="generalSort"
                onChange={(event) =>
                  handeGeneralSorting(
                    props.restaurants,
                    event.currentTarget.value
                  )
                }
              />
            </label>
          </div>
        )}
      </span>

      {/*BOTON DE PRICE RANGE------------------------------ */}
      <span className="button-group">
        <button onClick={() => setSortSelector2(!showSortSelector2)}>
          <span>Price Range</span> <FontAwesomeIcon icon={"chevron-down"} />
        </button>
        {showSortSelector2 && (
          <div>
            <label>
              $
              <input
                value="100"
                type="radio"
                name="generalSort"
                onChange={(event) =>
                  priceRange(data.restaurants, event.currentTarget.value)
                }
              />
            </label>
            <label>
              $$
              <input
                value="200"
                type="radio"
                name="generalSort"
                onChange={(event) =>
                  priceRange(data.restaurants, event.currentTarget.value)
                }
              />
            </label>
            <label>
              $$$
              <input
                value="300"
                type="radio"
                name="generalSort"
                onChange={(event) =>
                  priceRange(data.restaurants, event.currentTarget.value)
                }
              />
            </label>
          </div>
        )}
      </span>

      {/*BOTON DE DIETARY CHOICE------------------------------ */}
      <span className="button-group">
        <button onClick={() => setSortSelector3(!showSortSelector3)}>
          <span>Dietary choice</span> <FontAwesomeIcon icon={"chevron-down"} />
        </button>
        {showSortSelector3 && (
          <div>
            <label>
              <FontAwesomeIcon icon={faCarrot} /> Vegetarian
              <input
                value="vegetarian"
                type="checkbox"
                name="generalSort"
                onChange={(event) => {
                  let optionFood = {
                    ...food,
                    vegetarian: event.target.checked,
                  };
                  setFood(optionFood);
                  typeOfFood(data.restaurants, optionFood);
                }}
                checked={food.vegetarian} // = start in false
                //checked=>true-false //see https://www.w3schools.com/jsref/prop_checkbox_checked.asp
              />
            </label>
            <label>
              <FontAwesomeIcon icon={faLeaf} />
              Vegan
              <input
                value="vegan"
                type="checkbox"
                name="generalSort"
                onChange={(event) => {
                  let optionFood = { ...food, vegan: event.target.checked };
                  setFood(optionFood);
                  typeOfFood(data.restaurants, optionFood);
                }}
                checked={food.vegan}
              />
            </label>
            <label>
              <FontAwesomeIcon icon={faBacon} />
              Non-vegan
              <input
                value="non vegan"
                type="checkbox"
                name="generalSort"
                onChange={(event) => {
                  let optionFood = {
                    ...food,
                    "non vegan": event.target.checked,
                  };
                  setFood(optionFood);
                  typeOfFood(data.restaurants, optionFood);
                }}
                checked={food["non vegan"]}
              />
            </label>
          </div>
        )}
      </span>
    </div>
  );
};
export default Actions;
