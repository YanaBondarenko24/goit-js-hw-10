
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");
const input = document.querySelector(".delay-input");
const fieldset = document.querySelector(".radio-btn");
console.log(fieldset.elements);

let delay = 0;
let change = null;

form.addEventListener("submit", handleSubmit);
input.addEventListener("input", handleInput);
fieldset.addEventListener("change", handleChange);


function handleSubmit(event){
 event.preventDefault();

returnPromise(delay, change)
.then((delay) => {
    iziToast.show({
        title : "✅ OK",
        titleColor: "#fff",
        titleSize: "16px",
        titleLineHeight: "1.5",
        message: ` Fulfilled promise in ${delay}ms`,
        messageColor: "#fff",
        messageSize: "16px",
        messageLineHeight: "1.5",
        backgroundColor: "#59a10d",
        position: "topRight",
    });
    
})
.catch((delay) => {
    iziToast.show({
        title : "❌ Error",
        titleColor: "#fff",
        titleSize: "16px",
        titleLineHeight: "1.5",
        message: ` Rejected promise in ${delay}ms`,
         messageColor: "#fff",
        messageSize: "16px",
        messageLineHeight: "1.5",
        backgroundColor: "#ef4040",
        position: "topRight",
    });
    
})

}

const returnPromise = (delay, change) => {
    return new Promise((resolve, reject) => {
     setTimeout(() => {
        if(change === 'fulfilled'){
            resolve(delay);
        }else{
            reject(delay);
        }      
    }, delay);
});
}

function handleInput(event){
    delay =  +event.target.value;
    return delay;
}


function handleChange(event){
    if (event.target.type === "radio") {
    change = event.target.value;
}return change;
}








