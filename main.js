//курсы валют
const exchangeRates = {
    'доллар': 90.50,
    'евро': 98.75
};

// Функция конвертации валют
function convertCurrency() {

    const rubInput = prompt("Введите сумму в рублях:")
    
    // Проверяем нажал ли пользователь отмена
    if (rubInput === null) {
        alert("Операция отменена пользователем.");
        return;
    }
    
    // Пытаемся преобразовать в число
    const rubAmount = parseFloat(rubInput)
    
    // Проверка на корректный ввод
    if (isNaN(rubAmount)) {
        alert("Ошибка: Введите корректное число!");
        return;
    }
    
    // Проверка на отрицательные числа
    if (rubAmount < 0) {
        alert("Ошибка: Сумма не может быть отрицательной!");
        return;
    }
    
    // Предлагаем выбрать валюту
    let currencyChoice;
    if (confirm("Вы хотите конвертировать в доллары? (OK - доллары, Отмена - евро)")) {
        currencyChoice = 'доллар'
    } else {
        currencyChoice = 'евро'
    }
    
    // Получаем курс
    const rate = exchangeRates[currencyChoice]
    
    // Вычисляем результат
    const convertedAmount = rubAmount / rate;
    
    // Выводим результат
    alert(`Результат: ${convertedAmount.toFixed(2)} ${currencyChoice}`)
}

// Запускаем конвертацию
convertCurrency()