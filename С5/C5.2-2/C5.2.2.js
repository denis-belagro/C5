// Модуль 5.2, задание 2
// Преобразование JSON в JS-объект и вывод его в консоль
// JSON для парсинга
const jsonString = `
  {
    "list": [
    {
      "name": "Petr",
      "age": "20",
      "prof": "mechanic"
    },
    {
      "name": "Vova",
      "age": "60",
      "prof": "pilot"
    }
    ]
  }
`;
// Парсинг JSON
const jsonData = JSON.parse(jsonString);
// Обработка поля age
persons = jsonData.list;
persons.forEach(
  (element, index) => (persons[index].age = Number(persons[index].age))
);
// Вывод JS-объекта
//console.log(persons);

const itog = {}
itog.list = persons;
console.log(itog);