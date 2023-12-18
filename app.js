// Importing menu data from local Json file I made.
import menu from "./menu.json" assert {type: "json"};

// Global Variables for toggle functionality.
const menuBtn = document.querySelector("#menu-btn");
const reviewBtn = document.querySelector("#review-btn");
const menuContainer = document.querySelector("#menu");
const reviewOrder = document.querySelector("#review-order");
let globalOrder = [];
let successOrder;

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
    // Switching to review section if we weren't in it.
    menuContainer.style.display = "none";
    reviewOrder.style.display = "block";
    menuBtn.style.display = "block";
    reviewBtn.style.display = "none";
}


// Function to update icon in button.
function updateButtonIcons() {
    // Getting number of items in order.
    let number = globalOrder.length;

    // Setting class name for icon.
    if (number === 0 ) {
        menuBtn.innerHTML = "Back To Menu";
        reviewBtn.innerHTML = "Review Order";
        return;
    }
    menuBtn.innerHTML = `Back To Menu <i class="bi-${number}-circle"></i>`;
    reviewBtn.innerHTML = `Review Order <i class="bi-${number}-circle"></i>`;
}


// Populate Menu dynamically using imported menu data from local JSON file.
function populateMenu() {
    for (var pizza in menu) {
        // Creating necessary elements to build dynamically constructed bootstrap cards.
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
        const radiosDiv = document.createElement("div");
        const radioSmall = document.createElement("input");
        radioSmall.setAttribute("type", "radio");
        radioSmall.setAttribute("id", menu[pizza]["name"].replace(" ", "-") + "-small");
        radioSmall.setAttribute("name", `${menu[pizza]["name"].replace(" ", "-").toLowerCase()}-size`);
        radioSmall.setAttribute("value", "small");
        radioSmall.setAttribute("checked", "checked");
        const radioMedium = document.createElement("input");
        radioMedium.setAttribute("type", "radio");
        radioMedium.setAttribute("id", menu[pizza]["name"].replace(" ", "-") + "-medium");
        radioMedium.setAttribute("name", `${menu[pizza]["name"].replace(" ", "-").toLowerCase()}-size`);
        radioMedium.setAttribute("value", "medium");
        const radioLarge = document.createElement("input");
        radioLarge.setAttribute("type", "radio");
        radioLarge.setAttribute("id", menu[pizza]["name"].replace(" ", "-") + "-large");
        radioLarge.setAttribute("name", `${menu[pizza]["name"].replace(" ", "-").toLowerCase()}-size`);
        radioLarge.setAttribute("value", "large");
        const radioSmallLabel = document.createElement("label");
        radioSmallLabel.setAttribute("for", menu[pizza]["name"].replace(" ", "-") + "-small");
        const radioMediumLabel = document.createElement("label");
        radioMediumLabel.setAttribute("for", menu[pizza]["name"].replace(" ", "-") + "-medium");
        const radioLargeLabel = document.createElement("label");
        radioLargeLabel.setAttribute("for", menu[pizza]["name"].replace(" ", "-") + "-large");
        const secondCardBody = document.createElement("div");
        secondCardBody.classList.add("card-body", "d-flex", "justify-content-between");
        const priceTag = document.createElement("p");
        const addToOrderBtn = document.createElement("button");
        addToOrderBtn.classList.add("btn", "btn-success");
        addToOrderBtn.setAttribute("value", pizza);

        // Appending dynamically structured bootstrap card to the DOM at the menu "row" div.
        menuRow.appendChild(column);
        column.appendChild(card);
        card.appendChild(image);
        card.appendChild(firstCardBody);
        card.appendChild(secondCardBody);
        firstCardBody.appendChild(cardTitle);
        firstCardBody.appendChild(description);
        firstCardBody.appendChild(radiosDiv);
        radiosDiv.appendChild(radioSmall);
        radiosDiv.appendChild(radioSmallLabel);
        radiosDiv.appendChild(document.createElement("br"));
        radiosDiv.appendChild(radioMedium);
        radiosDiv.appendChild(radioMediumLabel);
        radiosDiv.appendChild(document.createElement("br"));
        radiosDiv.appendChild(radioLarge);
        radiosDiv.appendChild(radioLargeLabel);
        radiosDiv.appendChild(document.createElement("br"));
        secondCardBody.appendChild(priceTag);
        secondCardBody.appendChild(addToOrderBtn);

        // Will use this to tie current pizza to current button.
        let selectedPizza = addToOrderBtn.value;

        // Manipulating innerText/HTML where needed.
        cardTitle.innerText = menu[addToOrderBtn.value]["name"];
        description.innerText = menu[addToOrderBtn.value]["description"];
        priceTag.innerHTML = `<strong>Price:</strong> $${menu[pizza]["price"]}.00`;
        addToOrderBtn.innerText = "Add to Order";
        radioSmallLabel.innerText = " small + $0.00";
        radioMediumLabel.innerText = " medium + $2.00";
        radioLargeLabel.innerText = " large + $4.00";

        // Adding event listeners to medium and large radio buttons to remove default attribute.
        radioMedium.addEventListener("click", () => {
            priceTag.innerHTML = `<strong>Price:</strong> $${(menu[selectedPizza]["price"]) + 2}.00`;
        })
        radioLarge.addEventListener("click", () => {
            priceTag.innerHTML = `<strong>Price:</strong> $${(menu[selectedPizza]["price"]) + 4}.00`;
        })
        radioSmall.addEventListener("click", () => {
            priceTag.innerHTML = priceTag.innerHTML = `<strong>Price:</strong> $${menu[selectedPizza]["price"]}.00`;
        })
        
        // Adding an event listener to each "add to order" button.
        addToOrderBtn.addEventListener("click", () => {
            // Creating vars to add to 2-dimensional globalOrder array.
            let size = radiosDiv.querySelector("input:checked").value;
            let selectedPrice;
            // Note to self: Maybe use switch statement here.
            if(size === "small") {
                selectedPrice = menu[selectedPizza]["price"];
                console.log(selectedPrice);
            }else if (size === "medium") {
                selectedPrice = menu[selectedPizza]["price"] + 2;
                console.log(selectedPrice);
            }else{
                selectedPrice = menu[selectedPizza]["price"] + 4;
                console.log(selectedPrice);
            }
            globalOrder.push([selectedPizza, size, selectedPrice]);
            localStorage.setItem("order", JSON.stringify(globalOrder));

            // Updating button icons.
            updateButtonIcons();
        })
    }
}


