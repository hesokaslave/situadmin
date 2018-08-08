
export function callPostApi(urlStr, params) {
    return fetch(urlStr, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params)
        })
        .then((responseData) => {
            return responseData.json()
        })
        .catch((error) => {
            console.error(error);
        });
}

export function callGetApi(urlStr) {
    return fetch(urlStr)
        .then((responseData) => {
            return responseData .json()
        })
        .catch((error) => {
            console.error(error);
        });
}

export  function callGetApiWithTimout(url, options, timeout = 5000) {
    return Promise.race([
        fetch(url).then((responseData) => {
            return responseData .json()
        }),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error('timeout')), timeout)
        )
    ]);
}

export  function callPostApiWithTimout(url, options, timeout = 3000) {
    return Promise.race([
        fetch(url, options),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error('timeout')), timeout)
        )
    ]);
}


/*
callapi() {
    callPostApi('http://demo.com', {
            email: 'at@gmail.com',
            password: '123456',
        })
        .then((response) => {
            // Continue your code here...
        });
}
*/
