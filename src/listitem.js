import React, { useContext } from 'react';
import Context from './context';

export default function ListItem(props) {
  // console.log('props', props)
  const { removeCity } = useContext(Context);
  return (
    <li className="itemstyle">
      <span>
        {props.weather.city} &nbsp; &#124; {props.weather.country} &nbsp;{' '}
        {props.weather.temp} &deg;
        <img src={props.weather.icon} width="32" alt="weather" />
      </span>
      <button onClick={() => removeCity(props.weather.id)}>&times;</button>
    </li>
  );
}
