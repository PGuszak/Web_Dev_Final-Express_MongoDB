
function validateForm(){
    //check to see paswords match - if not show error and highlight background
    //check if password has
        //small letter, capital letter, and a number
        //if not show error message and highlight feilds
    
    //Initialize stuff 
    var lowerCaseLetters = /[a-z]/;
    var upperCaseLetters = /[A-Z]/;
    var numbers = /[0-9]/;
    var notaloud = /[<>#-{}()'"`]/;

    //main body variables
    var firstName = document.getElementById("txtFirstname");
    var lastName = document.getElementById("txtLastname");
    var User = document.getElementById("txtuser");
    var Email = document.getElementById("txtemail");
    var password = document.getElementById("txtPassword");
    var Vpassword = document.getElementById("confirmPassword");
    var DOB = document.getElementById("DateDOB");
    var docError = document.getElementById("submitError");
 
    //security question variables
    var Sec1Question = document.getElementById("Security1");
    var Sec1Ans = document.getElementById("textSecurity1");
    var Sec2Question = document.getElementById("Security2");
    var Sec2Ans = document.getElementById("textSecurity2");
    var Sec3Question = document.getElementById("Security3");
    var Sec3Ans = document.getElementById("textSecurity3");


    //no special characters in any text feilds
    if(firstName.value.match(notaloud) || lastName.value.match(notaloud) ||
     User.value.match(notaloud) || Email.value.match(notaloud) ||
     password.value.match(notaloud) || Vpassword.value.match(notaloud) ||
     Sec1Ans.value.match(notaloud) || Sec2Ans.value.match(notaloud) ||
     Sec3Ans.value.match(notaloud)){
        docError.classList.remove("invisible");
        docError.innerHTML = "Feilds cannot contain any of these special characters:   " + '<>#-{}()"`' + "'";
        return false;   
    }

    //if empty
    else if(firstName.value == "" || lastName.value == "" || User.value == "" || Email == ""
     || DOB.value == "")
    {
        docError.classList.remove("invisible");
        docError.innerHTML = "There are required feilds that are empty";
        return false;
    }

    else if(password.value.match(lowerCaseLetters) == null)
    {
        docError.classList.remove("invisible");
        docError.innerHTML = "Password format is incorrect - Must have atleast 1 lowercase";
        return false;
    }

    else if(password.value.match(upperCaseLetters) == null){
        docError.classList.remove("invisible");
        docError.innerHTML = "Password format is incorrect - Must have atleast 1 Uppercase";
        return false
    }

    else if(password.value.match(numbers) == null){
        docError.classList.remove("invisible");
        docError.innerHTML = "Password format is incorrect - Must have atleast 1 number";
        return false;
    }

    else if(password.value.length <8){
        docError.classList.remove("invisible");
        docError.innerHTML = "Password must be atleast 8 characters long";
        return false;
    }

    else if(password.value == "" || Vpassword.value == ""){
        password.classList.add("hasError");
        Vpassword.classList.add("hasError");
        docError.classList.remove("invisible");
        docError.innerHTML = "Password and Verify Password cannot be blank";
        return false;
    }

    else if(Sec1Question.value == "NoValid" || Sec2Question.value == "NoValid" ||
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
    var Security1 = document.getElementById("Security1");
    var txtSecurity1 = document.getElementById("diTxtvSecurity1");
    if(Security1.value == "NoValid"){
        txtSecurity1.classList.add("invisible");
    }
    else{
        txtSecurity1.classList.remove("invisible");
    }

}

function securitychange2(){
    var sec2question = document.getElementById("Security2");
    var divSecurity2 = document.getElementById("divSecurity2");
    if(sec2question.value == "No"){
        divSecurity2.classList.add("invisible");
    }
    else{
        divSecurity2.classList.remove("invisible");
    }

}

function securitychange3(){
    var Security3 = document.getElementById("Security3");
    var txtSecurity3 = document.getElementById("divSecurity3");
    if(Security3.value == "NoValid"){
        txtSecurity3.classList.add("invisible");
    }
    else{
        txtSecurity3.classList.remove("invisible");
    }
}