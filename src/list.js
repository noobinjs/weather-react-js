import React from 'react';
import ListItem from './listitem';

export default function List(props) {
  //  console.log(props)
  return (
    <ul>
      {props.weather.map((item, index) => (
        <ListItem weather={item} index={index} key={item.id} />
      ))}

      {/* {console.log(props.weather)} */}
    </ul>
  );
}
