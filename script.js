'use strict';

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');

const tabContent = document.querySelectorAll('.operations__content');

///////////////////////////////////////
// Modal window

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

/////////////SCROLL/////////////////////////

//Element.getBoundingClientRect() :The Element.getBoundingClientRect() method returns a
//DOMRect object providing information about the size of an element and its position relative to the viewport.

btnScrollTo.addEventListener('click', e => {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  // window.scrollTo(s1coords.left, s1coords.top + window.scrollY);
  // window.scrollTo({
  //   left: s1coords.left,
  //   top: s1coords.top + window.scrollY,
  //   behavior: 'smooth',
  // });
  // console.log(s1coords);
  // console.log('Current Scroll', window.scrollX, window.scrollY);
  // console.log(
  //   'Height/width of viewport',
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );

  //Easier way to scroll to desired element (Won't work in older browsers)

  section1.scrollIntoView({ behavior: 'smooth' });
});

/////////////Navbar Scrolling////////

/////////////Horizontal Tab //////////////////

//we need to add event handlers to the 'operations' buttons
//We can do this using two ways
//1st- Attaching event listeners to every button
//Below method is inefficient
// tabs.forEach(tab => {
//   tab.addEventListener('click', () => {
//     console.log('Button Clicked', tab.querySelector('span').textContent);
//   });
// });

//2nd Method - Event Propogation
//Select a parent element, in this case "operations__tab-container"
//operations__tab--active

const showOperation = event => {
  const clicked = event.target.closest('.operations__tab');

  //Guard Clause :
  if (!clicked) return;

  // console.log(event.target.classList[1]);
  tabs.forEach(tab => {
    tab.classList.remove('operations__tab--active');
  });
  clicked.classList.add('operations__tab--active');
  const currentSelected = document.querySelector(
    '.operations__content--active'
  );
  currentSelected.classList.remove('operations__content--active');
  console.log(clicked);
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
};

tabsContainer.addEventListener('click', showOperation);

//////////////////////Menu Fade Animattion///////////////////////////////
//////  mouseenter does not bubble        /////////////////
////mouseover bubbles , mouseout is the opposite of mouseover

const handleHover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(e => {
      if (e !== link) {
        e.style.opacity = this;
      }
      logo.style.opacity = this;
    });
  }
};

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// const navElements = document.querySelectorAll('.nav__link').forEach(el => {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();

//     const id = this.getAttribute('href');

//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

//THis is inefficient as we are attaching same function to multiple elements
// const navElements = document.querySelectorAll('.nav__link').forEach(el => {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     //console.log(this.getAttribute('href'));
//     console.log(e.target.getAttribute('href'));
//   });
// });

///EVENT DELEGATION/////////////
// 1. Add event listener to common parent element
// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  const id = e.target.getAttribute('href');
  const el = document.querySelector(id);
  console.log(el);
  if (e.target.classList.contains('nav__link')) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
});

//////////////////
// console.log(document.documentElement);
// console.log(document);

// document.querySelector('.headers');
const allSections = document.querySelectorAll('.section'); //this will return a node list

const allButtons = document.getElementsByTagName('button'); //This will return a html collection

//A html collections get updated automatically if an element is deleted or added
//Node list will not be updated automatically if any element is removed or addeds
const header = document.querySelector('.header');
const message = document.createElement('div'); //tis will return a DOM Element
message.classList.add('cookie-message');
message.innerHTML = `We use cookies for improved functionality and analytics. <button class='btn btn--close-cookie'>Got It!</button>`;
message.style.height = '65px';

///////////////INSERT ELEMENTS//////////////

//A dom element is unique , that is why it can only exist at a single place at a time
//We can use append and prepend to move DOM element
//What if we want to insert multiple copies of the same element ?

// console.log(message);
// header.prepend(message); //Adds as the first child of header element
//header.append(message); //Adds as the last child of header element
// header.insertAdjacentElement('afterend', message);

// //What if we want to insert multiple copies of the same element ?
// header.prepend(message);
// //In that case we would have to copy the first element
// header.append(message.cloneNode(true)); //All the child elements will also be copied

