let currentOrder = [];
let currentOrderCost = 0;
let overallOrder = [];
let overallOrderCost = 0;
let favouriteOrder = [];

// Function to initialize the page
function initializePage() {
    currentOrder = [];
    currentOrderCost = 0;
    overallOrder = [];
    overallOrderCost = 0;
    
    updateOrderSummary();
}

document.getElementById('ticketType').addEventListener('change', updateCurrentOrder);
document.getElementById('ticketNumber').addEventListener('input', updateCurrentOrder);
document.getElementById('duration').addEventListener('input', updateCurrentOrder);
document.getElementById('racketQuantity').addEventListener('input', updateCurrentOrder);
document.getElementById('foodTokenQuantity').addEventListener('input', updateCurrentOrder);
document.getElementById('age').addEventListener('input', updateCurrentOrder);
document.getElementById('addToOrderButton').addEventListener('click', addToOrder);
document.getElementById('placeOrderButton').addEventListener('click', placeOrder);
document.getElementById('orderFavouriteButton').addEventListener('click', orderFavourite);


window.addEventListener('load', initializePage);

function updateCurrentOrder() {
    const ticketType = document.getElementById('ticketType').value;
    const ticketNumber = parseInt(document.getElementById('ticketNumber').value, 10);
    const duration = parseInt(document.getElementById('duration').value, 10);
    const racketQuantity = parseInt(document.getElementById('racketQuantity').value, 10) || 0;
    const foodTokenQuantity = parseInt(document.getElementById('foodTokenQuantity').value, 10) || 0;
    const age = parseInt(document.getElementById('age').value, 10);
    const ticketCost = calculateTicketCost(ticketType, ticketNumber, age);
    const durationCost = calculateDurationCost(ticketType, duration, ticketNumber, age);
    const extrasCost = calculateExtrasCost({ rackets: racketQuantity, foodTokens: foodTokenQuantity });


    const totalCost = ticketCost + durationCost + extrasCost;

    currentOrder = [{
        ticketType,
        ticketNumber,
        duration,
        extras: {
            rackets: racketQuantity,
            foodTokens: foodTokenQuantity,
        },
    }];

    currentOrderCost = totalCost;
    let extrasString = '';

    if (racketQuantity > 0) {
        extrasString += `, Rackets: ${racketQuantity}`;
    }

    if (foodTokenQuantity > 0) {
        extrasString += `, Food Tokens: ${foodTokenQuantity}`;
    }

    const orderString = `Ticket Type: ${currentOrder[0].ticketType}, Ticket Number: ${currentOrder[0].ticketNumber}, Duration: ${currentOrder[0].duration}${extrasString}`;

    document.getElementById('currentOrder').innerText = orderString;
    document.getElementById('currentOrderCost').innerText = `${currentOrderCost} LKR`;

}


function addToOrder() {
  const ticketType = document.getElementById('ticketType').value;
  const ticketNumber = parseInt(document.getElementById('ticketNumber').value, 10);
  const duration = parseInt(document.getElementById('duration').value, 10);
  const age = parseInt(document.getElementById('age').value, 10);

  
     const validTicketTypes = ['universityStudent', 'outsider', 'child'];
     if (!validTicketTypes.includes(ticketType)) {
         alert('Invalid ticket type. Please select a valid ticket type.');
         return;
     }


     if (ticketType === 'child') {
        if (isNaN(age) || age <= 0 || age >= 15) {
            alert('Child Pass is only valid for ages 1 to 14. Please enter a valid age.');
            return;
        }
    }

     if (isNaN(ticketNumber) || ticketNumber < 0) {
        alert('Please enter a valid number of persons (0 or greater).');
        return;
    }

 
     const validDurations = [30, 60, 180, 240];
     if (!validDurations.includes(duration)) {
         alert('Invalid duration. Please select a valid duration.');
         return;
     }
     

  if (currentOrder.length > 0) {
      overallOrder.push(...currentOrder);
      overallOrderCost += currentOrderCost;

      currentOrder = [];
      currentOrderCost = 0;

      // Reset input fields after updating the order
      document.getElementById('ticketType').value = '';
      document.getElementById('ticketNumber').value = '';
      document.getElementById('duration').value = '';
      document.getElementById('racketQuantity').value = '';
      document.getElementById('foodTokenQuantity').value = '';
      document.getElementById('age').value = '';

      updateOrderSummary();
  }
}

