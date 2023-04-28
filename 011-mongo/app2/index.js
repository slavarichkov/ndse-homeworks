const express = require('express');
const app = express();
const fs = require('fs');

// Приложение счетчик БД

app.get('/counter/:id', (req, res) => { // отправить данные по просмотру книги
    const { id } = req.params;
    let count;
    fs.readFile('./data/data.json', (err, data) => {
        if (err) throw err;

        // Преобразуем содержимое файла в объект JavaScript
        const jsonData = JSON.parse(data);
        if (jsonData[id]) {
            count = jsonData[id] // счетчик просмотров
            res.json({ count });
        } else {
            res.json({ count: 0 }); // если ключа нет в объекте
        }
    })
});

app.post('/counter/:id/incr', (req, res) => { // увеличить счетчик просмотра
    
    const { id } = req.params;
    //Открываем файл для чтения
    fs.readFile('./data/data.json', (err, data) => {
        if (err) throw err;

        // Преобразуем содержимое файла в объект JavaScript
        const jsonData = JSON.parse(data);

        // Добавляем новые данные

        if (jsonData[id]) { // если данные есть, то увеличить значение на 1
            jsonData[id]++;
 
        } else {
            jsonData[id] = 1; // если нет, то записать как 1 и добавить
    
        }

        // Преобразуем объект JavaScript обратно в JSON-строку
        const updatedJsonData = JSON.stringify(jsonData);

        // Записываем измененные данные обратно в файл
        fs.writeFile('./data/data.json', updatedJsonData, (err) => {
            if (err) throw err;
            console.log('Данные успешно записаны в файл!');

            res.send({
                message: 'Счетчик просмотра увеличен',
                view: jsonData[id],
            });
        });
    });

})

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Сервер счетчика запущен, порт: ${PORT}`);
});