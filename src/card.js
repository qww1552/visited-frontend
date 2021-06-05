const baseUrl = "http://localhost:8080";

function getCard(cardId) {
    fetch(baseUrl + `/cards${cardId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => console.log(error));
}

function addCard(card) {
    fetch(baseUrl + `/cards`, {
        method: "POST",
        body: JSON.stringify(card),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => console.log(error));
}

function deleteCard(cardId) {
    fetch(baseUrl + `/cards/${cardId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => console.log(error));
}

export { addCard, deleteCard };
