import { React, useState } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { CountryDropdown } from 'react-country-region-selector';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import Map from './Map';

const RegForm = props => {
  const getFirstName = e => {
    localStorage.setItem('firstName', JSON.stringify(e.target.value));
  };

  const getLastName = e => {
    localStorage.setItem('lastName', JSON.stringify(e.target.value));
  };

  const getDateOfBirth = e => {
    localStorage.setItem('dateOfBirth', JSON.stringify(e.target.value));
  };

  const getText = e => {
    localStorage.setItem('text', JSON.stringify(e.target.value));
  };

  const getEmail = e => {
    localStorage.setItem('email', JSON.stringify(e.target.value));
  };

  const getCountry = e => {
    localStorage.setItem('country', JSON.stringify(e));
  };

  const getPhone = e => {
    localStorage.setItem('phoneNumber', JSON.stringify(e));
  };

  return (
    <div>
      <Map />
      <div
        style={{
          maxWidth: '50%',
          display: 'flex',
          flexDirection: 'column',
          margin: 'auto',
        }}
      >
        <Form>
          <Label for="exampleForm">
            <h2>To participate in the conference, please fill out the form</h2>
          </Label>
          <FormGroup>
            <Input
              onChange={getFirstName}
              type="text"
              name="firstName"
              id="exampleText"
              placeholder="Enter your first name"
            />
          </FormGroup>
          <br />
          <FormGroup>
            <Input
              onChange={getLastName}
              type="text"
              name="lastName"
              id="exampleText"
              placeholder="Enter your last name"
            />
          </FormGroup>
          <br />
          <FormGroup>
            <Input
              onChange={getDateOfBirth}
              type="date"
              name="date"
              id="exampleDate"
              placeholder="date placeholder"
            />
          </FormGroup>
          <br />
          <FormGroup>
            <Input
              onChange={getText}
              type="textarea"
              name="text"
              id="exampleTextArea"
              placeholder="Report subject"
            />
          </FormGroup>
          <br />

          <CountryDropdown onChange={getCountry} style={{ width: '100%' }} />
          <br />
          <br />

          <PhoneInput
            country={'us'}
            // value={state.phone}
            onChange={getPhone}
          />
          <br />

          <FormGroup>
            <Input
              onChange={getEmail}
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="Email"
            />
          </FormGroup>

          <Button>
            <a href="/step2">Next</a>
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default RegForm;
