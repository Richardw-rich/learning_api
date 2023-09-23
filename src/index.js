const img = document.querySelector("img");
const body = document.getElementById("container");

async function gifGenerator(searchString = "toothbrush") {
  console.log(searchString);
  try {
    const api_key = "PVFrxOUIFOp6sec5mHNwbB0vz077UMDs";
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/translate?api_key=${api_key}&s=${searchString}`,
      { mode: "cors" },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const responseData = await response.json();
    img.src = responseData.data.images.original.url;
  } catch (error) {
    console.error("Failed to fetch GIF:", error);
  }
}

function debounce(func, delay) {
  let timer;
  return function randomFunction(...args) {
    const context = this;
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(context, args), delay);
  };
}
const createButton = document.createElement("button");
createButton.innerText = "Random New GIF";
createButton.addEventListener("click", () => gifGenerator());
body.appendChild(createButton);

const searchBar = document.createElement("input");
searchBar.type = "text";
searchBar.id = "search";
searchBar.name = "SearchBar";
searchBar.placeholder = "Search for a GIF!";

searchBar.addEventListener(
  "keyup",
  debounce(async () => {
    const userValue = searchBar.value.trim();
    if (userValue) await gifGenerator(userValue);
  }, 1000),
);
body.appendChild(searchBar);

gifGenerator();
