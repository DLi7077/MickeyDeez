const BASE_URL = "https://localhost:7091/api";

export async function getFoods(sortBy, sortDir) {
  const response = await fetch(
    `${BASE_URL}/food?sortBy=${sortBy}&sortDir=${sortDir}`,
    {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    }
  );

  return response.json();
}

export async function getCombos() {
  const response = await fetch(
    `${BASE_URL}/combo`,
    {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    }
  );

  return response.json();
}
