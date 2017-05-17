const {ipcRenderer} = require('electron')

var closeEl = document.querySelector('.close');
closeEl.addEventListener('click', function () {
  ipcRenderer.send('close-main-window');
});

var soundButtons = document.querySelectorAll('.button-sound');

for (var i = 0; i < soundButtons.length; i++) {
  var soundButton = soundButtons[i];
  var soundName = soundButton.attributes['data-sound'].value;

  prepareButton(soundButton, soundName);
}

function prepareButton(buttonEl, soundName) {
  buttonEl.querySelector('span').style.backgroundImage = 'url("img/icons/' + soundName + '.png")';

  var audio = new Audio(__dirname + '/wav/' + soundName + '.wav');
  buttonEl.addEventListener('click', function () {
    audio.currentTime = 0;
    audio.play();
  });
}

ipcRenderer.on('global-shortcut', (event, arg) => {
  var event = new MouseEvent('click');
  soundButtons[arg].dispatchEvent(event);
})

var settingsEl = document.querySelector('.settings');
settingsEl.addEventListener('click', function () {
  ipcRenderer.send('open-settings-window');
});