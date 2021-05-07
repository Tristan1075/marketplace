
import React, { useEffect, useState } from 'react';
import { Item, Label, Button, Icon } from 'semantic-ui-react'


const MyHouses = ({server, account}) => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    if(server){
      const initPlaces = async () => {
        setPlaces(await server.methods.getPlacesByUser().call({from: account}));
      }
      initPlaces();
    }
  }, [account, server]);

  const handleSellHouseClick = async (place) => {
    console.log(place);
    const test = await server.methods.sellPlace(place.id).call({from: account});
    console.log(test);
  }

  return(
    <div>
      <Item.Group divided>
        {places.map((place) => (
          <Item>
            <Item.Image src='https://images.pexels.com/photos/2119713/pexels-photo-2119713.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' />
            <Item.Content>
              <Item.Header as='a'>{place.title}</Item.Header>
              <Item.Description>{place.description}</Item.Description>
              <Item.Extra>
                <Button primary floated='right' onClick={() => handleSellHouseClick(place)}>
                  Sell this house
                  <Icon name='right chevron' />
                </Button>
                <Label>{place.price}€</Label>
                <Label color='orange'>{place.surface}m2</Label>
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
  </Item.Group>

    </div>
  )

};

export default MyHouses;