
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
            console.log((elapsedTime / 1000).toFixed(1) ,sliderVal);
        }
        else {
            window.clearInterval(interval);
            window.open("finished.html");
        }
        } , 100);

}

function nextSlide() {
    let text = document.getElementById("imgClickAndChange").src;
    var i = text[text.search("slide")+5];
    var num = parseInt(i);
    var nextbtn = document.getElementById("nextbtn");
    if(num===6 && !(nextbtn.childElementCount >= 1)){
        document.getElementById("imgClickAndChange").src = "slide"+ num+".jpg";
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
        document.getElementById("imgClickAndChange").src = "slide"+ num+".jpg";
    }
    else{
        num = num+1;
        document.getElementById("imgClickAndChange").src = "slide"+ num+".jpg";

    }

}

function prevSlide() {
    let text = document.getElementById("imgClickAndChange").src;
    var i = text[text.search("slide")+5];
    var num = parseInt(i);
    if(num===1){
        document.getElementById("imgClickAndChange").src = "slide"+ num+".jpg";

    }
    else{
        num = num-1;
        document.getElementById("imgClickAndChange").src = "slide"+ num+".jpg";

    }
    var slide = "gaze\\slide".concat('', num.toString()).concat('', ".jpg");
}

