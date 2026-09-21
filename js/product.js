import { addToCart } from "./cart.js";

const productForm = document.querySelector("[data-product-form]");
const productFormStatus = document.querySelector("[data-product-form-status]");

function initProductForm() {
    productForm.addEventListener("submit", (e) => {
        e.preventDefault();
        addToCart();
    })
}

export { productFormStatus, initProductForm };