import React from "react";

const classes = {
  cell: {
    display: "flex",
    justifyContent: "space-between",
  },
};

function Card({ item }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "center",
        border: "1px solid white",
      }}
    >
      <span
        style={{
          fontSize: "1.15rem",
          display: "flex",
          justifyContent: "center",
          borderBottom: "1px solid orange",
        }}
      >
        {item.name}
      </span>
      <span style={{ display: "flex" }}>
        <code>
          [
          {item.foods.map((food, idx) => {
            return (
              <span key={`${item.name}-food-${idx}`}>
                {food.name}
                {idx != item.foods.length - 1 && ", "}
              </span>
            );
          })}
          ]
        </code>
      </span>
      <span style={{ width: "160px" }}>
        <div style={classes.cell}>
          <span>Price</span>
          <span>${item.price.toFixed(2)} </span>
        </div>
        <div style={classes.cell}>
          <span>Calories</span>
          <span>{item.calories} kcals</span>
        </div>
        <div style={classes.cell}>
          <span>Protein</span>
          <span>{item.protein} g</span>
        </div>
        <div style={classes.cell}>
          <span>Carbs</span>
          <span>{item.carbs} g</span>
        </div>
        <div style={classes.cell}>
          <span>Sodium</span>
          <span>{item.sodium} mg</span>
        </div>
        <div style={classes.cell}>
          <span>Sugar</span>
          <span>{item.sugar} g</span>
        </div>
        <div style={classes.cell}>
          <span>fat</span>
          <span>${item.fat} g</span>
        </div>
      </span>
    </div>
  );
}

export default function ComboMenu({ combos }) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "2rem",
        justifyContent: "center",
      }}
    >
      {combos.map((item, idx) => {
        return <Card key={`combo-${idx}`} item={item} />;
      })}
    </div>
  );
}
