const questions = [
    {
        question: "Which is Largest animal in the world?",
        answers: [
            {text: "Shark", correct: false},
            {text: "Blue Whale", correct: false},
            {text: "Ostrich", correct: false},
            {text: "You", correct: true},
        ]
    },
    {
        question: "Which is Largest building in the world?",
        answers: [
            {text: "Burj Khalifa", correct: false},
            {text: "Unity statue", correct: false},
            {text: "Empire State", correct: false},
            {text: "Ambani ka Ghar", correct: true},
        ]
    },
    {
        question: "Which month is my birthday?",
        answers: [
            {text: "Feb 27 2006", correct: false},
            {text: "Jan", correct: false},
            {text: "Feb", correct: true},
            {text: "March", correct: false},
        ]
    },
    {
        question: "Which has highest protein?",
        answers: [
            {text: "egg", correct: false},
            {text: "Daal", correct: false},
            {text: "Chicken", correct: true},
            {text: "Panner", correct: false},
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
    nextButton.innerHTML ="Next";
    showQuestion();
}

function showQuestion(){
    resetState();

    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    };
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

    Array.from(answerButtons.children).forEach(button =>{
       if(button.dataset.correct === "true"){
            button.classList.add("correct");
       }
       button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "Block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();