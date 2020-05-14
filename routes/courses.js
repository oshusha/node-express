const {Router} = require('express');
const Course = require('../models/course');
const fs = require('fs');
const path = require('path');
const router = Router();


//Получаем список курсов из файла
router.get('/', async (req, res) => {
    // Записываем в объект курсы. Обращаемся к модели курс и достаём его методом гет алл
    const courses = await Course.getAll();

    res.render('courses', {
        title: 'Курсы',
        isCourses: true,
        // Нам нужно отрисовать объект на странице. Передаём:
        courses
    });
})

module.exports = router;