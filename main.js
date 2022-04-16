document.addEventListener("DOMContentLoaded", function nothing(){
    a = document.createElement("script");
    a.src='https://cdnjs.cloudflare.com/ajax/libs/jsrsasign/8.0.20/jsrsasign-all-min.js';
    document.body.appendChild(a)
    b = document.createElement("script");
    b.src='https://apis.google.com/js/api.js';
    document.body.appendChild(b)
    randomizer();
})

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

function continueQuestions(){
    var lead = document.getElementById("infoForm").lead.value;
    var feelings_of_movie = document.getElementById("infoForm").feelings_of_movie.value;
    var relay_on_feeling = document.getElementById("infoForm").relay_on_feeling.value;

    if (!(isEmptyOrNull(lead) || isEmptyOrNull(feelings_of_movie) || isEmptyOrNull(relay_on_feeling))) {
        if (getStorage(getStorage("trail2")) == undefined) {
            setStorage("Questions " + getStorage("trail1") , {'lead' : lead, 'feelings_of_movie' : feelings_of_movie, 'relay_on_feeling' : relay_on_feeling});
            window.location = "intro"+ getStorage("trail2") +".html";
        }
        else{
            setStorage("Questions " + getStorage("trail2") , {'lead' : lead, 'feelings_of_movie' : feelings_of_movie, 'relay_on_feeling' : relay_on_feeling});
            window.location = "IRI.html";
        }
    } else {
        alert('אנא מלא/י את כל הפרטים');
    }
}

function IRI(){
    var q1 = document.getElementById("infoForm").q1.value;
    var q2 = document.getElementById("infoForm").q2.value;
    var q3 = document.getElementById("infoForm").q3.value;
    var q4 = document.getElementById("infoForm").q4.value;
    var q5 = document.getElementById("infoForm").q5.value;
    var q6 = document.getElementById("infoForm").q6.value;
    var q7 = document.getElementById("infoForm").q7.value;
    var q8 = document.getElementById("infoForm").q8.value;
    var q9 = document.getElementById("infoForm").q9.value;
    var q10 = document.getElementById("infoForm").q10.value;
    var q11 = document.getElementById("infoForm").q11.value;
    var q12 = document.getElementById("infoForm").q12.value;
    var q13 = document.getElementById("infoForm").q13.value;
    var q14 = document.getElementById("infoForm").q14.value;
    var q15 = document.getElementById("infoForm").q15.value;
    var q16 = document.getElementById("infoForm").q16.value;
    var q17 = document.getElementById("infoForm").q17.value;
    var q18 = document.getElementById("infoForm").q18.value;
    var q19 = document.getElementById("infoForm").q19.value;
    var q20 = document.getElementById("infoForm").q20.value;
    var q21 = document.getElementById("infoForm").q21.value;
    var q22 = document.getElementById("infoForm").q22.value;
    var q23 = document.getElementById("infoForm").q23.value;
    var q24 = document.getElementById("infoForm").q24.value;
    var q25 = document.getElementById("infoForm").q25.value;
    var q26 = document.getElementById("infoForm").q26.value;
    var q27 = document.getElementById("infoForm").q27.value;
    var q28 = document.getElementById("infoForm").q28.value;

    if (!(isEmptyOrNull(q1) || isEmptyOrNull(q2) || isEmptyOrNull(q3))) {
        setStorage("IRI" , {'q1' : q1, 'q2' : q2, 'q3' : q3, 'q4' : q4, 'q5' : q5, 'q6' : q6, 'q7' : q7, 'q8' : q8, 'q9' : q9,
            'q10' : q10, 'q11' : q11, 'q12' : q12, 'q13' : q13, 'q14' : q14, 'q15' : q15, 'q16' : q16, 'q17' : q17, 'q18' : q18, 'q19' : q19,
            'q20' : q20, 'q21' : q21, 'q22' : q22, 'q23' : q23, 'q24' : q24, 'q25' : q25, 'q26' : q26, 'q27' : q27, 'q28' : q28});
        var body = document.getElementById('body')
        var div = document.getElementById("div")
        body.removeChild(div);
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
    } else {
        alert('אנא מלא/י את כל הפרטים');
    }
}


