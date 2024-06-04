let coursesShopingBasket = []

const container = document.getElementById('elementsList');
const shoppingBasketList = document.querySelector('#shoppingBasketList tbody');
const clearShoppingBasket = document.getElementById('clearShoppingBasket');
const courseList = document.getElementById('courseList')

function renderCartList(item) {
    const itemInfo = document.createElement('tr');
    itemInfo.setAttribute('data-id', item.id);
    itemInfo.setAttribute('id', 'trElement');
    itemInfo.innerHTML = `
        <td><img src="${item.imageItem}" alt="${item.nameItem}" /></td>
        <td>${item.nameItem}</td>
        <td class="quantity">${item.quantity}</td>
        <td>${item.priceItem}</td>
        <td><button class="removeItem">Remove</button></td>
    `;
    shoppingBasketList.appendChild(itemInfo);
}

function updateQuantity(id, quantity) {
    const row = document.querySelector(`tr[data-id="${id}"]`);
    if (row) {
        const tdItem = row.getElementsByClassName('quantity')[0];
        tdItem.textContent = quantity;
    }
}

function savedItem(cardSelectedItem) {
    const existItem = coursesShopingBasket.find(item => item.id === cardSelectedItem.id);
    if (existItem) {
        existItem.quantity += 1;
        updateQuantity(existItem.id, existItem.quantity);
    } else {
        const newItem = { ...cardSelectedItem, quantity: 1 };
        coursesShopingBasket.push(newItem);
        renderCartList(newItem);
    }
}

function readData(cardSelect) {
    const cardSelectedItem = {
        id: cardSelect.querySelector('a').getAttribute('data-id'),
        imageItem: cardSelect.querySelector('img').getAttribute('src'),
        nameItem: cardSelect.querySelector('h4').textContent,
        quantity: 1,
        priceItem: cardSelect.querySelector('span').textContent,
    }
    savedItem(cardSelectedItem);
}

function deleteTr(id) {
    const row = document.querySelector(`tr[data-id="${id}"]`);
    if (row) {
        row.remove();
    }
    coursesShopingBasket = coursesShopingBasket.filter(item => item.id !== id);
}

function deleteInfo(id) {
    const existItem = coursesShopingBasket.find(item => item.id === id);
    if (existItem) {
        if (existItem.quantity > 1) {
            existItem.quantity -= 1;
            updateQuantity(existItem.id, existItem.quantity);
        } else {
            deleteTr(existItem.id);
        }
    }
}

container.addEventListener('click', (e) => {
    if (e.target.classList.contains('addShoppingBasket')) {
        const cardSelect = e.target.parentElement.parentElement;
        readData(cardSelect);
    }
})

shoppingBasketList.addEventListener('click', (e) => {
    if (e.target.classList.contains('removeItem')) {
        const cardSelect = e.target.parentElement.parentElement;
        deleteInfo(cardSelect.getAttribute('data-id'));
    }
});


clearShoppingBasket.addEventListener('click', (e) => {
    coursesShopingBasket = [];
    while (shoppingBasketList.firstChild) {
        shoppingBasketList.removeChild(shoppingBasketList.firstChild);
    }
});