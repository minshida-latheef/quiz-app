// Quiz questions and answers
// The answer number starts from 0:
// 0 = first option, 1 = second, etc.

const questions = [
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: 1,
    explanation: "Mars is known as the Red Planet."
  },
  {
    question: "Which is the largest ocean on Earth?",
    options: [
      "Atlantic Ocean",
      "Indian Ocean",
      "Arctic Ocean",
      "Pacific Ocean"
    ],
    answer: 3,
    explanation: "The Pacific Ocean is the largest ocean."
  },
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: 2,
    explanation: "Paris is the capital of France."
  },
  {
    question: "Which animal is called the King of the Jungle?",
    options: ["Elephant", "Tiger", "Lion", "Leopard"],
    answer: 2,
    explanation: "The lion is commonly called the King of the Jungle."
  },
  {
    question: "Which is the smallest continent by land area?",
    options: ["Asia", "Africa", "Europe", "Australia"],
    answer: 3,
    explanation: "Australia is the smallest continent by land area."
  }
];

// Get HTML elements
const welcomeScreen = document.getElementById("welcome-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

const questionCount = document.getElementById("question-count");
const scoreLabel = document.getElementById("score-label");
const progressBar = document.getElementById("progress-bar");
const questionText = document.getElementById("question-text");
const answerList = document.getElementById("answer-list");
const feedback = document.getElementById("feedback");

const resultIcon = document.getElementById("result-icon");
const resultTitle = document.getElementById("result-title");
const resultMessage = document.getElementById("result-message");
const finalScore = document.getElementById("final-score");
const scorePercent = document.getElementById("score-percent");
const resultDetail = document.getElementById("result-detail");

// Quiz state
let currentQuestionIndex = 0;
let score = 0;
let answerSelected = false;

// Start or restart the quiz
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  answerSelected = false;

  welcomeScreen.hidden = true;
  resultScreen.hidden = true;
  quizScreen.hidden = false;

  showQuestion();
}

// Display one question and its answer options
function showQuestion() {
  answerSelected = false;

  const currentQuestion = questions[currentQuestionIndex];

  questionCount.textContent =
    `QUESTION ${currentQuestionIndex + 1} OF ${questions.length}`;

  scoreLabel.textContent = `Score: ${score}`;

  questionText.textContent = currentQuestion.question;

  progressBar.style.width =
    `${(currentQuestionIndex / questions.length) * 100}%`;

  feedback.textContent = "";
  feedback.className = "feedback";

  nextBtn.disabled = true;
  nextBtn.textContent =
    currentQuestionIndex === questions.length - 1
      ? "See Results →"
      : "Next Question →";

  // Remove the previous question's options
  answerList.replaceChildren();

  // Create four answer buttons
  currentQuestion.options.forEach((option, index) => {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "answer-btn";

    const letter = document.createElement("span");
    letter.className = "answer-letter";
    letter.textContent = String.fromCharCode(65 + index);
    letter.setAttribute("aria-hidden", "true");

    const answerText = document.createElement("span");
    answerText.textContent = option;

    button.append(letter, answerText);

    button.addEventListener("click", () => {
      selectAnswer(index);
    });

    answerList.appendChild(button);
  });
}

// Check the user's selected answer
function selectAnswer(selectedIndex) {
  // Prevent selecting more than one answer
  if (answerSelected) return;

  answerSelected = true;

  const currentQuestion = questions[currentQuestionIndex];
  const buttons = answerList.querySelectorAll(".answer-btn");

  const isCorrect = selectedIndex === currentQuestion.answer;

  // Disable all answer buttons and highlight the answers
  buttons.forEach((button, index) => {
    button.disabled = true;

    if (index === currentQuestion.answer) {
      button.classList.add("correct");
    } else if (index === selectedIndex) {
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;

    feedback.textContent =
      `Correct! ${currentQuestion.explanation}`;

    feedback.classList.add("correct-text");
  } else {
    feedback.textContent =
      `Incorrect. ${currentQuestion.explanation}`;

    feedback.classList.add("incorrect-text");
  }

  scoreLabel.textContent = `Score: ${score}`;

  // Allow the user to continue
  nextBtn.disabled = false;
}

// Move to the next question
function nextQuestion() {
  if (!answerSelected) return;

  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResults();
  }
}

// Display the final score and message
function showResults() {
  quizScreen.hidden = true;
  resultScreen.hidden = false;

  const percentage = Math.round(
    (score / questions.length) * 100
  );

  finalScore.textContent = `${score}/${questions.length}`;
  scorePercent.textContent = `${percentage}%`;

  resultDetail.textContent =
    `You answered ${score} out of ${questions.length} questions correctly.`;

  if (score === questions.length) {
    resultIcon.textContent = "🏆";
    resultTitle.textContent = "Perfect Score!";
    resultMessage.textContent =
      "Amazing! You answered every question correctly.";
  } else if (score >= 3) {
    resultIcon.textContent = "🎉";
    resultTitle.textContent = "Well Done!";
    resultMessage.textContent =
      "Great job! You have a good knowledge of general topics.";
  } else {
    resultIcon.textContent = "💪";
    resultTitle.textContent = "Keep Learning!";
    resultMessage.textContent =
      "Good effort! Try again and improve your score.";
  }

  progressBar.style.width = "100%";
}

// Button events
startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", startQuiz);