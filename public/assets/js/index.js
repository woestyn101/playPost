console.log("connnected");

var divE = document.getElementById("info");
var submitBtn = document.getElementById("submitBtn");
var userTitle = document.getElementById("userTitle");
var userPerson = document.getElementById("userPerson");

const getData = () =>
  fetch('/api', {
    method: 'GET',
  })
    .then((res) => res.json())
    .then((data) => data);

 function renderData(data)   {
    var divTitle = document.createElement("div");
    var divPerson = document.createElement("div");
    divTitle.innerHTML = data.title;
    divPerson.innerHTML = data.person;
    divE.appendChild(divTitle);      
    divE.appendChild(divPerson);          
 }



 getData().then((response) => response.forEach((information) => renderData(information)));

 submitBtn.addEventListener("click", showInput);

 function showInput(){
    console.log (userTitle.value);
    console.log (userPerson.value);

    var newdata = {
        title: userTitle.value,
        person: userPerson.value
    }
    postingData(newdata);
   
   
   
 }

 function postingData(data){
// using fetch to post new data
fetch("/new", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => {
    return res.json();
    
})
  
    .catch((error) => {
      console.error(
        "There was a problem with the fetch operation:",
        error
      );
    });

 }
 
 