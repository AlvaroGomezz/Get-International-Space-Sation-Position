let map, redIcon, marker, latitude, longitude;

const getSpaceStationCoordenates = () => {
    fetch('https://api.wheretheiss.at/v1/satellites/25544')
    .then((res) => res.json())
    .then((data) => {
        let {latitude, longitude} = data
        map = L.map('map').setView([latitude, longitude], 5);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 8,
          attribution: '© OpenStreetMap'
        }).addTo(map);
        redIcon = L.icon({
          iconUrl: 'assets/punto-rojo.png',
          shadowUrl: 'assets/punto-rojo-sombra.png',
          iconSize:     [24, 24],
          shadowSize:   [84, 84],
          iconAnchor:   [0, 0], 
          shadowAnchor: [30, 30],
          popupAnchor:  [-3, -76] 
        });
        marker = L.marker([latitude, longitude], {icon: redIcon}).addTo(map);
      })
      setInterval(() => {
        fetch('https://api.wheretheiss.at/v1/satellites/25544')
          .then((res) => res.json())
          .then((data) => {
          let {latitude, longitude} = data
          map.panTo([latitude, longitude], animate=true);
          marker.setLatLng([latitude, longitude])
        })
      }, 3000);
}
getSpaceStationCoordenates()