let isTrue = !0
sideBarToggle = function () {
    isTrue ? ($(".navContent").addClass("open-menu").removeClass("close-menu"), $(".bgBlack").animate({ opacity: "1" }, 500), $(".ss").animate({
        opacity: "1",
        position: "absolute",
        bottom: "50px",
        left: "20px"
    }, 1700),
        nvWidth = $(".navContent").width() + 22, $(".strip-header-nav").css("left", nvWidth), $(".fa-align-justify").toggleClass("fa-times"), $(".navContent .item1").animate({
            opacity: "1",
            paddingTop: "25px"
        }, 1100), $(".navContent .item2").animate({
            opacity: "1",
            paddingTop: "25px"
        }, 1200), $(".navContent .item3").animate({
            opacity: "1",
            paddingTop: "25px"
        }, 1300), $(".navContent .item4").animate({
            opacity: "1",
            paddingTop: "25px"
        }, 1400), $(".navContent .item5").animate({
            opacity: "1",
            paddingTop: "25px"
        }, 1500), $(".navContent .item6").animate({
            opacity: "1",
            paddingTop: "25px"
        }, 1600), isTrue = !isTrue) : ($(".bgBlack").animate({ opacity: "0" }, 500), $(".navContent").addClass("close-menu").removeClass("open-menu"), $(".ss").animate({
            opacity: "0",
        }, 300), $(".bgBlack").animate({
            backgroundColor: "transparent"
        }, 200), $(".fa-align-justify").toggleClass("fa-times"), $(".strip-header-nav").css("left", 0), $(".navContent li").animate({
            opacity: "0",
            paddingTop: "500px"
        }, 500), isTrue = !isTrue)
}
$(".strip-toggel-menu").click(function () {
    sideBarToggle();
});
$(document).ready(function () {
    $(".loadingScreen").fadeOut(2000, function () {
        $(document.body).css("overflowY", "unset")
    })
})

function ingredientsDisplay() {
    sideBarToggle();
    $(".loadingContainer").show(100)
    let response = new XMLHttpRequest();
    response.open("GET", "https://www.themealdb.com/api/json/v1/1/list.php?i=list");
    response.send();
    response.addEventListener("loadend", function () {
        if (response.status == 200) {
            ingredients = JSON.parse(response.response);

            let box = "";
            for (let i = 0; i < 24; i++) {
                box += `<div class="col-md-3 ">
                    <div  class="Item text-center">
                        <i class="fa-solid fa-bowl-food fa-3x"></i>
                        <h2 class="text-white">${ingredients.meals[i].strIngredient.slice(0, 200)}</h2>
                        <p class="text-white">${ingredients.meals[i].strDescription.slice(0, 200)}</p>
                        </div>
                        </div>`
            }
            $(".click").html(box)
            $(".search").html("")
            $(".Item").click(function () {
                mainIngredientDisplay(this.innerText.split('\n')[0])
            })
        }
    })
    $(".loadingContainer").fadeOut(600)

}


function mainIngredientDisplay(ingredient) {
    $(".loadingContainer").show(100)
    let response = new XMLHttpRequest();
    response.open("GET", "https://www.themealdb.com/api/json/v1/1/filter.php?i=" + ingredient);
    response.send();
    response.addEventListener("loadend", function () {
        if (response.status == 200) {
            let ingredients = JSON.parse(response.response);
            let box = "";
            for (let i = 0; i < ingredients.meals.length; i++) {
                box += `            
                <div class="col-md-3 ">
                    <div class="hoverItem rounded-1 overflow-hidden ">
                        <img src="${ingredients.meals[i].strMealThumb}" alt="beef" class="w-100 rounded-1 ">
                        <div class="hoverInner text-center rounded-1 p-1 d-flex justify-content-around align-items-center">
                            <h4 class="fw-lighter fa-2x">${ingredients.meals[i].strMeal}</h4>
                        </div>
                    </div>
                </div>`;
            }
            $(".click").html(box)
            $(".search").html("")
            $(".hoverItem").click(function () {
                mealDisplay(this.innerText.split('\n')[0])
            }
            )
        }
    })
    $(".loadingContainer").fadeOut(600)

}

