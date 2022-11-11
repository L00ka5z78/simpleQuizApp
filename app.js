const data = [                                                      //example data used in app just to show functionality
    {
        id: 1,
        question: "Which of these fish is actually a fish?",
        answers: [
            { answer: "swordfish", isCorrect: true },
            { answer: "jellyfish", isCorrect: false },
            { answer: "starfish", isCorrect: false },
            { answer: "crayfish", isCorrect: false },
        ],
    },
    {
        id: 2,
        question: "A flutter is a group of:",
        answers: [
            { answer: "bees", isCorrect: false },
            { answer: "penguins", isCorrect: false },
            { answer: "butterflies", isCorrect: true },
            { answer: "camels", isCorrect: false },
        ],
    },
    {
        id: 1,
        question: "A group of which animals is referred to as a wake?",
        answers: [
            { answer: "bats", isCorrect: false },
            { answer: "vultures", isCorrect: true },
            { answer: "ants", isCorrect: false },
        ],
    },
];

const gameScreen = document.querySelector(".game");
const resultScreen = document.querySelector(".result");
const question = document.querySelector(".question");
const answersContainer = document.querySelector(".answers");
const submit = document.querySelector(".submit");
const play = document.querySelector(".play");

let questionIndex = 0;
let correctCount = 0;
let wrongCount = 0;
let total = 0;
let selectedAnswer;

const playAgain = () => {                                                                 //function which restarts game
    questionIndex = 0;
    correctCount = 0;
    wrongCount = 0;
    total = 0;
    showQuestion(questionIndex);
};

play.addEventListener("click", () => {
    resultScreen.style.display = "none"                                                   // closing resultscreen container and opening game
    gameScreen.style.display = "block"
    playAgain();
})

const showResult = () => {
    resultScreen.style.display = "block"                                                 // closing gameScreen container and opening and displaying results
    gameScreen.style.display = "none"

    resultScreen.querySelector(".correct").textContent =
        `Correct answers: ${correctCount}`

    resultScreen.querySelector(".wrong").textContent =
        `Wrong answers: ${wrongCount}`

    resultScreen.querySelector(".score").textContent =
        `Score: ${(correctCount - wrongCount) * 10}`
}

const showQuestion = (questionNumber) => {
    if (questionIndex === data.length) return showResult();

    selectedAnswer = null;
    question.textContent = data[questionNumber].question;
    answersContainer.innerHTML = data[questionNumber].answers.map((item, index) =>      //injection of html into. Tis is not a function no {} after arrow
        `
        <div class="answer">
        <input name="answer" type="radio" id=${index} value=${item.isCorrect}>
        <label for=${index}>${item.answer}</label>
        </div>
        `
    ).join("");                                                                         //join emty string makes backtics invisible.without displays ` between radios

    selectAnswer()
};

const selectAnswer = () => {
    answersContainer.querySelectorAll("input").forEach(element => {
        element.addEventListener("click", (e) => {
            selectedAnswer = e.target.value;
        });
    });
};

const submitAnswer = () => {
    submit.addEventListener("click", () => {
        if (selectedAnswer !== null) {
            selectedAnswer === "true" ? correctCount++ : wrongCount++;
            questionIndex++;
            showQuestion(questionIndex);
        } else alert("Select a question")
    });
};

showQuestion(questionIndex);
submitAnswer();
