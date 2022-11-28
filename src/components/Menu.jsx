import React from "react";

const classes = {
  table: {
    display: "flex",
    flexDirection: "column",
  },
  row: {
    gridColumn: "1 / span 9",
    display: "grid",
    gridTemplateColumns: "repeat(9,1fr)",
    gap: "0.5rem",
  },
  name: {
    gridColumn: "1 / span 2",
    display: "flex",
    justifyContent: "flex-start",
  },
  cell: {
    display: "flex",
    justifyContent: "flex-start",
  },
  lightbackground: {
    backgroundColor: "#2A2522",
  },
  darkbackground: {
    backgroundColor: "#38322E",
  },
};
function Headers() {
  return (
    <div
      style={{
        ...classes.row,
        borderBottom: "2px solid orange",
        marginBottom: "0.5rem",
        backgroundColor: "black",
      }}
    >
      <div style={classes.name}>Food Item</div>
      <div style={classes.cell}>Price</div>
      <div style={classes.cell}>Calories</div>
      <div style={classes.cell}>Protein (g)</div>
      <div style={classes.cell}>Carbs (g)</div>
      <div style={classes.cell}>Sodium (mg)</div>
      <div style={classes.cell}>Sugar (g)</div>
      <div style={classes.cell}>Fat (g)</div>
    </div>
  );
}

export default function Menu({ menu }) {
  return (
    <div style={classes.table}>
      <Headers />
      {menu.map((item, idx) => {
        const backgroundStyle =
          idx % 2 ? classes.lightbackground : classes.darkbackground;
        return (
          <div
            style={{ ...classes.row, ...backgroundStyle }}
            key={`food-item-${idx}`}
          >
            <div style={classes.name}>{item.name}</div>
            <div style={classes.cell}>${item.price.toFixed(2)}</div>
            <div style={classes.cell}>{item.calories}</div>
            <div style={classes.cell}>{item.protein}</div>
            <div style={classes.cell}>{item.carbs}</div>
            <div style={classes.cell}>{item.sodium}</div>
            <div style={classes.cell}>{item.sugar}</div>
            <div style={classes.cell}>{item.fat}</div>
          </div>
        );
      })}
    </div>
  );
}
