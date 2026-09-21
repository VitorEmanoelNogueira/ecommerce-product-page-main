const openNavMobile = document.querySelector("[data-nav-open]");
const mobileNavDialog = document.getElementById("nav-mobile-menu");
const closeNavMobile = mobileNavDialog.querySelector("[data-nav-close]");
const navMobileLinks = mobileNavDialog.querySelectorAll("[data-nav-link-mobile]");

function openNavMenu() {
    openNavMobile.setAttribute("aria-expanded", "true");
    mobileNavDialog.showModal();
}

function closeNavMenu() {
    if(!mobileNavDialog.open) return
    
    openNavMobile.setAttribute("aria-expanded", "false");

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        mobileNavDialog.classList.add("is-closing");
        
        mobileNavDialog.addEventListener("transitionend", () => {
            mobileNavDialog.classList.remove("is-closing");
            mobileNavDialog.close();
    }, {once: true})
    }else{
        mobileNavDialog.close();
    }
}

export function initNavMobile(){
    openNavMobile.addEventListener("click", openNavMenu);
    closeNavMobile.addEventListener("click", closeNavMenu);
    mobileNavDialog.addEventListener("click", (e) =>{
        if (e.target === mobileNavDialog){
            closeNavMenu();
        }
    })
    mobileNavDialog.addEventListener("cancel", (e) => {
        e.preventDefault();
        closeNavMenu();
    });
    navMobileLinks.forEach(link => link.addEventListener("click", closeNavMenu));

    window.matchMedia("(min-width: 50rem)").addEventListener("change", () => {
        closeNavMenu();
    })
}