const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()

  if (document.querySelector('.current-weather')) {
    document.querySelector('.current-weather').remove()
  }

  const location = search.value

  messageOne.textContent = 'Loading...'
  messageTwo.textContent = ''

  const getImage = (value) => {
    const img = document.createElement("img")
    img.setAttribute("class", "current-weather")
    img.setAttribute("src", `/img/${value}.png`)
    img.setAttribute("width", "150")
    img.setAttribute("height", "150")
    document.getElementById('weather').appendChild(img)
  }

  fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        if (data.forecast.includes('Rain') || data.forecast.includes('Thunderstorm')) {
          getImage('rain')
        } else if (data.forecast.includes('Sunny') || data.forecast.includes('Clear')) {
          getImage('sunny')
        } else if (data.forecast.includes('Overcast') || data.forecast.includes('cloudy')) {
          getImage('cloudy')
        } else if (data.forecast.includes('Snow')) {
          getImage('snowy')
        } else {
          getImage('unknown')
        }
        messageOne.textContent = data.location
        messageTwo.textContent = data.forecast
      }
    })
  })

  console.log(location)
})