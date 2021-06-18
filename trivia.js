//MODULOS

//ELEMENTOS HTML
let triviaForm = document.getElementById("trivia");
let questionsContainer = document.getElementById("questionsContent");
let amount = document.getElementById("amount");
let category = document.getElementById("category");
let difficulty = document.getElementById("difficulty");
let type = document.getElementById("type");
let answers = document.getElementsByClassName("answer");
//VARIABLES DE CONTROL
let questions;
let qIndex = 0;
let correct_index_answer;
let score = 0;
// //FUNCIONES

let getAPIData = e => {
  e.preventDefault();
  let url = `https://opentdb.com/api.php?amount=${amount.value}&category=${category.value}&difficulty=${difficulty.value}&type=${type.value}`;
  fetch(url)
    .then(response => {
      return response.json();
    })
    .then(data => {
      questions = data.results;
      startGame();
    })
    .catch(err => console.log(err));
};

const startGame = () => {
  questionsContainer.style.display = "flex";
  triviaForm.style.display = "none";

  //Variable para controlar preguntas una por una
  let currentQuestion = questions[qIndex];
  document.getElementById("questionName").innerText = currentQuestion.question;

  if (currentQuestion.incorrect_answers.length == 1) {
    document.getElementById("1").innerText = "True";
    document.getElementById("2").innerText = "False";
    document.getElementById("3").style.display = "none";
    document.getElementById("4").style.display = "none";
    if (currentQuestion.correct_answer === "True") correct_index_answer = 1;
    else correct_index_answer = 2;
  } else {
    document.getElementById("1").style.display = "Block";
    document.getElementById("2").style.display = "Block";
    document.getElementById("3").style.display = "Block";
    document.getElementById("4").style.display = "Block";

    correct_index_answer = Math.floor(Math.random() * 4) + 1;
    document.getElementById(correct_index_answer).innerText =
      currentQuestion.correct_answer;
    console.log(correct_index_answer);
    let j = 0;
    for (let i = 1; i <= 4; i++) {
      if (i === correct_index_answer) continue;
      document.getElementById(i).innerText =
        currentQuestion.incorrect_answers[j];
      j++;
    }
  }
};

const selectAnswer = id => {
  let answerId = id;
  console.log(answerId);
  if (answerId == correct_index_answer) {
    score = score + 1;
    console.log("Respuesta correcta !");
  } else {
    console.log("Respuesta incorrecta 💔");
  }
  console.log(qIndex == amount.value);

  if (qIndex < amount.value - 1) {
    qIndex++;
    startGame();
  } else if (qIndex == amount.value - 1) {
    showResults(score);
  }
};

const showResults = () => {
  console.log(`Juego terminado`);
  // questionsContainer.innerHTML = "";
  // let score = document.createElement("p");
  // score.innerText = `Juego terminado, puntuación: ${score}`;

  // let restartBtn = document.createElement("a");
  // restartBtn.setAttribute("href", "index.html");

  // questionsContainer.appendChild(score);
  // questionsContainer.appendChild(restartBtn);
};

//FOR QUE RECORRA TODOS LOS BOTONES

for (let i = 0; i < answers.length; i++) {
  const element = answers[i];
  element.addEventListener("click", () => selectAnswer(element.id));
}
//LISTENERS
triviaForm.addEventListener("submit", getAPIData);
