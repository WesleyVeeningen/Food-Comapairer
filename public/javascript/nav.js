let dropdownbnt = document.querySelector(".nav-dropdown-btn");
let dropdown = document.querySelector(".nav-dropdownItems");

function toggleDropdown() {
    if (dropdown.classList.contains("hidden")) {
        dropdown.classList.remove("hidden");

    }
    else {
    dropdown.classList.remove("animate__slideInDown");
        dropdown.classList.add("animate__slideOutUp");
        setTimeout(function () {
        dropdown.classList.add("hidden");
        dropdown.classList.remove("animate__slideOutUp");
        dropdown.classList.add("animate__slideInDown");
        }
        , 1000);
    }
}