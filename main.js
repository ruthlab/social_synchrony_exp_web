document.addEventListener("DOMContentLoaded", function nothing(){

})

function isEmptyOrNull(a) {
    return a == '' || a == undefined;
}

function appendToInnerDict(innerDict, val) {
    if (getStorage(innerDict) == null) {
        setStorage(innerDict, [])
    }
    var obj = getStorage(innerDict);
    obj.push(val);
    setStorage(innerDict, obj);
}

function getStorage(key) {
    if (localStorage.getItem('expStorage') === null){
        localStorage.setItem('expStorage', JSON.stringify({}));
    } 
    return JSON.parse(localStorage.getItem('expStorage'))[key];
}

function setStorage(key, val) {
    if (localStorage.getItem('expStorage') === null){
        localStorage.setItem('expStorage', JSON.stringify({}));
    } 
    obj = JSON.parse(localStorage.getItem('expStorage'));
    obj[key] = val;
    localStorage.setItem('expStorage', JSON.stringify(obj));
}

function continueForm() {
    var age = document.getElementById("infoForm").ageInput.value;
    var sex = document.getElementById("infoForm").sexInput.value;
    var seenMovie = document.getElementById("infoForm").seenMovieInput.value;
    var education = document.getElementById("infoForm").educationInput.value;
    var live = document.getElementById("infoForm").liveInput.value;

    if (!(isEmptyOrNull(age) || isEmptyOrNull(sex) || isEmptyOrNull(seenMovie) || isEmptyOrNull(education) || isEmptyOrNull(live))) {
        setStorage("personalInfo", {'age' : age, 'sex' : sex, 'seenMovie' : seenMovie,  'education' : education, 'live' : live});
        window.location = 'trailIntro.html';
    } else {
        alert('אנא מלא/י את כל הפרטים');
    }
}

function checkboxvalidation() {
    let checkbox =document.getElementById('customControlInline').checked;
    if (!checkbox){
        alert("נא לסמן את הצ'קבוקס לפני שממשיכים");
        return false;
    }
    else{
        window.open("form.html");

    }
}

function playVid() {
    var vid = document.getElementById('thevideo');
    vid.play();
    var vidsource = document.getElementById('vidsource');
    obj = JSON.parse(localStorage.getItem('expStorage'));
    obj["movie"] = vidsource.src;
    localStorage.setItem('expStorage', JSON.stringify(obj));
    var btndiv = document.getElementById('btndiv');
    var btn = document.getElementById('playbtn');
    btndiv.removeChild(btn);
    dataTag();
}

function pauseVid() {
    var vid = document.getElementById('thevideo');
    vid.pause();
}

function dataTag(){
    let con = true;
    var startTime = Date.now();
    document.getElementById('thevideo').addEventListener('ended',myHandler,false);
    function myHandler(e) {
        con = false;

    }
    var interval = window.setInterval(function () {
        if (con){
            var sliderVal = Math.abs(document.getElementById('range').value);
            var elapsedTime = Date.now() - startTime;
            appendToInnerDict('gaze', {"time":(elapsedTime / 1000).toFixed(1), "rate": sliderVal});
            //setStorage('gaze', [{"time":(elapsedTime / 1000).toFixed(1), "rate":sliderVal}])
            //appendToInnerDict('gaze', (elapsedTime / 1000).toFixed(1), sliderVal);
            // console.log((elapsedTime / 1000).toFixed(1) ,sliderVal);
        }
        else {
            window.clearInterval(interval);
            window.open("introTouch.html")
        }
        } , 100);

}

function nextSlide() {
    let text = document.getElementById("imgClickAndChange").src;
    var i = text[text.search("Slide")+5];
    var num = parseInt(i);
    var nextbtn = document.getElementById("nextbtn");
    if(num===5 && !(nextbtn.childElementCount >= 1)){
        document.getElementById("imgClickAndChange").src = "gaze\\Slide"+ num+".png";
        var btn = document.createElement('button');
        var link = document.createElement('a');
        var next = document.createTextNode("המשך");
        btn.classList.add("btn");
        btn.classList.add("btn-primary");
        btn.classList.add("my-1");
        link.classList.add("text-decoration-none");
        link.classList.add("text-white");
        link.appendChild(next);
        link.href = "rangeTagGaze.html";
        btn.appendChild(link);
        nextbtn.appendChild(btn);

    }
    else if(num===6 ){
        document.getElementById("imgClickAndChange").src = "gaze\\Slide"+ num+".png";
    }
    else{
        num = num+1;
        document.getElementById("imgClickAndChange").src = "gaze\\Slide"+ num+".png";

    }

}

function prevSlide() {
    let text = document.getElementById("imgClickAndChange").src;
    var i = text[text.search("Slide")+5];
    var num = parseInt(i);
    if(num===1){
        document.getElementById("imgClickAndChange").src = "gaze\\Slide"+ num+".png";
    }
    else{
        num = num-1;
        document.getElementById("imgClickAndChange").src = "gaze\\Slide"+ num+".png";
    }
}

