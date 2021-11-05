const tab_switchers = document.querySelectorAll('[data-switcher]');
const sectionPages = document.querySelector(".pages");
const modal = document.querySelector("#myModal");
const modalContent = document.querySelector(".modal-content");
const buyPage = document.querySelector(".buy-page");
const purchase = document.querySelector("#buy-complete");
const formBuy = document.querySelector("#form-buy");
const pureWater = document.querySelector("#pure-water");

const cart = [];
let i = 0;

class Bottle {

    constructor(name, src, color, size, price){
        this.name = name;
        this.src = src;
        this.color = color;
        this.size = size;
        this.price = price;
    }

    getObject(){
        return $this.name, $this.src, $this.color, $this.size, $this.price;
    }
    
}

const numImages = [5,5,7,6];
const folderImages = [["animal-kingdom-bottle", "2_Cat", "3_Deer", "4_Monkey", "5_Panda", "1"], 
                      ["magnetic-bottle", "2_Black", "3_Cyan", "4_Purple", "5_Blue", "1"],
                      ["portable-cup-bottle", "1_Black", "2_Blue", "3_Orange", "4_Green", "5_Pink", "6_White", "1_Black"],
                      ["smooth-bottle", "2_Blue", "3_Cyan", "4_Green", "5_Orange", "6_Pink", "1"]];
let color = "", size = "", price = "" ;

window.onload = () => {

    for (let i = 0; i < tab_switchers.length; i++) {
        const tab_switcher = tab_switchers[i];
        const page_id = tab_switcher.dataset.tab;

        tab_switcher.addEventListener('click', () => {
            document.querySelector('.nav-list .tab.is-active').classList.remove('is-active');
            tab_switcher.parentNode.classList.add('is-active');
            
            switchPage(page_id);
        });
    }
}

function switchPage (page_id) {
    sectionPages.innerHTML = "";
    color = "";
    size = "";
    price = "";
    if(page_id != 1) createPage(page_id, numImages[page_id-2]);
    else sectionPages.appendChild(pureWater);
}

function readElementArray(elementsArray, i, parent){
    for(let j = 0; j < elementsArray[i].length; j++){
        parent.appendChild(elementsArray[0]);
        if(Array.isArray(elementsArray[i][j])){
            for(let k = 0; k < elementsArray[i][j].length; k++){
                if(Array.isArray(elementsArray[i][j][k])){
                    for(let element of elementsArray[i][j][k]){ elementsArray[i][j][k-1].appendChild(element); }
                } else { elementsArray[i][j-1].appendChild(elementsArray[i][j][k]); }
            }
        } else { elementsArray[0].appendChild(elementsArray[i][j]); }
    }
}

function bottleName(name){
    name = name[0].split("-");
    let finalName = "";
    for(let i = 0; i < name.length; i++){
        if(i === undefined) return;
        finalName += name[i].charAt(0).toUpperCase() + name[i].substring(1) + " ";
    }
    return finalName;
}

