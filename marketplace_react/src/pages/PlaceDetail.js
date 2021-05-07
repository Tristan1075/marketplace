import React, {useState, useEffect, useCallback} from 'react';
import { Grid, Image, Header, Button, Form, Message, Table, Menu, Dropdown, Dimmer, Loader } from 'semantic-ui-react'
import Web3 from 'web3';

import { converETHToEuro, getRandomString } from '../utils';

const options = [
  { key: 1, text: 'Accept', value: 0 },
  { key: 2, text: 'Refuse', value: 1 },
]

const PlaceDetail = ({server, place, account, web3}) => {
  const [price, setPrice] = useState(0);
  const [euroPrice, setEuroPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [offers, setOffers] = useState([]);
  const [isOfferEnded, setIsOfferEnded] = useState(false);

  const initOffers = useCallback( async () => {
    const res = await server.methods.getOffersByPlaceId(place.id).call();
    setIsOfferEnded(Boolean(res.find((offer) => offer.isAccepted === true)));
    setOffers(res);
  }, [place.id, server.methods]);

  useEffect(() => {
      initOffers();
  }, [initOffers]);

  const handleSubmitClick = () => {
    setIsLoading(true);
    server.methods.makeAnOffer(getRandomString(), place.owner, place.id).send({from: account, value: Web3.utils.toWei(price, 'ether')}).then((res) => {
      setIsLoading(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 4000);
      initOffers();
    }).catch((err) => setIsLoading(false));
  }

  const handlePriceChange = async (e) => {
    setEuroPrice(await converETHToEuro(e.target.value));
    setPrice(e.target.value);
  }

  const handleActionClick = (offer, value) => {
    switch(value){
      case 0: 
        setIsLoading(true);
        server.methods.acceptAnOffer(offer.id).send({from: account}).then(() => {
          setIsLoading(false);
          initOffers();
        });
      break;
      case 1: 
      break;
      default:
        return;
    }
  }

  return (
    <Grid>
      <Grid.Column width={3}>
        <Image src='https://images.pexels.com/photos/2119713/pexels-photo-2119713.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'/>
      </Grid.Column>
      <Grid.Column width={8}>
        <Header
          as='h2'
          content={place.title}
          subheader={place.description}
        />  
        <Header
          as='h4'
          content={'Owner'}
          subheader={place.owner}
        /> 
      </Grid.Column>
      {account.toLowerCase() !== place.owner.toLowerCase() && !isOfferEnded &&
        <Grid.Column width={4}>
          <Form success onSubmit={handleSubmitClick}>
            <Form.Input label='Make an offer' placeholder='Type your price' onChange={handlePriceChange} />
            <Header
              as='h4'
              content={`${euroPrice}€`}
            />  
            {success &&  
              <Message
                success
                header='Congratulations'
                content="The purchase offer has been created !"
              />
            }
            <Button primary>Submit</Button>
          </Form>    
        </Grid.Column>
      }
      {isOfferEnded && 
        <Grid.Column width={16}>
          <Message
            error
            header="Sales completed"
            content="The order is ended, you can't place an offer anymore"
          />
        </Grid.Column>
      }
      <Table stackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>User</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.HeaderCell textAlign='right'>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {offers.map((offer, index) => (
            <Table.Row key={index} positive={offer.isAccepted}>
              <Table.Cell>05/05/21</Table.Cell>
              <Table.Cell>{offer.buyer}</Table.Cell>
              <Table.Cell>{Web3.utils.fromWei(offer.offer, 'ether')}</Table.Cell>
              <Table.Cell textAlign="right">
                <Menu compact>
                  {account.toLowerCase() === place.owner.toLowerCase() && !isOfferEnded &&
                  <Dropdown 
                    text='Choose' 
                    options={options} 
                    simple 
                    item 
                    onChange={(e, {name, value}) => handleActionClick(offer, value)}
                    closeOnChange
                  />}
                </Menu>
              </Table.Cell>   
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Dimmer active={isLoading}>
      <Loader />
    </Dimmer>
    </Grid>
  );
}

export default PlaceDetail;