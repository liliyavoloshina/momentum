let city = 'Минск'
let lang = 'ru'

async function getWeather() {  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${lang}&appid=01d522b353a969527c35ef13f4db2c3e&units=metric`
  const res = await fetch(url);
  const data = await res.json(); 
  console.log(data.weather[0].id, data.weather[0].description, data.main.temp);

}
export {getWeather}