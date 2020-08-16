const toQueryString = (query) => {
    return Object.keys(query).map(key => key + '=' + query[key]).join('&');
}

module.exports = {
    toQueryString
}