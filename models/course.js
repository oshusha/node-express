const uuid = require('uuid').v4;
const fs = require('fs');
const path = require('path');

class Course {
    constructor(title, price, img) {
        this.title = title;
        this.price = price;
        this.img = img;
        this.id = uuid();
    }

// Функция Хелпер 
    toJSON() {
        // Убрали джейсон.стрингифай
        return {
            title: this.title,
            price: this. price,
            img: this.img,
            id: this.id
        }
    }

    static async update(course) {
        const courses = await Course.getAll();

        const idx = courses.findIndex(c => c.id === course.id)
        courses[idx] = course

        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'courses.json'),
                JSON.stringify(courses),
                (err) => {    
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                }    
            )
        })
    }

    async save() {
        // Получаем пустой массив из курсесджейсон
        const courses = await Course.getAll();
        // Пушим в него данные - массив, состоящий из js объектов
        courses.push(this.toJSON())


        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'courses.json'),
                JSON.stringify(courses),
                (err) => {    
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                }    
            )
        })

        // console.log('Courses', courses);
    }

    static getAll() {
        return new Promise((resolve, reject) => {
            fs.readFile(
                path.join(__dirname, '..', 'data', 'courses.json'),
                'utf-8',
                (err, content) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(JSON.parse(content))
                    }   
                }
            )
        })
    }

    static async getById(id) {
        // Получаем список курсов
        const courses = await Course.getAll()
        // Возвращаем тот единственный курс, который хотим получить
        return courses.find(c => c.id === id)
    }
}

module.exports = Course;