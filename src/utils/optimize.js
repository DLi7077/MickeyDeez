import _ from "lodash";

/**
 * @description - Remove poor choices
 * @example - why spend 5$ for 4g protein when there's a 3$ for 4g option?
 * @param {any[]} menu - the food menu
 * @param {string} nutrient - the nutrient to bias towards
 * @returns a cleaned menu biased for maximized nutrients
 */
function optimizedMenuForNutrient(menu, nutrient) {
  const sortedByNutrient = _.orderBy(
    menu,
    [nutrient, "price"],
    ["desc", "asc"]
  );
  const result = [];

  sortedByNutrient.forEach((item) => {
    if (!result.length) {
      result.push(item);
      return;
    }
    const previous = result[result.length - 1];

    // same value but higher price than previous
    const isScam =
      item.price > previous.price &&
      _.get(item, nutrient) >= _.get(previous, nutrient);

    // lower value but same price
    const isScam2 =
      item.price >= previous.price &&
      _.get(item, nutrient) < _.get(previous, nutrient);

    if (isScam || isScam2) return;

    result.push(item);
  });

  return result;
}

/**
 * @description Computes the best purchase for a biased nutrient
 * @param {number} budget - total amount spent
 * @param {string} nutrient
 * @param {any[]} menu - list of foods
 * @param {runs in O(MENU * PRICE) }
 * @returns an object containing total nutrient and list of items to buy
 */
function optimizePurchase(budget, nutrient, menu) {
  const CENTS = 100;
  const priceInCents = budget * CENTS + 1;
  const purchaseableItems = _.chain(menu)
    .filter((item) => item.price < budget)
    .orderBy("price", "asc")
    .value();

  const nutrientsDP = new Array(priceInCents).fill().map((_) => ({
    nutrient: 0,
    foods: [],
  }));

  // initialize DP array with optimized prices
  purchaseableItems.forEach((item) => {
    const itemPrice = Math.trunc(item.price * CENTS, 2);
    nutrientsDP[itemPrice].foods.push(item);
    nutrientsDP[itemPrice].nutrient += _.get(item, nutrient);
  });

  // breadth first search
  for (let currPrice = 159; currPrice < priceInCents; currPrice++) {
    let bestCombination = nutrientsDP[currPrice];
    purchaseableItems.forEach((item) => {
      const itemPrice = Math.trunc(item.price * CENTS, 2);
      const nutrientValue = _.get(item, nutrient);
      if (currPrice < itemPrice) return;

      const leftover = nutrientsDP[currPrice - itemPrice];
      // found better combination, update best
      if (leftover.nutrient + nutrientValue >= bestCombination.nutrient) {
        const updatedCombination = {
          nutrient: nutrientValue + leftover.nutrient,
          foods: [...leftover.foods, item],
        };
        bestCombination = updatedCombination;
      }

      nutrientsDP[currPrice] = bestCombination;
    });
  }

  return nutrientsDP[budget * CENTS];
}

export default function purchaseOptimization(budget, nutrient, menu) {
  const TAXES_LMAO = 0.0875;
  const budgetAfterTax = Math.trunc(budget / (1 + TAXES_LMAO));
  const optimizedMenu = optimizedMenuForNutrient(menu, nutrient);
  const optimizedPurchase = optimizePurchase(
    budgetAfterTax,
    nutrient,
    optimizedMenu
  );
  const spentOnFood = _.reduce(
    optimizedPurchase.foods,
    (total, curr) => {
      return (total += curr.price);
    },
    0
  );

  const foodSummary = _.reduce(
    optimizedPurchase.foods,
    (accumulator, curr) => {
      accumulator[curr.name] = (accumulator[curr.name] || 0) + 1;
      return accumulator;
    },
    {}
  );

  const result = {
    nutrient: nutrient,
    value: optimizedPurchase.nutrient,
    purchase: foodSummary,
    spent_on_food: spentOnFood,
    taxed: spentOnFood * TAXES_LMAO,
    total_spent: spentOnFood * (1 + TAXES_LMAO),
  };

  return result;
}
