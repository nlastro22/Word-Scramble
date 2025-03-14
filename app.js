const words = [
  "Flower",
  "Abroad",
  "Casual",
  "Around",
  "Couple",
  "Accept",
  "Caught",
  "Arrive",
  "Course",
  "Access",
  "Centre",
  "Artist",
  "Covers",
  "Across",
  "Centum",
  "Aspect",
  "Create",
  "Acting",
  "Chance",
  "Assess",
  "Credit",
  "Action",
  "Change",
  "Assist",
  "Crisis",
  "Active",
  "Charge",
  "Assume",
  "Custom",
  "Actual",
  "Choice",
  "Attack",
  "Damage",
  "Advice",
  "Choose",
  "Attend",
  "Danger",
  "Advise",
  "Chosen",
  "August",
  "Dealer",
  "Affect",
  "Church",
  "Author",
  "Debate",
  "Afford",
  "Circle",
  "Avenue",
  "Decade",
  "Afraid",
  "Client",
  "Backed",
  "Decide",
  "Agency",
  "Closed",
  "Barely",
  "Defeat",
  "Agenda",
  "Closer",
  "Battle",
  "Defend",
  "Almost",
  "Coffee",
  "Beauty",
  "Define",
  "Always",
  "Column",
  "Became",
  "Degree",
  "Amount",
  "Combat",
  "Become",
  "Demand",
  "Animal",
  "Coming",
  "Before",
  "Depend",
  "Annual",
  "Common",
  "Behalf",
  "Deputy",
  "Answer",
  "Comply",
  "Behind",
  "Desert",
  "Anyone",
  "Copper",
  "Belief",
  "Design",
  "Anyway",
  "Corner",
  "Belong",
  "Desire",
  "Appeal",
  "Costly",
  "Beaker",
  "Detail",
  "Appear",
  "County",
  "Better",
  "Detect",
  "Beyond",
  "Budget",
  "During",
  "Device",
  "Bishop",
  "Burden",
  "Easily",
  "Differ",
  "Border",
  "Bureau",
  "Eating",
  "Dinner",
  "Bottle",
  "Button",
  "Editor",
  "Direct",
  "Bottom",
  "Camera",
  "Effect",
  "Doctor",
  "Bought",
  "Cancer",
  "Effort",
  "Dollar",
  "Branch",
  "Cactus",
  "Eighth",
  "Domain",
  "Breath",
  "Carbon",
  "Either",
  "Double",
  "Bridge",
  "Career",
  "Eleven",
  "Driven",
  "Bright",
  "Castle",
  "Emerge",
  "Driver",
];

function randWord() {
  const randIndex = Math.floor(Math.random() * words.length);
  return words[randIndex];
}

function changeOrder(randWord) {
  randWord = randWord.toLowerCase();
  console.log(randWord);
  let slova = randWord.split("");
  for (let i = 0; i < slova.length; i++) {
    const randomIndex = Math.floor(Math.random() * slova.length);
    let pom = slova[randomIndex];
    slova[randomIndex] = slova[i];
    slova[i] = pom;
  }
  let novaRijec = slova.join("");
  return {
    novaRijec: novaRijec,
    randWord: randWord,
  };
}
let rezultat = changeOrder(randWord());
let novaRijec = rezultat.novaRijec;
let rijec = rezultat.randWord.split("");
const tries = document.querySelector("#tries");
const btnRandom = document.querySelector("#btnRandom");
const dots = document.querySelectorAll(".dot");
const misstakeLetters = document.querySelector("#missLetters");
const h2 = document.querySelector("h2");
h2.innerText = novaRijec;

const inputs = document.querySelectorAll("input");
let j = 0;

// Reset funkcija koja se koristi za btnRandom i btnReset
function randomGame() {
  rezultat = changeOrder(randWord());
  novaRijec = rezultat.novaRijec;
  rijec = rezultat.randWord.split("");

  h2.innerText = novaRijec;
  tries.innerHTML = "0";
  misstakeLetters.innerHTML = "";
  dots.forEach((dot) => {
    dot.classList.remove("active");
  });

  inputs.forEach((input) => {
    input.value = "";
  });

  j = 0;
}

for (let i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener("input", () => {
    if (inputs[i].value.length === 1 && i < inputs.length - 1) {
      inputs[i + 1].focus();
    }

    if (rijec[i] !== inputs[i].value.toLowerCase()) {
      const wrongLetter = inputs[i].value;

      if (
        !misstakeLetters.innerHTML.includes(wrongLetter) &&
        wrongLetter !== ""
      ) {
        if (misstakeLetters.innerHTML === "") {
          misstakeLetters.innerHTML = wrongLetter;
        } else {
          misstakeLetters.innerHTML += "," + wrongLetter;
        }
      }

      if (j < 5 && inputs[i].value !== "") {
        dots[j].classList.add("active");
        j++;
        tries.innerHTML = j;
      }
    }

    if (i === inputs.length - 1 || tries.innerHTML == 5) {
      let inputRijec = "";
      inputs.forEach((input) => {
        inputRijec += input.value;
      });

      if (rijec.join("") === inputRijec) {
        alert("Success");
      }
      if (j === 5) {
        resetGame();
        alert(
          `You did not win the game, the word was: ${rijec.join("")}. Try again`
        );
      }
    }
  });
}
function resetGame() {
  inputs.forEach((input) => {
    input.value = "";
  });
}

btnRandom.addEventListener("click", (e) => {
  e.preventDefault();
  randomGame();
});

btnReset.addEventListener("click", resetGame);
