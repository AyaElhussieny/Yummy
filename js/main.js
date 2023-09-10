
let rowData = document.querySelector("#rowData");

let sourceBtn = document.querySelector("#sourceBtn");
let youtubeBtn = document.querySelector("#youtubeBtn");
let search = document.querySelector("#search");
let searchForm = document.querySelector("#searchForm");
let searchName = document.querySelector("#searchName");
let searchFL = document.querySelector("#searchFL");
let category = document.querySelector("#category");
let area = document.querySelector("#area");
let ingredients = document.querySelector("#ingredients");
let contactUs = document.querySelector("#contactUs");
let submitBtn = document.querySelector("#submitBtn");
let nameInput = document.querySelector("#nameInput");
let emailInput = document.querySelector("#emailInput");
let phoneInput = document.querySelector("#phoneInput");
let ageInput = document.querySelector("#ageInput");
let passwordInput = document.querySelector("#passwordInput");
let repasswordInput = document.querySelector("#repasswordInput");
let contact = document.querySelector("#contact");




//loading
// $("#sideBar").addClass("d-none");
$(document).ready(function(){
    $(".loader").fadeOut(500);
    $("body").css("overflow","auto");
    // $("#sideBar").css("position","fixed")
    // $("#sideBar").removeClass("d-none");

});


//sideBar

let sideBarPosition = $("#sideBarMenu").innerWidth();
$("#sideBar").animate({ left: -sideBarPosition }, 500);
$("#sideBarIcon").addClass("fa-align-justify");
$("#sideBarIcon").removeClass("fa-x");
$("#links").hide(350);
// $("#links").animate({bottom:"0px"},350);


$("#sideBarIcon").click(function () {

    ($("#sideBar").css("left") == "0px") ? closeSideBar() : openSideBar();

})
function openSideBar() {
    $("#sideBar").animate({ left: "0px" }, 500);
    $("#links").show(1000);
    // $("#links").animate({top:"0px"},1000);

    $("#sideBarIcon").removeClass("fa-align-justify");
    $("#sideBarIcon").addClass("fa-x");
}

function closeSideBar() {
    $("#sideBar").animate({ left: -sideBarPosition }, 800);
    $("#links").hide(500);
    // $("#links").animate({bottom:"0px"},350);
    $("#sideBarIcon").addClass("fa-align-justify");
    $("#sideBarIcon").removeClass("fa-x");
}




function displayMeals(arr) {

    $("#contact").addClass("d-none");

    let cartona = ``;
    

    for (let i = 0; i < arr.length; i++) {

        cartona += ` <div class="col-md-3">
        <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal rounded-2 position-relative overflow-hidden">
            <img class="w-100" src="${arr[i].strMealThumb}" alt="">
            <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                <h3>${arr[i].strMeal}</h3>
            </div>
        </div>
       </div> `;

    }
    rowData.innerHTML = cartona;


}

async function getMeals() {

    rowData.innerHTML = ``;
    searchForm.innerHTML =``;
    $("#contact").addClass("d-none");

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
    let finalRes = await response.json();

    displayMeals(finalRes.meals);

}
getMeals();


async function getMealDetails(mealID) {
    $(".loader").fadeIn(300);

    rowData.innerHTML = ``;
    searchForm.innerHTML =``;
    $("#contact").addClass("d-none");

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    finalRes = await response.json();

    displayMealDetails(finalRes.meals[0]);
    $(".loader").fadeOut(300);

}

function displayMealDetails(meal) {
    rowData.innerHTML = ``;
    searchForm.innerHTML =``;
    $("#contact").addClass("d-none");
    let ingredients = ``
    // number of strIngredient && number strMeasure 
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }


    // let tags = Array.from(meal.strTags.split(","));
    // console.log(tags);
    // if (tags == 0) {
    //     tags = [];
    // }

         let tags = meal.strTags?.split(",") ;
         
         if(!tags)
         { tags = [];
        }
        


    let strTags = ``;
    for (let i = 0; i < tags.length; i++) {
        strTags += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }



    cartona = ` <div class="col-md-4 text-white">
    <img class="rounded-2 w-100" src="${meal.strMealThumb}" alt="">
    <h2>${meal.strMeal}</h2>
     </div>
     <div class="col-md-8 text-white">
    <h1>Instructions</h1>
    <p>${meal.strInstructions}</p>
    <div class="data mb-5">
       <table class="fw-5">
        <tr>
            <td><h3>Area :${meal.strArea}</h3> </td>
        </tr>
        <tr>
            <td><h3>Category :${meal.strCategory} </h3></td>  
        <tr>
            <td><h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                   ${ingredients}

                </ul>
            </td>
           
        </tr>
        <tr>
            <td><h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                ${strTags}
                </ul>
            </td>
           
        </tr>
       </table>
    </div>
    <div class="btns">
        <a target="_blank" href="${meal.strSource}" class="text-decoration-none">
            <button id="sourceBtn" class="btn btn-success">Source</button>
        </a>
        <a target="_blank" href="${meal.strYoutube}" class="text-decoration-none">
            <button id="youtubeBtn" class="btn btn-danger">Youtube</button>
        </a>

    </div>
</div>`;
rowData.innerHTML = cartona;


}



