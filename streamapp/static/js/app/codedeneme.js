const FPS = 10;
function processVideo() {
    let video = document.getElementById('v');
    let src = new cv.Mat(video.height, video.width, cv.CV_8UC4);
    let dst = new cv.Mat(video.height, video.width, cv.CV_8UC1);
    let cap = new cv.VideoCapture(video);

    try {
        //if (!isStreaming) {
        //    // clean and stop.
        //    src.delete();
        //    dst.delete();
        //    return;
        //}
        let begin = Date.now();
        // start processing.
        cap.read(src);
        cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY);
        cv.imshow('canvasOutput', dst);
        // schedule the next one.
        let delay = 1000/FPS - (Date.now() - begin);
        setTimeout(processVideo, delay);
    } catch (err) {
        //utils.printError(err);
        setTimeout(processVideo, delay);
        console.log('opencv error');
    }
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

var ip = "192.168.1.43";//location.hostname;
var robotPort = "4900";
var robotServer = 'http://'+ip+':'+robotPort;

function ileri(adimboyu, adim, hiz){
  $.post(robotServer+'/robot/adim_boyu,' + adimboyu);
  $.post(robotServer+'/robot/ileri,' + adim + ',' + hiz);
}

function geri(adimboyu, adim, hiz){
  $.post(robotServer+'/robot/adim_boyu,' + adimboyu);
  $.post(robotServer+'/robot/geri,' + adim + ',' + hiz);
}

function sol(robotAci){
  var AdimSayisi = parseInt(robotAci / 2.4);
  $.post(robotServer+'/robot/adim_boyu,1');
  $.post(robotServer+'/robot/don,sol,' + AdimSayisi);
}

function sag(robotAci){
  var AdimSayisi = parseInt(robotAci / 2.4);
  $.post(robotServer+'/robot/adim_boyu,1');
  $.post(robotServer+'/robot/don,sag,' + AdimSayisi);
}

function kafamerkez(){
  $.post(robotServer+'/robot/cam,sol,0');
  $.post(robotServer+'/robot/cam,asagi,0');
}

function kafayukari(robotAci) {
  var robotAci = $('#camAci').val();
  $.post(robotServer+'/robot/cam,yukari,' + robotAci);
}

function kafaasagi(robotAci) {
  var robotAci = $('#camAci').val();  
  $.post(robotServer+'/robot/cam,asagi,' + robotAci);
}

function kafasol(robotAci) {
  var robotAci = $('#camAci').val();  
  $.post(robotServer+'/robot/cam,sol,' + robotAci);
}

function kafasag(robotAci) {
  var robotAci = $('#camAci').val();  
  $.post(robotServer+'/robot/cam,sag,' + robotAci);
}

async function demo1(){
  console.log('Taking a break...');
  await sleep(2000);
  console.log('Two seconds later, showing sleep in a loop...');
  
  sol(90);
  await sleep(2000);
  
  ileri(10,3,100);
  await sleep(2000);
}

demo1();

async function demo() {
  console.log('Taking a break...');
  await sleep(2000);
  console.log('Two seconds later, showing sleep in a loop...');

  // Sleep in loop
  for (let i = 0; i < 10; i++) {
    //if (i === 3)
    await sleep(2000);
    console.log(i);
    ileri(10,3,100);
  }
}

setTimeout(processVideo, 0);
demo();      


//-------------------------
async function demo1(){
  console.log('Taking a break...');
  await sleep(2000);
  console.log('Two seconds later, showing sleep in a loop...');
  
  kafasag(400);
  await sleep(2000);

  kafasol(400);
  await sleep(2000);
  
  kafamerkez();
  await sleep(2000);
  
  kafayukari(400);
  await sleep(2000);
  
  kafaasagi(400);
  await sleep(2000);
  
  ileri(10,3,100);
  await sleep(2000);
  
  ileri(10,3,100);
  await sleep(2000);  
}

demo1();    
             
             
const FPS = 10;

