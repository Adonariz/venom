const menuButton = document.querySelector(".menu-button");
const menu = document.querySelector(".nav-menu");
const menuButtonClose = document.querySelector(".menu-button-close");
menuButton.addEventListener("click", () => {
  menu.classList.add("is-open");
  menuButtonClose.classList.add("is-active");
});
menuButtonClose.addEventListener("click", () => {
  menu.classList.remove("is-open");
  menuButtonClose.classList.remove("is-active");
});

// всплывающая форма

const hideForm = document.querySelector('.hide-form');
const orderTicket = document.querySelector('.order-ticket');
const orderTrigger = document.querySelector('.order-trigger');
const orderTicketForm = document.querySelector('.order-ticket__form');
const orderTicketFormWrapper = document.querySelector('.order-ticket__form-wrapper');
const orderTicketPreloaderWrapper = document.querySelector('.order-ticket__preloader-wrapper');
const orderTicketThanksWrapper = document.querySelector('.order-ticket__thanks-wrapper');
const orderTicketThanksName = document.querySelector('.order-ticket__thanks-name');

setTimeout(() => {
  const formHeight = orderTicket.offsetHeight;
  hideForm.style.bottom = -formHeight + 'px';
}, 1000);

const sendData = (data, callback, callBefore) => {
  if (callBefore) {
    callBefore();
  }

  fetch('http://localhost:3000/api', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(data),
  }).then((response) => {
    return response.json();
  }).then(callback);
};

const showThankYou = (data) => {
  orderTicketPreloaderWrapper.style.display = 'none';
  orderTicketThanksWrapper.style.display = 'block';
  orderTicketThanksName.textContent = data.name;
};

const showPreloader = () => {
  orderTicketFormWrapper.style.display = 'none';
  orderTicketPreloaderWrapper.style.display = 'block';
}

orderTrigger.addEventListener('click', () => {
  hideForm.classList.toggle('hide-form-active');
});

orderTicketForm.addEventListener('change', (evt) => {
  const target = evt.target;
  const label = target.labels[0];

  if (label && target.value) {
    label.classList.add('order-ticket__label-focus');
  } else {
    label.classList.remove('order-ticket__label-focus');
  }
});

orderTicketForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const formData = new FormData(orderTicketForm);
  const data = {};

  for (const [name, value] of formData) {
    data[name] = value;
  }

  sendData(data, showThankYou, showPreloader);
});
