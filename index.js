

const map = L.map('map').setView([40.41338, -3.691254], 5);

const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

    
// Realiza una solicitud GET a la URL del JSON
fetch('https://www.ign.es/ign/RssTools/sismologia.xml')
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al recuperar el JSON');
        }
        return response.json();
    })
    .then(data => {
        // Maneja los datos del JSON aquí
        console.log('Datos recuperados:',data);
        
        for (let index = 0; index < data.length; index++) {
            let popup = L.popup()
    .setContent(`<b>${data[index].date} - ${data[index].time}</b><br/>${data[index].location}. (${data[index].magnitude})`)
            let marker = L.marker([data[index].lat, data[index].long]).addTo(map)
                .bindPopup(popup).openPopup();
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
