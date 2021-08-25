console.log('not feeling well!')

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//  response.json().then((data)=>{
//   console.log(data)
//  })
// })



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#msg-1')
const msgTwo = document.querySelector('#msg-2')


weatherForm.addEventListener('submit',(e)=>{
 e.preventDefault()

 const location = search.value
 // console.log(location)
  msgOne.textContent='loading...'
  msgTwo.textContent=''
 
  fetch('/weather?address='+ location).then((response)=>{
 response.json().then((data)=>{
 if(data.erorr)
 { msgOne.textContent=data.erorr}
 else{
  msgOne.textContent= data.location
  msgTwo.textContent = data.forcast
 }
 })
})

})
