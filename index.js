document.addEventListener("DOMContentLoaded", () => {
    // 1. Заміна блоків 4 і 5
    const block4 = document.querySelector('.fourth');
    const block5 = document.querySelector('.fifth');
    block4.style.marginRight = "0";
    block5.style.margin = '0 15px 0 0';
    const parent = block4.parentNode;
    parent.insertBefore(block5, block4);

    // 2. Обчислення площі трикутника
    const base = 5;
    const height = 10;
    const area = 0.5 * base * height;

    const block3 = document.querySelector('.third');
    const result = document.createElement('p');
    result.style.color = 'red';
    result.textContent = `Площа трикутника: ${area}`;
    block3.appendChild(result);

    // 3. Обчислення кількості максимальних чисел
    const form = document.createElement('form');
    form.innerHTML = `
            <label for="numbers">Введіть 10 чисел, розділених комами:</label>
            <input type="text" id="numbers" name="numbers">
            <button type="button" id="calculate">Розрахувати</button>
        `;
    block3.appendChild(form);

    const calculateButton = document.getElementById('calculate');
    calculateButton.addEventListener('click', () => {
        const input = document.getElementById('numbers').value;
        const numbers = input.split(',').map(Number);
        const max = Math.max(...numbers);
        const maxCount = numbers.filter(num => num === max).length;

        document.cookie = `maxCount=${maxCount}; path=/`;
        alert(`Кількість максимальних чисел: ${maxCount}`);
    });

    const cookies = document.cookie.split('; ').find(row => row.startsWith('maxCount='));
    if (cookies) {
        const maxCount = cookies.split('=')[1];
        alert(`Збережені дані: Кількість максимальних чисел: ${maxCount}. Натисніть OK для видалення.`);
        document.cookie = "maxCount=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        alert("Cookies видалено.");
        location.reload();
    }

    // 4. Збереження жирності тексту блоку 6
    const block6 = document.querySelector('.sixth');
    const boldForm = document.createElement('form');
    boldForm.innerHTML = `
            <label><input type="radio" name="boldness" value="normal"> Нормальний</label>
            <label><input type="radio" name="boldness" value="bold"> Жирний</label>
        `;
    block6.appendChild(boldForm);

    const savedBoldness = localStorage.getItem('boldness');
    if (savedBoldness) {
        block6.style.fontWeight = savedBoldness;
        document.querySelector(`input[value="${savedBoldness}"]`).checked = true;
    }

    boldForm.addEventListener('change', (e) => {
        const boldness = e.target.value;
        block6.style.fontWeight = boldness;
        localStorage.setItem('boldness', boldness);
    });

    // 5. Ненумерований список
    const block7 = document.querySelector('.seventh');
    const list = document.createElement('ul');
    const inputForm = document.createElement('form');

    inputForm.innerHTML = `
            <input type="text" id="listItem" placeholder="Введіть пункт">
            <button type="button" id="addItem">Додати</button>
            <button type="button" id="saveList">Зберегти</button>
            <button type="button" id="clearList">Очистити</button>
        `;
    block7.appendChild(inputForm);
    block7.appendChild(list);

    const savedList = JSON.parse(localStorage.getItem('listItems') || '[]');
    if (savedList.length > 0) {
        block7.innerHTML = '';
        block7.appendChild(inputForm);
        block7.appendChild(list);
        savedList.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = item;
            li.style.fontSize = '20px';
            list.style.display = 'flex';
            list.style.width = '25%'
            li.style.color = index % 2 === 0 ? 'black' : 'white';
            li.style.backgroundColor = index % 2 === 0 ? 'white' : 'black';
            list.appendChild(li);
        });
    } else {
        block7.appendChild(inputForm);
        block7.appendChild(list);
    }

    document.getElementById('addItem').addEventListener('click', () => {
        const input = document.getElementById('listItem');
        if (input.value) {
            const li = document.createElement('li');
            li.textContent = input.value;
            const index = list.children.length;
            li.style.color = index % 2 === 0 ? 'black' : 'white';
            li.style.backgroundColor = index % 2 === 0 ? 'white' : 'black';
            li.style.fontSize = '20px';
            list.style.display = 'flex';
            list.style.width = '25%';
            list.appendChild(li);
            input.value = '';
        }
    });

    document.getElementById('clearList').addEventListener('click', () => {
        list.innerHTML = '';
        localStorage.removeItem('listItems');
        alert('Список очищено!');
    });

    document.getElementById('saveList').addEventListener('click', () => {
        const items = Array.from(list.children).map(li => li.textContent);
        localStorage.setItem('listItems', JSON.stringify(items));
        alert('Список збережено!');
    });


});