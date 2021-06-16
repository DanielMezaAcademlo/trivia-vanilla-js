// window.addEventListener("load", function() {});

//Containers
let triviaForm = document.getElementById("trivia");

let questionsContainer = document.getElementById("questionsContent");

//Variables para API
let amount = document.getElementById("amount");
let category = document.getElementById("category");
let difficulty = document.getElementById("difficulty");
let type = document.getElementById("type");

//Elementos de HTML

//Variables de Control
let questions;
let correct_index_answer;
let qIndex = 0;

//Funciones
const getQuestions = e => {
  e.preventDefault();
  const url = `https://opentdb.com/api.php?amount=${amount.value}&category=${category.value}&difficulty=${difficulty.value}&type=${type.value}`;
  fetch(url)
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(url);
      console.log(data);
      questions = data.results;
      nextQuestions();
    })
    .catch(error => {
      console.log(error);
    });
};

const nextQuestions = () => {
  if (qIndex == amount.value) {
    showFinalResults();
    return;
  }

  if (questions.length > 0) {
    triviaForm.style.display = "none";
    questionsContainer.style.display = "flex";
    let currentQuestion = questions[qIndex];
    document.getElementById("questionName").innerText =
      currentQuestion.question;

    if (currentQuestion.incorrect_answers.length == 1) {
      document.getElementById(1).innerHTML = "True";
      document.getElementById(2).innerHTML = "False";
      document.getElementById(3).style.display = "none";
      document.getElementById(4).style.display = "none";
      if (currentQuestion.correct_answer === "True") correct_index_answer = 1;
      else correct_index_answer = 2;
    } else {
      document.getElementById(3).style.display = "inline";
      document.getElementById(4).style.display = "inline";
      correct_index_answer = Math.floor(Math.random() * 4) + 1;
      document.getElementById(correct_index_answer).innerHTML =
        currentQuestion.correct_answer;
      let j = 0;
      for (let i = 1; i <= 4; i++) {
        if (i == correct_index_answer) continue;
        document.getElementById(i).innerHTML =
          currentQuestion.incorrect_answers[j];
        j++;
      }
    }
  }

  document.getElementById("question_index").innerHTML = qIndex + 1;
  document.getElementById("num_questions").innerHTML = amount.value;
  console.log(questions);
  console.log(correct_index_answer);
};

const showFinalResults = () => {
  console.log("Listo");
};

//Eventos
triviaForm.addEventListener("submit", getQuestions);