function createPage(id){

    const elements = [elem("div", null, "page is-active"),
                        [elem("section", "all-product-page"),
                            [elem("section", null, "type-img"),
                            elem("section", null, "big-img"),
                            elem("section", "product-info"),
                                [elem("h1", "bottle-name"),
                                elem("pre", "last-p"),
                                elem("h2", "color-name"),
                                elem("section", null, "colors-img"),
                                elem("h2", "size-name"),
                                elem("div", "prize-button"),
                                    [elem("button", "button330", "prize-button", ),
                                    elem("button", "button500", "prize-button"),
                                    elem("button", "button1", "prize-button"),],
                                elem("p", "product-page-id", "price-product-page"),
                                    [elem("p", "holahola"),
                                        elem("button", "first-buy-botton")]
                                ]
                            ]
                        ]
                    ];
  
   for(let i = 0; i < elements.length; i++){
       if(Array.isArray(elements[i])) {
           readElementArray(elements[i], i, elements[i-1]);
        }
    }
    sectionPages.appendChild(elements[0]);

    const sectionBigImgElement = document.querySelector(".big-img");
    sectionBigImgElement.addEventListener("mousemove", zoom);
    const sectionColorsImgElement = document.querySelector(".colors-img");
    const sectionTypeImgElement = document.querySelector(".type-img");

    createImage(folderImages, id, sectionBigImgElement, sectionTypeImgElement);
    createColors(folderImages[id-2], id, sectionColorsImgElement, sectionBigImgElement);
    
    const h1Element = document.querySelector("#bottle-name");
    h1Element.textContent = bottleName(folderImages[id-2]);


    const preElement = document.querySelector("#last-p");
    switch(id) {
        case "2":
            preElement.textContent = "Characteristics:\n\nSingle Layer Stainless Steel Insulation Sports Bottle." + 
                                    "\nStainless steel, without fear of collisions." + 
                                    "\nThick base, vacuum process without noise, maximize the use of space." + 
                                    "\nCarefully polished, burr-free, with the small mouth for easy drinking.";
            break;
        case "3":
            preElement.textContent = "Characteristics:\n\nPortable and durable. Ideal for travel, outdoor activities, car, office, home, school, picnic, hot yoga, hiking, camping, etc." +
                                    "\nMade of 304 stainless steel, vacuum double-layer design, safe, BPA-free and eco-friendly, odorless and easy to clean. It can keep hot or cold water for 12 hours." +
                                    "\nThis vacuum water bottle is also a good container for coffee, juicer, milk, beer, drinks, and daily hydration. The best gift for relatives and friends.";
            break;
        case "4":
            preElement.textContent = "Characteristics:\n\nSuitable for cold water, juice, milk, milk tea, cold drinks, etc." +
                                    "\nEasy to carry, the size fits most car cup holders and bicycle bottle holders." +
                                    "\nA great choice as a gift for friends, classmates and family." +
                                    "\nIt is safe to use, tasteless, beautiful and non-toxic. Provides a relaxed and happy atmosphere.";
            break;
        case "5":
            preElement.textContent = "Characteristics:\n\nStainless steel." +
                                    "\nEco-friendly." +
                                    "\nThermal insulation performance: 6-12 hours.";
            break;
    }
    

    const h2Color = document.querySelector("#color-name");
    h2Color.textContent = "Colors";
    const h2Size = document.querySelector("#size-name");
    h2Size.textContent = "Size";
    const bottleSize = ["330mL", "500mL", "1L"];
    const buttonSizeElement = document.querySelectorAll(".prize-button");
    for(let i = 0; i < buttonSizeElement.length; i++) { buttonSizeElement[i].textContent = bottleSize[i]; }
    
    const buttonPriceElement = document.querySelector("#first-buy-botton");
    buttonPriceElement.textContent = "Buy";
    //controlar que no sea undefined nigun campo
    
    buttonPriceElement.addEventListener("click", () =>{
        
        sectionPages.innerHTML = "";
        buyPage.classList.add("is-active");
        sectionPages.appendChild(buyPage);
        if(color == "" || size == "") return;

        const srcElement = document.createElement("img");
        srcElement.setAttribute("id", "rabia");
        const sizeElement = document.createElement("p");
        const priceElement = document.createElement("p");
        srcElement.src = color; 
        sizeElement.textContent = size;     
        priceElement.textContent = price;
        let object = new Bottle(bottleName(folderImages[id-2]), color, color.split("_")[1].split(".")[0], size, price);
        cart[i] = object;
        console.log(cart);
        i++;

        const buy = [elem("div", null, "title-buy"),
                        [elem("h3", "title-buy-h3")],
                    elem("div", null, "purchase-nogrid"),
                        [elem("img", "img-buy"),
                        elem("div", null, "content-buy"),
                            [elem("h2", "size-buy"),
                            elem("h2", "color-buy"),
                            elem("h4", "delivery-text-buy"),
                            elem("p", "delivery-time", "premium-p")]
                        ]
                    ];
                    
        for(let o = 0; o < cart.length; o++){
            for(let i = 0; i < buy.length; i++){
                if(!Array.isArray(buy[i])) formBuy.parentElement.insertBefore(buy[i], formBuy);
                else {
                    for(let j = 0; j < buy[i].length; j++){
                        if(!Array.isArray(buy[i][j])) buy[i-1].appendChild(buy[i][j]);
                        else {
                            for(let k = 0; k < buy[i][j].length; k++){
                                if(!Array.isArray(buy[i][j][k])) buy[i][j-1].appendChild(buy[i][j][k]);
                            }
                        }
                    }
                }
            }
            const h3Buy = document.querySelector("#title-buy-h3");
            h3Buy.textContent = cart[0].name;
            const imgBuy = document.querySelector("#img-buy");
            imgBuy.src = cart[0].src;
            const h2Buy = document.querySelector("#size-buy");
            h2Buy.textContent = "Size: " + cart[0].size;
            const h2Buy2 = document.querySelector("#color-buy");
            h2Buy2.textContent = "Color: " + cart[0].color;
            const h4Buy = document.querySelector("#delivery-text-buy");
            h4Buy.textContent = "Estimate delivery date:";
        }


        modalContent.appendChild(srcElement);
        modalContent.appendChild(sizeElement);
        modalContent.appendChild(priceElement);
        
        
        modal.style.display = "block";
        //console.log(cart);

    });

    const price330 = document.getElementById("button330");
    const price500 = document.getElementById("button500")
    const price1 = document.getElementById("button1")
    const hola = document.getElementById("holahola")

    price330.addEventListener('click', function(e) {
        hola.textContent = "20€";
        price = hola.textContent;
        size = e.target.textContent;
        buttonPriceElement.parentElement.insertBefore(hola, buttonPriceElement);
    });

    price500.addEventListener('click', function(e) {
        hola.textContent = "30€";
        price = hola.textContent;
        size = e.target.textContent;
        buttonPriceElement.parentElement.insertBefore(hola, buttonPriceElement);
    });

    price1.addEventListener('click', function(e) {
        hola.textContent = "40€";
        price = hola.textContent;
        size = e.target.textContent;
        buttonPriceElement.parentElement.insertBefore(hola, buttonPriceElement);
    });
}

