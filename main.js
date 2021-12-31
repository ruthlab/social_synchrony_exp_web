document.addEventListener("DOMContentLoaded", function nothing(){

})

function isEmptyOrNull(a) {
    return a == '' || a == undefined;
}

function appendToInnerDict(innerDict, key, val) {
    if (getStorage(innerDict) == null) {
        setStorage(innerDict, {})
    }
    var obj = getStorage(innerDict);
    obj[key] = val;
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
    var birthDate = document.getElementById("infoForm").birthDateInput.value;
    var education = document.getElementById("infoForm").educationInput.value;
    var live = document.getElementById("infoForm").liveInput.value;

    if (!(isEmptyOrNull(age) || isEmptyOrNull(sex) || isEmptyOrNull(seenMovie) || isEmptyOrNull(birthDate) || isEmptyOrNull(education) || isEmptyOrNull(live))) {
        setStorage("personalInfo", {'age' : age, 'sex' : sex, 'seenMovie' : seenMovie, 'birthDate' : birthDate, 'education' : education, 'live' : live});
        window.location = 'intro.html';
    } else {
        alert('אנא מלא את כל הפרטים');
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
            var sliderVal = document.getElementById('range').value;
            var elapsedTime = Date.now() - startTime;
            appendToInnerDict('first_movie', (elapsedTime / 1000).toFixed(1), sliderVal);
            // console.log((elapsedTime / 1000).toFixed(1) ,sliderVal);
        }
        else {
            window.clearInterval(interval);
            var body = document.getElementById('body')
            var videodiv = document.getElementById('videodiv')
            body.removeChild(videodiv);
            var diver = document.createElement("div");
            diver.classList.add("text-xl-center");
            var debrief = document.createElement("img");
            debrief.classList.add("w-75");
            debrief.src="debrief.png";
            diver.appendChild(debrief);
            body.appendChild(diver);

        }
        } , 100);

}

function nextSlide() {
    let text = document.getElementById("imgClickAndChange").src;
    var i = text[text.search("Slide")+5];
    var num = parseInt(i);
    var nextbtn = document.getElementById("nextbtn");
    if(num===6 && !(nextbtn.childElementCount >= 1)){
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
        link.href = "rangeTag.html";
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