// S E A R C H

search.addEventListener("click",function(){
    closeSideBar();
    showSearchName();
});



// searchName.addEventListener("input", function(e){
//     getSearchByName(e.target.value);
// });
// searchFL.addEventListener("input", function(e){
//     getSearchByFirstLetter(e.target.value);
// });

function showSearchName(){
    $(".loader").fadeIn(300);
    rowData.innerHTML = ``;
    $("#contact").addClass("d-none");

    searchForm.innerHTML = `<div class="row py-5">
    <div class="col-md-6">
    <div class="form-group">
        <input type="text" oninput="getSearchByName(this.value)" class="form-control" id="searchName" name="searchName" placeholder="Search By Name">
    </div>
    </div>
    <div class="col-md-6">
    <div class="form-group bg-black">
     <input type="text" oninput="getSearchByFirstLetter(this.value)" class="form-control mb-3" maxlength="1" id="searchFL" name="searchFL" placeholder="Search By First Letter">
     </div>
    </div>
    </div>`;
    rowData.innerHTML=``;
    $(".loader").fadeOut(300);


}


async function getSearchByName(term) {
    $(".loader").fadeIn(300);
    closeSideBar();
    rowData.innerHTML = ``;
    $("#contact").addClass("d-none");
    
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
    let finalRes = await response.json();

    finalRes.meals ? displayMeals(finalRes.meals) : displayMeals([]);
    $(".loader").fadeOut(300);


    }


async function getSearchByFirstLetter(term){
    $(".loader").fadeIn(300);
    rowData.innerHTML = ``;
    $("#contact").addClass("d-none");
    closeSideBar();
    rowData.innerHTML = ``;
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
    let finalRes = await response.json();

    finalRes.meals ? displayMeals(finalRes.meals) : displayMeals([]);
    $(".loader").fadeOut(300);

    }


// function validateSearchName(){

//     var regex = /^\w{1,100}$/;


//     regex.test(searchName.value)? true : false;
        
// }

// function validateSearchByFirstLetter(){

//     var regex = /^[A-Za-z]$/;


//     regex.test(searchFL.value)? true : false;
        
// }

category.addEventListener("click",function(){
    closeSideBar();
    getCategories();
});

async function getCategories() {
    $(".loader").fadeIn(300);
    rowData.innerHTML = ``;
    searchForm.innerHTML = ``;
    $("#contact").addClass("d-none");

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    let finalRes = await response.json();

    console.log(finalRes.categories);

    displayCategories(finalRes.categories);
    $(".loader").fadeOut(300);


}