function processVideo() {
    let video = document.getElementById('v');
    let src = new cv.Mat(video.height, video.width, cv.CV_8UC4);
    let dst = new cv.Mat(video.height, video.width, cv.CV_8UC1);
    let cap = new cv.VideoCapture(video);

    try {
        //if (!isStreaming) {
        //    // clean and stop.
        //    src.delete();
        //    dst.delete();
        //    return;
        //}
        let begin = Date.now();
        // start processing.
        cap.read(src);
        //cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY);
        cv.Canny(src, dst, 50, 100, 3, false);
        cv.imshow('canvasOutput', dst);
        // schedule the next one.
        let delay = 1000/FPS - (Date.now() - begin);
        setTimeout(processVideo, delay);
    } catch (err) {
        //utils.printError(err);
        console.log('opencv error');
    }
};

setTimeout(processVideo, 0);


//-------------------------
async function demo1(){
  console.log('Taking a break...');
  await sleep(2000);
  console.log('Two seconds later, showing sleep in a loop...');
  

 
  for(let i=0;i<5;i++){
      geri(20,3,100);
      await sleep(2000);
  }
  
}

demo1(); 

async function demo1(){
  const video = document.getElementById('v');

  // Load the model.
  cocoSsd.load().then(model => {
    // detect objects in the image.
    console.log('model loaded');
    model.detect(video).then(predictions => {
      console.log('Predictions: ', predictions);
    });
  });
}

setTimeout(processVideo, 0);

demo1();   

//---------------------------------------------------COCO Obf Detection-----------------------------------------------
const FPS = 10;

const video = document.getElementById('v');
const liveView = document.getElementById('videoWindow');

var children = [];

//--------------------------------------------
// Store the resulting model in the global scope of our app.
var model = undefined;
var model_loaded = false;

// Before we can use COCO-SSD class we must wait for it to finish
// loading. Machine Learning models can be large and take a moment 
// to get everything needed to run.
// Note: cocoSsd is an external object loaded from our index.html
// script tag import so ignore any warning in Glitch.
cocoSsd.load().then(function (loadedModel) {
  model = loadedModel;
  // Show demo section now model is ready to use.
  console.log('model loaded..');
  model_loaded = true;
});

function predictWebcam() {

  let begin = Date.now();

  if(!model_loaded | !isStreaming){
    //let delay = 1000/FPS - (Date.now() - begin);
    setTimeout(predictWebcam, 1000); 
  }

  else{
    // Now let's start classifying a frame in the stream.
    model.detect(video).then(function (predictions) {

      // Remove any highlighting we did previous frame.
      for (let i = 0; i < children.length; i++) {
        liveView.removeChild(children[i]);
      }
      children.splice(0);
      
      // Now lets loop through predictions and draw them to the live view if
      // they have a high confidence score.
      for (let n = 0; n < predictions.length; n++) {
        // If we are over 66% sure we are sure we classified it right, draw it!
        if (predictions[n].score > 0.66) {
          const p = document.createElement('p');
          p.setAttribute('class', 'camViewP');
          p.innerText = predictions[n].class  + ' - with ' 
              + Math.round(parseFloat(predictions[n].score) * 100) 
              + '% confidence.';
          p.style = 'left: ' + predictions[n].bbox[0] + 'px; top: '
            + (predictions[n].bbox[1]+70) + 'px; width: ' 
            + predictions[n].bbox[2] + 'px; height: '
            + 30 + 'px;';

          const highlighter = document.createElement('div');
          highlighter.setAttribute('class', 'highlighter');
          highlighter.style = 'left: ' + predictions[n].bbox[0] + 'px; top: '
              + (predictions[n].bbox[1]+100) + 'px; width: ' 
              + predictions[n].bbox[2] + 'px; height: '
              + predictions[n].bbox[3] + 'px;';

          liveView.appendChild(highlighter);
          liveView.appendChild(p);
          children.push(highlighter);
          children.push(p);
        }
      }
      
      // Call this function again to keep predicting when the browser is ready.
      //window.requestAnimationFrame(predictWebcam);
      let delay = 1000/FPS - (Date.now() - begin);
      setTimeout(predictWebcam, delay);
    });
  }
}

setTimeout(predictWebcam, 0); 