function elem(type, elemId, elemClass){
    const element = document.createElement(type);
    if(elemId != null) element.setAttribute("id", elemId);
    if(elemClass != null) element.setAttribute("class", elemClass);
    return element;
}

function createImage(folder, id, main, lineal){
    const i = id-2;
    const img = document.createElement("img");
    img.setAttribute("src","assets/img/" + folder[i][0] + "/" + folder[i][numImages[i]] + ".jpg");
    main.style.backgroundImage = "url(" + img.src + ")";
    main.appendChild(img);
    for(let j = 0; j < folder[i].length-1; j++){
        const linealImg = document.createElement("img");
        linealImg.setAttribute("class","lineal-img");
        linealImg.setAttribute("width","100px");
        linealImg.setAttribute("height","100px");
        if(j == 0) linealImg.setAttribute("src","assets/img/" + folder[i][0] + "/" + folder[i][folder[i].length-1] + ".jpg");
        else linealImg.setAttribute("src","assets/img/" + folder[i][0] + "/" + folder[i][j] + ".jpg");
        lineal.append(linealImg);
        addHoverListener(linealImg, img, main);
    }
}

function addHoverListener(lineal, img, main){
    lineal.addEventListener("mouseenter", function( event ) {
        setImg(event.target.src, img, main);
    }, false);
}

function setImg(src, img, main){
    img.setAttribute("src", src);
    main.style.backgroundImage = "url(" + img.src + ")";
}

function createColors(folder, id, select, main){
    for(let i = 1; i < numImages[id-2]; i++){
        const img = document.createElement("img");
        img.setAttribute("src","assets/img/" + folder[0] + "/" + folder[i] + ".jpg");
        addClickListener(img, main.children[0], main);
        select.appendChild(img);
    }
}

