import { useState } from "react";


import '../index.css'




const api = {
 key:'d7132fafa6f4094a6654575a3ea6a9fb',
 base:'https://api.openweathermap.org/data/2.5/'
}

export const Main = () => {

  const [city, setCity] = useState('');

  
  const [weather, setWeather] = useState({});


  
  const search = evt => {
    if (evt.key === 'Enter') {
      fetch(`${api.base}weather?q=${city}&units=metric&appid=${api.key}`) 
        .then(res => res.json())  
        .then(result => {         
          setWeather(result);
          setCity('');
          console.log(result);
        });
    }
  }

  
  const format_date = (d) => {
    let months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    let days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  
  return (
    <div className={(typeof weather.main != 'undefined') ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main className="min-h-[100vh] p-[25px] bg-slate-500">
        <div className="w-[100%] block p-4 appearance-none bg-none border-none outline-none bg-slate-700 rounded-2xl shadow-gray-400 text-slate-500 text-xl focus:bg-slate-200">
          <input
            type='text'
            className="w-[100%] block p-4 appearance-none bg-none border-none outline-none bg-slate-700 rounded-2xl shadow-gray-400 text-slate-500 text-xl focus:bg-slate-200"
            placeholder='Поиск...'
            onChange={e => setCity(e.target.value)}
            value={city}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != 'undefined') ? (
        <div>
          <div className="text-white text-3xl font-medium text-center">
            <div className="text-white text-3xl font-medium text-center">{weather.name}, {weather.sys.country}</div>
            <div className="text-white text-3xl font-medium text-center">{format_date(new Date())}</div>
          </div>
          <div className="relative inline-block mx-0 ml-[743px] bg-slate-600 rounded-2xl px-4 py-6 text-white text-8xl font-black text-center">
            <div>
              {Math.round(weather.main.temp)}°c
            </div>
            <div>{weather.weather[0].main}</div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
  }


