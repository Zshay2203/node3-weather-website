const request = require('postman-request');

const mapBoxParms = {
    accessToken: 'pk.eyJ1Ijoic2hheXp1IiwiYSI6ImNrbWM1NjkzYjEweGQybnFsdDEwMG15Y2MifQ.ubHafWwmQwuauU36iatT4g',
    url: 'https://api.mapbox.com/geocoding/v5/mapbox.places/',
    getGeocodingUrl(locationName) {
        return (this.url + encodeURIComponent(locationName) + '.json?access_token=' + this.accessToken + '&limit=1');
    }
};

const geocode = (address, callback) => {
    const url = mapBoxParms.getGeocodingUrl(address);

    request({
        url,
        json: true
            // }, (error, response) => {
    }, (error, {
        body
    }) => {
        if (error) {
            callback('enable to  connect to Mapping service: ' + JSON.stringify(error), undefined);
        } else if (body.error) {
            callback('Error -  type:' + body.error.type + ' info: ' + body.error.info, undefined);
        } else {
            if (body.features.length == -0) {
                callback('Error: Non existing location', undefined);
            } else {
                const features = body.features[0];
                // console.log(features);
                // const retStr = 'Long/Lat of ' + features.text + ': ' + features.center[1] + '/' + features.center[0];
                const latitude = features.center[0],
                    longitude = features.center[1],
                    location = features.text;

                callback(undefined, {
                    latitude,
                    longitude,
                    location
                })
            }
        }
    });
}

module.exports = geocode;