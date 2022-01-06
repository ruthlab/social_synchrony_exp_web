document.addEventListener("DOMContentLoaded", function nothing(){
    a = document.createElement("script");
    a.src='https://cdnjs.cloudflare.com/ajax/libs/jsrsasign/8.0.20/jsrsasign-all-min.js';
    document.body.appendChild(a)
    b = document.createElement("script");
    b.src='https://apis.google.com/js/api.js';
    document.body.appendChild(b)
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
        setTimeout(() => window.open("form.html"), 1000);

    }
}

function playVid() {
    var vid = document.getElementById('thevideo');
    vid.play();
    var vidsource = document.getElementById('vidsource');
    obj = JSON.parse(localStorage.getItem('expStorage'));
    obj["movie1"] = vidsource.src;
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
            var btn = document.createElement('button');
            var text = document.createTextNode("הורד תוצאות");
            btn.appendChild(text);
            btn.classList.add("btn");
            btn.classList.add("btn-primary");
            btn.classList.add("my-1");
            btn.setAttribute("onclick","onDownload();");
            var br = document.createElement('br');
            uploadFileExample("result "+Date.now().toString() +".json", "application/json", "1PWmDDeCRfEgn602o3mQjEDIJnDq8gZDn", JSON.stringify(JSON.parse(localStorage.getItem('expStorage'))), access_token)
            onDownload();
            body.appendChild(br);
            body.appendChild(btn);

        }
        } , 100);

}

