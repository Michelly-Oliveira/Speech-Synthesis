// SpeechSynthesisUtterance represents a speech request, it controls the voice, pitch, rate, volume; content of the speech
// speechSynthesis gets the voices, make it start, stop
const speechAPI = new SpeechSynthesisUtterance();
let voices = [];

const options = document.querySelectorAll('.options')
const voicesDropdown = document.querySelector('#voices');
const speakBtn = document.querySelector('.speak');
let msg = document.querySelector("[name='text']");

function populateVoices(e) {
    // this = speechSynthesis
    voices = this.getVoices();

    // get the name and language of the voices, create  HTML options and add it to the page as one big string
    voicesDropdown.innerHTML = voices.map(voice => {
        return `
            <option value="${voice.name}">${voice.name} (${voice.lang})</option>
        `;
    }).join('');
}

function setVoice() {
    // Select the voice
    speechAPI.voice = voices.find(voice => voice.name == this.value);
}

function changeOptions(e) {
    // e.target.name = property changed; e.target.value = new value
    speechAPI[e.target.name] = e.target.value;
    // Show the value on the page
    document.querySelector(`.${e.target.name}-value`).innerHTML = e.target.value;
}

function speakMsg() {
    // If is already talking, stop 
    speechSynthesis.cancel();

    // Grab the text typed and set it to the utterance
    speechAPI.text = msg.value
    // Speak
    speechSynthesis.speak(speechAPI);
}

speechSynthesis.addEventListener('voiceschanged', populateVoices);
voicesDropdown.addEventListener('change', setVoice);
options.forEach(option => option.addEventListener('change', changeOptions));
speakBtn.addEventListener('click', speakMsg);