function playVidTouch() {
    var vid = document.getElementById('thevideot');
    vid.play();
    var vidsource = document.getElementById('vidsourcet');
    obj = JSON.parse(localStorage.getItem('expStorage'));
    obj["movie"] = vidsource.src;
    localStorage.setItem('expStorage', JSON.stringify(obj));
    var btndiv = document.getElementById('btndivt');
    var btn = document.getElementById('playbtnt');
    btndiv.removeChild(btn);
    dataTagTouch();
}


function dataTagTouch(){
    let con = true;
    var startTime = Date.now();
    document.getElementById('thevideot').addEventListener('ended',myHandler,false);
    function myHandler(e) {
        con = false;
    }
    var interval = window.setInterval(function () {
        if (con){
            var sliderVal = Math.abs(document.getElementById('ranget').value);
            var elapsedTime = Date.now() - startTime;
            appendToInnerDict('touch', {"time":(elapsedTime / 1000).toFixed(1), "rate": sliderVal});
            // console.log((elapsedTime / 1000).toFixed(1) ,sliderVal);
        }
        else {
            window.clearInterval(interval);
            var body = document.getElementById('bodyt')
            var videodiv = document.getElementById('videodivt')
            body.removeChild(videodiv);
            var diver = document.createElement("div");
            diver.classList.add("text-xl-center");
            var debrief = document.createElement("img");
            debrief.classList.add("w-75");
            debrief.src="debrief.png";
            diver.appendChild(debrief);
            body.appendChild(diver);
            onDownload();
        }
    } , 100);

}

function nextSlideTouch() {
    let text = document.getElementById("imgClickAndChanget").src;
    var i = text[text.search("Slide")+5];
    var num = parseInt(i);
    var nextbtn = document.getElementById("nextbtnt");
    if(num===5 && !(nextbtn.childElementCount >= 1)){
        document.getElementById("imgClickAndChanget").src = "touch\\Slide"+ num+".png";
        var btn = document.createElement('button');
        var link = document.createElement('a');
        var next = document.createTextNode("המשך");
        btn.classList.add("btn");
        btn.classList.add("btn-primary");
        btn.classList.add("my-1");
        link.classList.add("text-decoration-none");
        link.classList.add("text-white");
        link.appendChild(next);
        link.href = "rangeTagTouch.html";
        btn.appendChild(link);
        nextbtn.appendChild(btn);

    }
    else if(num===6 ){
        document.getElementById("imgClickAndChanget").src = "touch\\Slide"+ num+".png";
    }
    else{
        num = num+1;
        document.getElementById("imgClickAndChanget").src = "touch\\Slide"+ num+".png";

    }

}

function prevSlideTouch() {
    let text = document.getElementById("imgClickAndChanget").src;
    var i = text[text.search("Slide")+5];
    var num = parseInt(i);
    if(num===1){
        document.getElementById("imgClickAndChanget").src = "touch\\Slide"+ num+".png";
    }
    else{
        num = num-1;
        document.getElementById("imgClickAndChanget").src = "touch\\Slide"+ num+".png";
    }
}


function download(content, fileName, contentType) {
    const a = document.createElement("a");
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

function onDownload(){
    download(JSON.stringify(JSON.parse(localStorage.getItem('expStorage'))), "result "+Date.now().toString() +".json", "text/plain");
}
function playVidTrail() {
    var vid = document.getElementById('mighty');
    vid.play();
    var btndiv = document.getElementById('btndiv2');
    var btn = document.getElementById('playbtn2');
    btndiv.removeChild(btn);
    cont();
}


function cont(){
    let con = true;
    document.getElementById('mighty').addEventListener('ended',myHandler,false);
    function myHandler(e) {
        con = false;

    }
    var interval = window.setInterval(function () {
        if (!con){
            window.clearInterval(interval);
            var body = document.getElementById('body2')
            var videodiv = document.getElementById('mightydiv')
            body.removeChild(videodiv);
            var diver = document.createElement("div");
            diver.classList.add("text-xl-center");
            var tutorial = document.createElement("img");
            tutorial.classList.add("w-50");
            tutorial.src="slider_tutorial_3.png";
            var btn = document.createElement('button');
            var link = document.createElement('a');
            var next = document.createTextNode("המשך");
            btn.classList.add("btn");
            btn.classList.add("btn-primary");
            btn.classList.add("my-1");
            link.classList.add("text-decoration-none");
            link.classList.add("text-white");
            link.appendChild(next);
            link.href = "introGaze.html";
            btn.appendChild(link);
            var br = document.createElement('br');

            diver.appendChild(tutorial);
            body.appendChild(diver);
            body.appendChild(br);
            body.appendChild(btn);

        }
    } , 100);

}