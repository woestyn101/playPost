console.log("connnected");

var divE = document.getElementById("info");
var submitBtn = document.getElementById("submitBtn");
var userTitle = document.getElementById("userTitle");
var userPerson = document.getElementById("userPerson");



 function renderData(data)   {
    var divTitle = document.createElement("div");
    var divPerson = document.createElement("div");
    divTitle.innerHTML = data.title;
    divPerson.innerHTML = data.person;
    divE.appendChild(divTitle);      
    divE.appendChild(divPerson);          
 }

 const getData = () =>
 fetch('/api', {
   method: 'GET',
 })
   .then((res) => res.json())
   .then((data) => data)
   .catch((err)=>console.log(err));

 const saveNote = (note)=>
  fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  })
  

  // fetch function returns a Promise Object
  
  // .then(res=>res.json())
    
   
 
   
 
 

 
 getData().then((response) => response.forEach((information) => renderData(information)));

 submitBtn.addEventListener("click", showInput);

 function showInput(){
    console.log (userTitle.value);
    console.log (userPerson.value);

    var newdata = {
        title: userTitle.value,
        person: userPerson.value
    }

    console.log(newdata.title); 
    console.log(newdata.person);

    saveNote(newdata).then(data=>data.json()).then(responseData => {
      divE.innerHTML = ""
      responseData.forEach((information) => renderData(information))
    }).catch((err)=> console.log(err))
    
    
    // fetch('/api', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(note),
    // }).then(data=>data.json()).then(responseData => console.log(responseData))

  // console.log("***** PENDING PROMISE *******");
  // console.log(promiseData);

  // let resolvedPendingPromise = promiseData.then(data=>data.json());
  
  // console.log("****** FULFILLED PROMISE *******");
  // console.log(resolvedPendingPromise);

  // let actualData = resolvedPendingPromise.then(responseData => console.log(responseData))

  // console.log(actualData);
  // .then(data=>{
  //   divE.innerHTML = ""
  //   data.forEach((information) => renderData(information))
  // }
// )
    // .catch(err=>console.log(err));
  
       
   
 }

 
 