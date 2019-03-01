let visible = false;
let id_segmento = 0;
let url = '/api/emisora/';

$(".info-segmento").hide();
$(".table-container").hide();
$(".table_lbl").hide();

$("#emisoraSelect").change(function () {
    var id_emisora = $("#emisoraSelect option:selected").val();
    var segmento_select = $('#segmentoSelect');

    segmento_select.find('option').remove();
    segmento_select.append('<option selected="true" disabled>Elija un segmento</option>');
    segmento_select.prop('selectedIndex', 0);

    $.getJSON(url + id_emisora + '/segmentos', function(data){
        $.each(data, function(key, entry){
            segmento_select.append($('<option></option>').attr('value', entry.id).text(entry.nombre));
        })
    })
});

$("#segmentoSelect").change(function () {
    $(".info-segmento").show();
    $(".table-container").show()
    $(".table_lbl").show();
    var id_segmento = $("#segmentoSelect option:selected").val();
    getSegmentos(id_segmento);
});

function getSegmentos(segmento) {
    $('#data_table').DataTable({
        "destroy": true,
        "ajax": {
            "method": "GET",
            "url": "/api/segmento/"+ segmento +"/locutores",
            "dataSrc": "",
            "error": function(xhr, status, error) {
                console.log("readyState: " + xhr.readyState);
                console.log("responseText: "+ xhr.responseText);
                console.log("status: " + xhr.status);
                console.log("text status: " + status);
                console.log("error: " + error);
            },
        },
        "columns": [
            { data: "id"},
            { data: "imagen"},
            { data: function(data){
                return data.first_name + " " + data.last_name;
            }},
            { data: "emisora"},
            { data: "id"}
        ],
        columnDefs: [
            { width: 10, targets: 0},
            { width: 200, targets: 1, render: function(data) {
                return '<img src="' + data + '" width="100%" >';
            }},
            { width: 250, targets: 2},
            { width: 250, targets: 3},
            { width: 150, className: "text-center", targets: 4, render: function(data){
                return `<a href="/locutores/` + data + `" class="btn btn-primary btn-sm" role="button"><i class="fas fa-eye"></i></a>
                        <a href="/locutores/` + data + `/editar" class="btn btn-success btn-sm" role="button"><i class="fas fa-pen"></i></a>
                        <a href="#" class="btn btn-danger btn-sm" role="button"><i class="fas fa-times"></i></a>
                        `
            }},
        ],
    });
}