function addClickListener(img, mainInitial, main){
    img.addEventListener("click", function( event ) {
        //save color
        color = event.target.src;
        setImg(event.target.src, mainInitial, main);
    }, false);
}

const circulos = document.querySelectorAll('.circulo');
const tabsy = document.querySelector(".tabsy");
const anterior = document.getElementById('anterior');
const siguiente = document.getElementById('siguiente');
const tabby = document.querySelectorAll(".tabby");

siguiente.addEventListener('click', () => {
    for(let i = 0; i < tabsy.childElementCount - 1; i++){
        if(tabsy.children[i].classList.contains("active")){
            addRemoveClass(tabsy.children, i, "active", true)
            addRemoveClass(tabby, i, "is-active", true)
            anterior.disabled = false;
            if(i+1 == tabsy.childElementCount-1) siguiente.disabled = true;
            return;
        }
    }
});

anterior.addEventListener('click', () => {
    for(let i = 0; i < tabsy.childElementCount; i++){
        if(tabsy.children[i].classList.contains("active")){
            addRemoveClass(tabsy.children, i, "active", false)
            addRemoveClass(tabby, i, "is-active", false)
            if(i <= 1) anterior.disabled = true;
            if(i-1 <= tabsy.childElementCount) siguiente.disabled = false;
            return;
        }
    }
});

function addRemoveClass(element, i, classToChange, isNext){
    if(isNext){
        element[i].classList.remove(classToChange);
        element[i+1].classList.add(classToChange);
    } else {
        element[i].classList.remove(classToChange);
        element[i-1].classList.add(classToChange);
    }
}

function zoom(e){
    var zoomer = e.currentTarget;
    e.offsetX ? offsetX = e.offsetX : offsetX = e.pageX;
    e.offsetY ? offsetY = e.offsetY : offsetX = e.pageX;
    x = offsetX / zoomer.offsetWidth*100;
    y = offsetY / zoomer.offsetHeight*100;
    zoomer.style.backgroundPosition = x + '% ' + y + '%';
}

const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

form.addEventListener('submit', e => {
	e.preventDefault();
	
	checkInputs();
});

function checkInputs() {
	// trim to remove the whitespaces
	const usernameValue = username.value.trim();
	const emailValue = email.value.trim();
	const passwordValue = password.value.trim();
	const password2Value = password2.value.trim();

	if(usernameValue === '') {
		setErrorFor(usernameValue, 'Username cannot be blank');
	}
    else {
		setSuccessFor(username);
	}

	if(emailValue === '') {
		setErrorFor(email, 'Email cannot be blank');
	} else if (!isEmail(emailValue)) {
		setErrorFor(email, 'Not a valid email');
	} else {
		setSuccessFor(email);
	}
	if(passwordValue === '') {
		setErrorFor(password, 'Password cannot be blank');
	} else {
		setSuccessFor(password);
	}
	
	if(password2Value === '') {
		setErrorFor(password2, 'Password2 cannot be blank');
	} else if(passwordValue !== password2Value) {
		setErrorFor(password2, 'Passwords does not match');
	} else{
		setSuccessFor(password2);
	}

    const names = document.getElementById('username');

    if (names.value.length <= 5) {
        setErrorFor(username, 'User name must be longer than 5 characters');
    }
    else if (names.value.length >= 20) {
        setErrorFor(username, 'Username must be less than 20 characters');
    }
    else {
        setSuccessFor(username);
    }
}

function setErrorFor(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'form-control error';
	small.innerText = message;
}

function setSuccessFor(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
}

function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}



const firstname = document.getElementById('firstname');

    if (firstname.value.length >= 20) {
        setErrorFor(firstname, 'First name must be less than 20 characters');
    }
    else {
        setSuccessFor(firstname);
    }

    const lastname = document.getElementById('lastname');

    if (lastname.value.length >= 20) {
        setErrorFor(lastname, 'Last name must be less than 20 characters');
    }
    else {
        setSuccessFor(lastname);
    }

    const address = document.getElementById('address');

    if (address.value.length >= 50) {
        setErrorFor(address, 'Last name must be less than 50 characters');
    }
    else {
        setSuccessFor(address);
    }




