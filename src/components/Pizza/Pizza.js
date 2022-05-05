import React, { useContext, useState } from "react";
import { Navigate, useParams } from "react-router";
import { CartContext } from "../../context/cartContext";

function Pizza() {
  const { pizzaName } = useParams();
  const { pizzaProducts, addToCart } = useContext(CartContext);
  const currentPizza = pizzaProducts.find(e=>e.name.toLowerCase()===pizzaName.toLowerCase());
  const [currentPrice, setCurrentPrice] = useState(currentPizza.priceSmall);
  const [counter, setCounter] = useState(1);
  const pizzas = pizzaProducts.map((pizza) => pizza.name.toLowerCase());
  if (!pizzas.includes(pizzaName.toLowerCase())) {
    return <Navigate to={"pizza"} replace />;
  }

  
  return (
        <div key={currentPizza.id} className="productDetails">
          <div className="imageLeft">
          <img src={currentPizza.image} alt={currentPizza.name} />
          </div>
          <div className="textRight">
          <h1>{currentPizza.name}</h1>
          <p>{currentPizza.ingredients}</p>
          <h1 className="priceBig">{currentPizza.priceSmall} ден - {currentPizza.priceBig} ден</h1>
          <p>Големина: </p>
          <button onClick={() => setCurrentPrice(currentPizza.priceSmall)}>МАЛА</button>
          <button onClick={() => setCurrentPrice(currentPizza.priceBig)}>ГОЛЕМА</button>
          <br></br>
          <br></br>
          <h1 className="priceBig">{currentPrice} ден</h1>
          <div className="quantitySelector">
            {" "}
            <span
              onClick={() => {
                if (counter > 1) {
                  setCounter(counter - 1);
                }
              }}
              style={{cursor:"pointer"}}
            >
              -
            </span>{" "}
            {counter} <span onClick={() => setCounter(counter + 1)} style={{cursor:"pointer"}}>+</span>
          </div>
          <button id="order" onClick={() => addToCart(currentPizza.id, counter, "Мала")}>Buy Pizza</button>
          </div>
        </div>
  );
}

export default Pizza;