function placeOrder() {
  if (overallOrder.length === 0) {
      alert('Please add an order before placing.');
  } else {
     
      const manufacturerName = "ManufacturerName"; 
      alert(`Thank you for your custom reservation, ${manufacturerName}!`);

      currentOrder = [];
    currentOrderCost = 0;
    overallOrder = [];
    overallOrderCost = 0;

      // Reset input fields after updating the order
      document.getElementById('ticketType').value = '';
      document.getElementById('ticketNumber').value = '';
      document.getElementById('duration').value = '';
      document.getElementById('racketQuantity').value = '';  
      document.getElementById('foodTokenQuantity').value = '';  
      document.getElementById('age').value = '';

      // Update the order summary
      updateOrderSummary();
  }
}

function updateOrderSummary() {
// Convert the currentOrder array to a custom string representation
const currentOrderString = currentOrder.map(order => {
    const extrasString = `Rackets: ${order.extras.rackets}, Food Tokens: ${order.extras.foodTokens}`;
    return `Ticket Type: ${order.ticketType}, Ticket Number: ${order.ticketNumber}, Duration: ${order.duration}, Extras: ${extrasString}`;
}).join('<br>');

     // Convert the overallOrder array to a custom string representation
     const overallOrderString = overallOrder.map(order => {
        const extrasString = `Rackets: ${order.extras.rackets}, Food Tokens: ${order.extras.foodTokens}`;
        return `Ticket Type: ${order.ticketType}, Ticket Number: ${order.ticketNumber}, Duration: ${order.duration}, Extras: ${extrasString}`;
    }).join('<br>');
    document.getElementById('currentOrder').innerHTML = currentOrderString;
    document.getElementById('currentOrderCost').innerText = `${currentOrderCost} LKR`;
    document.getElementById('overallOrder').innerHTML = overallOrderString;
    document.getElementById('overallOrderCost').innerHTML = `${overallOrderCost} LKR`;
}


function calculateTicketCost(ticketType, ticketNumber, age) {
    let cost = 0;

    switch (ticketType) {
        case 'universityStudent':
            cost = 500 * ticketNumber;
            break;
        case 'outsider':
            cost = 800 * ticketNumber;
            break;
        case 'child':
            if (age < 6) {
                cost = 250 * ticketNumber;
            } else if (age < 15) {
                cost = 350 * ticketNumber;
            } else {
                cost = 0;
            } 
            break;
    }

    return cost;
}


function calculateDurationCost(ticketType, duration, ticketNumber, age) {
    let extraCost = 0;

    switch (ticketType) {
        case 'universityStudent':
            switch (duration) {
                case 30:
                    extraCost = 0; 
                    break;
                case 60:
                    extraCost = 250 * ticketNumber; 
                    break;
                case 180:
                    extraCost = 500 * ticketNumber; 
                    break;
                case 240:
                    extraCost = 800 * ticketNumber; 
                    break;
            }
            break;
        case 'outsider':
            switch (duration) {
                case 30:
                    extraCost = 200 * ticketNumber; 
                    break;
                case 60:
                    extraCost = 500 * ticketNumber; 
                    break;
                case 180:
                    extraCost = 700 * ticketNumber; 
                    break;
                case 240:
                    extraCost = 1000 * ticketNumber; 
                    break;
            }
            break;
    }

    return extraCost;
}


function calculateExtrasCost(extras) {
    let extrasCost = 0;

    if (extras.rackets) {
        extrasCost += 1000 * extras.rackets;
    }

    if (extras.foodTokens) {
        extrasCost += 500 * extras.foodTokens;
    }

    return extrasCost;
}


function addToFavourites() {
    // Check if there is an order in the overall order
    if (overallOrder.length > 0) {
        // Save the current order to local storage
        localStorage.setItem('favouriteOrder', JSON.stringify(overallOrder));
        localStorage.setItem('favouriteOrderCost', overallOrderCost);

        alert('Order added to favourites!');
    } else {
        alert('Cannot add to favourites. Please place an order first.');
    }
}


