// Image slider
let scrollAmount = 0;
const scrollStep = 220;

// load background at start
$(document).ready(function () {
    // Load backgrounds
    loadBackgrounds();
});

/** Add background */
$('body').on('click', '.add-background', function () {
    $('.add-background-container').removeClass('d-none'); 
});

// Close add background
$('body').on('click', '.add-background-close', function () {
    $('.add-background-container').addClass('d-none');
});

// submit background
$('#upload-background-form').on('submit', function (e) {
    e.preventDefault();
    var formData = new FormData(this);
    $.ajax({
        url: '/backgrounds/',
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success: function (response) {
            // Notify
            notify();
            // reload backgrounds
            loadBackgrounds();
            // Hide form
            $('.add-background-container').addClass('d-none');
            // reset form
            $('#upload-background-form')[0].reset();
        }
    })
});

/** Edit background */
$('body').on('click', '.edit-background', function () {
    var backgroundId = $(this).data('background-id');
    $.ajax({
        url: '/backgrounds/api/' + backgroundId,
        type: 'GET',
        success: function (response) {
            // Show form
            $('.edit-background-container').removeClass('d-none');
            // hide form
            $('.add-background-container').addClass('d-none');

            // fill form
            var backgroundForm = $('#edit-background-form');
            backgroundForm.find('#background_id').val(response.id);
            backgroundForm.find('#background_title').val(response.title);
            backgroundForm.find('#photo_preview').attr('src', response.photo);
            backgroundForm.find('#photo_hover_preview').attr('src', response.photo_hover);
            backgroundForm.find('#photo_kr_preview').attr('src', response.photo_kr);
            backgroundForm.find('#photo_kr_hover_preview').attr('src', response.photo_kr_hover);
            backgroundForm.find('#photo_vn_preview').attr('src', response.photo_vn);
            backgroundForm.find('#photo_vn_hover_preview').attr('src', response.photo_vn_hover);
            backgroundForm.find('#price').val(response.price);            
        }
    })
});

// Close Edit background
$('body').on('click', '.cancel-edit-background', function () {
    $('.edit-background-container').addClass('d-none');    
});

// Update background
$('#edit-background-form').on('submit', function (e) {
    e.preventDefault();
    var backgroundId = $('#background_id').val();
    var formData = new FormData(this);
    $.ajax({
        url: '/backgrounds/api/' + backgroundId,
        type: 'PUT',
        headers: {'X-CSRFToken': $('input[name="csrfmiddlewaretoken"]').val()},
        data: formData,
        contentType: false,
        processData: false,
        success: function (response) {
            // Notify
            notify();
            // reload backgrounds
            loadBackgrounds();
            // Hide form
            $('.edit-background-container').addClass('d-none');
            // reset form
            $('#edit-background-form')[0].reset();
        }
    })
});

/** Delete background */
$('body').on('click', '.delete-background', function () {
    if (confirm('Are you sure you want to delete this background?') == true) {
        var backgroundId = $(this).data('background-id');
        $.ajax({
            url: '/backgrounds/api/' + backgroundId,
            type: 'DELETE',
            headers: {'X-CSRFToken': $('input[name="csrfmiddlewaretoken"]').val()},
            success: function (response) {
                // reload backgrounds
                loadBackgrounds();
            }
        })
    }
});

/******************** Layout ******************************************************/

$('body').on('click', '.image-container', function () {
    var backgroundId = $(this).data('background-id');
    var backgroundTitle = $(this).data('background-title');
    loadLayouts(backgroundId, backgroundTitle);
});

// Add layout
$('body').on('click', '.add-layout', function () {
    $('.add-layout-container').removeClass('d-none');
});

/******************** Layout ******************************************************/

// Load backgrounds
function loadBackgrounds() {
    $('.api-loading').removeClass('d-none');
    $('.add-background-container').addClass('d-none');
    $('.image-list-background').empty();
    $.ajax({
        url: '/backgrounds/api',
        type: 'GET',
        success: function (response) {
            $('.api-loading').addClass('d-none');
            // reload backgrounds
            const backgrounds = response;
            backgrounds.forEach(background => {
                $('.image-list-background').append(
                    '<div class="image-container" data-background-id="' + background.id + '" data-background-title="' + background.title + '">' +
                    '<img src="' + background.photo + '" data-src="' + background.photo + '" data-hover="' + background.photo_hover + '" alt="background" class="image-background">' +
                    '<div class="image-title">' + background.title + '</div>' +
                    '<div class="action-buttons">' +
                    '<button class="edit-button">' +
                    '<a class="edit-background text-decoration-none text-white" data-background-id="' + background.id + '">' +
                    '<span class="mdi mdi-pencil"></span> Edit</a>' +
                    '</button>' +
                    '<button class="delete-button">' +
                    '<a class="delete-background text-decoration-none text-white" data-background-id="' + background.id + '">' +
                    '<span class="mdi mdi-trash-can"></span> Delete</a>' +
                    '</button>' +
                    '</div>' +
                    '</div>'
                )
            })
        }
    })
}

function loadLayouts(backgroundId, backgroundTitle) {
    // show layout container
    var layoutContainer = $('.list-layouts-container');
    layoutContainer.removeClass('d-none');
    layoutContainer.find('.card-title').html(backgroundTitle);

    $('.image-list-layouts').empty();

    // load layouts
    $.ajax({
        url: '/layouts/api/group-by-background/' + backgroundId,
        type: 'GET',
        success: function (response) {
            const layouts = response;
            layouts.forEach(layout => {
                $('.image-list-layouts').append(
                    '<div class="image-container">' +
                    '<img src="' + layout.photo + '" data-src="' + layout.photo + '" data-hover="' + layout.photo_hover + '" alt="layout" class="image-layout">' +
                    '<div class="layout-title">' + layout.title + '</div>' +
                    '<div class="action-buttons">' +
                    '<button class="edit-button">' +
                    '<a class="edit-layout text-decoration-none text-white" data-layout-id="' + layout.id + '">' +
                    '<span class="mdi mdi-pencil"></span> Edit</a>' +
                    '</button>' +
                    '<button class="delete-button">' +
                    '<a class="delete-layout text-decoration-none text-white" data-layout-id="' + layout.id + '">' +
                    '<span class="mdi mdi-trash-can"></span> Delete</a>' +
                    '</button>' +
                    '</div>' +
                    '</div>'
                )
            })
        }
    });
}

function previewPhoto(event, preview) {
    var input = event.target;
    var reader = new FileReader();
    reader.onload = function() {
        var img = document.getElementById(preview);
        img.src = reader.result;
        img.style.display = 'block';
    }
    reader.readAsDataURL(input.files[0]);
}

function notify() {
    // Notify
    // const toastLiveExample = document.getElementById('liveToast');
    // const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
    // toastBootstrap.show();
}

$(".image-background").mouseover(function () {
    $(this).attr('src', $(this).data("hover"));
}).mouseout(function () {
    $(this).attr('src', $(this).data("src"));
});

$('body').on('click', '.nav-button.left', function () {
    const imageList = $(this).closest('.image-list-container').find('.image-list');
    scrollAmount = Math.max(0, scrollAmount - scrollStep);
    imageList.css('transform', 'translateX(-' + scrollAmount + 'px)');
});

$('body').on('click', '.nav-button.right', function () {
    const imageList = $(this).closest('.image-list-container').find('.image-list');
    const maxScroll = imageList[0].scrollWidth - imageList.width();
    scrollAmount = Math.min(maxScroll, scrollAmount + scrollStep);
    imageList.css('transform', 'translateX(-' + scrollAmount + 'px)');
});
