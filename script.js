const questions = [
    {
        question: "Which is the lagerest animal in the world?",
        answers: [
            { text: "Shark", correct: false},
            { text: "Blue Whale", correct: true},
            { text: "Elephant", correct: false},
            { text: "Giraffe", correct: false},
        ]
    },
    {
        question: "According to the Bible, Who's the first man on earth?",
        answers: [
            { text: "Paul", correct: false},
            { text: "Abel", correct: false},
            { text: "Samuel", correct: false},
            { text: "Adam", correct: true},
        ]
    },
    {
        question: "Which is the largest desert in the world?",
        answers: [
            { text: "Gobi", correct: false},
            { text: "Antarctica", correct: false},
            { text: "Sahara", correct: true},
            { text: "Kalahuri", correct: false},
        ]
    },
    {
        question: "Which is the smallest continent in the world?",
        answers: [
            { text: "Australia", correct: true},
            { text: "Africa", correct: false},
            { text: "Arctic", correct: false},
            { text: "Asia", correct: false},
        ]
    },
    {
        question: "Which is the smallest country in the world?",
        answers: [
            { text: "Bhutan", correct: false},
            { text: "Vatican", correct: true},
            { text: "Nepal", correct: false},
            { text: "Shri Lanka", correct: false},
        ]
    },
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Paris", correct: true},
            { text: "Cape-Town", correct: false},
            { text: "Nepal", correct: false},
            { text: "Lanka", correct: false},
        ]
    },
    {
        question: "Which fruit has the most vitamin C?",
        answers: [
            { text: "Lemon", correct: false},
            { text: "Kiwi", correct: true},
            { text: "Orange", correct: false},
            { text: "Grapefruit", correct: false},
        ]
    },
    {
        question: "Which element is a liquid at room temperature?",
        answers: [
            { text: "Mercury", correct: true},
            { text: "Gold", correct: false},
            { text: "Copper", correct: false},
            { text: "Platinum", correct: false},
        ]
    },
    {
        question: "Which country's flag is red, white, and blue?",
        answers: [
            { text: "UK", correct: false},
            { text: "France", correct: false},
            { text: "Australia", correct: false},
            { text: "USA", correct: true},
        ]
    },
    {
        question: "What is the hottest planet in solar system?",
        answers: [
            { text: "Venus", correct: true},
            { text: "Earth", correct: false},
            { text: "Mars", correct: false},
            { text: "Mercury", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}
function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = ('You scored '  + score + ' out of ' + questions.length);
    nextButton.innerHTML = "Play Again";
    nextButton.style.display =  "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();