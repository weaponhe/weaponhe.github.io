let {ipcRenderer}  =require('electron')

let closeEI = document.querySelector('.close')
closeEI.addEventListener('click',(e)=>{
  ipcRenderer.send('close-settings-window')
})