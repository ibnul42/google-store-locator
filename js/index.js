// let map;

// function initMap() {
//   map = new google.maps.Map(document.getElementById("map"), {
//     center: { lat: 23.775, lng: 90.359 },
//     zoom: 9,
//     mapId: '4cca5105ed5f63ee',
//   });
// }

function initMap() {
    // The location of Uluru
    const uluru = { lat: 23.775, lng: 90.359 };
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 8,
      mapId: '4cca5105ed5f63ee',
      center: uluru,
    });
    // The marker, positioned at Uluru
    const marker = new google.maps.Marker({
      position: uluru,
      map: map,
    });
  }