function mealDisplay(meal) {
    $(".loadingContainer").show(100)
    let response = new XMLHttpRequest();
    response.open("GET", "https://www.themealdb.com/api/json/v1/1/search.php?s=" + meal);
    response.send();
    response.addEventListener("loadend", function () {
        if (response.status == 200) {
            let ingredients = JSON.parse(response.response);
            let box = "";
            let tagsStr = ""
            for (let i = 0; i < ingredients.meals.length; i++) {
                if (ingredients.meals[i].strTags != null) {
                    let tags = ingredients.meals[i].strTags.split(",")

                    for (let j = 0; j < tags.length; j++) {
                        tagsStr += `<li class="my-3 mx-1 p-1 alert alert-danger rounded-1">${tags[j]}</li>`
                    }
                }

                let ingredientsStr = ""
                for (let k = 1; k < 21; k++) {
                    if (ingredients.meals[i]["strIngredient" + k] != "" && ingredients.meals[i]["strIngredient" + k] != null) {
                        ingredientsStr += `<li class="my-3 mx-1 p-1 alert alert-success rounded-1">${ingredients.meals[i]["strMeasure" + k]} ${ingredients.meals[i]["strIngredient" + k]}</li>`
                    }
                }

                box += `            
                <div class="col-md-4 myM text-white ">
                <div class="fw-lighter text-center">
                    <img class="w-100" src="${ingredients.meals[0].strMealThumb}" alt=""
                    srcset=""><br>
                <h1>${ingredients.meals[0].strMeal}</h1>
                </div>
            </div>
            <div class="col-md-8 myM text-white text-left">
                <div class="fw-lighter">
                    <h2>Instructions</h2>
                    <p>${ingredients.meals[0].strInstructions}</p>
                    <p><b class="fw-bolder">Area : </b>${ingredients.meals[0].strArea}</p>
                    <p><b class="fw-bolder">Category : </b>${ingredients.meals[0].strCategory}</p>
                    <h3>Recipes :</h3>
                    <ul class="d-flex list-unstyled flex-wrap" id="recipes">
                    ${ingredientsStr}
                    </ul>
    
                    <h3 class="my-2 mx-1 p-1">Tags :</h3>
                    <ul class="d-flex list-unstyled flex-wrap " id="tags">
                    ${tagsStr}
                    </ul>
    
    
                    <a class="btn btn-success text-white" target="_blank"
                        href="${ingredients.meals[0].strSource}">Source</a>
                    <a class="btn btn-danger text-white" target="_blank"
                        href="${ingredients.meals[0].strYoutube}">Youtube</a>
                </div>
            </div>`;
            }
            $(".click").html(box)
            $(".search").html("")
            $(".loadingContainer").fadeOut(600)

        }
    })
}


function areaDisplay() {
    sideBarToggle();
    $(".loadingContainer").show(100)
    let response = new XMLHttpRequest();
    response.open("GET", "https://www.themealdb.com/api/json/v1/1/list.php?a=list");
    response.send();
    response.addEventListener("loadend", function () {
        if (response.status == 200) {
            area = JSON.parse(response.response);
            let box = "";
            for (let i = 0; i < 20; i++) {
                box += `<div class="col-md-3 ">
                <div class="Item text-center">
                    <i class="fa-solid fa-city fa-3x text-danger"></i>
                    <h2 class="text-white">${area.meals[i].strArea}</h2>

                    </div>
                    </div>`
            }
            $(".click").html(box)
            $(".search").html("")
            $(".Item").click(function () {
                areaMealDisplay(this.innerText.split('\n')[0])
            })

        }
    })
    $(".loadingContainer").fadeOut(600)
}

function areaMealDisplay(area) {
    $(".loadingContainer").show(100)
    let response = new XMLHttpRequest();
    response.open("GET", "https://www.themealdb.com/api/json/v1/1/filter.php?a=" + area);
    response.send();
    response.addEventListener("loadend", function () {
        if (response.status == 200) {
            let ingredients = JSON.parse(response.response);
            let box = "";
            for (let i = 0; i < ingredients.meals.length; i++) {
                box += `            
                <div class="col-md-3 ">
                    <div class="hoverItem rounded-1 overflow-hidden ">
                        <img src="${ingredients.meals[i].strMealThumb}" alt="beef" class="w-100 rounded-1 ">
                        <div class="hoverInner text-center rounded-1 p-1 d-flex justify-content-around align-items-center">
                            <h4 class="fw-lighter fa-2x">${ingredients.meals[i].strMeal}</h4>
                        </div>
                    </div>
                </div>`;
            }
            $(".click").html(box)
            $(".search").html("")
            $(".hoverItem").click(function () {
                mealDisplay(this.innerText.split('\n')[0])
            })
        }
    })
    $(".loadingContainer").fadeOut(600)
}

