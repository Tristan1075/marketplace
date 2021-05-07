import React, {useState} from 'react'
import {
  Button,
  Form,
  Input,
  TextArea,
  Message,
  Grid,
  Image,
} from 'semantic-ui-react'
import { getRandomString } from '../../utils';


const CreatePlace = ({server, account}) => {
  const [form, setForm] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmitClick = () => {
    setIsLoading(true);
    server.methods.createPlace(getRandomString(), form.title, form.description, form.price, form.surface).send({from: account}).then((res) => {
      setIsLoading(false);
      setSuccess(true);
      setForm({});
    }).catch((err) => {
      setIsLoading(false);
    });
  }

  return (
    <div>
      <Form onSubmit={handleSubmitClick} loading={isLoading}>
        <Form.Field
            control={Input}
            label='Title'
            placeholder='Enter your title'
            onChange={(e) => setForm({...form, title: e.target.value})}
          />
        <Form.Group widths='equal'>
          <Form.Field
            control={Input}
            label='Price'
            placeholder='Enter the price'
            onChange={(e) => setForm({...form, price: e.target.value})}
          />
          <Form.Field
            control={Input}
            label='Surface'
            placeholder='Enter the surface'
            onChange={(e) => setForm({...form, surface: e.target.value})}
          />
        </Form.Group>
        <Form.Field
          control={TextArea}
          label='Description'
          placeholder='Describe your place...'
          onChange={(e) => setForm({...form, description: e.target.value})}
        />
        <Form.Field control={Button}>Submit</Form.Field>
      </Form>
      {success &&
      <Message
          success
          header='Congratulations !'
          content="Your place has been create !"
        />}
      {error &&
      <Message
          success
          header='Error'
          content="Your place can't be create..."
        />}
    </div>
  );
};

const styles = {};

export default CreatePlace;
