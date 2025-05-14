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



// ЗАДАНИЕ 3

// Хранилище книг
const bookLibrary = {
    books: [],
    genres: new Set(),
    
    // Добавление новой книги
    addBook: function(title, author, genre) {
        if (!title || !author || !genre) {
            console.log("Ошибка: Все поля (название, автор, жанр) должны быть заполнены")
            return false
        }
        
        const newBook = {
            id: Date.now(), // Уникальный ID
            title,
            author,
            genre,
            rating: null, // Оценка по умолчанию
            createdAt: new Date()
        };
        
        this.books.push(newBook)
        this.genres.add(genre)
        console.log(`Книга "${title}" добавлена!`)
        return true;
    },
    
    // Добавление оценки книге
    rateBook: function(bookId, rating) {
        if (rating < 1 || rating > 5) {
            console.log("Ошибка: Оценка должна быть от 1 до 5")
            return false;
        }
        
        const book = this.books.find(b => b.id === bookId)
        if (!book) 
            console.log("Ошибка: Книга не найдена");
            return false
        }
        
        book.rating = rating
        console.log(`Книге "${book.title}" поставлена оценка ${rating}`)
        return true;
    },
    
    // Фильтрация книг
    filterBooks: function({genre, minRating}) {
        let result = [...this.books]
        
        if (genre) {
            result = result.filter(book => book.genre === genre)
        }
        
        if (minRating) {
            result = result.filter(book => book.rating !== null && book.rating >= minRating)
        }
        
        return result
    },
    
    // Вывод списка книг
    displayBooks: function(books = this.books) {
        if (books.length === 0) {
            console.log("Книги не найдены")
            return;
        }
        
        console.log("Список книг:")
        books.forEach(book => {
            console.log(`- ${book.title} (${book.author}) [${book.genre}] ${
                book.rating ? `★ ${book.rating}/5` : 'еще не оценена'
            }`);
        });
    },
    
    // Получение списка жанров
    getGenres: function() {
        return Array.from(this.genres)
    }
};

// Пример использования
function demo() {
    // Добавляем книги
    bookLibrary.addBook("1984", "Джордж Оруэлл", "Антиутопия")
    bookLibrary.addBook("Преступление и наказание", "Фёдор Достоевский", "Классика")
    bookLibrary.addBook("Гарри Поттер", "Дж. К. Роулинг", "Фэнтези")
    
    // Ставим оценки
    const books = bookLibrary.books;
    bookLibrary.rateBook(books[0].id, 5)
    bookLibrary.rateBook(books[1].id, 4)
    
    // Выводим все книги
    bookLibrary.displayBooks()
    
    // Фильтруем по жанру
    console.log("\nАнтиутопии:")
    const dystopian = bookLibrary.filterBooks({genre: "Антиутопия"})
    bookLibrary.displayBooks(dystopian);
    
    // Фильтруем по оценке
    console.log("\nКниги с оценкой 4 и выше:");
    const topRated = bookLibrary.filterBooks({minRating: 4})
    bookLibrary.displayBooks(topRated);
    
    // Получаем список жанров
    console.log("\nДоступные жанры:", bookLibrary.getGenres())
}

// Запускаем демо
demo()