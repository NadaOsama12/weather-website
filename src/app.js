const path = require('path')
const express = require('express')
const hbs = require('hbs') 
const { send } = require('process')
const geocode = require('./utils/geocode')
const forcast = require('./utils/forcast')
const app = express()

//define paths for express config
const dircPath = path.join(__dirname,'../puplic')
const viewPath = path.join(__dirname, '../templates/views' )
const partialPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and for views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

//setup static directory to serve
app.use(express.static(dircPath))

app.get('', (req,res)=>{res.render('index',{
 title:'Weather',
 name: 'nada',
 msg:'use this app to get your weather!'
})
})
app.get('/about', (req,res)=>{
 res.render('about',{
   title:'about me',
   name: 'nada'
 })
})
app.get('/help', (req,res)=>{
 res.render('help',{
  msg: 'This is some helpful text',
  title:'Help',
   name: 'nada'
 })
})

// app.get('', (req, res)=>{
//  res.send('Hello express')
// })

// app.get('/Help',(req, res)=>{
//  res.send('Help page')
// })

// app.get('/about',(req, res)=>{
//  res.send('<title>about</title>')
// })

app.get('/weather',(req, res)=>{
  if(!req.query.address){
   return res.send({
      erorr:'please add an address!'
    })
  }

   geocode(req.query.address,(erorr,{latitude, longitude,location}={})=>{
 if(erorr){
    return res.send({erorr})
 }
   forcast(latitude, longitude ,(erorr,forcastData)=>{
    if (erorr){
     return res.erorr({erorr})
    }
res.send({
  forcast:forcastData,
  location,
  address: req.query.address
 })
})
})
})

 

app.get('/products',(req,res)=>{
  if(!req.query.search){
   return res.send({
      erorr:'you must provide a search term'
    })
  }
  
  res.send({
    "products":[]
  })
})
app.get('/help/*', (req,res)=>{
 res.render('404page',{
  title:'404',
  name:'nada',
  errorMsg:'help artical not found'
 })
})

app.get('*', (req,res)=>{
 res.render('404page', {
  title:'404',
  name:'nada',
  errorMsg:'page not found'
 })
})
app.listen(3000,()=>{
 console.log('server is up on port 3000')
})