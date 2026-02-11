

import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const inputTime = document.querySelector("#datetime-picker");
const btnStart = document.querySelector("button");
const timerVeiw = document.querySelectorAll(".value");



btnStart.addEventListener("click", startTimer);


let userSelectedDate = null;
let idTimer = null;
btnStart.disabled = true; 

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    clickOpens: true,
    onClose(selectedDates) {
        if (selectedDates[0] < Date.now()){
            iziToast.error({
                message: "Please choose a date in the future",
        });
       return btnStart.disabled = true; 
        }
        btnStart.disabled = false; 
        userSelectedDate = selectedDates[0]; 
    }
};

const fp = flatpickr(inputTime, options);


function startTimer(){
    /* options.clickOpens = false; */
    inputTime.disabled = true;
    /* fp.close(); */
    btnStart.disabled = true;
    idTimer = setInterval(() => {
       const currentTime = Date.now();
       const result = userSelectedDate - currentTime;
        if (result <= 0){ 
           inputTime.disabled = false;
           clearInterval(idTimer); 
           updateTimer({ days: "00", hours: "00", minutes: "00", seconds: "00" });  
           return;  
        }; 
       const ms = convertMs(result);
       updateTimer(ms);

    },1000);
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  return { days, hours, minutes, seconds };
}

 function addLeadingZero(value){
        return String(value).padStart(2, "0");
       };

function updateTimer(obj){
    const values = Object.values(obj);
    timerVeiw.forEach((item, index) => {
    item.textContent = values[index];  
}); 
}
