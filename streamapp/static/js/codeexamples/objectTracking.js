//---------------------------------------------------COCO Obf Detection-----------------------------------------------
let kafaAciX = 0, kafaAciY = 0;

async function kafaDonX(aci){
  aci = Math.floor(aci);
  if(aci > 0){
    console.log("kafasag ", aci);
    kafasag(aci);
    await sleep(100);
  }

  else {
    console.log("kafasol ", aci);
    kafasol(-aci);    
    await sleep(100);
  }
}

async function kafaDonY(aci){
  aci = Math.floor(aci);
  if(aci > 0){
    kafaasagi(aci);
    console.log("kafasagi ", aci);
    await sleep(100);
  }

  else {
    kafayukari(-aci);
    console.log("kafayukari ", aci);
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

    if(diffX > 20) //saga don
    {
      kafaAciX+=45*(diffX/camCenterX); 
      if(kafaAciX > 600) kafaAciX = 600;
      kafaDonX(kafaAciX);
    }

    else if(diffX < -20)//sol don
    {
      kafaAciX+=45*((diffX)/camCenterX); 
      if(kafaAciX < -600) kafaAciX = -600;     
      kafaDonX(kafaAciX);
    }

    if(diffY > 20) 
    {
      kafaAciY+=45*(diffY/camCenterY); 
      if(kafaAciY > 600) kafaAciY = 600;
      kafaDonY(kafaAciY);
    }

    else if(diffY < -20)
    {
      kafaAciY+=45*((diffY)/camCenterY);      
      if(kafaAciY < -600) kafaAciY = -600;
      kafaDonY(kafaAciY);
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

let predictionClass = 'person';

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
        if (predictions[n].score > 0.66 & predictions[n].class == predictionClass) {
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

          track_obj(predictionClass,predictions[n]);

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
      