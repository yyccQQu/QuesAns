
import worldaddress from './world.json'

let jsonList =[]

~function makeJson() {
    // console.log(worldaddress, 'worldaddress')
    // console.log(Object.keys(worldaddress.Earth.Country))
    var c = {}
    Object.keys(worldaddress.Earth.Country).map(v => {
        let country = worldaddress.Earth.Country[v * 1];
        // console.log(country.CountryName)
        c[country.CountryName] = {}
        // console.log(country.Station, 'country')
        // c[country.CountryName][]
        if (country.Station) {
            country.Station.map((v2, i) => {
                // console.log(v2, '-------')
                c[country.CountryName][v2.StationName] = []
                if (v2.City) {
                    if (v2.City.constructor === Array) {
                        v2.City.map(v3 => {
                            // console.log(v3.CityName,'CityName')
                            c[country.CountryName][v2.StationName].push(v3.CityName)
                        })
                    }
                    if (v2.City.constructor === Object) {
                        // console.log(v2.City.CityName)
                        c[country.CountryName][v2.StationName].push(v2.City.CityName)
                    }
                }
            })
        }
        jsonList = c;
    })
}()

export default jsonList;
