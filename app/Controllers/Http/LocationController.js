'use strict'

const Env = use('Env');
const Event = use('Event');
const Location = use('App/Models/Location');
class LocationController {


    async loadLocations({
        request,
        response
    }) {

        let locations = await Location.all();

        return response.json(locations);

    }

    async postLocation({
        request,
        response
    }) {

        let location = await Location.create(request.all());


        Event.fire('new::location', location);

        return response.json({
            msg: 'location set'
        });

    }
}

module.exports = LocationController