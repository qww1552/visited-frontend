function getLocation() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            // GPS를 지원하면
            navigator.geolocation.getCurrentPosition(
                (response) => {
                    resolve(response);
                },
                (error) => {
                    reject(error);
                },
                {
                    enableHighAccuracy: true,
                    maximumAge: 30000,
                    timeout: 27000,
                }
            );
        } else {
            alert("GPS를 지원하지 않습니다");
        }
    });
}

function geoLocationSuccess(position) {
    const data = new FormData(document.querySelector("form"));
    const value = Object.fromEntries(data.entries());
    let card = {
        author: value["author"],
        password: value["password"],
        message: value["message"],
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
    };
    Card.addCard(card);
}

export { getLocation };
