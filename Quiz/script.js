const quizData = [
	{
		question: 'How old is Elon Musk?',
		a: '12',
		b: '28',
		c: '50',
		d: '103',
		correct: 'c',
	},
	{
		question: 'What is the most popular programming language in 2021',
		a: 'Java',
		b: 'Python',
		c: 'JavaScript',
		d: 'C',
		correct: 'b',
	},
	{
		question: 'Who is the President of USA?',
		a: 'Joe Biden',
		b: 'Ivan Bohash',
		c: 'Donald Trump',
		d: 'Arnold Schwarzenegger',
		correct: 'a',
	},
	{
		question: 'What does HTML stand for?',
		a: 'Cascading Style Sheet',
		b: 'Helicopters Terminals Mosquito Lannisters',
		c: 'Jason Object Notation',
		d: 'Hypertext Markup Language',
		correct: 'd',
	},
	{
		question: "Who is Luke Skywalker's father?",
		a: 'Boba Fett',
		b: 'Anakin Skywalker',
		c: 'R2-D2',
		d: 'Chewbacca',
		correct: 'b',
	},
];

const quiz = document.getElementById('quiz');
const answerEls = document.querySelectorAll('.answer');
const questionEl = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitBtn = document.getElementById('submit');

let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
	deselectAnswers();
	const currentQuizData = quizData[currentQuiz];
	questionEl.innerText = currentQuizData.question;
	a_text.innerText = currentQuizData.a;
	b_text.innerText = currentQuizData.b;
	c_text.innerText = currentQuizData.c;
	d_text.innerText = currentQuizData.d;
}

function getSelected() {
	let answer;

	answerEls.forEach(function (answerEl) {
		if (answerEl.checked) {
			answer = answerEl.id;
		}
	});
	return answer;
}

function deselectAnswers() {
	answerEls.forEach(function (answerEl) {
		answerEl.checked = false;
	});
}

submitBtn.addEventListener('click', function () {
	const answer = getSelected();

	if (answer) {
		if (answer === quizData[currentQuiz].correct) {
			score += 1;
		}

		currentQuiz += 1;

		if (currentQuiz < quizData.length) {
			loadQuiz();
		} else {
			quiz.innerHTML = `
				<h2>You answered correctly at ${score}/${quizData.length} questions.</h2>

				<button onclick="location.reload()">Reload</button>
			`;
		}
	}
});
