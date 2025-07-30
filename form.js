let myFormEl = document.getElementById("myForm");
let nameEl = document.getElementById("name");
let emailEl = document.getElementById("email");
let errorMsg = document.getElementById("errorMsg");
let emailErrorMsg = document.getElementById("emailErrorMsg");
let workingStateEl = document.getElementById("status");
let genderMaleEl = document.getElementById("genderMale");
let genderFemaleEl = document.getElementById("genderFemale");

let formData = {
    name:"",
    email : "",
    status : "Active",
    gender : "Male"
};



function validateFormData(formData){
    let{email,name} = formData;
    if(name === ""){
        errorMsg.textContent = "Required*";
    }
    if(email === ""){
        emailErrorMsg.textContent = "Required*";
    }
}


function submitFormData(formData){
    let options = {
        method : "POST",
        headers : {
            "content-Type" : "application/json",
            Accept : "application/json",
            Authorization : "Bearer 939281e404dba6a504f40f5e4064edbe5977d6264522d9507fa21e69ce06e687"
        },
        body : JSON.stringify(formData)
    }
    let url = "https://gorest.co.in/public-api/users";
    fetch(url,options)
    .then(function(response){
        return response.json();
    })
    .then(function(jsonData){
        if(jsonData.code === 422){
            if(jsonData.data[0].message === "has already been taken" && jsonData.data[0].field === "email"){
                emailErrorMsg.textContent = "Email Already Exists!" 
            }
        } 
    })
}



myFormEl.addEventListener("submit", function(event){
    event.preventDefault();
    //form validation
    validateFormData(formData);
    submitFormData(formData);
});

nameEl.addEventListener("change",function(event){
    if(event.target.value === ""){
        errorMsg.textContent = "Required*";
    }
    else{
        errorMsg.textContent = "";
    }

    formData.name = event.target.value;
})

emailEl.addEventListener("change",function(event){
    if(event.target.value === ""){
        emailErrorMsg.textContent = "Required*";
    }
    else{
        emailErrorMsg.textContent = "";
    }
    formData.email = event.target.value;

})

workingStateEl.addEventListener("change",function(event){
    formData.status = event.target.value;
})

genderMaleEl.addEventListener("change",function(event){
    formData.gender = event.target.value;
})


genderFemaleEl.addEventListener("change",function(event){
    formData.gender = event.target.value;
})