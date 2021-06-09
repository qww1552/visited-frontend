const baseUrl = "http://localhost:8080";

async function getCard(cardId) {
    const response = await fetch(baseUrl + `/cards/${cardId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const card = await response.json();
    return card;
}

async function getCards() {
    const response = await fetch(baseUrl + "/cards", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const cards = await response.json();
    return cards;
}
//// add, delete, update 테스트 필요
async function addCard(card) {
    const response = await fetch(baseUrl + `/cards`, {
        method: "POST",
        body: JSON.stringify(card),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const addedCard = await response.json();
    return addedCard;
}

async function deleteCard(cardId) {
    const response = await fetch(baseUrl + `/cards/${cardId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response;
}

async function updateCard(card) {
    const response = await fetch(baseUrl + `/cards/${card.id}`, {
        method: "PUT",
        body: JSON.stringify(card),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const updatedCard = await response.json();
    return updatedCard;
}

export { getCards, getCard, addCard, updateCard, deleteCard };
