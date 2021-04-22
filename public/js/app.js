// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//     })
// });

const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const messageThree = document.querySelector('#message-3');


const getForecast = (address) => {
    // const weatherUrl = 'http://localhost:3000/weather?address=' + encodeURIComponent(address);
    const weatherUrl = '/weather?address=' + encodeURIComponent(address);

    messageOne.textContent = 'Loading ....';
    messageTwo.textContent = messageThree.textContent = '';

    fetch(weatherUrl).then((responst) => {
        responst.json().then((data) => {
            if (data.error) {
                messageOne.textContent = '';
                messageTwo.textContent = data.error;
                messageThree.textContent = '';
            } else {
                messageOne.textContent = ' Temp: ' + data.temperature;
                messageTwo.textContent = 'feelslike: ' + data.feelslike;
                messageThree.textContent = 'Location: ' + data.location;
            }
        });
    });
};



weatherForm.addEventListener('submit', (e) => {
    /// Avoid submitting the form:
    e.preventDefault();
    const location = searchElement.value;
    getForecast(location);
});