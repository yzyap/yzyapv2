/*var ip = "192.168.1.43";//location.hostname;
var robotPort = "4900";
var robotServer = 'http://'+ip+':'+robotPort;


$('#robotDur').click(function() {
  $.post(robotServer+'/robot/dur,0,0');
});

$('#robotIleri').click(function() {
  var adimboyu = (parseFloat(35 * $('#AdimBoyu').val())).toString();
  var adim = $('#Adim').val();
  var hiz = $('#Hiz').val();
  $.post(robotServer+'/robot/adim_boyu,' + adimboyu);
  $.post(robotServer+'/robot/ileri,' + adim + ',' + hiz);
});

$('#robotGeri').click(function() {
  var adimboyu = (parseFloat(35 * $('#AdimBoyu').val())).toString();
  var adim = $('#Adim').val();
  var hiz = $('#Hiz').val();
  $.post(robotServer+'/robot/adim_boyu,' + adimboyu);
  $.post(robotServer+'/robot/geri,' + adim + ',' + hiz);
});

$('#robotSolDon').click(function() {
  var robotAci = $('#robotAci').val();
  var AdimSayisi = parseInt(robotAci / 2.4);
  $.post(robotServer+'/robot/adim_boyu,1');
  $.post(robotServer+'/robot/don,sol,' + AdimSayisi);
});

$('#robotSagDon').click(function() {
  var robotAci = $('#robotAci').val();
  var AdimSayisi = parseInt(robotAci / 2.5);
  $.post(robotServer+'/robot/adim_boyu,1');
  $.post(robotServer+'/robot/don,sag,' + AdimSayisi);
});

$('#camMerkez').click(function() {
  $.post(robotServer+'/robot/cam,sol,0');
  $.post(robotServer+'/robot/cam,asagi,0');
});

$('#camYukari').click(function() {
  var robotAci = $('#camAci').val();
  $.post(robotServer+'/robot/cam,yukari,' + robotAci);
});

$('#camAsagi').click(function() {
  var robotAci = $('#camAci').val();  
  $.post(robotServer+'/robot/cam,asagi,' + robotAci);
});

$('#camSol').click(function() {
  var robotAci = $('#camAci').val();  
  $.post(robotServer+'/robot/cam,sol,' + robotAci);
});

$('#camSag').click(function() {
  var robotAci = $('#camAci').val();  
  $.post(robotServer+'/robot/cam,sag,' + robotAci);
});

function initRobotMoveData() {
  document.getElementById("robotAci").value = "90"
  document.getElementById("AdimBoyu").value = "0.1"
  document.getElementById("TiltAci").value = "0"
  document.getElementById("PanAci").value = "0"
  document.getElementById("Hiz").value = "100"
  document.getElementById("InvisibleTilt").value = "0"
  document.getElementById("InvisiblePan").value = "0"
  document.getElementById("PanKonum").value = "Merkez"
  document.getElementById("TiltKonum").value = "Merkez"

}
*/

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
  $.post(robotServer+'/robot/cam,yukari,' + robotAci);
}

function kafaasagi(robotAci) { 
  $.post(robotServer+'/robot/cam,asagi,' + robotAci);
}

function kafasol(robotAci) { 
  $.post(robotServer+'/robot/cam,sol,' + robotAci);
}

function kafasag(robotAci) {
  $.post(robotServer+'/robot/cam,sag,' + robotAci);
}