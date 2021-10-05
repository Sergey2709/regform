import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const RegForm2 = () => {
  const getNameOfCompany = e => {
    localStorage.setItem('nameOfCompany', JSON.stringify(e.target.value));
  };

  const getPosition = e => {
    localStorage.setItem('position', JSON.stringify(e.target.value));
  };

  const getAboutText = e => {
    localStorage.setItem('aboutText', JSON.stringify(e.target.value));
  };

  // тут написать функцию отправки на сервер запроса Пост
  const sendToServer = () => {
    const items = { ...localStorage };
    fetch('https://regform-33ef9-default-rtdb.firebaseio.com/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(items),
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
      });
  };

  return (
    <div>
      <Form>
        <Label for="exampleForm">
          <h2>To participate in the conference, please fill out the form</h2>
        </Label>
        <br />
        <FormGroup>
          <Input
            onChange={getNameOfCompany}
            type="text"
            name="text"
            id="exampleCompany"
            placeholder="Company"
          />
        </FormGroup>
        <br />
        <FormGroup>
          <Input
            onChange={getPosition}
            type="text"
            name="text"
            id="examplePosition"
            placeholder="Position"
          />
        </FormGroup>
        <br />
        <FormGroup>
          <Input
            onChange={getAboutText}
            type="textarea"
            name="text"
            id="exampleAbout"
            placeholder="Tell us about you"
          />
        </FormGroup>
        <br />
        <FormGroup>
          <Input type="file" name="file" id="exampleFile" />
          <FormText color="muted">You can add your photo</FormText>
        </FormGroup>
        <Button>
          <a href="/">Previous</a>
        </Button>{' '}
        <Button onClick={sendToServer}>Submit</Button>{' '}
        <Button>
          <a href="/list">Next</a>
        </Button>
      </Form>
    </div>
  );
};

export default RegForm2;