function categoryDisplay() {
    sideBarToggle();
    $(".loadingContainer").show(100)
    let response = new XMLHttpRequest();
    response.open("GET", "https://www.themealdb.com/api/json/v1/1/categories.php");
    response.send();
    response.addEventListener("loadend", function () {
        if (response.status == 200) {
            category = JSON.parse(response.response);
            let box = "";
            for (let i = 0; i < category.categories.length; i++) {
                box += `            
                <div class="col-md-3 ">
                    <div class="hoverItem rounded-1 overflow-hidden ">
                        <img src="${category.categories[i].strCategoryThumb}" alt="beef" class="w-100 rounded-1 ">
                        <div class="hoverInner text-center rounded-1 p-1">
                            <h4 class="fw-lighter fa-2x">${category.categories[i].strCategory}</h4>
                            <p class="fw-normal">${category.categories[i].strCategoryDescription.slice(0, 120)}</p>
                    </div>
                </div>
            </div>`
            }
            $(".click").html(box)
            $(".search").html("")
            $(".hoverItem").click(function () {
                categoryMealDisplay(this.innerText.split('\n')[0])
            })


        }
    }

    )
    $(".loadingContainer").fadeOut(600)
}

function categoryMealDisplay(category) {
    $(".loadingContainer").show(100)
    let response = new XMLHttpRequest();
    response.open("GET", "https://www.themealdb.com/api/json/v1/1/filter.php?c=" + category);
    response.send();
    response.addEventListener("loadend", function () {
        if (response.status == 200) {
            let ingredients = JSON.parse(response.response);
            let box = "";
            for (let i = 0; i < ingredients.meals.length; i++) {
                box += `            
                <div class="col-md-3 ">
                    <div class="hoverItem rounded-1 overflow-hidden ">
                        <img src="${ingredients.meals[i].strMealThumb}" alt="beef" class="w-100 rounded-1 ">
                        <div class="hoverInner text-center rounded-1 p-1 d-flex justify-content-around align-items-center">
                            <h4 class="fw-lighter fa-2x">${ingredients.meals[i].strMeal}</h4>
                        </div>
                    </div>
                </div>`;
            }
            $(".click").html(box)
            $(".search").html("")
            $(".hoverItem").click(function () {
                mealDisplay(this.innerText.split('\n')[0])
            }
            )
        }
    })
    $(".loadingContainer").fadeOut(600)
}

function searchDisplay() {
    sideBarToggle();
    $(".loadingContainer").show(100)
    let box = `           
    <div class="col-md-6">
        <div class="search-box">
            <input type="text" class="search-text searchByname"onkeyup="searchByname(this.value)" placeholder="Search By Name"/>
        </div>
    </div>
    <div class="col-md-6">
        <div class="search-box">
            <input type="text"  maxlength="1" class="search-text searchByfirstLetter"onkeyup="searchByFirstLetter(this.value)" placeholder="Search By First Letter"/>
        </div>
    </div>`
    $(".click").html("<div></div>")
    $(".search").html(box)


    $(".loadingContainer").fadeOut(600)
}

