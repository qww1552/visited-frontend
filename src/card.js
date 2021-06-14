const baseUrl = "http://localhost:8080";

async function getCard(cardId) {
    const response = await fetch(baseUrl + `/cards/${cardId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        },
    });
    const card = await response.json();
    return card;
}

async function getCards(position) {
    const params = `/?latitude=${position.latitude}&longitude=${position.longitude}`;
    const response = await fetch(baseUrl + "/cards" + params, {
        method: "GET",
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        },
    });
    const cards = await response.json();
    return cards;
}

async function addCard(card) {
    const response = await fetch(baseUrl + `/cards`, {
        method: "POST",
        body: JSON.stringify(card),
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        },
    });
    const addedCard = await response.json();
    return addedCard;
}

async function deleteCard(cardId, password) {
    const response = await fetch(baseUrl + `/cards/${cardId}`, {
        method: "DELETE",
        body: password,
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        },
    });
    return response.json();
}

async function updateCard(card) {
    const response = await fetch(baseUrl + `/cards/${card.id}`, {
        method: "PUT",
        body: JSON.stringify(card),
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        },
    });
    const updatedCard = await response.json();
    return updatedCard;
}

export { getCards, getCard, addCard, updateCard, deleteCard };
