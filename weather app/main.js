// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid=16c4f7fea23110aa6841500e618cc593&units=metric

const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".ajax-section .cities");
const apikey = "16c4f7fea23110aa6841500e618cc593";

form.addEventListener("submit", e => {
    e.preventDefault();
    let inputValue = input.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apikey}&units=metric`;
    fetch(url)
        .then(Response => Response.json())
        .then(data => {
            const { main, name, sys, weather } = data;
            const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;
            const li = document.createElement("li");
            li.classList.add("city");
            const markup = `
            <h2 class="city-name" data-name=${name},${sys.country}>
                <span>${name}</span>
                <span>${sys.country}</span>
            </h2>
            <div class="city-temp">${Math.round(main.temp)}</div>
            <figure>
                <img class="city-icon" src="${icon}" alt="city">
                <figurecaption>${weather[0]["description"]}</figurecaption>
            </figure>
            `;
            li.innerHTML = markup;
            list.appendChild(li);
            msg.innerText = "";
        })
        .catch(() => {
            msg.innerText = "Search for a valid city!";
        })
    input.value = "";
});