async (event) => {
    event.preventDefault(); // prevent refresh when submit is occured
    const currentPosition = await Geo.getLocation();

    const formData = new FormData(event.target);
    const card = {
        id: formData.get("id"),
        author: formData.get("author"),
        password: formData.get("password"),
        message: formData.get("message"),
        latitude: currentPosition.coords.latitude,
        longitude: currentPosition.coords.longitude,
    };
    const response = await Card.updateCard(card);
    console.log(response);

    drawPage();
    KakaoMap.setCenter(currentPosition.coords);
};