function orderFavourite() {
  // Retrieve the favourite order from local storage
  const storedFavouriteOrder = localStorage.getItem('favouriteOrder');
  const storedFavouriteOrderCost = localStorage.getItem('favouriteOrderCost');

  if (storedFavouriteOrder) {
    // Parse the JSON and update the current order
    currentOrder = JSON.parse(storedFavouriteOrder);
    currentOrderCost = parseFloat(storedFavouriteOrderCost);

    // Update the order summary
    updateOrderSummary();

    alert('Favourite order added to the current order!');
  } else {
    alert('No favourite order found.');
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("donationForm");
  const cardNumberInput = document.getElementById("cardNumber");
  const cardHolderInput = document.getElementById("cardHolder");
  const expDateInput = document.getElementById("expDate");
  const cvvInput = document.getElementById("cvv");
  const submitButton = document.getElementById("donationSubmitButton");
  const successMessage = document.getElementById("successMessage");

  form.addEventListener("input", validateForm);
  submitButton.addEventListener("click", handleFormSubmit);

  function validateForm() {
    const cardNumberValid = validateCardNumber();
    const cardHolderValid = validateCardHolder();
    const expDateValid = validateExpDate();
    const cvvValid = validateCVV();
    const nameValid = validateDonorName();
    const addressValid = validateDonorAddress();

    submitButton.disabled = !(cardNumberValid && cardHolderValid && expDateValid && cvvValid && nameValid && addressValid);
}

function validateDonorName() {
    const donorName = document.getElementById("donorName").value.trim();
    const donorNameError = document.getElementById("donorNameError");

    if (donorName.length === 0) {
        donorNameError.textContent = "Name is required.";
        donorNameError.style.color = "red";
        return false;
        
    } else if (/\d/.test(donorName)) {
        donorNameError.textContent = "Name should not contain numbers.";
        donorNameError.style.color = "red";
        return false;
    }else {
        donorNameError.textContent = "";
        return true;
    }
}

function validateDonorAddress() {
    const donorAddress = document.getElementById("donorAddress").value.trim();
    const donorAddressError = document.getElementById("donorAddressError");

    if (donorAddress.length === 0) {
        donorAddressError.textContent = "Address is required.";
        donorAddressError.style.color = "red";
        return false;
    } else {
        donorAddressError.textContent = "";
        return true;
    }
}


  function validateCardNumber() {
      const cardNumber = cardNumberInput.value.trim();
      const cardNumberError = document.getElementById("cardNumberError");

      if (cardNumber.length === 0) {
          cardNumberError.textContent = "Card number is required.";
          cardNumberError.style.color = "red";
          return false;
      } else if (!isValidCardNumber(cardNumber)) {
          cardNumberError.textContent = "Invalid card number format.";
          cardNumberError.style.color = "red";
          return false;
      } else {
          cardNumberError.textContent = "";
          return true;
      }
  }

  function isValidCardNumber(cardNumber) {
      const cardNumberRegex = /^\d{4}-\d{4}-\d{4}-\d{4}$/;
      return cardNumberRegex.test(cardNumber);
  }

  function validateCardHolder() {
      const cardHolder = cardHolderInput.value.trim();
      const cardHolderError = document.getElementById("cardHolderError");

      if (cardHolder.length === 0) {
          cardHolderError.textContent = "Cardholder name is required.";
          cardHolderError.style.color = "red";
          return false;
      } else if (/\d/.test(cardHolder)) {
        cardHolderError.textContent = "Cardholder name should not contain numbers.";
        cardHolderError.style.color = "red";
        return false;
    } else {
          cardHolderError.textContent = "";
          return true;
      }
  }

  function validateExpDate() {
      const expDate = expDateInput.value.trim();
      const expDateError = document.getElementById("expDateError");

      if (expDate.length === 0) {
          expDateError.textContent = "Expiration date is required.";
          expDateError.style.color = "red";
          return false;
      } else if (!isValidExpDate(expDate)) {
          expDateError.textContent = "Invalid expiration date format.";
          expDateError.style.color = "red";
          return false;
      } else {
          expDateError.textContent = "";
          return true;
      }
  }

  function isValidExpDate(expDate) {
      const expDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
      return expDateRegex.test(expDate);
  }

  function validateCVV() {
      const cvv = cvvInput.value.trim();
      const cvvError = document.getElementById("cvvError");

      if (cvv.length === 0) {
          cvvError.textContent = "CVV is required.";
          cvvError.style.color = "red";
          return false;
      } else if (!isValidCVV(cvv)) {
          cvvError.textContent = "Invalid CVV format.";
          cvvError.style.color = "red";
          return false;
      } else {
          cvvError.textContent = "";
          return true;
      }
  }

  function isValidCVV(cvv) {
      const cvvRegex = /^\d{3}$/;
      return cvvRegex.test(cvv);
  }

  function handleFormSubmit() {
      if (submitButton.disabled) {
          // Form is not valid, do not submit
          return;
      }

      // Display success message
      successMessage.style.display = "block";

      // Clear input fields
      cardNumberInput.value = "";
      cardHolderInput.value = "";
      expDateInput.value = "";
      cvvInput.value = "";
      document.getElementById("donorName").value = "";
        document.getElementById("donorAddress").value = "";

      // Disable the submit button after successful submission
      submitButton.disabled = true;

      setTimeout(function () {
          successMessage.style.display = "none";
      }, 5000);
  }
});
