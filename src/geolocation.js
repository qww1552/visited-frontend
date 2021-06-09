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
            reject("GPS를 지원하지 않습니다");
        }
    });
}

export { getLocation };
