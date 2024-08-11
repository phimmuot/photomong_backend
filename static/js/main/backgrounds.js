let table = new DataTable('#backgrounds-table')

$('.delete-background').on('click', function (e) {
    e.preventDefault()
    if (confirm('Are you sure you want to delete this background?') == true) {
        var url = $(this).attr('href')
        window.location.href = url
    }
})