//button terms and conditions
var completeorder = document.getElementById("order-complete2")
var orderedh1 = document.getElementById("h1ordered")
var orderedh2 = document.getElementById("h2ordered")
var orderedh22 = document.getElementById("h22ordered")
var lastbutton = document.getElementById("return-button")

function goMain() {
    window.location = '/';
}

function validationR() {
    var valid = false;
    var termsconditions = document.getElementById("termsconditions")
    var messageAlert = document.getElementById("accept-terms")
    if (termsconditions.checked){
        valid = true;
}
if (valid) {
    orderedh1.textContent = "YOUR ORDER IS COMPLETE! 🥳🥳🥳"
    orderedh2.textContent = "Thank you for your order!"
    orderedh22.textContent = "We hope to see you again"
    lastbutton.classList.add("show")
}
else {
    messageAlert.innerHTML = "Please accept the terms and conditions"
    messageAlert.classList.add("accept-terms-bg")
    return false
}}

//shiping page functions
var premiumCheckbox = document.getElementById("input-premium")
var premiumh3 = document.getElementById("premium-h3")
var premiumh4 = document.getElementById("premium-h4")
var premiumP = document.querySelector(".premium-p")
var appearOnPremium = document.getElementById("appears-premium")
var inputPremium = document.getElementById("input-premium")
var appearOnGift = document.getElementById("appears-gift")
var checkedGift = document.getElementById("check.gift")

const monthName = new Array()
monthName[0] = 'January';
monthName[1] = 'February';
monthName[2] = 'March';
monthName[3] = 'April';
monthName[4] = 'May';
monthName[5] = 'June';
monthName[6] = 'July';
monthName[7] = 'August';
monthName[8] = 'September';
monthName[9] = 'October';
monthName[10] = 'November';
monthName[11] = 'December';

    var date = new Date();
    let day = date.getDate();
    let month = monthName[date.getMonth()];
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let year = date.getFullYear();
    let day24 = day + 1
    let hours6 = hours + 6
    let day48 = day + 2
    let day72 = day + 3

function appearPremium(x) {
    if (x== 0 || 1 || 2) appearOnPremium.style.display = "block"
    else appearOnPremium.style.display = "none"

    if (minutes < 10){
        minutes = "0" + minutes
    }
    if (hours6 > 24){
        hours6 = hours6 - 24
    }

    if (x==0) premiumP.textContent = "Beetween  " + day72 + "  of  " + month + "  of  " + year + "  " + hours + ":" + minutes +"  and  "  + day72 + "  of  " + month + "  of  " + year + "  " + hours6 + ":" + minutes

    if (x==0) {
        maemia(0)
    }

    if (x==1) premiumP.textContent = "Beetween  " + day48 + "  of  " + month + "  of  " + year + "  " + hours + ":" + minutes +"  and  "  + day48 + "  of  " + month + "  of  " + year + "  " + hours6 + ":" + minutes

    if (x==1) {
        maemia(1)
    }

    if (x==2) premiumP.textContent = "Beetween  " + day24 + "  of  " + month + "  of  " + year + "  " + hours + ":" + minutes +"  and  "  + day24 + "  of  " + month + "  of  " + year + "  " + hours6 + ":" + minutes

    if (x==2) {
        maemia(2)
    }
}

function appearGift() {
    appearOnGift.classList.toggle("show")
}

//finish page complete
let shipmentDays, priceShipment;

