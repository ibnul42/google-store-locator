let map;
let infoWindow;

function initMap() {
    // The location of Uluru
    const uluru = { lat: 23.775, lng: 90.359 };
    // The map, centered at Uluru
    map = new google.maps.Map(document.getElementById("map"), {
      zoom: 8,
      mapId: '4cca5105ed5f63ee',
      center: uluru,
    });
    // createMarker();
    infoWindow = new google.maps.InfoWindow();
    getStores();
    
  }

const getStores = () => {
  const url = "http://localhost:3000/api/stores";

  fetch(url)
   .then((res) => {
    if(res.status == 200){
      return res.json();
    } else {
      throw new Error(res.status);
    }
  }).then((data) => {
    searchLocationsNear(data);
    setStoreList(data);
  })
}

const searchLocationsNear = (stores) => {
  let bounds = new google.maps.LatLngBounds();
  stores.forEach((store, index) => {
    let latlng = new google.maps.LatLng(
      store.location.coordinates[1],
      store.location.coordinates[0]
    );
    let name = store.storeName;
    let address = store.addressLines[0];
    let openTextStatus = store.openStatusText;
    let phone = store.phoneNumber;
    bounds.extend(latlng);
    createMarker(latlng, name, address, index, openTextStatus, phone);
  });
  map.fitBounds(bounds);
}

const createMarker = (latlng, name, address, storeNumber, openTextStatus, phone) =>{
  let html = `
    <div class="store-info-window">
      <div class="store-info-name">
        ${name}
      </div>
      <div class="store-info-open-status">
        ${openTextStatus}
      </div>
      <div class="store-info-address">
        <div class="icon">
          <i class="fas fa-location-arrow"></i>
        </div>
        <span>
          ${address}
        </span>
      </div>
      <div class="store-info-phone">
        <div class="icon">
          <i class="fas fa-phone-alt"></i>
        </div>
        <span>
        <a href="tel:${phone}">${phone}</a>
        </span>
      </div>
    </div>

  `;
  const marker = new google.maps.Marker({
    position: latlng,
    map: map,
    label: `${storeNumber+1}`,
  });
  google.maps.event.addListener(marker, 'click', function() {
    infoWindow.setContent(html);
    infoWindow.open(map, marker);
  })
}

const setStoreList = (stores) => {
  let content = "";
  stores.forEach((store, index) => {
    console.log(store, index);
    content += `
      <div class="store-container">
        <div class="store-container-background">
            <div class="store-info-container">
                <div class="store-address">
                    <span>${store.addressLines[0]}</span>
                    <span>${store.addressLines[1]}</span>
                </div>
                <div class="store-phone-number">${store.phoneNumber}</div>
            </div>
            <div class="store-number-container">
                <div class="store-number">${index+1}</div>
            </div>
        </div>
    </div>
    `;
  })
  document.querySelector('.store-list').innerHTML = content;
}