function nextSlide() {
    let text = document.getElementById("imgClickAndChange").src;
    var i = text[text.search("Slide")+5];
    var num = parseInt(i);
    var nextbtn = document.getElementById("nextbtn");
    if(num===5 && !(nextbtn.childElementCount >= 1)){
        num = num+1;
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
    obj["movie2"] = vidsource.src;
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
            var tutorial = document.createElement("img");
            tutorial.classList.add("w-50");
            tutorial.src="next_movie.png";
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

function nextSlideTouch() {
    let text = document.getElementById("imgClickAndChanget").src;
    var i = text[text.search("Slide")+5];
    var num = parseInt(i);
    var nextbtn = document.getElementById("nextbtnt");
    if(num===5 && !(nextbtn.childElementCount >= 1)){
        num = num+1;
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
        link.target ="_self"
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
    setTimeout(() => a.click(), 1000);
}

function onDownload(){
    download(JSON.stringify(JSON.parse(localStorage.getItem('expStorage'))), "result "+Date.now().toString() +".json", "text/plain");
}

function playVidTrail() {
    var vid = document.getElementById('mighty');
    vid.play();
    var btndiv = document.getElementById('btndivtr');
    var btn = document.getElementById('playbtntr');
    btndiv.removeChild(btn);
    dataTagTrail();
}


function dataTagTrail(){
    let con = true;
    var startTime = Date.now();
    document.getElementById('mighty').addEventListener('ended',myHandler,false);
    function myHandler(e) {
        con = false;
    }
    var interval = window.setInterval(function () {
        if (con){
            var sliderVal = Math.abs(document.getElementById('rangetr').value);
            var elapsedTime = Date.now() - startTime;
            appendToInnerDict('sheepwolf', {"time":(elapsedTime / 1000).toFixed(1), "rate": sliderVal});
            // console.log((elapsedTime / 1000).toFixed(1) ,sliderVal);
        }
        else {
            window.clearInterval(interval);
            var body = document.getElementById('bodytr')
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
            link.href = "introTouch.html";
            btn.appendChild(link);
            var br = document.createElement('br');

            diver.appendChild(tutorial);
            body.appendChild(diver);
            body.appendChild(br);
            body.appendChild(btn);
        }
    } , 100);
}


//writing to google drive

//auth


var access_token = '';
var apiKey = 'AIzaSyBL6AWjlkqJ6f_GmJTDGxLwYQJR_UXUJis';
var key = "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDP1btyCb5plvr/\naFoKqwgHMm5qhWaJ9buQcf1FMg0qI3Uro5X0nPTqFNJLlSFUfzMAydLgJp7xCIuV\nrDfwW1elI+raun9oZovDNHc1V46QsDMeOVxiCCHAXwGUcsDsK0uRyMgN5ZtudqIQ\noX87eb1RqhcoqwTYrlnv/4moUeYTnAPUmovJCR4IykWxCm2gPaGMIADDTYS8e22c\n0OeS745x+iQh6/dm9C4oQxy1X+asJsAmzXnW9YLYIBlSqFco1DnMQMzs1g0TPrpb\n/XIp9lwZ2vn8dYdRrn8k2l/LJLkKaGLhbDHHJW6dUQ63qhLMK6c9sjWLOzy4Wl1h\nsZQOQoGnAgMBAAECggEAG2kpeS9ezSdMAE5/faO0Adr9ZBAnB3AA5lqaWDtzMAkQ\nJYrENshSpuLLH4vSIwZJsENuDAEb+lcxrbJSiGFLrGyRx3pMXnUT3tF3HXJoS53p\niAVxsT44UVpWZ4FA/4TwSRBtjiOnvchotH/QO4RhWzlvJ35yu683Dmep/Kicix5O\nLLRrFHcOLgu4staxFXjMapm+dG4qL9LLYQkyk6ZRLXkWDUa65dhmwKK5kqejT+W+\nUmNCvuTjhWdupWsiuwURKD51Jn7sqLnC2p/hTeQqSJ56YKcPz7uj0WpNa6sVi56k\nEYuV7xDwfcbyBbWeha9Jv9kpgpTWV8NiTN51Np97AQKBgQDn4Wg54EGAMbTsdLn4\n0bfyoqg/b1svuTwlBQMi5of162Xm0pEC3HRGVC3YUGTgDP20GGtfiOUOba5Ma6J1\nJKH3hkAsClePimjW9GgH/EAZTi5krh9QVSW9G454LcizoH5VTEO+WsH/pjlCUXxf\nlmvGMOvcUDl12KGctdGEWUA/AQKBgQDldAfPat8GZvgBTJATxkb015qGT0NziLRu\nG9ZAGDsV6wyPdWQK7gGJ/6qE4CdwQIAww2sloQyEozkQ+6SwLhx8E+4x0eu6/JVk\nv4qEgCdOZbUsJQ01WUiEC4OmZcRblIdNY2kfIIqZ3+8QuPDYADilnjrHl+g74BmZ\ns6/IPMFopwKBgHNP7fPyKMCmd3GrbpxlNpPr/b1mFDO8a0OBpZiiifRqtsc96a1B\nknUzAYV0HWYqL7Ry/FqLClXNh4Mrd6PHruAYHCuKjRat3wseiemGsR2ken/I83uQ\njG7pmET9h7SEWK70eS/dlGIc+JaZTT9/32K1C2YJYznOnDgBVwr5E3EBAoGAbWc1\nkiBS1qqh9Xyb9dHEY1mpxABnGN9FqHp9XXIwOfMouf4vBUcWVMYid9io9UzL0nRa\n0kZHwbZRr1dM3vQdgMu/9uEwlKd6U99AHI0+MJMuHy5LbfR0LwGOc/hx93iKSsvr\ng3vwmg273y1PKK5yVAVt4Vz8zg+8JR0X41GUpmECgYAQZZdVuz1DxwdKGBNqeYia\nBIi3unos52xgQ7X9M/1i+iaQLbKjzs4L27RFH9iOZP3vm9SPYykjiValcBZK+60C\n1cNCZM2LxsaexCFKorF40O0Yxe0oUb32L7/4IaNoBFODyr5SwKTJ/CzhktvhuutR\njZM61JEnlkJZbosMFQ4Y4A==\n-----END PRIVATE KEY-----\n";

setTimeout(function () {
    var pHeader = { "alg": "RS256", "typ": "JWT" }
    var sHeader = JSON.stringify(pHeader);

    var pClaim = {};
    pClaim.aud = "https://www.googleapis.com/oauth2/v3/token";
    pClaim.scope = "https://www.googleapis.com/auth/drive";
    pClaim.iss = "upload@academic-veld-337011.iam.gserviceaccount.com";
    pClaim.exp = KJUR.jws.IntDate.get("now + 1hour");
    pClaim.iat = KJUR.jws.IntDate.get("now");

    var sClaim = JSON.stringify(pClaim);

    var sJWS = KJUR.jws.JWS.sign(null, sHeader, sClaim, key);

    var XHR = new XMLHttpRequest();
    var urlEncodedData = "";
    var urlEncodedDataPairs = [];

    urlEncodedDataPairs.push(encodeURIComponent("grant_type") + '=' +
        encodeURIComponent("urn:ietf:params:oauth:grant-type:jwt-bearer"));
    urlEncodedDataPairs.push(encodeURIComponent("assertion") + '=' + encodeURIComponent(sJWS));
    urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+');

    // We define what will happen if the data are successfully sent
    XHR.addEventListener('load', function (event) {
        var response = JSON.parse(XHR.responseText);
        access_token = response["access_token"]

    });

    // We define what will happen in case of error
    XHR.addEventListener('error', function (event) {
        console.log('Oops! Something went wrong.');
        console.log(event);
    });

    XHR.open('POST', 'https://www.googleapis.com/oauth2/v3/token');
    XHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    XHR.send(urlEncodedData);
}, 2000);

/**
 example: uploadFileExample("name", "application/json", "1PWmDDeCRfEgn602o3mQjEDIJnDq8gZDn", "dataaa", access_token)
 */
function uploadFileExample(fileName, type, parent, data, accessToken) {

    var metadata = {
        name: fileName,
        mimeType: type,
        parents: [parent]
    };

    var formData = new FormData();
    formData.append( "metadata", new Blob( [JSON.stringify( metadata )], {type: type} ));
    formData.append( "file", data );

    fetch( "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart", {
        method: "POST",
        headers: new Headers({ "Authorization": "Bearer " + accessToken }),
        body: formData
    }).then( function( response ){
        return response.json();
    }).then( function( value ){
        console.log( value );
    });
}