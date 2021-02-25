var startButton = document.getElementById('start');
var playButton = document.getElementById('play');
var recordButton = document.getElementById('record');
var downloadButton = document.getElementById('download');
var takeSnapshotButton = document.getElementById('snapshot');
var gumVideo = document.getElementById('gum');
var recordedVideo = document.getElementById('recorded');
var canvas = document.querySelector('canvas');
var filterSelect = document.querySelector('select#filter');

var mediaRecorder;
var recorderBlobs;

// Download video
downloadButton.addEventListener('click', () => {
	const blob = new Blob(recordedBlobs, {type: 'video/webm'}),
		url = window.URL.createObjectURL(blob),
		a = document.createElement('a');
	a.style.display = 'none';
	a.href = url;
	a.download = 'test.webm';
	a.click();
});

// Take snapshot
takeSnapshotButton.addEventListener('click', function () {
	canvas.className = filterSelect.value;
	canvas
		.getContext('2d')
		.drawImage(gumVideo, 0, 0, canvas.width, canvas.height);
});

// Play recorded video
playButton.addEventListener('click', function () {
	var buffer = new Blob(recorderBlobs, {type: 'video/webm'});
	recordedVideo.src = window.URL.createObjectURL(buffer);
	recordedVideo.controls = true;
	recordedVideo.play();
});

// Record video stream
recordButton.addEventListener('click', function () {
	if (recordButton.textContent === 'Record') {
		startRecording();
	} else {
		stopRecording();
	}
});

function startRecording() {
	recordButton.textContent = 'Stop Recording';
	recorderBlobs = [];
	var options = {mimeType: 'video/webm;codecs=vp9, opus'};
	try {
		mediaRecorder = new MediaRecorder(window.stream, options);
	} catch (error) {
		handleError(error);
	}

	playButton.disabled = true;
	downloadButton.disabled = true;
	takeSnapshotButton.disabled = false;
	mediaRecorder.onstop = function () {
		console.log('Recorded blobs: ' + recorderBlobs);
	};
	mediaRecorder.ondataavailable = handleDataAvailable;
	mediaRecorder.start();
}

function handleDataAvailable(event) {
	if (event.data && event.data.size > 0) {
		recorderBlobs.push(event.data);
	}
}

function stopRecording() {
	recordButton.textContent = 'Record';
	playButton.disabled = false;
	downloadButton.disabled = false;
	mediaRecorder.stop();
}

// Start video stream
startButton.addEventListener('click', function () {
	if (startButton.innerText === 'Start camera') {
		startButton.innerText = 'Stop camera';
		var constraints = {
			audio: true,
			video: {
				width: 1280,
				height: 720,
			},
		};

		init(constraints);
	} else {
		startButton.innerText = 'Start camera';
		recordButton.disabled = true;
		playButton.disabled = true;
		downloadButton.disabled = true;
		takeSnapshotButton.disabled = true;
		window.stream = null;
		gumVideo.srcObject = null;
		gumVideo.style.visibility = 'hidden';
		recordedVideo.style.visibility = 'hidden';
	}
});

function init(constraints) {
	navigator.mediaDevices
		.getUserMedia(constraints)
		.then(handleSuccess)
		.catch(handleError);
}

function handleSuccess(stream) {
	recordButton.disabled = false;
	takeSnapshotButton.disabled = false;
	gumVideo.srcObject = stream;
	window.stream = stream;
}

function handleError(error) {
	console.error(error);
}
