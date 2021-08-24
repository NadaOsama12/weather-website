const request= require('postman-request')

const geocode=(address,callback)=>{
const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibmFkYWlvIiwiYSI6ImNrczRmaGJmMTFkNHAyb3Blb3B0MXBiY3MifQ.BDYUfEq60QzUf1QAA7Dvew&limit=1'

request({url, json:true}, (erorr,{body})=>{
 if(erorr){
  callback('unable to connect to mapbox',undefined)
 }else if(body.features[0].relevance<1){
  callback('unable to find location',undefined)
 }else{
  callback(undefined,{
   longitude:body.features[0].center[1],
   latitude:body.features[0].center[0],
   location:body.features[0].place_name
  })
 }
})
}
module.exports =geocode