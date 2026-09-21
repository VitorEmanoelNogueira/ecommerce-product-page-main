import { quantitySpinner, getSpinnerValue } from "./quantitySpinner.js";
import { productFormStatus } from "./product.js";

const cartButtonItemsNumber = document.querySelector("[data-cart-items-number]");
const cartButtonCounter = document.querySelector("[data-cart-counter]");

const cart = document.getElementById("cart");
const cartProducts = cart.querySelector("[data-cart-products]");
const cartCheckout = cart.querySelector("[data-checkout-button]");
let cartQuantity = 0;

function addToCart(){
    cartQuantity = getSpinnerValue();
    
    populateCart();

    quantitySpinner.quantity.value = "0";
    cartButtonItemsNumber.textContent = `${cartQuantity} items in cart`;
    cartButtonCounter.textContent = `${cartQuantity}`;
    productFormStatus.textContent = `${cartQuantity} items added to cart`;
    
    setTimeout(() => {
        productFormStatus.textContent = "";
    }, 200)
}

function populateCart(){
    if (cartQuantity === 0){
        cartProducts.innerHTML= `<p class="c-cart__text">Your cart is empty.</p>`;
        return
    }

    if(cartProducts.querySelector("[data-cart-product]")){
        cartProducts.querySelector("[data-cart-quantity]").textContent = cartQuantity;
        cartProducts.querySelector("[data-cart-total]").textContent = `$${(125 * cartQuantity).toFixed(2)}`;
        return
    }


    cartProducts.innerHTML = `
     <div class="c-cart__product c-cart-product" data-cart-product>
        <img class="c-cart-product__image" src="images/image-product-1-thumbnail.jpg" alt="">

        <p class="c-cart-product__name">Fall Limited Edition Sneakers</p>

        <p class="c-cart-product__price" aria-hidden="true"> 
            <span aria-hidden="true">$125.00 x</span>
            <span data-cart-quantity>${cartQuantity}</span>
            <b class="c-cart-product__total" data-cart-total>
                $${(125 * cartQuantity).toFixed(2)}
            </b>
        </p>
        <p class="u-sr-only">${cartQuantity} items of $125.00, $${(125 * cartQuantity).toFixed(2)} in total.</p>

        <button class="c-cart-product__delete" aria-label="Remove Product from Cart" data-delete-product>
            <svg 
            class="c-cart-product__delete-icon" 
            aria-hidden="true"
            width="14" 
            height="16" 
            viewBox = "0 0 14 16" 
            xmlns="http://www.w3.org/2000/svg" 
            xmlns:xlink="http://www.w3.org/1999/xlink">
                <defs><path d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z" id="a"/></defs><use fill="currentColor" fill-rule="nonzero" xlink:href="#a"/>
            </svg>
        </button>
    </div>`

    cartCheckout.hidden = false;
    cartProducts.querySelector("[data-delete-product]").addEventListener("click", removeProduct);
}

function removeProduct(){
    cartQuantity = 0;
    cartProducts.innerHTML= `<p class="c-cart__text">Your cart is empty.</p>`;
    cartCheckout.hidden = true;
    cartButtonItemsNumber.textContent = "Cart is empty"
    cartButtonCounter.textContent = "";
    cart.focus();
}

function initCart(){
    cart.addEventListener("toggle", (event) => {
    if (event.newState === "open") {
        cart.focus();
    }
});

    populateCart();
}

export { initCart, addToCart };