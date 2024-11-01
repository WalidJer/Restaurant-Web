
// 2)----------------- ORDER ONLINE SCRIPT------------------


window.addEventListener('DOMContentLoaded', () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || {}; 

   
    let itemNames = document.querySelectorAll(".meal");
    let itemPrices = document.querySelectorAll(".price");
    let itemQuantities = document.querySelectorAll(".quantity-input");
    let cartBtns = document.querySelectorAll(".order-button");
    let subtotalValue = document.querySelector("#subtotal");
    let hstValue = document.querySelector("#hst");
    let totalValue = document.querySelector("#total");
    let proceedBtn = document.querySelector("#proceed-button");
    let errorMessage = document.querySelector("#error-message");
    let orderMessage = document.querySelector('#order-message');  
   let placeOrderButton = document.querySelector('#place-order-button');

    function saveCartToLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function loadCartFromLocalStorage() {
        itemNames.forEach((itemNameElement, index) => {
            let itemName = itemNameElement.textContent.trim();
            if (cart[itemName]) {
                let { quantity } = cart[itemName];
                let inputElement = itemQuantities[index];
                inputElement.value = quantity;
            }
        });
        updateSummary();
    }

   
    function calculateSubtotal() {
        return Object.values(cart).reduce((sum, item) => sum + item.price * item.quantity, 0);
    }

 
    function updateSummary() {
        let subtotal = calculateSubtotal();
        let hst = subtotal * 0.15;  
        let total = subtotal + hst;

        subtotalValue.textContent = subtotal.toFixed(2);
        hstValue.textContent = hst.toFixed(2);
        totalValue.textContent = total.toFixed(2);
    }

    
    function addToCart(itemName, itemPrice, itemQuantity) {
        if (cart[itemName]) {
            cart[itemName].quantity += itemQuantity;
        } else {
            cart[itemName] = { price: itemPrice, quantity: itemQuantity };
        }
        console.log("Cart:", cart);

        saveCartToLocalStorage();
        updateSummary();
    }

   
    function removeFromCart(itemName, index) {
        if (cart[itemName]) {
            delete cart[itemName];
        }
        console.log("Cart after removal:", cart);

        itemQuantities[index].value = 0;  
        updateSummary();
    }

    
    cartBtns.forEach((btn, index) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();  

            let itemName = itemNames[index].textContent;
            let itemPrice = parseFloat(itemPrices[index].textContent.replace('$', ''));
            let itemQuantity = parseInt(itemQuantities[index].value);

            if (itemQuantity < 0) {
                showError("Quantity cannot be negative. Please enter a valid quantity.");
                return;
            }
    
            if (itemQuantity === 0) {
                showError("Quantity cannot be zero. Please enter a valid quantity.");
                return;
            }
    
            addToCart(itemName, itemPrice, itemQuantity);
            showSuccess(`${itemQuantity} x ${itemName} has been added to your cart.`);
        });

        let removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.classList.add('remove-button');

        btn.parentElement.appendChild(removeBtn);  

        removeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            let itemName = itemNames[index].textContent;

            removeFromCart(itemName, index);
        });
    });

    
    proceedBtn.addEventListener("click", (event) => {
        event.preventDefault();

        errorMessage.textContent = "";

        let name = document.getElementById("name").value.trim();
        let email = document.getElementById("email").value.trim();
        let phone = document.getElementById("phone").value.trim();
        let address = document.getElementById("address").value.trim();
        let city = document.getElementById("city").value.trim();
        let province = document.getElementById("province").value.trim();
        let postal = document.getElementById("postal").value.trim();
        let cardName = document.getElementById("card-name").value.trim();
        let cardNumber = document.getElementById("card-number").value.trim();
        let expDate = document.getElementById("exp-date").value.trim();
        let cvc = document.getElementById("cvc").value.trim();

        let fullnameRegex = /^[a-zA-Z'-\s]+$/;
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let phoneRegex = /^[+]?(1\-|1\s|1|\d{3}\-|\d{3}\s|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/g;
        let postalRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
        let cardNumberRegex = /^\d{4} \d{4} \d{4} \d{4}$/;
        let expDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
        let cvcRegex = /^\d{3}$/;

        if (!fullnameRegex.test(name)) return showError("Please enter a valid full name.");
        if (!emailRegex.test(email)) return showError("Please enter a valid email address.");
        if (!phoneRegex.test(phone)) return showError("Please enter a valid phone number.");
        if (!address || !city || !province || !postalRegex.test(postal)) {
            return showError("Please fill out the complete delivery information with a valid postal code.");
        }
        if (!fullnameRegex.test(cardName)) return showError("Please enter the cardholder's name correctly.");
        if (!cardNumberRegex.test(cardNumber)) {
            return showError("Please enter a valid card number in the format 1234 5678 9012 3456.");
        }
        if (!expDateRegex.test(expDate)) return showError("Please enter a valid expiration date in the format MM/YY.");
        if (!cvcRegex.test(cvc)) return showError("Please enter a valid 3-digit CVC.");

        showSuccess("Personal, Delivery, and Payment information are correct! proceed to Summary!");
    });

    function showError(message) {
        
        const errorMessages = document.querySelectorAll('.error-message');
        
        
        errorMessages.forEach((errorMessage) => {
            errorMessage.textContent = message;
            errorMessage.style.color = "red";
            errorMessage.style.display = "block";
        });
        
       
        setTimeout(() => {
            errorMessages.forEach((errorMessage) => {
                errorMessage.style.display = "none";
            });
        }, 5000);
    }
    
    function showSuccess(message) {
        
        const errorMessages = document.querySelectorAll('.error-message');
    
        
        errorMessages.forEach((errorMessage) => {
            errorMessage.textContent = message;
            errorMessage.style.color = "green";
            errorMessage.style.display = "block";
        });
    
       
        setTimeout(() => {
            errorMessages.forEach((errorMessage) => {
                errorMessage.style.display = "none";
            });
        }, 3000);
    }
    document.getElementById('clear-cart').addEventListener('click', () => {
        cart = {};
        localStorage.removeItem('cart');
        itemQuantities.forEach(input => input.value = 0);
        updateSummary();
    });

    placeOrderButton.addEventListener('click', (e) => {
        e.preventDefault();



        orderMessage.textContent = "Order placed successfully! Thank you for your purchase.";
        orderMessage.style.color = "green";
        orderMessage.style.display = "block";

       
        setTimeout(() => {
            orderMessage.style.display = "none";
        }, 5000);
    });

    loadCartFromLocalStorage();
});