function searchByname(name = "") {
    let response = new XMLHttpRequest();
    response.open("GET", `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    response.send();
    response.addEventListener("loadend", function () {
        if (response.status == 200) {
            let ingredients = JSON.parse(response.response);
            let box = "";
            for (let i = 0; i < ingredients.meals.length; i++) {
                box += `            
                <div class="col-md-3 ">
                    <div class="hoverItem rounded-1 overflow-hidden ">
                        <img src="${ingredients.meals[i].strMealThumb}" alt="beef" class="w-100 rounded-1 ">
                        <div class="hoverInner text-center rounded-1 p-1 d-flex justify-content-around align-items-center">
                            <h4 class="fw-lighter fa-2x">${ingredients.meals[i].strMeal}</h4>
                        </div>
                    </div>
                </div>`;
            }
            $(".click").html(box)
            $(".hoverItem").click(function () {
                mealDisplay(this.innerText.split('\n')[0])
            }
            )
        }
    })
}
function searchByFirstLetter(ch) {
    let response = new XMLHttpRequest();
    response.open("GET", `https://www.themealdb.com/api/json/v1/1/search.php?f=${ch}`);
    response.send();
    response.addEventListener("loadend", function () {
        if (response.status == 200 && response.response != "") {
            let ingredients = JSON.parse(response.response);
            let box = "";
            for (let i = 0; i < ingredients.meals.length; i++) {
                box += `           
                <div class="col-md-3 ">
                    <div class="hoverItem rounded-1 overflow-hidden ">
                        <img src="${ingredients.meals[i].strMealThumb}" alt="beef" class="w-100 rounded-1 ">
                        <div class="hoverInner text-center rounded-1 p-1 d-flex justify-content-around align-items-center">
                            <h4 class="fw-lighter fa-2x">${ingredients.meals[i].strMeal}</h4>
                        </div>
                    </div>
                </div>`;
            }
            $(".click").html(box)
            $(".hoverItem").click(function () {
                mealDisplay(this.innerText.split('\n')[0]);
            }
            )
        }
    })
}

function ContacUsDisplay() {
    sideBarToggle();
    $(".loadingContainer").show(100)
    let box = `            <div class="col-12 text-center">
    <h1 class="text-white">ContacUs...</h1>
</div>
<div class="contactForm ">
        <div class="row w-75 m-auto text-center">
            <div class="col-md-6 mb-3">
                <input onkeyup="userNameValidation(this.value)" id="userName" type="text" name="name" placeholder="Enter Your Name" class="inpt-text">
                <div id="nameError" class="w-100 p-1"></div>
            </div>
            <div class="col-md-6 mb-3">
                <input onkeyup="userEmailValidation(this.value)" id="userEmail" type="email" name="email" placeholder="Enter Email" class="inpt-text">
                <div id="emailError" class="w-100  p-1 m-auto"></div>
            </div>
            <div class="col-md-6 mb-3">
                <input onkeyup="userPhoneValidation(this.value)" id="userPhone" type="text" name="phone" placeholder="Enter Phone Number" class="inpt-text">
                <div id="phoneError" class="w-100  p-1 m-auto"></div>
            </div>
            <div class="col-md-6 mb-3">
                <input onkeyup="userAgeValidation(this.value)" id="userAge" type="number" name="Age" placeholder="Enter your Age" class="inpt-text">
                <div id="ageError" class="w-100  p-1 m-auto"></div>
            </div>
            <div class="col-md-6 mb-3">
                <input onkeyup="userPasswordValidation(this.value)" id="userPass" type="password" name="password" placeholder="Enter Password" class="inpt-text">
                <div id="passwordError" class="w-100  p-1 m-auto"></div>
            </div>                        
            <div class="col-md-6 mb-3">
                <input onkeyup="userConfirmPasswordValidation(this.value)" id="userConfirmPassword" type="password" name="password" placeholder="Confirm Password" class="inpt-text">
                <div id="passwordConfError" class="w-100  p-1 m-auto"></div>
            </div>

            <div class="col-md-12">
                <input disabled type="submit" name="submit" value="Submit" class="inptBtn" id="inptBtn">
            </div>
        </div>
</div>`
    $(".click").html(box)
    $(".search").html("")
    $(".inptBtn").click(function () {
        submit();
    })

    $(".loadingContainer").fadeOut(600)

}

searchByname();
let userName = ""
let userEmail = ""
let userPhone = ""
let userAge = ""
let userPassword = ""
let userConfirmPassword = ""
let arr = []


function submit() {
        userName = document.querySelector("#userName");
        userEmail = document.querySelector("#userEmail");
        userPhone = document.querySelector("#userPhone");
        userAge = document.querySelector("#userAge");
        userPassword = document.querySelector("#userPass");
        userConfirmPassword = document.querySelector("#userConfirmPassword");
        let user = {
            name: userName.value,
            email: userEmail.value,
            phone: userPhone.value,
            age: userAge.value,
            password: userPassword.value,
            confirmPassword: userConfirmPassword.value,
        }
        arr.push(user);
        localStorage.setItem("user", JSON.stringify(arr))
        clearInputValues();
    }

function clearInputValues() {
    userName.value = "";
    userEmail.value = "";
    userPhone.value = "";
    userAge.value = "";
    userPassword.value = "";
    userConfirmPassword.value = "";
}
function userEmailValidation(val) {
    let regx = /^((?!\.)[\w_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
    let bol=regx.test(val);
    return messageInvalidEmail(bol);
}
function userNameValidation(val) {
    let regx = /^[\x00-\x7F]{1,35}$/;
    let bol=regx.test(val);
    return messageInvalidName(bol);
}
function userPhoneValidation(val) {
    let regx = /^[0-9]{11}$/;
    let bol=regx.test(val);
    return messageInvalidPhone(bol);
}
function userAgeValidation(val) {
    let regx = /^[0-9]{2}$/;
    let bol=regx.test(val);
    return messageInvalidAge(bol);
}
function userPasswordValidation(val) {
    let regx = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/;
    let bol=regx.test(val);
    return messageInvalidPassword(bol);
}
function userConfirmPasswordValidation(val) {
    pass = document.querySelector("#userPass").value;
    if (val == pass) {
        return messageInvalidConfirmPassword(true);
    }
    return messageInvalidConfirmPassword(false);
}
let smBox= `<p><i class="text-success fa-solid fa-circle-check"></i></p>`;
function messageInvalidName(flag) {
    if (!flag) {
        return document.querySelector("#nameError").innerHTML = `<p class="int">Please enter your Name</p>`;
    }
    else {
        document.querySelector("#nameError").innerHTML =smBox
        able()
        

    }
}

function messageInvalidEmail(flag) {
    if (!flag) {
        return document.querySelector("#emailError").innerHTML = `<p class="int">Please enter valid Email</p>`;
    }
    else {
       document.querySelector("#emailError").innerHTML =smBox
       able()
       


    }
}
function messageInvalidPhone(flag) {
    if (!flag) {
        return document.querySelector("#phoneError").innerHTML = `<p class="int">Please enter valid Phone Number Ex: 01xxxxxxxxx </p>`;
    }
    else {
       document.querySelector("#phoneError").innerHTML =smBox
       able()
       

    }
}
function messageInvalidAge(flag) {
    if (!flag) {
        return document.querySelector("#ageError").innerHTML = `<p class="int">Please enter valid Age</p>`;
    }
    else {
       document.querySelector("#ageError").innerHTML =smBox
       able()
       

    }
}
function messageInvalidPassword(flag) {
    if (!flag) {
        return document.querySelector("#passwordError").innerHTML = `<p class="int">Please enter password  has a minimum of 6 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number with no spaces.</p>`;
    }
    else {
        document.querySelector("#passwordError").innerHTML =smBox
        able();



    }
}
function messageInvalidConfirmPassword(flag) {
    if (!flag) {
        return document.querySelector("#passwordConfError").innerHTML = `<p class="int">Please enter same Password again</p>`;

    }
    else {
         
        document.querySelector("#passwordConfError").innerHTML =smBox
        able();
        
    }
}
function userEmailValid() {
    userEmail = document.querySelector("#userEmail");
    let regx = /^((?!\.)[\w_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
    return (regx.test(userEmail));
}
function userNameValid() {
    userName = document.querySelector("#userName");
    let regx = /^[\x00-\x7F]{1,35}$/;
    return (regx.test(userName));
}
function userPhoneValid() {
    userPhone = document.querySelector("#userPhone");
    let regx = /^[0-9]{11}$/;
    return (regx.test(userPhone));
}
function userAgeValid() {
    userAge = document.querySelector("#userAge");
    let regx = /^[0-9]{2}$/;
    return (regx.test(userAge));
}
function userPasswordValid() {
    userPassword = document.querySelector("#userPass");
    let regx = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/;
    return (regx.test(userPassword));
}
function userConfirmPasswordValid() {
    userConfirmPassword = document.querySelector("#userConfirmPassword");
    userPassword = document.querySelector("#userPass");
    if (userConfirmPassword == userPassword) {
        return true;
    }
    return false;
}
function able(){
    if(userNameValid() && userEmailValid() && userPhoneValid() && userAgeValid() && userPasswordValid() && userConfirmPasswordValid ()){
        document.getElementById("inptBtn").removeAttribute("disabled")
    }else{
    document.getElementById("inptBtn").setAttribute("disabled","")
    }}