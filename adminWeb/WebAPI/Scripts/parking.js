
    //alert("Got my file");

    //var latlng = "55.397563, 10.39870099999996";
    //var url = "https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyBkNjfkUBG_cC9c84jwEio-Fe5Omsk0pns";
    //$.getJSON(url, function (results) {
    //    var latitude = results[0].geometry.location.latitude;
    //    var longitude = results[0].geometry.location.longitude;
    //    alert(latitude);
    //});
//$(document).ready(function () {
//    map = new google.maps.Map(document.getElementById('map'), {
//        center: { lat: 30.4006469, lng: -96.07804039999996 },
//        zoom: 20
//    });
//});
//$(document).ready(function () {
//    alert("Calling");
//    var url = "https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyBkNjfkUBG_cC9c84jwEio-Fe5Omsk0pns";
//    $.getJSON(url, function (data) {
        
//        var latitude = data.results[0].geometry.location.lat;
//        var longitude = data.results[0].geometry.location.lng;
//        alert(latitude);
//    });
//});


$(document).ready(function () { 
    $("#btnGetLatLong").click(function () {
        var address = $("#Address").val()+", " + $("#City").val() + ", "+$("#ZipCode").val();
        var url = "https://maps.googleapis.com/maps/api/geocode/json?address="+address+"&key=AIzaSyBkNjfkUBG_cC9c84jwEio-Fe5Omsk0pns";
        $.getJSON(url, function (data) {
            var lat = data.results[0].geometry.location.lat;
            var lng = data.results[0].geometry.location.lng;
            $("#Lat").val(lat);
            $("#Lon").val(lng);
            showMap(lat, lng);

        });
    });

    if ($("#Lat").val() && $("#Lon").val()) { // edit page
        showMap(Number.parseFloat($("#Lat").val()), Number.parseFloat($("#Lon").val()));
        //setTimeout(showMap, 5000, Number.parseFloat($("#Lat").val()), Number.parseFloat($("#Lon").val()));
    }
    if ($("#latLabel").length>0 && $("#lonLabel").length>0) { // details page
        showMap(Number.parseFloat($("#latLabel").text()), Number.parseFloat($("#lonLabel").text()));
    }
});

function showMap(lat, lng) {
   
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: lat, lng: lng },
        zoom: 15
    });
}

