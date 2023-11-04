const LATITUDE_MAX_VALUE = 90;
const LONGITUDE_MAX_VALUE = 180;

function isNumber(n) {
    return !isNaN(parseFloat(n)) && !isNaN(n - 0)
}

export function areCoordinatesInvalid(latitude, longitude) {
    return !isNumber(latitude) || !isNumber(longitude)
        || Math.abs(parseFloat(latitude)) > LATITUDE_MAX_VALUE
        || Math.abs(parseFloat(longitude)) > LONGITUDE_MAX_VALUE;
}