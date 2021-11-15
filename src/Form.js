import React, { useState, useContext } from 'react';
import Context from './context';

export default function Form() {
  const { getWeather } = useContext(Context);
  const [value, setValue] = useState('');

  function submitHandler(e) {
    e.preventDefault();
    if (value.trim()) {
      // console.log(value)
      getWeather(capitalizeFirstLetter(value));
      setValue('');
    }
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <div>
      <form className="form" onSubmit={(e) => submitHandler(e)}>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter city"
        />
        <button> Get Weather</button>
      </form>
      {/* <p>{value}</p> */}
    </div>
  );
}
