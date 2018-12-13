'use strict'

const Schema = use('Schema')

class LocationSchema extends Schema {
    up() {
        this.create('locations', (table) => {
            table.increments()
            table.string('lat');
            table.string('long');
            table.timestamps()
        })
    }

    down() {
        this.drop('locations')
    }
}

module.exports = LocationSchema