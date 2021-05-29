// Assigning variables to elemets
const fragment = document.createDocumentFragment();
const menubarIcon = document.querySelector('.menu-icon');
const navbar = document.querySelector('nav');
const navbarList = document.querySelector('ul');
const sections = document.querySelectorAll('section');
const backToTop = document.querySelector('.back-to-top');
const header = document.querySelector('header');
const boxs = document.querySelectorAll('.box');

function navbarItems(id, name) {
    const navItem = `<a class="nav-link" href="#${id}"> ${name}</a>`;
    return navItem;
}

function populateNavbar() {
    for (let i = 0; i < sections.length; i++) {
        const newItem = document.createElement('li');
        newItem.classList.add('navbar-list-item')
        const sectionName = sections[i].getAttribute('data-name');
        const sectionId = sections[i].getAttribute('id')
        newItem.innerHTML = navbarItems(sectionId, sectionName);
        fragment.appendChild(newItem);
    }
    navbarList.appendChild(fragment);
}

populateNavbar();

// In viewport detection
function isInViewport(elem) {
    const bounding = elem.getBoundingClientRect();
    return (
        bounding.top <= 1 &&
        bounding.bottom >= 1
    );
};

// Active section when section is in viewport
// You can check the navbar and see which section is active
const subMenuItems = document.querySelectorAll('.navbar-list-item');

function activeSection() {
    for (let i = 0; i < sections.length; i++) {
        sections[i].classList.toggle('avtive-section', isInViewport(sections[i]));
        subMenuItems[i].classList.toggle('active-nav-item', isInViewport(sections[i]));
    };
};

document.addEventListener('scroll', function() {
    activeSection();
});

// Changing background color of each section dynamiclly
function getRandomColor() {
    const COLOR_LENGTH = 6;
    let letters = '0123456789ABCDEF';
    let color = '#';
    // generate random 6 digit
    for (let i = 0; i < COLOR_LENGTH; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    // return color
    return color;
};

let backgroundColorsForSections = [];

function generateColors() {
    let x = [];
    for (let i = 0; i < sections.length; i++) {
        x[i] = getRandomColor();
    }
    return x;
};

backgroundColorsForSections = generateColors();

document.addEventListener('scroll', function() {
    for (let i = 0; i < sections.length; i++) {
        if (isInViewport(sections[i])) {
            document.querySelector('.container').style.backgroundColor = `${backgroundColorsForSections[i]}`;
        };
    };
});

// Dropdown menu on click
menubarIcon.addEventListener('click', function() {
    if (window.innerWidth <= 971) {
        navbar.classList.toggle('navVisible');
        menubarIcon.classList.toggle('menu-icon-rotate');
    }
});

// Hide Dropdown menu when scrolling or clicking on a dropdown menu item
document.addEventListener('scroll', function() {
    if (navbar.classList.contains('navVisible') && window.innerWidth <= 971) {
        navbar.classList.toggle('navVisible');
        menubarIcon.classList.toggle('menu-icon-rotate');
    };
});

// Hide navbar on scroll down
let prevScrollpos = window.scrollY;
window.onscroll = function() {
    let currentScrollPos = window.scrollY;
    if (prevScrollpos > currentScrollPos) {
        header.style.top = "0";
    } else if (window.innerWidth <= 600 || window.innerWidth >= 970) {
        header.style.top = "-150px";
    };
    prevScrollpos = currentScrollPos;
};

// Back to top button appears after scrolling for a bit
document.addEventListener('scroll', function() {
    backToTop.classList.toggle('back-to-top-visible', window.pageYOffset >= 600);
});

// Alternate the flow of the content (Image <-> Text)
for (let k = 0; k < sections.length; k++) {
    if (window.innerWidth > 970 && (k % 2) == 1) {
        boxs[k].classList.toggle('box-alt');
    }
};

// Margin for last section
boxs[sections.length - 1].classList.add('last-box');