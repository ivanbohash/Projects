function MixOrMatch(totalTime, cards) {
	this.cardsArray = cards;
	this.totalTime = totalTime;
	this.timeRemaining = totalTime;
	this.timer = document.getElementById('time-remaining');
	this.ticker = document.getElementById('flips');
}

MixOrMatch.prototype.startGame = function () {
	this.cardToCheck = null;
	this.totalClicks = 0;
	this.timeRemaining = this.totalTime;
	this.matchedCards = [];
	this.busy = true;
	this.shuffleCards();

	setTimeout(() => {
		this.shuffleCards();
		this.countDown = this.startCountDown();
		this.busy = false;
	}, 500);

	this.hideCards();
	this.timer.innerText = this.timeRemaining;
	this.ticker.innerText = this.totalClicks;
};

MixOrMatch.prototype.hideCards = function () {
	this.cardsArray.forEach(function (card) {
		card.classList.remove('visible');
		card.classList.remove('matched');
	});
};

MixOrMatch.prototype.canFlipCard = function (card) {
	return !this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck;
};

MixOrMatch.prototype.flipCard = function (card) {
	if (this.canFlipCard(card)) {
		this.totalClicks += 1;
		this.ticker.innerText = this.totalClicks;
		card.classList.add('visible');

		if (this.cardToCheck) {
			this.checkForCardMatch(card);
		} else {
			this.cardToCheck = card;
		}
	}
};

MixOrMatch.prototype.checkForCardMatch = function (card) {
	if (this.getCardType(card) === this.getCardType(this.cardToCheck)) {
		this.cardMatch(card, this.cardToCheck);
	} else {
		this.cardMisMatch(card, this.cardToCheck);
	}
	this.cardToCheck = null;
};

MixOrMatch.prototype.cardMatch = function (card1, card2) {
	this.matchedCards.push(card1);
	this.matchedCards.push(card2);
	card1.classList.add('matched');
	card2.classList.add('matched');
	if (this.matchedCards.length === this.cardsArray.length) this.victory();
};

MixOrMatch.prototype.cardMisMatch = function (card1, card2) {
	this.busy = true;
	setTimeout(() => {
		card1.classList.remove('visible');
		card2.classList.remove('visible');
		this.busy = false;
	}, 1000);
};

MixOrMatch.prototype.getCardType = function (card) {
	return card.getElementsByClassName('card-value')[0].src;
};

MixOrMatch.prototype.startCountDown = function () {
	return setInterval(() => {
		this.timeRemaining -= 1;
		this.timer.innerText = this.timeRemaining;
		if (this.timeRemaining === 0) {
			this.gameOver();
		}
	}, 1000);
};

MixOrMatch.prototype.gameOver = function () {
	clearInterval(this.countdown);
	document.getElementById('game-over-text').classList.add('visible');
};

MixOrMatch.prototype.victory = function () {
	clearInterval(this.countDown);
	document.getElementById('victory-text').classList.add('visible');
};

MixOrMatch.prototype.shuffleCards = function () {
	for (var i = this.cardsArray.length - 1; i > 0; i -= 1) {
		var randIndex = Math.floor(Math.random() * (i + 1));
		this.cardsArray[randIndex].style.order = i;
		this.cardsArray[i].style.order = randIndex;
	}
};

function ready() {
	var overlays = Array.from(document.getElementsByClassName('overlay-text'));
	var cards = Array.from(document.getElementsByClassName('card'));
	var game = new MixOrMatch(100, cards);

	overlays.forEach(function (overlay) {
		overlay.addEventListener('click', function () {
			overlay.classList.remove('visible');
			game.startGame();
		});
	});

	cards.forEach(function (card) {
		card.addEventListener('click', function () {
			game.flipCard(card);
		});
	});
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', ready());
} else {
	ready();
}
