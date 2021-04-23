var addItems = document.querySelector('.add-items');
var itemsList = document.querySelector('.plates');
var items = JSON.parse(localStorage.getItem('items')) || [];
var modalContainer = document.getElementById('modal_container');
var modalMessage = document.querySelector('.modal-message');
var yes = document.getElementById('yes');
var cancel = document.getElementById('cancel');
var activeDishIndex = null;
var activeDishText = null;

function addItem(event) {
	event.preventDefault();
	var text = this.querySelector('[name=item]').value;
	var item = {
		text,
		done: false,
	};
	items.push(item);
	populateList(items, itemsList);
	localStorage.setItem('items', JSON.stringify(items));
	this.reset();
}

function populateList(plates, platesList) {
	platesList.innerHTML = plates
		.map((plate, index) => {
			console.log(plate);
			return `
                <li data-index="${index}">
                    <input type ="text" class="editInput" data-index=${index}/> 
                    <input type="checkbox" data-index="${index}" id="item${index}" ${
				plate.done ? 'checked' : ''
			}>
                    <label for="item${index}">${plate.text}</label>
                    <img data-index="${index}" class="icon icon-edit" src="https://cdn1.iconfinder.com/data/icons/feather-2/24/type-512.png" alt="edit" />
                    <img data-index="${index}" class="icon icon-done" src="https://cdn1.iconfinder.com/data/icons/feather-2/24/check-512.png" alt="done" />
                    <img data-index="${index}" class="item icon icon-delete" id="delete" src="https://cdn1.iconfinder.com/data/icons/feather-2/24/x-512.png" alt="delete" />
                </li>
            `;
		})
		.join('');
}

function toggleDone(event) {
	if (!event.target.matches('input') || event.target.matches('.icon-edit')) return;
	var index = event.target.dataset.index;
	items[index].done = !items[index].done;
	localStorage.setItem('items', JSON.stringify(items));
	populateList(items, itemsList);
}

function editItem(event) {
	if (event.target.matches('.icon-edit')) {
		var index = event.target.dataset.index;
		var li = document.querySelectorAll('li')[index];
		var label = li.querySelector('label');
		var inputField = li.querySelector('.editInput');
		var editBtn = li.querySelector('.icon-edit');
		var doneBtn = li.querySelector('.icon-done');
		activeDishText = items[index].text;
		inputField.addEventListener('keyup', function (event) {
			if (event.keyCode === 13) {
				event.preventDefault();
				doneBtn.click();
			}
		});
		inputField.style.display = 'inline-block';
		inputField.value = label.innerText;
		doneBtn.style.display = 'block';
		editBtn.style.display = 'none';
		label.style.display = 'none';
	}
}

function saveItem(event) {
	if (event.target.matches('.icon-done')) {
		var index = Number(event.target.dataset.index);
		var li = document.querySelectorAll('li')[index];
		var label = li.querySelector('label');
		var inputField = li.querySelector('.editInput');
		var doneBtn = li.querySelector('.icon-done');
		label.innerHTML = inputField.value;
		items[index].text = label.innerText;
		if (!inputField.value.length) {
			label.innerHTML = activeDishText;
			items[index].text = label.innerText;
			activeDishText = null;
		}
		localStorage.setItem('items', JSON.stringify(items));
		populateList(items, itemsList);
	}
}

function deleteItem() {
	items.splice(activeDishIndex, 1);
	localStorage.setItem('items', JSON.stringify(items));
	populateList(items, itemsList);
	activeDishIndex = null;
	hideDeleteModal();
	showModalMessage();
}

function showDeleteModal(event) {
	if (event.target.matches('.icon-delete')) {
		activeDishIndex = Number(event.target.dataset.index);
		modalContainer.style.visibility = 'visible';
		modalContainer.style.opacity = '1';
		modalContainer.style.pointerEvents = 'auto';
		modalContainer.classList.add('show');
	}
}

function hideDeleteModal() {
	modalContainer.style.visibility = 'hidden';
	modalContainer.style.opacity = '0';
	modalContainer.style.pointerEvents = 'none';
	modalContainer.classList.remove('show');
}

document.addEventListener('click', function (event) {
	if (event.target.matches('#modal_container')) {
		hideDeleteModal();
	}
});

function showModalMessage() {
	modalMessage.style.opacity = '1';
	setTimeout(function () {
		modalMessage.style.opacity = '0';
	}, 3000);
}

populateList(items, itemsList);

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);
itemsList.addEventListener('click', showDeleteModal);
itemsList.addEventListener('click', editItem);
itemsList.addEventListener('click', saveItem);
yes.addEventListener('click', deleteItem);
cancel.addEventListener('click', hideDeleteModal);
