
camera = document.getElementById("camera");

Webcam.set({
    width: 320,
    height: 240,
    image_format: 'png',
    png_quality: 90
  });
  
  Webcam.attach(camera);
function capture(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML="<img id = 'captured_image' src = '"+ data_uri+"'>";
    }); 
    
}

console.log("ml5.version-",ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/vgS4Zx_Zm/model.json",modelloaded);

function modelloaded(){
    console.log("modelLoaded")
}

function check(){
    speak();
    img=document.getElementById("captured_image");
    classifier.classify(img,got_result);
    
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data= "please wait for a few seconds";
    utter_this = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utter_this);
    
}

function got_result(error,results){
    if (error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("object_name").innerHTML=results[0].label;
        document.getElementById("object_accuracy").innerHTML=results[0].confidence.toFixed(4)*100+"%";

    }
}