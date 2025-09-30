const jokeEl = document.getElementById("joke");
const btn = document.getElementById("btn");

async function getJoke() {
  jokeEl.textContent = "Loading...😂";

  try {
    const response = await fetch("https://official-joke-api.appspot.com/random_joke");
    const data = await response.json();

    jokeEl.textContent = `${data.setup} - ${data.punchline}`;
  } catch (error) {
    jokeEl.textContent = "Oops! Couldn’t fetch a joke.";
    console.error(error);
  }
}

btn.addEventListener("click", getJoke);
