const fs = require('fs');

fs.readFile('data.json', { encoding: 'utf8' },
    (err, data) => {
        if (err) {
            console.log(err);
            return;
        };
        let content = JSON.parse(data);
        let total;
        let divine;
        content.forEach((e) => {
            if (e.name === "quantity") {
                console.log(`всего ходов ${e.quantity}`);
                total = e.quantity;
            }
            else if (e.name === "notDivine") {
                console.log(`не угадано ${e.quantity}`)
            }
            else if (e.name === "divine") {
                console.log(`угадано ${e.quantity}`);
                divine = e.quantity;
            };
        })
        console.log(`процентное соотношение выигранных партий ${divine / total * 100}%`)
    })
