var randomBtn = document.getElementById('random-btn');
var inputField = document.getElementById('input-search');
var displayCard = document.querySelector('.cards');
var wikiUrl =
  'https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=';

function randomWikiPage() {
  window.open('https://en.wikipedia.org/wiki/Special:Random');
}

function getValue(event) {
  if (event.target.value.length) {
    getWikiData(wikiUrl + event.target.value);
    displayCard.style.display = 'flex';
  } else {
    displayCard.style.display = 'none';
    manipulateData([]);
  }
}

function getWikiData(url) {
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var answer = data[1].map(function (value, index) {
        return {
          text: value,
          link: data[3][index],
        };
      });
      manipulateData(answer);
    });
}

function manipulateData(data) {
  var size = data.length || 9;
  for (var i = 0; i <= size; i += 1) {
    var node = document.querySelector('.wiki-answer-' + i.toString());
    node.innerText = data.length && data[i] ? data[i].text : '';
    node.href = data.length && data[i] ? data[i].link : '';
  }
}

randomBtn.addEventListener('click', randomWikiPage);
inputField.addEventListener('input', getValue);
