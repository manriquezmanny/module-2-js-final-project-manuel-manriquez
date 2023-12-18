// Importing menu data from local Json file I made.
import menu from "./menu.json" assert {type: "json"};

// Global Variables for toggle functionality.
const menuBtn = document.querySelector("#menu-btn");
const reviewBtn = document.querySelector("#review-btn");
const menuContainer = document.querySelector("#menu");
const reviewOrder = document.querySelector("#review-order");

// Toggle UI functionality for Menu/Review sections.
function toggleMenuOrder() {
    // If not in menu, switching to menu.
    if (menuContainer.style.display === "none") {
        menuContainer.style.display = "flex";
        reviewOrder.style.display = "none";
        menuBtn.style.display = "none";
        reviewBtn.style.display = "block";
        return;
    }
    // Switching to review section since we weren't in it.
    menuContainer.style.display = "none";
    reviewOrder.style.display = "block";
    menuBtn.style.display = "block";
    reviewBtn.style.display = "none";
}

// Populate Menu dynamically using imported menu data from local JSON file.
function populateMenu() {
    for (var pizza in menu) {
        // Creating necessary elements to build dynamically added bootstrap cards.
        const menuRow = document.querySelector("#menu");
        const column = document.createElement("div");
        column.classList.add("col-12", "col-sm-6", "col-lg-4");
        const card = document.createElement("div");
        card.classList.add("card");
        const image = document.createElement("img");
        image.classList.add("card-img-top");
        image.src = menu[pizza]["imgSrc"];
        const firstCardBody = document.createElement("div");
        firstCardBody.classList.add("card-body");
        const cardTitle = document.createElement("h5");
        cardTitle.classList.add("card-title");
        const description = document.createElement("p");
        description.classList.add("card-text");
        const secondCardBody = document.createElement("div");
        secondCardBody.classList.add("card-body", "d-flex", "justify-content-between");
        const priceTag = document.createElement("p");
        const addToOrderBtn = document.createElement("button");
        addToOrderBtn.classList.add("btn", "btn-success");

        // Appending dynamically structured bootstrap card to the DOM at the menu "row" div.
        menuRow.appendChild(column);
        column.appendChild(card);
        card.appendChild(image);
        card.appendChild(firstCardBody);
        card.appendChild(secondCardBody);
        firstCardBody.appendChild(cardTitle);
        firstCardBody.appendChild(description);
        secondCardBody.appendChild(priceTag);
        secondCardBody.appendChild(addToOrderBtn);

        // Manipulating innerText/HTML where needed.
        cardTitle.innerText = menu[pizza]["name"];
        description.innerText = menu[pizza]["description"];
        priceTag.innerHTML = `<strong>Price:</strong> $${menu[pizza]["price"]}`;
        addToOrderBtn.innerText = "Add to Order";
    }
}

// Init function to run on app launch. Purpose to keep global scope as clean as possible.
function init() {
    // Adding Event Listeners
    menuBtn.addEventListener("click", toggleMenuOrder);
    reviewBtn.addEventListener("click", toggleMenuOrder);
    // Populating Menu on DOM content loaded.
    populateMenu();
}

init();