const btnArray = ['san diego', 'los angeles', 'san francisco', 'oakland'];

function showBtns() {
    $('.buttons').empty();
    for (var i = 0; i < btnArray.length; i++) {
        var btn = $('<button>').text(btnArray[i]).addClass('button');
        $('.buttons').append(btn);
    }
}

function getGifs() {
    var search = $(this).text();
    mkAjaxCall(search);
    // after ajax we format the response to print to the page
    // print to page
}

function mkAjaxCall(search) {
    $.ajax({
        url: 'https://api.giphy.com/v1/gifs/search?api_key=9A5HnpdsMgov1rKRqjbAXsSLnSUO62Qg&q=' + search + '&limit=10&offset=0&rating=PG-13&lang=en',
        method: 'GET'
    }).then(function (response) {
        formatResponse(response.data)
    });

}

function formatResponse(data) {
    $('#results').empty();
    for (var i = 0; i < data.length; i++) {
        var gifDiv = $('<div>').addClass('pic');
        var pDiv = $('<p>').text('Rating:' + data[i].rating);
        var imgDiv = $('<img>').addClass('gif').attr('src', data[i].images.original_still.url);
        gifDiv.append(pDiv);
        gifDiv.append(imgDiv);
        $('#results').append(gifDiv);
    }
    console.log(data);
}


function playPause() {
    var src = ($(this).attr('src'));
    if (src.includes('_s.gif')) {
        let newSrc = src.replace('_s.gif', '.gif')
        $(this).attr('src', newSrc);
    } else {
        let newSrc = src.replace('gif', '_s.gif')
        $(this).attr('src', newSrc);
    }
}


function addBtn(thingToSearch) {
    btnArray.push(thingToSearch)
    showBtns(btnArray);

}

function submitForm(event) {
    event.preventDefault();
    var searchTerm = $('#searchVal').val().trim();
    addBtn(searchTerm);
    $('#searchVal').val('');
}

$('.buttons').on('click', '.button', getGifs)
$('#results').on('click', '.gif', playPause)
$('#submit').on('click', submitForm);

showBtns();