function continueForm() {
    var age = document.getElementById("infoForm").ageInput.value;
    var sex = document.getElementById("infoForm").sexInput.value;
    var seenMovie = document.getElementById("infoForm").seenMovieInput.value;
    var activity = document.getElementById("infoForm").activity.value;
    var education = document.getElementById("infoForm").educationInput.value;
    var live = document.getElementById("infoForm").liveInput.value;

    if (!(isEmptyOrNull(age) || isEmptyOrNull(sex) || isEmptyOrNull(seenMovie) || isEmptyOrNull(education) || isEmptyOrNull(activity) || isEmptyOrNull(live))) {
        setStorage("personalInfo", {'age' : age, 'sex' : sex, 'seenMovie' : seenMovie,  'education' : education, 'live' : live, 'sync_time': activity});
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

function jsonRunReader(json){
    let prev = json["runs"][0]["numOfRuns"];
    var toWrite = JSON.parse(JSON.stringify(json));
    for (let i = 0; i < json["runs"].length; i++){
        if (i>0 && json["runs"][i]["numOfRuns"]<json["runs"][i-1]["numOfRuns"]){
            json["runs"][i]["numOfRuns"] = json["runs"][i]["numOfRuns"] +1;
            toWrite = JSON.parse(JSON.stringify(json));
            let trails = json["runs"][i]["trails"];
            setStorage("trail1",trails[Math.floor(Math.random() * trails.length)]);
            trails.splice(trails.indexOf(getStorage("trail1")), 1);
            setStorage("trail2",trails[Math.floor(Math.random() * trails.length)]);
            let movies = json["runs"][i]["movies"];
            setStorage("movie1",movies[Math.floor(Math.random() * movies.length)]);
            movies.splice(movies.indexOf(getStorage("movie1")), 1);
            setStorage("movie2",movies[Math.floor(Math.random() * movies.length)]);
        }
        else if (json["runs"].length-1 == i) {
            json["runs"][0]["numOfRuns"] = json["runs"][0]["numOfRuns"] +1;
            toWrite = JSON.parse(JSON.stringify(json));
            let trails = json["runs"][0]["trails"];
            setStorage("trail1",trails[Math.floor(Math.random() * trails.length)]);
            trails.splice(trails.indexOf(getStorage("trail1")), 1);
            setStorage("trail2",trails[Math.floor(Math.random() * trails.length)]);
            let movies = json["runs"][0]["movies"];
            setStorage("movie1",movies[Math.floor(Math.random() * movies.length)]);
            movies.splice(movies.indexOf(getStorage("movie1")), 1);
            setStorage("movie2",movies[Math.floor(Math.random() * movies.length)]);
        }
    }
    setTimeout(function () {updateFileExample("runControler.json", "application/json", "19dtQxanur31A_p3VJH8cQ6YQ8XkQ0y4-", JSON.stringify(toWrite), access_token)}, 5000);
}
function getFileExample(accessToken) {

    fetch( "https://www.googleapis.com/drive/v2/files/1Z49XaLlvh75kCrWMExHwiS8zXWnHC-WH?alt=media", {
        method: "GET",
        headers: new Headers({ "Authorization": "Bearer " + accessToken })
    }).then( function( response ){
        return response.json();
    }).then( function( value ){
        jsonRunReader(value);
});
}
function randomizer() {
    setTimeout(function () {getFileExample(access_token)}, 5000)
}

function playVid(type) {
    var vid = document.getElementById('thevideo' + type[0].toLowerCase());
    vid.play();
    var btndiv = document.getElementById('btndiv'+ type[0].toLowerCase());
    var btn = document.getElementById('playbtn'+ type[0].toLowerCase());
    btndiv.removeChild(btn);
    if (getStorage("trail1") == type){
        firstDataTag()
    }
    else{
        SecondDataTag()
    }
}

function loadVideo(type){
    if (getStorage("trail1") == type){
        var vid1 = document.getElementById('thevideo'+ getStorage("trail1")[0].toLowerCase())
        var source1 = document.createElement("source");
        source1.setAttribute("src","movies/" + getStorage("movie1") + ".mp4" )
        source1.setAttribute("type", "video/mp4")
        vid1.appendChild(source1);

    }
    else{
        var vid2 = document.getElementById('thevideo'+ getStorage("trail2")[0].toLowerCase())
        var source2 = document.createElement("source");
        source2.setAttribute("src", "movies/" + getStorage("movie2") + ".mp4" )
        source2.setAttribute("type", "video/mp4")
        vid2.appendChild(source2);
    }
}

function firstDataTag(){
    let type = getStorage("trail1");
    let con = true;
    var startTime = Date.now();
    document.getElementById('thevideo'+ type[0].toLowerCase()).addEventListener('ended',myHandler,false);
    function myHandler(e) {
        con = false;

    }
    var interval = window.setInterval(function () {
        if (con){
            var sliderVal = Math.abs(document.getElementById('range'+ type[0].toLowerCase()).value);
            var elapsedTime = Date.now() - startTime;
            appendToInnerDict(type, {"time":(elapsedTime / 1000).toFixed(1), "rate": sliderVal});
        }
        else {
            window.clearInterval(interval);
            window.location = 'transition.html';

        }
        } , 100);

}


function SecondDataTag(){
    let type = getStorage("trail2");
    let con = true;
    var startTime = Date.now();
    document.getElementById('thevideo'+ type[0].toLowerCase()).addEventListener('ended',myHandler,false);
    function myHandler(e) {
        con = false;
    }
    var interval = window.setInterval(function () {
        if (con){
            var sliderVal = Math.abs(document.getElementById('range'+ type[0].toLowerCase()).value);
            var elapsedTime = Date.now() - startTime;
            appendToInnerDict(type, {"time":(elapsedTime / 1000).toFixed(1), "rate": sliderVal});
            // console.log((elapsedTime / 1000).toFixed(1) ,sliderVal);
        }
        else {
            window.clearInterval(interval);
            window.location = 'transition.html';
        }
    } , 100);

}

function nextSlide(type, slideNum) {

    let text = document.getElementById("imgClickAndChange" + type[0].toLowerCase()).src;
    let i = text[text.search("Slide")+5];
    let num = parseInt(i);
    let nextbtn = document.getElementById("nextbtn" + type[0].toLowerCase());
    if(num==slideNum-1 && !(nextbtn.childElementCount >= 1)){
        num = num+1;
        document.getElementById("imgClickAndChange" + type[0].toLowerCase()).src = type.toLowerCase() + "\\Slide"+ num+".png";
        let btn = document.createElement('button');
        let link = document.createElement('a');
        let next = document.createTextNode("המשך");
        btn.classList.add("btn");
        btn.classList.add("btn-primary");
        btn.classList.add("my-1");
        link.classList.add("text-decoration-none");
        link.classList.add("text-white");
        link.appendChild(next);
        link.href = "rangeTag" + type + ".html";
        link.target ="_self"
        btn.appendChild(link);
        nextbtn.appendChild(btn);

    }
    else if(num==slideNum -1){
        document.getElementById("imgClickAndChange"+ type[0].toLowerCase()).src = type.toLowerCase() + "\\Slide"+ num+".png";
    }
    else{
        num = num+1;
        document.getElementById("imgClickAndChange" + type[0].toLowerCase()).src = type.toLowerCase() + "\\Slide"+ num+".png";

    }

}

function prevSlide(type) {
    let text = document.getElementById("imgClickAndChange"+ type[0].toLowerCase()).src;
    var i = text[text.search("Slide")+5];
    var num = parseInt(i);
    if(num===1){
        document.getElementById("imgClickAndChange"+ type[0].toLowerCase()).src = type.toLowerCase() + "\\Slide"+ num+".png";
    }
    else{
        num = num-1;
        document.getElementById("imgClickAndChange"+ type[0].toLowerCase()).src = type.toLowerCase() + "\\Slide"+ num+".png";
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
            let btn = document.createElement('button');
            let link = document.createElement('a');
            let next = document.createTextNode("המשך");
            btn.classList.add("btn");
            btn.classList.add("btn-primary");
            btn.classList.add("my-1");
            link.classList.add("text-decoration-none");
            link.classList.add("text-white");
            link.appendChild(next);
            link.href = "intro"+ JSON.parse(localStorage.getItem('expStorage'))['trail1'] +".html";
            btn.appendChild(link);
            var br = document.createElement('br');

            diver.appendChild(tutorial);
            body.appendChild(diver);
            body.appendChild(br);
            body.appendChild(btn);
        }
    } , 100);
}

