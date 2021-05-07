import React, {useEffect, useState} from 'react';
import { Card } from 'semantic-ui-react'

import CardCustom from '../Card';

const Home = ({server, onPlaceClick, account}) => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    if(server){
      const initPlaces = async () => {
        setPlaces(await server.methods.getAllPlaces().call({from: account}));
      }
      initPlaces();
    }
  }, [server, account]);
  
  return (
    <div>
      <Card.Group itemsPerRow={8}>
        {places.map((place, index) => (
            !place.isSold && <CardCustom place={place} key={index} onPlaceClick={onPlaceClick} />
          )
        )}
      </Card.Group>
    </div>
  );
};

export default Home;