// Function for getting Order data from local storage.
function getLocalStorage(key) {
    let data = JSON.parse(localStorage.getItem(key));
    return data;
}


// Function for removing item from local storage.
function removeLocalStorage(index) {
    // Getting local storage object.
    let storageOrder = getLocalStorage("order");
    // Clearing current local storage.
    localStorage.clear();
    // splicing Array I got from local storage to remove item.
    storageOrder.splice(index, 1);
    // Setting globalOrder variable to new order.
    globalOrder = storageOrder;
    // Setting local Storage to new array without item removed.
    localStorage.setItem("order", JSON.stringify(globalOrder));
}


// Function to populate globalOrder if local storage has items.
function populateGlobalOrder() {
    if (localStorage.getItem("order")) {
        let items = getLocalStorage("order");
        for (let i = 0; i < items.length; i++) {
            globalOrder.push(items[i]);
        }
    }
}


// Succesful Order Alert.
function success() {
    alert("Your Order has been placed. We accept cash or card at the front desk!");
}


// Function to Dynamically populate Review Order Table based on items in Local Storage Order.
function populateReviewOrder() {
    // Getting table body that I will insert elements to.
    const tableBody = document.querySelector("#table-body");
    // Resetting innerHTML in case item was removed.
    tableBody.innerHTML = "";
    let storageOrder = getLocalStorage("order");


    // Iterating over local storage order.
    for (let i = 0; i < storageOrder.length; i++) {
        // Creating necessary elements to dynamically populate table.
        const tableRow = document.createElement("tr");
        const itemNo = document.createElement("th");
        itemNo.innerText = i + 1;
        itemNo.setAttribute("scope", "row");
        const name = document.createElement("td");
        name.innerText = menu[storageOrder[i][0]]["name"];
        const size = document.createElement("td");
        size.innerText = storageOrder[i][1];
        const price = document.createElement("td");
        price.innerText = "$" + String(storageOrder[i][2]) + ".00";
        const btnTableData = document.createElement("td");
        const removeBtn = document.createElement("button");
        removeBtn.classList.add("btn", "btn-danger");
        removeBtn.innerText = "Remove";
        
        // Populating tableBody with dynamically constructed table rows.
        tableBody.appendChild(tableRow);
        tableRow.appendChild(itemNo);
        tableRow.appendChild(name);
        tableRow.appendChild(size);
        tableRow.appendChild(price);
        tableRow.appendChild(btnTableData);
        btnTableData.appendChild(removeBtn);

        // Adding Event Listeners to remove buttons that will remove item from order on click.
        removeBtn.addEventListener("click", () => {
            // Passing in array I want removed from order.
            removeLocalStorage(i);
            populateReviewOrder();
            updateButtonIcons();
        })
    }


    // After populating items, calculating total price. If no items, directing to Menu.
    if (globalOrder.length > 0) {
        let totalPrice = 0;
        for (let i = 0; i < globalOrder.length; i++ ) {
            totalPrice += parseFloat(globalOrder[i][2]);
        }

        // Variables to help calculate and display sales tax and Total price.
        const totalHeader = document.createElement("h6");
        totalHeader.classList.add("float-right");
        totalHeader.innerText = `Total Price: $${totalPrice.toFixed(2)}`;
        const californiaSalesTax = 0.075;
        
        // Semi Final row elements to create semi final row that will only show sales tax.
        const semiFinalTableRow = document.createElement("tr");
        const emptyItemNo = document.createElement("th");
        const emptyPizza = document.createElement("td");
        const emptySize = document.createElement("td");
        const salesTaxAmount = document.createElement("td");
        salesTaxAmount.innerText = `Sales Tax: $${(totalPrice * californiaSalesTax).toFixed(2)}`;
        const emptyButtonOne = document.createElement("td");

        // Final row elements to append to final row that will only show total price and Place Order button. 
        const finalTableRow = document.createElement("tr");
        const emptyItemNoAgain = document.createElement("th");
        const emptyPizzaAgain = document.createElement("td");
        const emptySizeAgain = document.createElement("td");
        const totalPriceAmount = document.createElement("th");
        totalPriceAmount.innerText = `Total Price: $${(totalPrice * californiaSalesTax + totalPrice).toFixed(2)}`;
        const placeOrderTableData = document.createElement("td");
        const placeOrderBtn = document.createElement("button");
        placeOrderBtn.classList.add("btn", "btn-success");
        placeOrderBtn.innerText = "Place Order";

        // Appending semi final row to table body. Shows Sales tax.
        tableBody.appendChild(semiFinalTableRow);
        semiFinalTableRow.appendChild(emptyItemNo);
        semiFinalTableRow.appendChild(emptyPizza);
        semiFinalTableRow.appendChild(emptySize);
        semiFinalTableRow.appendChild(salesTaxAmount);
        semiFinalTableRow.appendChild(emptyButtonOne);

        // Appending final row to table body. Shows Final Price.
        tableBody.appendChild(finalTableRow);
        finalTableRow.appendChild(emptyItemNoAgain);
        finalTableRow.appendChild(emptyPizzaAgain);
        finalTableRow.appendChild(emptySizeAgain);
        finalTableRow.appendChild(totalPriceAmount);
        finalTableRow.appendChild(placeOrderTableData);
        placeOrderTableData.appendChild(placeOrderBtn);

        // Event Listener for Place Order button
        placeOrderBtn.addEventListener("click", function ordered() {
            localStorage.clear();
            globalOrder = [];
            success();
            populateReviewOrder();
        })
    }
}


// Init function to run on app launch. Purpose to keep global scope as clean as possible.
function init() {
    // Populating Global order object if items in local storage.
    populateGlobalOrder();

    // Updating button icons.
    updateButtonIcons();

    // Adding Event Listeners to non Dynamicaly created buttons.
    menuBtn.addEventListener("click", () => {
        toggleMenuOrder();
        updateButtonIcons();
    });
    reviewBtn.addEventListener("click", () => {
        toggleMenuOrder();
        populateReviewOrder();
        updateButtonIcons();
    });

    // Populating Menu
    populateMenu();
}

init();