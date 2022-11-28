import React, { useEffect, useState } from "react";
import _ from "lodash";
import purchaseOptimization from "../utils/optimize";

export default function Optimize({ menu }) {
  const [budget, setBudget] = useState(10);
  const [nutrient, setNutrient] = useState("protein");
  const [optimized, setOptimized] = useState(null);

  useEffect(() => {
    console.log(nutrient);
  }, [nutrient]);

  return (
    <div>
      <form
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "1rem",
        }}
        onSubmit={(e) => {
          e.preventDefault();

          setOptimized(purchaseOptimization(budget, nutrient, menu));
        }}
      >
        <span>
          <label>
            Budget $
            <input
              type="number"
              value={budget}
              onChange={(e) => {
                setBudget(e.target.value);
              }}
            />
          </label>
          <select
            defaultValue={nutrient}
            onChange={(e) => {
              setNutrient(e.target.value);
            }}
          >
            <option value="protein">protein</option>
            <option value="calories">calories</option>
            <option value="carbs">carbs</option>
            <option value="sodium">sodium</option>
            <option value="sugar">sugar</option>
            <option value="fat">fat</option>
          </select>
        </span>
        <input type="submit" value="Optimize" />
      </form>

      {optimized && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div>
            {optimized.nutrient} {optimized.value}
            {_.map(optimized.purchase, (freq, food) => {
              return (
                <div key={`${food}-${freq}`}>
                  <span>
                    {freq} {food}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
