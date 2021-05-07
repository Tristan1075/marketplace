import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react'

const CardCustom =  ({place, onPlaceClick}) => {
  return (
    <Card raised={true} onClick={() => onPlaceClick(place)}>
    <Image src='https://images.pexels.com/photos/2119713/pexels-photo-2119713.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' wrapped ui={false} width={300} />
    <Card.Content>
      <Card.Header>{place.title}</Card.Header>
      <Card.Meta>
        <span className='date'>Joined in 2015</span>
      </Card.Meta>
      <Card.Description>
       {place.description}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        {place.price}
        <Icon name='euro' />
      </a>
    </Card.Content>
  </Card>
  );
};

export default CardCustom;