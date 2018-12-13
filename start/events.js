//events.js

const Pusher = use('Pusher')
const Event = use('Event');
const Env = use('Env');

// set up Pusher
let pusher = new Pusher({
    appId: Env.get('PUSHER_APP_ID'),
    key: Env.get('PUSHER_APP_KEY'),
    secret: Env.get('PUSHER_APP_SECRET'),
    cluster: Env.get('PUSHER_APP_CLUSTER'),
    useTLS: false
});

//listening to events and send data with Pusher channels
Event.when('new::location', async(location) => {

    console.log('location from event :', location);
    pusher.trigger('location-channel', 'new-location', {
        location
    })

});