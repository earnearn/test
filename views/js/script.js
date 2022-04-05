
const count = document.querySelector('.count');
const restroom = document.querySelector('.restroom');
const toilet = document.querySelector('.toilet');


var request = new XMLHttpRequest();
request.open('GET', '127.0.0.1:4000/api', true);
request.onload = function () {

    // Begin accessing JSON data here
    var datas = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
        datas.forEach(data => {
            console.log(data);
            //   const card = document.createElement('div');
            //   card.setAttribute('class', 'card');

            //   const h1 = document.createElement('h1');
            //   h1.textContent = movie.title;

            //   const p = document.createElement('p');
            //   movie.description = movie.description.substring(0, 300);
            //   p.textContent = `${movie.description}...`;

            //   container.appendChild(card);
            //   card.appendChild(h1);
            //   card.appendChild(p);
        });
    } else {
        //   ...
    }
}

request.send();