//-------------------------------------------------------------------
//---------------------------------------------------COCO Obf Detection-----------------------------------------------
let kafaAciX = 0;

async function kafaDonX(aci){
  if(aci > 0){
    kafasag(kafaAciX);
    await sleep(100);
  }

  else {
    kafasol(kafaAciX);
    await sleep(100);
  }
}

async function track_obj(objClass, prediction){
  let objLeft = 0, objTop = 0, objWidth = 0,objHeight = 0;

  if(prediction.class == objClass){
    objLeft = prediction.bbox[0];
    objTop = prediction.bbox[1];
    objWidth = prediction.bbox[2];
    objHeight = prediction.bbox[3];

    //console.log(objLeft, objTop, objWidth, objHeight);

    let objCenterX = objLeft + objWidth/2;
    let objCenterY = objTop + objHeight/2;

    let camCenterX = 320;
    let camCenterY = 240;

    let diffX = objCenterX-camCenterX;
    let diffY = objCenterY-camCenterY;

    //console.log(diffX,diffY);

    if(diffX > 20) //sola don
    {
      kafaAciX+=10; 
      kafaDonX(kafaAciX);
    }

    else if(diffX < -20)//saga don
    {
      kafaAciX-=10;      
      kafaDonX(kafaAciX);
    }
  }  
}

const FPS = 5;

const video = document.getElementById('v');
const liveView = document.getElementById('videoWindow');

var children = [];

//--------------------------------------------
// Store the resulting model in the global scope of our app.
var model = undefined;
var model_loaded = false;

// Before we can use COCO-SSD class we must wait for it to finish
// loading. Machine Learning models can be large and take a moment 
// to get everything needed to run.
// Note: cocoSsd is an external object loaded from our index.html
// script tag import so ignore any warning in Glitch.
cocoSsd.load().then(function (loadedModel) {
  model = loadedModel;
  // Show demo section now model is ready to use.
  console.log('model loaded..');
  model_loaded = true;
  kafamerkez();
});

function predictWebcam() {

  let begin = Date.now();

  if(!model_loaded | !isStreaming){
    //let delay = 1000/FPS - (Date.now() - begin);
    setTimeout(predictWebcam, 1000); 
  }

  else{
    // Now let's start classifying a frame in the stream.
    model.detect(video).then(function (predictions) {

      // Remove any highlighting we did previous frame.
      for (let i = 0; i < children.length; i++) {
        liveView.removeChild(children[i]);
      }
      children.splice(0);
      
      // Now lets loop through predictions and draw them to the live view if
      // they have a high confidence score.
      for (let n = 0; n < predictions.length; n++) {
        // If we are over 66% sure we are sure we classified it right, draw it!
        if (predictions[n].score > 0.66) {
          const p = document.createElement('p');
          p.setAttribute('class', 'camViewP');
          p.innerText = predictions[n].class  + ' - with ' 
              + Math.round(parseFloat(predictions[n].score) * 100) 
              + '% confidence.';
          p.style = 'left: ' + predictions[n].bbox[0] + 'px; top: '
            + (predictions[n].bbox[1]+70) + 'px; width: ' 
            + predictions[n].bbox[2] + 'px; height: '
            + 30 + 'px;';

          const highlighter = document.createElement('div');
          highlighter.setAttribute('class', 'highlighter');
          highlighter.style = 'left: ' + predictions[n].bbox[0] + 'px; top: '
              + (predictions[n].bbox[1]+100) + 'px; width: ' 
              + predictions[n].bbox[2] + 'px; height: '
              + predictions[n].bbox[3] + 'px;';

          track_obj('cup',predictions[n]);

          liveView.appendChild(highlighter);
          liveView.appendChild(p);
          children.push(highlighter);
          children.push(p);
        }
      }
      
      // Call this function again to keep predicting when the browser is ready.
      //window.requestAnimationFrame(predictWebcam);
      let delay = 1000/FPS - (Date.now() - begin);
      setTimeout(predictWebcam, delay);
    });
  }
}

setTimeout(predictWebcam, 0); 
          
           
      