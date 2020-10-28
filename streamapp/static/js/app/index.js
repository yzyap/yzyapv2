var demoWorkspace;

function fBodyResize(evt)
{
  console.log("body resize!");

  hpage = $(window).height();
  wpage = $(window).width();  

  hnavbar = document.getElementById("pageheader").offsetHeight;
  wnavbar = document.getElementById("pageheader").offsetWidth;
  wcontainer = wpage -10;
  hcontainer = hpage-hnavbar;

  containerWindow = document.getElementById("containerWindow");
  containerWindow.style.gridTemplateRows = "520px " + (hcontainer-520-40) + "px"; 
}

function fPageLoad(evt)
{
  fBodyResize();
  openTab(evt,"pythontab")    
  openSettingTab(evt, 'harekettab')  
  editor.resize();     
}

function openTab(evt, tabName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="codeWindowTabContent" and hide them
  tabcontent = document.getElementsByClassName("codewindow_tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";  
}

function openSettingTab(evt, tabName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="codeWindowTabContent" and hide them
  tabcontent = document.getElementsByClassName("settingwindow_tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="setting_tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("setting_tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

var editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.session.setMode("ace/mode/javascript");
editor.setFontSize("20px");
editor.setReadOnly(false);  // false to make it editable

var signalObj = null;
var isStreaming = false;
var web_rtcport = 81;
var web_rtchost = "192.168.1.43"

function startPlay() {
    if (signalObj)
        return;

    var hostname = web_rtchost;
    var address = hostname + ':' + (web_rtcport || (location.protocol === 'https:' ? 443 : 80)) + '/webrtc';
    var protocol = location.protocol === "https:" ? "wss:" : "ws:";
    var wsurl = protocol + '//' + address;

    var video = document.getElementById('v');

    signalObj = new signal(wsurl,
        function(stream) {
            console.log('got a stream!');
            video.srcObject = stream;
            video.play();            
        },
        function(error) {
            alert(error);
            signalObj = null;
        },
        function() {
            console.log('websocket closed. bye bye!');
            video.srcObject = null;
            signalObj = null;
            onVideoStopped();
        },
        function(message) {
            alert(message);
        }
    );
}

function stopPlay() {
    if (signalObj) {
        signalObj.hangup();
        signalObj = null;
    }
}

window.addEventListener('DOMContentLoaded', function() {

    var startAndStop = document.getElementById('startAndStop');

    if (startAndStop) {
      startAndStop.addEventListener('click', function(e) {
            if(!isStreaming){
              startPlay();
            }
            else {
              stopPlay();
            }
        }, false);
    }               
});

function onVideoStopped() {
  isStreaming = false;
  //canvasContext.clearRect(0, 0, canvasOutput.width, canvasOutput.height);
  startAndStop.innerText = 'Run';
}

function onOpenCvReady(){
  console.log('openCV ready!');
  startAndStop.removeAttribute('disabled');
}

function onVideoStarted() {
  isStreaming = true;
  startAndStop.innerText = 'Stop';

  var code = editor.getValue();  
  Function(code)();
}


v.addEventListener('loadeddata', (event) => {
  console.log('Yay! The readyState just increased to  ' + 
      'HAVE_CURRENT_DATA or greater for the first time.');

      onVideoStarted();           
});
  