function displayCategories(arr) {
    rowData.innerHTML = ``;
    searchForm.innerHTML =``;
    $("#contact").addClass("d-none");
        let cartona = ``;
        
    
        for (let i = 0; i < arr.length; i++) {
    
            cartona += ` <div class="col-md-3">
            <div onclick="getCategoryMeals('${arr[i].strCategory}')" class="meal rounded-2 position-relative overflow-hidden">
                <img class="w-100" src="${arr[i].strCategoryThumb}" alt="">
                <div class="meal-layer position-absolute text-center px-3">
                    <h3>${arr[i].strCategory}</h3>
                    <p>${arr[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
            </div>
           </div> `;
    
        }
        rowData.innerHTML = cartona;
    }

    async function getCategoryMeals(Category) {
        $(".loader").fadeIn(300);
        rowData.innerHTML = ``;
        searchForm.innerHTML = ``;
    $("#contact").addClass("d-none");
    
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${Category}`);
        let finalRes = await response.json();
    
        console.log(finalRes.meals);
        displayMeals(finalRes.meals.slice(0, 20));
    
        $(".loader").fadeOut(300);
    
    }


    area.addEventListener("click",function(){
        closeSideBar();
        getArea();
    });

    async function getArea() {
        $(".loader").fadeIn(300);

        rowData.innerHTML = ``;
        searchForm.innerHTML = ``;
    $("#contact").addClass("d-none");
    
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
        let finalRes = await response.json();
    
        console.log(finalRes.meals);
        displayArea(finalRes.meals);
        $(".loader").fadeOut(300);

    
    }

    function displayArea(arr) {
        rowData.innerHTML = ``;
    searchForm.innerHTML =``;
    $("#contact").addClass("d-none");
        let cartona = ``;
    
        for (let i = 0; i < arr.length; i++) {
            cartona += `
            <div class="col-md-3">
                    <div onclick="getAreaMeals('${arr[i].strArea}')" class="rounded-2 text-white text-center cursor-pointer">
                            <i class="fa-solid fa-house-laptop fa-4x"></i>
                            <h3>${arr[i].strArea}</h3>
                    </div>
            </div>
            `
        }
    
        rowData.innerHTML = cartona;
    }

    async function getAreaMeals(area) {
        $(".loader").fadeIn(300);
        rowData.innerHTML = ``;
    searchForm.innerHTML =``;
    $("#contact").addClass("d-none");
    
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
        let finalRes = await response.json()
    
    
        displayMeals(finalRes.meals.slice(0, 20));
        $(".loader").fadeOut(300);

    
    }


    ingredients.addEventListener("click",function(){
        closeSideBar();
        getIngredients();
    });

    async function getIngredients() {
        $(".loader").fadeIn(300);
        rowData.innerHTML = ``;
        searchForm.innerHTML = ``;
       
    $("#contact").addClass("d-none");
    
        let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
        let finalRes = await respone.json()
        console.log(finalRes.meals);
    
        displayIngredients(finalRes.meals.slice(0, 20));
        $(".loader").fadeOut(300);

    
    }
    
    
    function displayIngredients(arr) {
        rowData.innerHTML = ``;
    searchForm.innerHTML =``;
    $("#contact").addClass("d-none");
        let cartona = ``;
    
        for (let i = 0; i < arr.length; i++) {
            cartona += `
            <div class="col-md-3">
                    <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="rounded-2 text-white text-center cursor-pointer">
                            <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                            <h3>${arr[i].strIngredient}</h3>
                            <p>${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
            </div>
            `
        }
    
        rowData.innerHTML = cartona;
    }

    async function getIngredientsMeals(ingredients) {
        $(".loader").fadeIn(300);
        rowData.innerHTML = ``;
        searchForm.innerHTML =``;
        $("#contact").addClass("d-none");
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
        let finalRes = await response.json()
    
    
        displayMeals(finalRes.meals.slice(0, 20));
        $(".loader").fadeOut(300);

    
    }

    contactUs.addEventListener("click",function(){
        closeSideBar();
        $(".loader").fadeIn(100);
        rowData.innerHTML=``;
        searchForm.innerHTML=``;
        $("#contact").removeClass("d-none");
        $(".loader").fadeOut(100);


    });

    

    function validationInputs() {
    if(validateName() && validateEmail() && validatePhone() &&
    validateAge() && validatePassword() && validateRePassword()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled");
    }
}

    function validateName() {
       let  regex = /^\w{1,50}$/;
       if(regex.test(nameInput.value)==true){ 
        document.getElementById("nameAlert").classList.replace("d-block", "d-none");
        return true;
    } else { 
        document.getElementById("nameAlert").classList.replace("d-none", "d-block");
            return false ;
    }    
}
    
    function validateEmail() {
        let regex = /^\w{10,100}\@yyy\.zzz$/;
        if(regex.test(emailInput.value)==true){ 
            document.getElementById("emailAlert").classList.replace("d-block", "d-none");
            return true;
        } else { 
            document.getElementById("emailAlert").classList.replace("d-none", "d-block");
                return false ;
        }
    }
    
    function validatePhone() {
        let regex = /^(002)?01[1205]\d{8}$/;
        if(regex.test(phoneInput.value)==true){ 
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none");
            return true;
        } else { 
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block");
                return false ;
        }    }
    
    function validateAge() {
        let regex = /^([1-9]|[1-9][0-9])$/;
        if(regex.test(ageInput.value)==true){ 
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
            return true;
        } else { 
            document.getElementById("ageAlert").classList.replace("d-none", "d-block");
                return false ;
        }    }
    
    function validatePassword() {
        let regex = /^[A-Za-z0-9]{8,}$/;
        if(regex.test(passwordInput.value)==true){ 
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none");
            return true;
        } else { 
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block");
                return false ;
        }    }
    
    function validateRePassword() {
       if  ((repasswordInput.value) == (passwordInput.value)) { 
        document.getElementById("repasswordAlert").classList.replace("d-block", "d-none");
            return true;
        } else { 
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block");
                return false ;
                
        }    
    }