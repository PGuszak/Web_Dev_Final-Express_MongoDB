
function validateForm(){
    //check to see paswords match - if not show error and highlight background
    //check if password has
        //small letter, capital letter, and a number
        //if not show error message and highlight feilds
    
    //Initialize stuff 
    var lowerCaseLetters = /[a-z]/;
    var upperCaseLetters = /[A-Z]/;
    var numbers = /[0-9]/;
    var notaloud = /['<>#-{}()"`']/;

    //main body variables
    var firstName = document.getElementById("firstName");
    var lastName = document.getElementById("lastName");
    var User = document.getElementById("Username");
    var Email = document.getElementById("Email");
    var password = document.getElementById("Password");
    var Vpassword = document.getElementById("VPassword");
    var DOB = document.getElementById("DOB");
    var docError = document.getElementById("submitError");
 
    //security question variables
    var Sec1Question = document.getElementById("SecurityQ1");
    var Sec1Ans = document.getElementById("SecurityA1");
    var Sec2Question = document.getElementById("SecurityQ2");
    var Sec2Ans = document.getElementById("SecurityA2");
    var Sec3Question = document.getElementById("SecurityQ3");
    var Sec3Ans = document.getElementById("SecurityA3");


    //no special characters in any text feilds   BROKEN!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    /*if(notaloud.test(firstName.value)){
        docError.classList.remove("invisible");
        docError.innerHTML = "Feilds cannot contain any special characters";
        console.log("There are special characters...NO");
        return false;
    }*/

    //if empty
    if(firstName.value == "" || lastName.value == "" || User.value == "" || Email == ""
     || DOB.value == "" || Sec1Ans.value == "" || Sec2Ans.value == "" || Sec3Ans.value == "")
    {
        docError.classList.remove("invisible");
        docError.innerHTML = "There are required feilds that are empty";
        console.log("There are feilds that are empty!")
        return false;
    }

    if(password.value.match(lowerCaseLetters) == null)
    {
        docError.classList.remove("invisible");
        docError.innerHTML = "Password format is incorrect - Must have atleast 1 lowercase";
        return false;
    }

    if(password.value.match(upperCaseLetters) == null){
        docError.classList.remove("invisible");
        docError.innerHTML = "Password format is incorrect - Must have atleast 1 Uppercase";
        return false
    }

    if(password.value.match(numbers) == null){
        docError.classList.remove("invisible");
        docError.innerHTML = "Password format is incorrect - Must have atleast 1 number";
        return false;
    }

    if(password.value.length <8){
        docError.classList.remove("invisible");
        docError.innerHTML = "Password must be atleast 8 characters long";
        return false;
    }

    if(password.value !== Vpassword.value){
        password.classList.add("hasError");
        Vpassword.classList.add("hasError");
        docError.classList.remove("invisible");
        docError.innerHTML = "You must have matching passwords";
        return false;
    }

    if(password.value == "" || Vpassword.value == ""){
        password.classList.add("hasError");
        Vpassword.classList.add("hasError");
        docError.classList.remove("invisible");
        docError.innerHTML = "Password and Verify Password cannot be blank";
        return false;
    }

    if(Sec1Question.value == "NoValid" || Sec2Question.value == "NoValid" ||
     Sec3Question.value == "NoValid"){
        docError.classList.remove("invisible");
        docError.innerHTML = "You have not chosen atleast 1 security question to answer"; 
        return false;
     }   

     else{
         return true;
     }
}



//make three on change functions for secturity questions so when chosen the feild is visible
function securitychange1(){
    var Security1 = document.getElementById("SecurityQ1");
    var txtSecurity1 = document.getElementById("diTxtvSecurity1");
    if(Security1.value == "NoValid"){
        txtSecurity1.classList.add("invisible");
    }
    else{
        txtSecurity1.classList.remove("invisible");
    }

}

function securitychange2(){
    var sec2question = document.getElementById("SecurityQ2");
    var divSecurity2 = document.getElementById("divSecurity2");
    if(sec2question.value == "NoValid"){
        divSecurity2.classList.add("invisible");
    }
    else{
        divSecurity2.classList.remove("invisible");
    }

}

function securitychange3(){
    var Security3 = document.getElementById("SecurityQ3");
    var txtSecurity3 = document.getElementById("divSecurity3");
    if(Security3.value == "NoValid"){
        txtSecurity3.classList.add("invisible");
    }
    else{
        txtSecurity3.classList.remove("invisible");
    }
}