let mediaRecorder;
let audioChunks = [];
let recordingInterval;
let recordingTime = 0;

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}

navigator.mediaDevices.getUserMedia({ audio: true })
    .then(function(stream) {
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.ondataavailable = function(event) {
            audioChunks.push(event.data);
        };
        mediaRecorder.onstop = function() {
            clearInterval(recordingInterval);
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            const audioUrl = URL.createObjectURL(audioBlob);
            const a = document.createElement('a');
            a.href = audioUrl;
            a.download = 'recorded-audio.wav';
            a.click();
            document.getElementById('recordingControls').style.display = 'none';
            document.getElementById('startRecording').style.display = 'inline-block';
            document.getElementById('recordingTime').textContent = '00:00';
            recordingTime = 0;
            audioChunks = [];
        };
        document.getElementById("startRecording").addEventListener("click", function() {
            mediaRecorder.start();
            document.getElementById('startRecording').style.display = 'none';
            document.getElementById('recordingControls').style.display = 'flex';
            recordingTime = 0;
            recordingInterval = setInterval(function() {
                recordingTime++;
                document.getElementById('recordingTime').textContent = formatTime(recordingTime);
            }, 1000);
        });
        document.getElementById("stopRecording").addEventListener("click", function() {
            mediaRecorder.stop();
        });
    })
    .catch(function(error) {
        console.error('Ошибка при получении доступа к микрофону:', error);
});