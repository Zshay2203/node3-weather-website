const request = require('postman-request');

const wethStckParms = {
    secretKey: '64e3fb4058791942ddb1d1386a160d9e',
    baseUrl: 'http://api.weatherstack.com',
    getUrlWithKey() {
        return (this.baseUrl + '/current?access_key=' + this.secretKey);
    },
    getWetherReqUrl(longitude, latitude) {
        return (this.getUrlWithKey() + '&query=' + encodeURIComponent(longitude) + ',' + encodeURIComponent(latitude)
            /* + '&units=f'*/
        );
    }
};

const forecast_org = (longitude, latitude, callback) => {
    const url = wethStckParms.getWetherReqUrl(longitude, latitude);

    request({
        url: url,
        json: true
    }, (error, response) => {
        if (error) {
            callback('enable to  connect to Mapping service: ' + JSON.stringify(error), undefined)
        } else if (body.error) {
            callback('Error -  type:' + body.error.type + ' info: ' + body.error.info, undefined);
        } else {
            if (body.error) {
                callback('Error -  type:' + body.error.type + ' info: ' + body.error.info, undefined)
            } else {
                const current = body.current;
                console.log('the current temperature is: ' + current.temperature + ' feels like: ' + current.feelslike);
                callback(undefined, {
                    temperature: current.temperature,
                    feelslike: current.feelslike,
                    location: body.location.name
                });
            }
        }
    });
}

const forecast = (longitude, latitude, callback) => {
    const url = wethStckParms.getWetherReqUrl(longitude, latitude);

    request({
        url,
        json: true
            // }, (error, response) => {
    }, (error, {
        body
    }) => {
        if (error) {
            callback('enable to  connect to Mapping service: ' + JSON.stringify(error), undefined)
        } else if (body.error) {
            callback('Error -  type:' + body.error.type + ' info: ' + body.error.info, undefined);
        } else {
            if (body.error) {
                callback('Error -  type:' + body.error.type + ' info: ' + body.error.info, undefined)
            } else {
                const current = body.current;
                const location = body.location;
                console.log('the current temperature is: ' + current.temperature + ' feels like: ' + current.feelslike);
                const temperature = current.temperature;
                const feelslike = current.feelslike;

                callback(undefined, {
                    temperature,
                    feelslike,
                    location: location.name + ', region: ' + location.region + ', ' + location.country
                });
            }
        }
    });
}


module.exports = forecast;