function maemia (x) {
    var priceLastPage = document.querySelector(".premium-p")
    if (x==0) {
        priceLastPage.textContent = "Beetween  " + day72 + "  of  " + month + "  of  " + year + "  " + hours + ":" + minutes +"  and  "  + day72 + "  of  " + month + "  of  " + year + "  " + hours6 + ":" + minutes
    }
    if (x==1) {
        priceLastPage.textContent = "Beetween  " + day48 + "  of  " + month + "  of  " + year + "  " + hours + ":" + minutes +"  and  "  + day48 + "  of  " + month + "  of  " + year + "  " + hours6 + ":" + minutes
        priceShipment = 4.99;
    }
    if (x==2) {
        priceLastPage.textContent = "Beetween  " + day24 + "  of  " + month + "  of  " + year + "  " + hours + ":" + minutes +"  and  "  + day24 + "  of  " + month + "  of  " + year + "  " + hours6 + ":" + minutes
        priceShipment = 9.99;
    }
    shipmentDays = priceLastPage.textContent;
    const preBuy = document.querySelector("#delivery-time");
    preBuy.textContent = shipmentDays;
    const yourOrderBuy = document.querySelector("#your-order");

    yourOrderBuy.innerHTML = "<h2>Bottle: <span>" + cart[0].price + "</span></h2><h2>Type of shipping: <span>" + priceShipment + "</span></h2>";

    const totalFinalBuy = document.querySelector("#total-final");
    totalFinalBuy.innerHTML = "Total: <span>" + (parseFloat(cart[0].price) + priceShipment).toFixed(2) + "</span>";
}

function appearGift2() {
    shopcartshop.classList.toggle("show")
}

var shopcartshop = document.getElementById("shopcart");

// adrees number form

function showContent() {
    element = document.getElementById("content");
    check = document.getElementById("check");
    if (check.checked) {
        element.style.display='block';
    }
    else {
        element.style.display='none';
    }
}

function showContent2() {
    element = document.getElementById("content2");
    check2 = document.getElementById("check2");
    if (check2.checked) {
        element.style.display='block';
    }
    else {
        element.style.display='none';
    }
}





function runList() {
    var select = document.getElementById("list");
    var newOption = document.createElement("option");

newOption.text = document.getElementById("txtbox").value;
select.add(newOption);
}



// timer


function showdiv()
  {
      document.getElementById("divexemple").style.visibility="visible";
      
  }
  setTimeout("showdiv()", 2000);

  function hidediv()
  {
      document.getElementById("divexemple").style.visibility="hidden";
  }
  setTimeout("hidediv()", 7000);
  
    


  function showdiv2()
  {
      document.getElementById("divexemple2").style.visibility="visible";
      
  }
  setTimeout("showdiv2()", 60000);

  function hidediv2()
  {
      document.getElementById("divexemple2").style.visibility="hidden";
  }
  setTimeout("hidediv2()", 65000);




  function showdiv3()
  {
      document.getElementById("divexemple3").style.visibility="visible";
      
  }
  setTimeout("showdiv3()", 120000);

  function hidediv3()
  {
      document.getElementById("divexemple3").style.visibility="hidden";
  }
  setTimeout("hidediv3()", 125000);



  function showdiv4()
  {
      document.getElementById("divexemple4").style.visibility="visible";
      
  }
  setTimeout("showdiv4()", 180000);

  function hidediv4()
  {
      document.getElementById("divexemple4").style.visibility="hidden";
  }
  setTimeout("hidediv4()", 185000);




  function showdiv5()
  {
      document.getElementById("divexemple5").style.visibility="visible";
      
  }
  setTimeout("showdiv5()", 240000);

  function hidediv5()
  {
      document.getElementById("divexemple5").style.visibility="hidden";
  }
  setTimeout("hidediv5()", 245000);



  function showdiv6()
  {
      document.getElementById("divexemple6").style.visibility="visible";
      
  }
  setTimeout("showdiv6()", 300000);

  function hidediv6()
  {
      document.getElementById("divexemple6").style.visibility="hidden";
  }
  setTimeout("hidediv6()", 305000);













/* no funciona guardado por si acaso
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}



window.onload = function () {
    var fiveMinutes = 60 * 5,
        display = document.querySelector('#time');
    startTimer(fiveMinutes, display);
};

function timeout()
{
setTimeout("cerrar()", 30000)
}

function cerrar() {
var ventana = window.self
ventana.opener = window.self
ventana.close()}

window.alert("Texto a mostrar");
*/