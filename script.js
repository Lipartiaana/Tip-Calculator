const bill = document.getElementById("bill");
const people = document.getElementById("people");
const tip = document.getElementById("tip");
const total = document.getElementById("total");
const tipPercents = document.querySelectorAll(".tip-percent");
const customTip = document.getElementById("custom");
const reset = document.getElementById("reset");
const billError = document.getElementById("bill-error");
const peopleError = document.getElementById("people-error");
const mainTip = document.getElementById("main-tip");

bill.value = "0.0";
people.value = "1";
tip.value = "$" + (0.0).toFixed(2);
total.value = "$" + (0.0).toFixed(2);

let billValue = 0.0;
let peopleValue = 1;
let tipValue = 0.15;

bill.addEventListener("input", getBillValue);
people.addEventListener("input", getPeopleValue);
tipPercents.forEach((val) => {
  val.addEventListener("click", onClick);
});
customTip.addEventListener("input", getCustomValue);
reset.addEventListener("click", resetAll);

function getBillValue() {
  billValue = parseFloat(bill.value);
  if (!billValue || billValue < 0) {
    bill.classList.add("error");
    billError.style.visibility = "visible";
    billValue = 0;
    peopleValue = 1;
    calculateTip();
  } else {
    bill.classList.remove("error");
    billError.style.visibility = "hidden";
  }
  calculateTip();
}

function getPeopleValue() {
  peopleValue = people.value;

  if (peopleValue < 1) {
    people.classList.add("error");
    peopleError.style.visibility = "visible";
    billValue = 0;
    peopleValue = 1;
    calculateTip();
  } else {
    people.classList.remove("error");
    peopleError.style.visibility = "hidden";
  }
  calculateTip();
}

function getCustomValue() {
  tipValue = parseFloat(customTip.value / 100);
  calculateTip();
}

function onClick(event) {
  tipPercents.forEach(function (val) {
    val.classList.remove("active");
    if (event.target.innerHTML == val.innerHTML) {
      val.classList.add("active");
      tipValue = parseFloat(val.innerHTML) / 100;
      calculateTip();
    }
  });
  calculateTip();
}

function calculateTip() {
  let calculatedTip = (billValue * tipValue) / peopleValue;
  let calculatedTotal = (billValue + calculatedTip * peopleValue) / peopleValue;
  tip.innerHTML = "$" + calculatedTip.toFixed(2);
  total.innerHTML = "$" + calculatedTotal.toFixed(2);
}

function resetAll() {
  bill.value = "0.0";
  people.value = "1";
  tip.value = "$" + (0.0).toFixed(2);
  total.value = "$" + (0.0).toFixed(2);

  billValue = 0.0;
  peopleValue = 1;
  tipValue = 0.15;
  customTip.value = "";

  tipPercents.forEach(function (val) {
    val.classList.remove("active");
  });

  mainTip.classList.add("active");

  billError.style.visibility = "hidden";
  bill.classList.remove("error");
  peopleError.style.visibility = "hidden";
  people.classList.remove("error");

  calculateTip();
}
