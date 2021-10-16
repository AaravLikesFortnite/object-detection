wb="";
object=[];
status="";

function preload(){
    wb=loadImage('Water Bottle.jpeg');
}

function setup(){
    canvas=createCanvas(500,400);
    canvas.position(380,250);

    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
}

function modelLoaded(){
    console.log("Da Eagle Has Landed");
    status=true;
    objectDetector.detect(wb,gotResult);
}   

function gotResult(error,result){
    if(error){
        console.log(error);
    }
    else{
        console.log(result);
        object=result;
    }
}

function draw(){
    image(wb,0,0,500,400);

    if(status != ""){
        for(i=0; i<object.length; i++){
           fill("#ff0000");
           percent=floor(object[i].confidence*100);
           text(object[i].label+" "+percent+"%", object[i].x+15,object[i].y+15);
           noFill();
           stroke("#ff0000");
           rect(object[i].x,object[i].y,object[i].width,object[i].height);
           document.getElementById("status").innerHTML="Status: Objects Detected";
        }
    }
}