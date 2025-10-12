const categorySelect = document.getElementById("category-select");
const startBtn = document.getElementById("start-btn");
const startPage = document.getElementById("start-page");
const questionsPage = document.getElementById("questions-page");

const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const questionCounter = document.getElementById("question-counter");

let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;

// Frågor och svar i ett objekt
const categories = {
  Geografi: [
    {
      question: "Vad heter huvudstaden i Sverige?",
      answers: ["Stockholm", "Oslo", "Köpenhamn", "Uppsala"],
      correctAnswer: 0,
    },
    {
      question: "Vad heter huvudstaden i Norge?",
      answers: ["Stockholm", "Oslo", "Köpenhamn", "Uppsala"],
      correctAnswer: 1,
    },
    {
      question: "Vad heter huvudstaden i Danmark?",
      answers: ["Stockholm", "Oslo", "Köpenhamn", "Uppsala"],
      correctAnswer: 2,
    },
    {
      question: "Vad heter huvudstaden i Finland?",
      answers: ["Stockholm", "Helsingfors", "Köpenhamn", "Uppsala"],
      correctAnswer: 1,
    },
    {
      question: "Vad heter huvudstaden i Tyskland?",
      answers: ["Stockholm", "Oslo", "Berlin", "Uppsala"],
      correctAnswer: 2,
    },
  ],
  Sport: [
    {
      question: "Vilken sport är Sveriges nationalsport?",
      answers: ["Hockey", "Fotboll", "Innebandy", "Cricket"],
      correctAnswer: 0,
    },
    {
      question: "Hur många spelare finns det i ett fotbollslag på planen?",
      answers: ["10", "12", "9", "11"],
      correctAnswer: 3,
    },
    {
      question: "Vilken svensk tennisspelare vann Wimbledon fem gånger?",
      answers: [
        "Stefan Edberg",
        "Mats Wilander",
        "Björn Borg",
        "Robin Soderling",
      ],
      correctAnswer: 2,
    },
    {
      question: "Vilket år arrangerades OS i Stockholm?",
      answers: ["1908", "1912", "1916", "1920"],
      correctAnswer: 1,
    },
    {
      question: "Vilken sport kallas 'The Beautiful Game'?",
      answers: ["Tennis", "Basket", "Golf", "Fotboll"],
      correctAnswer: 3,
    },
  ],
  Webbprogramering: [
    {
      question: "Vad är HTML?",
      answers: [
        "Hypertext and markup language",
        "Hypertext markup language",
        "Hyperaktive media lead",
      ],
      correctAnswer: 1,
    },
    {
      question: "Vad är CSS?",
      answers: [
        "Casablanca santa santa",
        "Casino spain spain",
        "Cascading style sheets",
      ],
      correctAnswer: 2,
    },
    {
      question: "Vad är JavaScript?",
      answers: ["Programmerings språk", "Datorer", "UV index design"],
      correctAnswer: 0,
    },
    {
      question: "Vad är HTTP?",
      answers: [
        "Hypermarkup text tissue post",
        "Hypertext Transfer Protocol",
        "Hyperexpert ten toes pound",
      ],
      correctAnswer: 1,
    },
    {
      question: "Vad är en Array?",
      answers: ["En samling av element", "Ett moln", "Molntjänster i datorn"],
      correctAnswer: 0,
    },
  ],
};

function loadCategories() {
  const categoryNames = Object.keys(categories);
  for (let i = 0; i < categoryNames.length; i++) {
    const catOption = document.createElement("option");
    catOption.innerText = categoryNames[i];
    catOption.value = categoryNames[i];
    categorySelect.appendChild(catOption);
  }
}
loadCategories();

// hämta frågorna för vald kategori på onclick
startBtn.addEventListener("click", () => {
  const selectedCategory = categorySelect.value;
  console.log("Vald kategori:", selectedCategory);

  currentQuestions = categories[selectedCategory];
  currentQuestionIndex = 0;

  showQuestionsPage();
});

// Gå till questions page
function showQuestionsPage() {
  startPage.style.display = "none";
  questionsPage.style.display = "flex";

  loadQuestion();
}

function loadQuestion() {
  if (currentQuestionIndex >= currentQuestions.length) {
    showResults();
    return;
  }
  answersContainer.innerHTML = "";

  const currentQuestion = currentQuestions[currentQuestionIndex]; // för lite mer lätläst så skapar jag till denna variabel

  questionText.textContent = currentQuestion.question;

  questionCounter.textContent = `Fråga ${currentQuestionIndex + 1} av ${
    currentQuestions.length
  }`;

  // Skapa svarsalternativ knapparna
  currentQuestion.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.className = "answer-btn";
    button.textContent = answer;
    button.addEventListener("click", function () {
      handleAnswer(index);
    });
    answersContainer.appendChild(button);
  });
}

// kolla om svaret är rätt eller fel
function handleAnswer(selectedIndex) {
  const currentQuestion = currentQuestions[currentQuestionIndex];

  if (selectedIndex === currentQuestion.correctAnswer) {
    console.log("Rätt svar!");
    score++;
  } else {
    console.log(
      "Fel svar! Rätt svar var:",
      currentQuestion.answers[currentQuestion.correctAnswer]
    );
  }

  currentQuestionIndex++;

  loadQuestion();
}

//ersätt knapparna med en innerHTML , visa resultatet och en conditional för om du inte får några rätt
function showResults() {
  questionText.textContent = "Quiz slutfört!";
  console.log(answersContainer);

  answersContainer.innerHTML = `
    <div class="results">
     <p>Du fick: ${score} av ${currentQuestions.length} rätt</p>
      <h1>${score > 0 ? "Bra jobbat!" : "Bättre lycka nästa gång!"}</h1> 
      <button class="answer-btn" onclick="restartQuiz()">Spela igen</button>
    </div>
  `;
  questionCounter.textContent = "";
}

//gå tillbaka till start sidan och återställ variablerna
function restartQuiz() {
  startPage.style.display = "flex";
  questionsPage.style.display = "none";

  score = 0;
  currentQuestionIndex = 0;
  currentQuestions = [];
}