// ---------------------------Below without using localstorage-----------------------------let


// document.addEventListener('DOMContentLoaded', () => {
//     let cart = {}; 

//     let itemNames = document.querySelectorAll(".meal");
//     let itemPrices = document.querySelectorAll(".price");
//     let itemQuantities = document.querySelectorAll(".quantity-input");
//     let cartBtns = document.querySelectorAll(".order-buttlet
//     let subtotalValue = document.querySelector("#subtotal");
//     let hstValue = document.querySelector("#hst");
//     let totalValue = document.querySelector("#total");
//     let proceedBtn = document.getElementById("proceed-button");
//     let errorMessage = document.getElementById("error-message");

    
//     function calculateSubtotal() {
//         return Object.values(cart).reduce((sum, item) => sum + item.price * item.quantity, 0);
//     }

    
//     function updateSummary() {
//         let subtotal = calculateSubtotal();
//         let hst = subtotal * 0.15;  // 15% HST
//         let total = subtotal + hst;

//         subtotalValue.textContent = subtotal.toFixed(2);
//         hstValue.textContent = hst.toFixed(2);
//         totalValue.textContent = total.toFixed(2);
//     }

//     function addToCart(itemName, itemPrice, itemQuantity) {
//         if (cart[itemName]) {
//             cart[itemName].quantity += itemQuantity;
//         } else {
//             cart[itemName] = { price: itemPrice, quantity: itemQuantity };
//         }
//         console.log("Cart:", cart);
//         updateSummary();
//     }

   
//     function removeFromCart(itemName, index) {
//         if (cart[itemName]) {
//             delete cart[itemName];
//         }
//         console.log("Cart after removal:", cart);

