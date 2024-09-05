var monthName = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
    "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

var now = new Date();
var day = now.getDate();
var month = now.getMonth();
var currentMonth = month;
var year = now.getFullYear();

initCalender();

function initCalender() {
   $("#text_day").text(day);
   $("#text_month").text(monthName[currentMonth]);

   $("#text_month_02").text(monthName[month]);
   $("#text_year").text(year);

   $(".item_day").remove();

// Agrega días del mes anterior
for (let i = startDay(); i > 0; i--) {
   $(".container_days").append(
      `<span class="week_days_item item_day prev_days">${getTotalDays(month - 1) - (i - 1)}</span>`
   );
}

// Agrega todos los días del mes actual
for (let i = 1; i <= getTotalDays(month); i++) {
   if (i == day && month == currentMonth && year === now.getFullYear()) {
       $(".container_days").append(
           `<span class="week_days_item item_day today">${i}</span>`
       );
   } else {
       $(".container_days").append(
           `<span class="week_days_item item_day">${i}</span>`
       );
   }
}

// Rellena el resto del mes con días del mes siguiente
let totalDaysInCalendar = startDay() + getTotalDays(month);
   for (let i = 1; totalDaysInCalendar % 7 !== 0; i++) {
      $(".container_days").append(
         `<span class="week_days_item item_day next_month_days">${i}</span>`
      );
      totalDaysInCalendar++;
   }
}

function getNextMonth() {
if (month !== 11) {
      month++;
   } else {
      year++;
      month = 0;
   }
   initCalender();
}

function getPrevMonth() {
if (month !== 0) {
      month--;
   } else {
      year--;
      month = 11;
   }
   initCalender();
}

function startDay() {
var start = new Date(year, month, 1);
return start.getDay();
}

function leapMonth() {
return ((year % 400 === 0) || (year % 4 === 0) && (year % 100 !== 0));
}

function getTotalDays(monthParam) {
var m = (monthParam !== undefined) ? monthParam : month;

if (m === 3 || m === 5 || m === 8 || m === 10) {
      return 30;
   } else if (m === 0 || m === 2 || m === 4 || m === 6 || m === 7 || m === 9 || m === 11) {
      return 31;
   } else {
      return leapMonth() ? 29 : 28;
   }
}

$("#next_month").click(function () {
   getNextMonth();
});

$("#last_month").click(function () {
   getPrevMonth();
});
