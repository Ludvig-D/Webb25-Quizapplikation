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
  geografi: [
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
  ],
  sport: [
    {
      question: "Vilken sport är Sveriges nationalsport?",
      answers: ["Hockey", "Fotboll", "Innebandy", "Cricket"],
      correctAnswer: 0,
    },
    {
      question: "Vilken sport är Norges nationalsport?",
      answers: ["Hockey", "Fotboll", "Längdskidåkning", "Cricket"],
      correctAnswer: 2,
    },
  ],
};
 const quizData = [
      {
        question: "Vad är HTML?",
        choices: [
          "Hypertext markup language",
          "Hypertext and markup language",
          "Hyperaktive media lead"
        ],
        correctIndex: 0,
        explanation: "HTML står för HyperText Markup Language – det används för att strukturera innehåll på webben."
      },
      {
        question: "Vad är CSS?",
        choices: [
          "Cascading style sheets",
          "Casablanca santa santa",
          "Casino spain spain"
        ],
        correctIndex: 0,
        explanation: "CSS står för Cascading Style Sheets – det används för att styla och formatera webbsidor."
      },
      {
        question: "Vad är JavaScript?",
        choices: [
          "Programmerings språk",
          "Datorer",
          "UV index design"
        ],
        correctIndex: 0,
        explanation: "JavaScript är ett programmeringsspråk som gör webbsidor interaktiva."
      }
    ];
    const quizQuestions = [
      {
        question: "Vad är HTTP?",
        answers: {
          a: "Hypertext Transfer Protocol",
          b: "Hypermarkup text tissue post",
          c: "Hyperexpert ten toes pound"
        },
        correctAnswer: "a"
      },
      {
        question: "Vad är en Array?",
        answers: {
          a: "En samling av element",
          b: "Ett moln",
          c: "Molntjänster i datorn"
        },
        correctAnswer: "a"
      }
    ];
    let current = 0;
    let score = 0;

    const quizDiv = document.getElementById('quiz');
    const submitBtn = document.getElementById('submitBtn');
    const nextBtn = document.getElementById('nextBtn');
    const resetBtn = document.getElementById('resetBtn');
    const resultDiv = document.getElementById('result');

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
  answersContainer.innerHTML = `
    <div class="results">
     <p>Du fick: ${score} av ${currentQuestions.length} rätt</p>
      <h1>${score > 0 ? "Bra jobbat!" : "bättre lycka nästa gång!"}</h1> 
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
