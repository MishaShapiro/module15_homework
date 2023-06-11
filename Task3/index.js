const output = document.querySelector(".output")
const btn = document.querySelector(".btn")
const inp = document.querySelector(".inp")

function Geo() {
    let backMess = ""
    const error = () => {
        backMess = 'Невозможно получить ваше местоположение';
      }
    const success = (position) => {
        const lastOut = document.querySelector(".output").lastChild
        console.log('position', position);
        const latitude  = position.coords.latitude;
        const longitude = position.coords.longitude;
        backMess = `Широта: ${latitude} °, Долгота: ${longitude} °`;
        let href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
        lastOut.innerHTML = `<a href="${href}">Ссылка на карту</a>`
        console.log(backMess)
      }
    if (!navigator.geolocation) {
        backMess = 'Geolocation не поддерживается вашим браузером';
    } else {
        backMess = 'Определение местоположения…';
        navigator.geolocation.getCurrentPosition(success, error);
    }

    return backMess
}

function sendMessange(mess) {
    output.innerHTML += `<div class="output">
        <p>${mess}</p>
    </div>`
}

const websocket = new WebSocket('wss://echo-ws-service.herokuapp.com/');
websocket.onopen = () => {
    console.log("connected!")
}
websocket.onmessage = (e) => {
    sendMessange(e.data)
}

btn.addEventListener('click', () => {
    let textMess = inp.value
    if (textMess.trim() !== "") {
        sendMessange(textMess)
        if (textMess == "navigation") {
            textMess = Geo()
        }
        websocket.send(textMess)
    }
})

