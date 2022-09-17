Objects=[];
status="";

function setup() {
    canvas=createCanvas(480,380);
    canvas.center();
    video.hide();
}

function preload() {
    video= createVideo("video.mp4");
}

function start() {
   objectDetector=ml5.objectDetector("cocossd",modelLoaded);
   document.getElementById("status").innerHTML="Status: Detecting Objects"; 
}

function modelLoaded() {
console.log("Model is Loaded");
status=true;
video.volume(0);
video.speed(1);
video.loop();
}

function gotResult(error,results) {
if(error) {
console.log(error);
}
console.log(results);
Objects=results;
}

function draw() {
    image(video,0,0,480,380);
    if(status!="") {
        objectDetector.detect(video,gotResult);
        for(i=0 ; i<Objects.Length; i++) {
            document.getElementById("status").innerHTML="Status: Object is Detected";
            document.getElementById("number_of_objects").innerHTML="Number of Objects Detected are: "+Objects.Length;

            fill("#FF0D05");
            percent=floor(Objects[i].confidence*100);
            text(Objects[i].label + "" + percent + "%", Objects[i].x + 15, Objects[i].y+15);
            noFill();
            stroke("#FF0D05");
            rect(Objects[i].x, Objects[i].y, Objects[i].width, Objects[i].height);
        }
    }
}