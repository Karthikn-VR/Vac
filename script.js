const quizData = [
    {
        question: "Which HTML element is used for the largest heading?",
        a: "<head>",
        b: "<h6>",
        c: "<h1>",
        d: "<heading>",
        correct: "c",
    },
    {
        question: "Which property is used to change the background color?",
        a: "bgcolor",
        b: "color",
        c: "background-color",
        d: "background",
        correct: "c",
    },
    {
        question: "What does CSS stand for?",
        a: "Colorful Style Sheets",
        b: "Creative Style Sheets",
        c: "Cascading Style Sheets",
        d: "Computer Style Sheets",
        correct: "c",
    },
    {
        question: "Which is the correct syntax for a comment in CSS?",
        a: "// comment",
        b: "/* comment */",
        c: "<!-- comment -->",
        d: "# comment",
        correct: "b",
    },
    {
        question: "How do you create a function in JavaScript?",
        a: "function myFunction()",
        b: "function:myFunction()",
        c: "function = myFunction()",
        d: "myFunction():function",
        correct: "a",
    },
    {
        question: "Which HTML element is used to define the footer?",
        a: "<footer>",
        b: "<bottom>",
        c: "<section>",
        d: "<footer-section>",
        correct: "a",
    },
    {
        question: "What is the correct CSS syntax to make all paragraphs bold?",
        a: "<p style='bold'>",
        b: "p {font-weight:bold;}",
        c: "<p style='font-size:bold;'>",
        d: "p {font:bold;}",
        correct: "b",
    },
    {
        question: "Which JavaScript event occurs when the user clicks on an HTML element?",
        a: "onchange",
        b: "onmouseclick",
        c: "onmouseover",
        d: "onclick",
        correct: "d",
    },
    {
        question: "How do you add a comment in JavaScript?",
        a: "'This is a comment",
        b: "<!-- This is a comment -->",
        c: "// This is a comment",
        d: "# This is a comment",
        correct: "c",
    },
    {
        question: "Which HTML attribute is used to define inline styles?",
        a: "class",
        b: "styles",
        c: "font",
        d: "style",
        correct: "d",
    }
];

const questionEl = document.getElementById("question");
const questionNumberEl = document.getElementById("questionNumber");
const answerEls = document.querySelectorAll(".answer");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("submit");
const timerEl = document.getElementById("time");

let currentQuiz = 0;
let score = 0;
let time = 600; // 10 minutes in seconds
let correctAnswers = [];

const timer = setInterval(updateTimer, 1000);

function loadQuiz() {
    deselectAnswers();

    const currentQuizData = quizData[currentQuiz];

    questionNumberEl.innerText = currentQuiz + 1;
    questionEl.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
}

function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false);
}

function getSelected() {
    let answer;
    answerEls.forEach(answerEl => {
        if (answerEl.checked) {
            answer = answerEl.id;
        }
    });
    return answer;
}

submitBtn.addEventListener("click", () => {
    const answer = getSelected();

    if (answer) {
        if (answer === quizData[currentQuiz].correct) {
            score++;
        }
        correctAnswers.push({
            question: quizData[currentQuiz].question,
            correctAnswer: quizData[currentQuiz].correct
        });

        currentQuiz++;

        if (currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            clearInterval(timer);
            showResults();
        }
    }
});

function updateTimer() {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    timerEl.innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    time--;

    if (time < 0) {
        clearInterval(timer);
        showResults();
    }
}

function showResults() {
    const resultHtml = `
        <h2>You finished!</h2>
        <p>Your score: ${score}/${quizData.length}</p>
        <button id="checkAnswers">Check Correct Answers</button>
        <button onclick="location.reload()">Retry</button>
    `;
    document.querySelector('.quiz-container').innerHTML = resultHtml;

    document.getElementById('checkAnswers').addEventListener('click', showCorrectAnswers);
}

function showCorrectAnswers() {
    let answersHtml = `<h2>Correct Answers</h2><ul>`;
    correctAnswers.forEach((item, index) => {
        answersHtml += `<li>Q${index + 1}: ${item.question} <br>Correct Answer: ${quizData[index][item.correctAnswer]}</li>`;
    });
    answersHtml += `</ul><button onclick="location.reload()">Retry</button>`;
    document.querySelector('.quiz-container').innerHTML = answersHtml;
}

loadQuiz();
