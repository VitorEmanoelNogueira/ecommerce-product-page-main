const quantitySpinner  = {
    status: document.querySelector("[data-quantity-status]"),
    quantity: document.getElementById("quantity"),
    decrease: document.querySelector("[data-decrease-quantity]"),
    increase: document.querySelector("[data-increase-quantity]"),
}
let announceTimer;

function getSpinnerValue(){
    return Number(quantitySpinner.quantity.value);
}

function increaseQuantity(){
    const currentValue = getSpinnerValue()

    const newValue = currentValue + 1;
    quantitySpinner.quantity.value = newValue;
    announceValue(newValue)
}

function decreaseQuantity(){
    const currentValue = getSpinnerValue();

    if(currentValue == 0){
        return;
    }

    const newValue = currentValue - 1;
    quantitySpinner.quantity.value = newValue;
    announceValue(newValue);
}

function announceValue(newValue){
    clearTimeout(announceTimer);

    announceTimer = setTimeout(() => {
    quantitySpinner.status.textContent = `Quantity: ${newValue}`;

        setTimeout(() => {
            quantitySpinner.status.textContent = ``;
        }, 200);
    }, 300);
}

function initQuantitySpinner(){
    quantitySpinner.increase.addEventListener("click", increaseQuantity);
    quantitySpinner.decrease.addEventListener("click", decreaseQuantity);
}

export { quantitySpinner, getSpinnerValue, initQuantitySpinner };