//         itemQuantities[index].value = 0;  
//         updateSummary();
//     }

    
//     cartBtns.forEach((btn, index) => {
//         btn.addEventListener('click', (e) => {
//             e.preventDefault();  

//             let itemName = itemNames[index].textContent;
//             let itemPrice = parseFloat(itemPrices[index].textContent.replace('$', ''));
//             let itemQuantity = parseInt(itemQuantities[index].value);

//             addToCart(itemName, itemPrice, itemQuantity);
//         });

       
//         const removeBtn = document.createElement('button');
//         removeBtn.textContent = "Remove";
//         removeBtn.classList.add('remove-button');

//         btn.parentElement.appendChild(removeBtn); 

//         removeBtn.addEventListener('click', (e) => {
//             e.preventDefault();
//             let itemName = itemNames[index].textContent;

//             removeFromCart(itemName, index);
//         });
//     });

    
//     proceedBtn.addEventListener("click", (event) => {
//         event.preventDefault();

//         errorMessage.textContent = "";

//        let name = document.getElementById("name").value.trim();
//         let email = document.getElementById("email").value.trim();
//         let phone = document.getElementById("phone").value.trim();
//         let address = document.getElementById("address").value.trim();
//         let city = document.getElementById("city").value.trim();
//         let province = document.getElementById("province").value.trim();
//         let postal = document.getElementById("postal").value.trim();
//         let cardName = document.getElementById("card-name").value.trim();
//         let cardNumber = document.getElementById("card-number").value.trim();
//         let expDate = document.getElementById("exp-date").value.trim();
//         let cvc = document.getElementById("cvc").value.trim();

//         let fullnameRegex = /^[a-zA-Z'-\s]+$/;
//         let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         let phoneRegex = /^[+]?(1\-|1\s|1|\d{3}\-|\d{3}\s|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/g;
//         let postalRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
//         let cardNumberRegex = /^\d{4} \d{4} \d{4} \d{4}$/;
//         let expDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
//         let cvcRegex = /^\d{3}$/;

//         if (!fullnameRegex.test(name)) return showError("Please enter a valid full name.");
//         if (!emailRegex.test(email)) return showError("Please enter a valid email address.");
//         if (!phoneRegex.test(phone)) return showError("Please enter a valid phone number.");
//         if (!address || !city || !province || !postalRegex.test(postal)) {
//             return showError("Please fill out the complete delivery information with a valid postal code.");
//         }
//         if (!fullnameRegex.test(cardName)) return showError("Please enter the cardholder's name correctly.");
//         if (!cardNumberRegex.test(cardNumber)) {
//             return showError("Please enter a valid card number in the format 1234 5678 9012 3456.");
//         }
//         if (!expDateRegex.test(expDate)) return showError("Please enter a valid expiration date in the format MM/YY.");
//         if (!cvcRegex.test(cvc)) return showError("Please enter a valid 3-digit CVC.");

//         showSuccess("Order placed successfully!");
//     });

//     function showError(message) {
//         errorMessage.textContent = message;
//         errorMessage.style.color = "red";
//         errorMessage.style.display = "block";
//         setTimeout(() => errorMessage.style.display = "none", 5000);
//     }

//     function showSuccess(message) {
//         errorMessage.textContent = message;
//         errorMessage.style.color = "green";
//         errorMessage.style.display = "block";
//         setTimeout(() => errorMessage.style.display = "none", 3000);
//     }
// });
























