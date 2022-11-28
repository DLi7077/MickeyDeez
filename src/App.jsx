import { useEffect, useState } from "react";
import { getCombos, getFoods } from "./utils/api";
import "./App.css";
import Menu from "./components/menu";
import ComboMenu from "./components/ComboMenu";
import Optimize from "./components/Optimize";

const classes = {
  title: { fontSize: "3rem" },
  subtitle: { fontSize: "1.5rem", marginBottom: "1rem" },
};

function App() {
  const [sortBy, setSortBy] = useState("protein");
  const [sortDir, setSortDir] = useState("asc");
  const [foods, setFoods] = useState([]);
  const [combos, setCombos] = useState([]);

  async function retrieveFoods() {
    await getFoods(sortBy, sortDir).then((res) => {
      setFoods(res.result);
    });
  }
  async function retrieveCombos() {
    await getCombos().then((res) => {
      setCombos(res.result);
    });
  }

  useEffect(() => {
    retrieveFoods();
    retrieveCombos();
  }, []);

  return (
    <div className="App">
      <span style={classes.title}>Mickey Deez</span>
      <div>
        <span style={classes.subtitle}>Sample Menu</span>
        <form
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "1rem",
          }}
          onSubmit={async (e) => {
            e.preventDefault();
            await retrieveFoods();
          }}
        >
          <span>
            <code>api/food?sortBy=</code>
            <select
              defaultValue={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
              }}
            >
              <option value="price">price</option>
              <option value="protein">protein</option>
              <option value="calories">calories</option>
              <option value="carbs">carbs</option>
              <option value="sodium">sodium</option>
              <option value="sugar">sugar</option>
              <option value="fat">fat</option>
            </select>
          </span>
          <span>
            <code>&sortDir=</code>
            <select
              defaultValue={sortDir}
              onChange={(e) => {
                setSortDir(e.target.value);
              }}
            >
              <option value="asc">asc</option>
              <option value="desc">desc</option>
            </select>
          </span>
          <input type="submit" value="Send" />
        </form>
        <Menu menu={foods} />
        <div style={{ height: "4rem" }} />
        <div style={classes.subtitle}>Combo Menu</div>
        <ComboMenu combos={combos} />
        <div style={{ height: "4rem" }} />
        <div style={classes.subtitle}>Get the best bang for your buck</div>
     
        <Optimize menu={[...foods, ...combos]} />
      </div>
    </div>
  );
}

export default App;
