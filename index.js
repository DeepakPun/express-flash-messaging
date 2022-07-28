const bodyParser = require('body-parser')
const express = require('express')
const session = require('express-session')
const flash = require('connect-flash')

const sessionOptions = { secret: 'shouldbebetter', resave: false, saveUninitialized: false }

const app = express()

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(flash())
app.use(session(sessionOptions))

// define different categories for each message types
app.use((req, res, next) => {
    res.locals.messages = req.flash('success'),
    // res.locals.messages = req.flash('info'),
    // res.locals.messages = req.flash('warning'),
    // res.locals.messages = req.flash('danger')
    next()
})

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/', (req, res) => {
    const { number } = req.body
    if(number) {
      req.flash('success', `You entered ${number}`)
    } else {
    req.flash('success', 'You did not enter anything')
  }
    // console.log(res.locals)
    res.redirect('/')
})

app.listen(3000, () => {
    console.log('App running on port 3000. Visit http://localhost:3000')
})
