const PostOffice = {
    makeRequest: async (options, recvJSON = true, sendJSON = true, forceResponse = false) => {
        //  Create the headers which will be applied to the fetch call
        let headers = { };
        if (sendJSON) {
            Object.assign(headers, {
                'Accept': 'application/json',
                'Content-Type': options.contentType ? options.contentType : 'application/json',
            })
        };
    
        //  Create the full fetch options
        const fetchOptions = {
            method: options.method ? options.method : "POST",
            headers: headers,
            body: options.body ? options.body : null,
        };
    
        //  Make the fetch call and save off the response
        let response = await fetch(options.endpoint, fetchOptions);
        if (response.ok || forceResponse) { return (recvJSON ? (await response.json()) : (await response)); }
        return null;
    },

    MakeFormBody: (jsonObject) => {
        let formEntries = [];
        let objKeys = Object.keys(jsonObject);
        objKeys.forEach(key => formEntries.push(key + "=" + jsonObject[key]));
        let formBody = formEntries.join("&");
        return formBody;
    },

    CheckBalance: async (username) => {
        try {
            let result = await PostOffice.makeRequest({
                endpoint: SETTINGS.MICROSERVICE_URL + "CheckBalance",
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                body: PostOffice.MakeFormBody({ username: username }),
            });
            if (result && result.success) { return result.balance; }
            if (result) { console.warn("CheckBalance:", result.message); }
            return null;
        }
        catch (error) { console.warn("Failed to contact the server. Please try again later or contact the administrator."); return null; }
    },

    BuyItem: async (username, itemPrice) => {
        try {
            let result = await PostOffice.makeRequest({
                endpoint: SETTINGS.MICROSERVICE_URL + "BuyItem",
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                body: PostOffice.MakeFormBody({ username: username, itemPrice: itemPrice }),
            });
            if (result && result.success) { return result; }
            if (result) { console.warn("BuyItem:", result.message); }
            return null;
        }
        catch (error) { console.warn("Failed to contact the server. Please try again later or contact the administrator."); return null; }
    },

    GivePoints: async (username, points) => {
        try {
            let result = await PostOffice.makeRequest({
                endpoint: SETTINGS.MICROSERVICE_URL + "GivePoints",
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                body: PostOffice.MakeFormBody({ username: username, points: points }),
            });
            if (result && result.success) { return result.balance; }
            if (result) { console.warn("GivePoints:", result.message); }
            return null;
        }
        catch (error) { console.warn("Failed to contact the server. Please try again later or contact the administrator."); return null; }
    },

    TriggerKeys: async (keyList) => {
        try {
            let result = await PostOffice.makeRequest({
                endpoint: SETTINGS.MICROSERVICE_URL + "TriggerKeys",
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                body: PostOffice.MakeFormBody({ keyList: keyList }),
            });
            if (result && result.success) { return result; }
            if (result) { console.warn("TriggerKeys:", result.message); }
            return null;
        }
        catch (error) { console.warn("Failed to contact the server. Please try again later or contact the administrator."); return null; }
    }
}