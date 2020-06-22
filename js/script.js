axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers.post['Content-Type'] = 'application/json';

function getRecepies() {
    return axios.get('/recepies')
}

function addRecepies(data) {
    return axios.post('/recepies', { ... {}, ...data })
}

function deleteRecepie(id) {
    return axios.delete(`/recepies/${id}`);
}

function createRecepie(recepie) {
    let joinedTags = recepie.tags.join(' | ');


    let level = '';
    for (let i = 0; i <= recepie.level; i++) {
        level += `<img class="theCardLevel" src="pic/egg-solid.svg">`
    };

    let time = '';
    for (let i = 0; i <= recepie.time; i++) {
        time += `<img class="theCardLevel" src="pic/clock-regular.svg">`
    };

    const $recepie = $(
        `<div id="recepies" class="theCard" style="width: 18rem;">
            <img id="picture" src="${recepie.picture}" class="card-img-top">
                <div class="card-body">
                    <h5 id="title" class="card-title">${recepie.title}</h5>
                    <p id="description" class="card-text">${recepie.description}</p>
                    <p id="tags" class="card-text">${joinedTags}</p>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="theList-group-item">
                        <div>Level</div>
                        <div>${level}</div>
                    </li>
                    <li class="theList-group-item">
                        <div>Time</div>
                        <div>${time}</div>
                    </li>
                </ul>
        </div>`);

    $recepie.find('#title').on('click', (e) => {
        showDirection(recepie);
    });
    return $recepie;
}

function showDirection(recepie) {

    let joinedDirections = recepie.directions.join(' ');

    const $direction = $(`<div class="directions">
    <h2>${recepie.title}</h2>
    <div id="carouselExampleFade" class="carousel slide carousel-fade" data-ride="carousel">
    <div class="carousel-inner">
    <div class="carousel-item active">
        <img src="${recepie.dirPicFirst}" class="d-block w-100" class="d-block w-100">
    </div>
    <div class="carousel-item">
        <img src="${recepie.dirPicSecond}" class="d-block w-100">
    </div>
    <div class="carousel-item">
        <img src="${recepie.dirPicThird}" class="d-block w-100">
    </div>
    <div class="carousel-item">
        <img src="${recepie.dirPicFourth}" class="d-block w-100">
        </div>
    </div>
    <a class="carousel-control-prev" href="#carouselExampleFade" role="button"
        data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#carouselExampleFade" role="button"
        data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
    </a>
    </div>

    <!-- Ingredients -->
    <h5 class="modal-titles">Ingredients:</h5>
    <ul id="ingredients-list" class="list-group list-group-flush">
        <li class="list-group-item">${recepie.dirIngredientFirst}</li>
        <li class="list-group-item">${recepie.dirIngredientSecond}</li>
        <li class="list-group-item">${recepie.dirIngredienThird}</li>
        <li class="list-group-item">${recepie.dirIngredientFourth}</li>
        <li class="list-group-item">${recepie.dirIngredientFifth}</li>
        <li class="list-group-item">${recepie.dirIngredientSixth}</li>
        <li class="list-group-item">${recepie.dirIngredientSeventh}</li>
</ul>

<!-- Directions -->
<h5 class="modal-titles">Directions:</h5>
<p>${joinedDirections}</p>
<div class="buttonsPannel"><div>
<button class='btn btn-danger' id="delete">Delete article</button>
<button class='btn btn-primary' id="edit">Edit</button></div>
<button class='btn btn-primary' id="go-back">Go back</button>
</div>
</div>

</div>
    `);

    $('#recepiesGrid').hide();

    $direction.find('#go-back').on('click', (e) => {
        $('#recepiesGrid').show();
        $direction.detach();
    });

    $direction.find('#delete').on('click', (e) => {
        $('.recepieGrid').show();
        deleteRecepie(recepie.id);
        $direction.detach();
    });

    $direction.appendTo($('#contentContainer'));
}

function showRecepie(recepie) {
    const $recepie = createRecepie(recepie);
    $recepie.appendTo($('#recepiesList'));
}

$(document).ready(() => {
    getRecepies().then(resp => {
        if (resp.data) {
            resp.data.forEach(recepie => {
                showRecepie(recepie);
            })
        } else {
            alert('No data');
        }
    }).catch(error => {
        alert('Error');
        console.log(error);
    });
});