const {Router} = require('express');
const Course = require('../models/course');
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
    })
})

router.get('/:id/edit', async (req, res) => {
    if (!req.query.allow) {
        return res.redirect('/')
    }

    const course = await Course.getById(req.params.id)

    res.render('course-edit', {
        title: `Редактировать ${course.title}`,
        course
    })
})


router.post('/edit', async (req, res) => {
    await Course.update(req.body)
    res.redirect('/courses')
})

router.get('/:id', async (req, res) => {
    const course = await Course.getById(req.params.id)
    res.render('course', {
        layout: 'empty',
        title: `Курс ${course.title}`,
        course
    })
})


module.exports = router;