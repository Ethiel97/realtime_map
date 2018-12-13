<template>
  <div id="map"></div>
</template>

<script>
export default {
  mounted() {
    // const myMap = L.map('map');
    let lat = 51.505,
      long = -0.03;
    const myMap = L.map("map").setView([lat, long], 13);

    myMap.add;

    var marker = L.marker([lat, long])
      .addTo(myMap)
      .bindPopup(
        `<h2> Initial Location </h2> lat:<b>${lat}</b>, long:<b>${long}</b>`
      );

    var circle = L.circle([lat, long], {
      color: "red",
      fillColor: "#f03",
      fillOpacity: 0.5,
      radius: 500
    }).addTo(myMap);

    this.loadLocations(myMap);

    //set up Leaflet
    /* L.tileLayer(
      "https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png",
      {
        maxZoom: 18,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>'
      }
    ).addTo(myMap);
 */
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 16,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap);
    //set up Pusher

    var pusher = new Pusher("aac7493e27ef97acdfc6", {
      cluster: "eu",
      forceTLS: false
    });

    //Subscribe to the channel we specified in our Adonis Application
    let channel = pusher.subscribe("location-channel");

    channel.bind("new-location", data => {
      console.log("location sent with Pusher", data.location);

      let { lat, long } = data.location; //ES6 DESTRUCTURING

      myMap.setView([lat, long], 13);

      var marker = L.marker([lat, long])
        .bindPopup(
          `<h2> Your Position </h2> lat:<b>${lat}</b>, long:<b>${long}</b>`
        )
        .addTo(myMap);

      var circle = L.circle([lat, long], {
        color: "red",
        fillColor: "#f03",
        fillOpacity: 0.5,
        radius: 500
      }).addTo(myMap);
    });

    this.sendLocation();
  },
  methods: {
    loadLocations(map) {
      axios
        .get("locations")
        .then(res => {
          // const myMap = L.map("map");

          console.log(res.data);

          res.data.forEach(location => {
            // alert("location");
            let { lat, long } = location; //ES6 DESTRUCTURING
            lat = parseFloat(lat);
            long = parseFloat(long);

            var marker = L.marker([lat, long])
              .addTo(map)
              .bindPopup(
                `<h2> Position </h2> lat:<b>${lat}</b>, long:<b>${long}</b>`
              );

            var circle = L.circle([lat, long], {
              color: "red",
              fillColor: "#f03",
              fillOpacity: 0.5,
              radius: 500
            }).addTo(map);
          });
        })
        .catch(err => {
          console.log(err);
        });
    },

    sendLocation() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
          axios
            .post("location", {
              lat: position.coords.latitude,
              long: position.coords.longitude
            })
            .then(res => {
              console.log(res.data.msg);
            })
            .catch(err => console.log(err));
        });
      } else {
        alert("Your browser doesn't support HTML5 geolocation API");
      }
    }
  }
};
</script>

<style scoped>
#map {
  width: 100%;
  height: 400px;
}
</style>
