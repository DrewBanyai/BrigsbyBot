let getOptionsInURL = () => {
    let queryString = window.location.search;
    if (!queryString || (queryString.length <= 1) || (queryString[0] !== "?")) { return {}; }
    queryString = queryString.substr(1, queryString.length - 1);

    const queryList = queryString.split("&");
    let queryLibrary = {};
    for (let i = 0; i < queryList.length; ++i) {
        let queryParts = queryList[i].split("=");
        if (!queryParts || queryParts.length !== 2) { return; }
        queryLibrary[queryParts[0]] = queryParts[1];
    }

    return queryLibrary;
}