function playVidVal() {
    var vid = document.getElementById('thevideov');
    vid.play();
    var btndiv = document.getElementById('btndivv');
    var btn = document.getElementById('playbtnv');
    btndiv.removeChild(btn);
    dataTagVal();
}

function dataTagVal(){
    let con = true;
    var startTime = Date.now();
    document.getElementById('thevideov').addEventListener('ended',myHandler,false);
    function myHandler(e) {
        con = false;
    }
    var interval = window.setInterval(function () {
        if (con){
            var sliderValX = slider.position.x.toString();
            var sliderValY = slider.position.y.toString();
            var elapsedTime = Date.now() - startTime;
            appendToInnerDict('valence', {"time":(elapsedTime / 1000).toFixed(1), "x": sliderValX,"y": sliderValY});
            // console.log((elapsedTime / 1000).toFixed(1) ,sliderVal);
        }
        else {
            window.clearInterval(interval);
            var body = document.getElementById('bodyv')
            var videodiv = document.getElementById('videodivv')
            var graph = document.getElementById('widget')
            body.removeChild(videodiv);
            body.removeChild(graph);
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
            link.href = "rangeTagValence.html";
            btn.appendChild(link);
            var br = document.createElement('br');
            onDownload()
            diver.appendChild(tutorial);
            diver.appendChild(br);
            diver.appendChild(btn);
            body.appendChild(diver);
        }
    } , 100);
}
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
function updateFileExample(fileName, type, parent, data, accessToken) {

    var metadata = {
        name: fileName,
        mimeType: type,
        parents: [parent]
    };

    var formData = new FormData();
    formData.append( "metadata", new Blob( [JSON.stringify( metadata )], {type: type} ));
    formData.append( "file", data );

    fetch( "https://www.googleapis.com/upload/drive/v2/files/1Z49XaLlvh75kCrWMExHwiS8zXWnHC-WH?uploadType=multipart", {
        method: "PUT",
        headers: new Headers({ "Authorization": "Bearer " + accessToken }),
        body: formData
    }).then( function( response ){
        return response.json();
    }).then( function( value ){
        console.log( value );
    });
}

