const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const {body,validationResult} = require('express-validator')
const port = process.env.PORT || 3000
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.get('/submit_form',(req,res)=>{
    res.status(201).send('You have to log in...')
})
app.post('/submit_form',
    [
        body('email').isEmail().withMessage('Please enter valid email address...').escape(),
        body('password').isLength({min:6}).withMessage('Your password should have atleast 6 characters...').escape(),
        body('username').isAlpha().withMessage('User name should be in character...').escape()
    ],
    (req,res)=>{
        const validationError = validationResult(req)
        if(!validationError.isEmpty()){
            res.status(404).json({errors:validationError.array()})
        }
        res.status(201).json({message:'Your form has been successfully submitted',data:req.body})
    }
)
app.listen(port,()=>{
    console.log(`Your server is successfull and is running at port ${port}`)
})