// allSections[0].insertAdjacentHTML('afterend', message.innerHTML);
//

header.append(message); //Adds as the last child of header element

///BEFORE and AFTER

header.before(message);
// header.after(message);

///DELETE ELEMENTS

document.querySelector('.btn--close-cookie').addEventListener('click', () => {
  message.remove();
});

message.style.backgroundColor = '#37383d';
message.style.width = '120%';

//Use getComputedStyles method to get a css property on an element
const body = document.getElementsByTagName('body');
// console.log(getComputedStyle(message)); //Return CSSStyleDecleration
// console.log(getComputedStyle(message).height); //Return CSSStyleDecleration
// console.log(getComputedStyle(message).height.slice(-1, -2) + 40 + 'px');
message.style.height =
  Number.parseInt(getComputedStyle(message).height) + 40 + 'px';

//How to set access/update CSS Custom Property

document.documentElement.style.setProperty('--color-primary', 'orangered');

// //Atributes src , class ,id href
// //How to change attributes

// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.className);
// console.log(logo.dataset.firstName);

// const h1 = document.querySelector('h1');
// const alerth1 = e => {
//   console.log('Mouse Left');
//   h1.removeEventListener('mouseleave', alerth1);
// };

// document.querySelector('.header__title').addEventListener('click', e => {
//   console.log(e.target); //This returns the element on which the mouse is clicked
//   console.log(e.currentTarget); //always refers to the element whose event listener triggered the event.(header__title ) in this case
// });

// h1.addEventListener('mouseleave', alerth1);
// // h1.addEventListener('mouseleave', e => {
// //   console.log('Mouse Left2');
// // });
// // h1.onmouseenter = function (e) {
// //   console.log('Mouse entered');
// // };

// // h1.onmouseenter = function (e) {
// //   console.log('Mouse entered2');
// // }; ///This will override the onmouseenter on h1

// //Why add event listener is better
// //1. Add event listener allows to add multiple events(callback function) on a single element
// // using the "on" way , it will override the previous event listener
// //2. We can remove an event handler in case we dont need it anymore with addEventListener

// // rgb(255,255,255)

// const randomInt = (min = 0, max = 255) => {
//   //min=0, max = 255
//   return Math.floor(Math.random() * (max + 1 - min) + min);
// };

// const randomColor = () => {
//   return `rgb(${randomInt()},${randomInt()},${randomInt()})`;
// };

// // console.log(randomColor());

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   console.log(randomColor());
//   this.style.backgroundColor = randomColor();
//   e.stopPropagation();
// });
// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
// });
// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
// });

// const obj = { age: 21 };

// console.log(obj);
// console.log(Object.values(obj));

const h1 = document.querySelector('h1');

//Traversing Children of h1
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes); //Returns node list
// console.log(h1.children); //Returns a collection,only works for direct children
// console.log(h1.firstElementChild);
// h1.lastElementChild.style.color = 'orangered';

//Going Upwards (Selecting Parents)

// console.log(h1.parentNode);
// console.log(h1.parentElement);
// h1.closest('.header').style.background = 'var(--gradient-secondary)';

//Going sideways : Siblings

// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// console.log(typeof h1.previousSibling);
// console.log(h1.nextSibling);

// const lufthansa = {
//   airline: 'Lufthansa',
//   iataCode: 'LH',
//   book(flightNum, fname) {
//     console.log(
//       `${fname} booked a flight on ${this.airline} flight ${this.iataCode} , Flight num ${flightNum}`
//     );
//   },
// };

// lufthansa.book(100, 'Aditya');

// const euroWings = {
//   airline: 'eurowings',
// };

// const book = lufthansa.book;

// // euroWings.book();

// book.call(euroWings, 100, 'Huzan'); //Immediately calls the function

// book.apply(euroWings, [1, 'Shashwat']); //Calls Immediately

// const bookEw = book.bind(euroWings); //bind returns a function which we can call later
// bookEw(250, 'Shubhankar');

// const abc = function () {
//   console.log('ABC function ', this);
// };

// h1.addEventListener('click', abc);
