import { plus } from "./plus.js";
import "./style.css";
import tiger from "./tiger.png";

document.addEventListener("DOMContentLoaded", () => {
    document.body.innerHTML = `<img src = "${tiger}">`;
});

// console.log(pw);

let env;
if (process.env.NODE_ENV === "development") {
    env = dev;
} else {
    env = pro;
}

console.log(env);
