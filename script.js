const form = document.getElementById("date-form");
const dayInput = document.getElementById("day-input");
const monthInput = document.getElementById("month-input");
const yearInput = document.getElementById("year-input");

const years = document.getElementById("years");
const months = document.getElementById("months");
const days = document.getElementById("days");

const dayErr = document.querySelector("#err.day");
const monthErr = document.querySelector("#err.month");
const yearErr = document.querySelector("#err.year");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const currentDate = new Date();

  dayInput.parentElement.classList.remove("error");
  monthInput.parentElement.classList.remove("error");
  yearInput.parentElement.classList.remove("error");
  dayErr.style.cssText = "";
  monthErr.style.cssText = "";
  yearErr.style.cssText = "";

  if (!dayInput.value) {
    dayInput.parentElement.classList.add("error");

    dayErr.innerText = "This field is required";
    dayErr.style.cssText = "display: block;";
    return;
  }

  if (!monthInput.value) {
    monthInput.parentElement.classList.add("error");

    monthErr.innerText = "This field is required";
    monthErr.style.cssText = "display: block;";
    return;
  }

  if (!yearInput.value) {
    yearInput.parentElement.classList.add("error");

    yearErr.innerText = "This field is required";
    yearErr.style.cssText = "display: block;";
    return;
  }

  if (dayInput.value > 31 || dayInput.value < 1) {
    dayInput.parentElement.classList.add("error");

    dayErr.innerText = "Must be a valid day";
    dayErr.style.cssText = "display: block;";
    return;
  }

  if (monthInput.value > 12 || monthInput.value < 1) {
    monthInput.parentElement.classList.add("error");

    monthErr.innerText = "Must be a valid month";
    monthErr.style.cssText = "display: block;";
    return;
  }

  if (!isValidDate(dayInput.value, monthInput.value, yearInput.value)) {
    dayInput.parentElement.classList.add("error");
    monthInput.parentElement.classList.add("error");
    yearInput.parentElement.classList.add("error");

    dayErr.innerText = "Must be a valid date";
    dayErr.style.cssText = "display: block;";
    return;
  }

  const dateOfBirth = new Date(yearInput.value, monthInput.value - 1, dayInput.value);

  if (dateOfBirth > currentDate) {
    dayInput.parentElement.classList.add("error");
    monthInput.parentElement.classList.add("error");
    yearInput.parentElement.classList.add("error");

    dayErr.innerText = "Must be in the past";
    dayErr.style.cssText = "display: block;";
    return;
  }

  const diffDate = new Date(currentDate - dateOfBirth);
  const diffYears = diffDate.toISOString().slice(0, 4) - 1970;
  const diffMonths = diffDate.getMonth();
  const diffDays = diffDate.getDate() - 1;

  years.innerText = diffYears;
  months.innerText = diffMonths;
  days.innerText = diffDays;
});

function isValidDate(d, m, y) {
  if (m < 1 || m > 12) return false;
  if (d < 1 || d > 31) return false;

  if (m == 2) {
    if ((y % 4 == 0 && y % 100 != 0) || y % 400 == 0) return d <= 29;
    else return d <= 28;
  }

  if (m == 4 || m == 6 || m == 9 || m == 11) return d <= 30;

  return true;
}
