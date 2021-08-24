const request = require('postman-request')

const forcast = (latitude,longitude,callback)=>{
 const url = 'http://api.weatherstack.com/current?access_key=177812859bb15246f1852955b8a1139f&query='+ latitude+ ','+ longitude+ 'units=f'

request({url, json:true},(erorr,{body})=>{
if(erorr){
  callback('unable to connect to mapbox',undefined)
 }else if(body.erorr){
  callback('unable to find location',undefined)
 }else{
  callback(undefined,"it is currently "+ body.current.temperature +" degress out. It feels like "+ body.current.feelslike+" degress out")
 }
}
)}
module.exports = forcast