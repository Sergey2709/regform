import { React, useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import Map from './Map';

const NewRegForm = props => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [date, setDate] = useState('');
  const [report, setReport] = useState('');
  const [phone, setPhone] = useState('+1');
  const [email, setEmail] = useState('');

  const [firstNameDirty, setFirstNameDirty] = useState(false);
  const [lastNameDirty, setLastNameDirty] = useState(false);
  const [dateDirty, setDateDirty] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);

  const [firstNameError, setFirstNameError] = useState('Can`t be empty');
  const [lastNameError, setLastNameError] = useState('Can`t be empty');
  const [dateError, setDateError] = useState('Can`t be empty');
  const [emailError, setEmailError] = useState('Can`t be empty');

  useEffect(() => {
    if (window.localStorage.getItem('firstName') === null) {
      setFirstName('');
    } else {
      setFirstName(window.localStorage.getItem('firstName'));
    }

    if (window.localStorage.getItem('lastName') === null) {
      setLastName('');
    } else {
      setLastName(window.localStorage.getItem('lastName'));
    }

    if (window.localStorage.getItem('dateOfBirth') === null) {
      setDate('');
    } else {
      setDate(window.localStorage.getItem('dateOfBirth'));
    }

    if (window.localStorage.getItem('reportSubject') === null) {
      setReport('');
    } else {
      setReport(window.localStorage.getItem('reportSubject'));
    }

    if (window.localStorage.getItem('phoneNumber') === null) {
      setPhone('');
    } else {
      setPhone(window.localStorage.getItem('phoneNumber'));
    }

    if (window.localStorage.getItem('email') === null) {
      setEmail('');
    } else {
      setEmail(window.localStorage.getItem('email'));
    }
  }, []);

  const getData = e => {
    localStorage.setItem('phoneNumber', phone);
    localStorage.setItem('reportSubject', report);
    localStorage.setItem('dateOfBirth', date);
    localStorage.setItem('lastName', lastName);
    localStorage.setItem('firstName', firstName);
    localStorage.setItem('email', email);
    window.location.href = '/step2';
  };

  const settingFirstName = e => {
    setFirstName(e.target.value);
    if (e.target.value < 1 || e.target.value > 20) {
      setFirstNameError('Can`t be empty');
    } else {
      setFirstNameError('');
    }
  };
  const settingLastName = e => {
    setLastName(e.target.value);
    if (e.target.value < 1) {
      setLastNameError('Can`t be empty');
    } else {
      setLastNameError('');
    }
  };
  const settingDateOfBirth = e => {
    setDate(e.target.value);
    if (e.target.value < 1) {
      setDateError('Can`t be empty');
    } else {
      setDateError('');
    }
  };
  const settingReportSubject = e => {
    setReport(e.target.value);
  };
  const settingPhoneNumber = e => {
    setPhone(e);
  };
  const settingEmail = e => {
    setEmail(e.target.value);
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError('incorrect email');
    } else {
      setEmailError('');
    }
  };

  const blurHandler = e => {
    switch (e.target.name) {
      case 'firstName':
        setFirstNameDirty(true);
        break;
      case 'lastName':
        setLastNameDirty(true);
        break;
      case 'date':
        setDateDirty(true);
        break;
      case 'email':
        setEmailDirty(true);
        break;
    }
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
            {firstNameDirty && firstNameError && (
              <div style={{ color: 'red' }}>{firstNameError}</div>
            )}
            <Input
              onChange={e => settingFirstName(e)}
              onBlur={e => blurHandler(e)}
              type="text"
              name="firstName"
              value={firstName}
              placeholder="Enter your first name"
            />
          </FormGroup>
          <br />
          <FormGroup>
            {lastNameDirty && lastNameError && <div style={{ color: 'red' }}>{lastNameError}</div>}
            <Input
              onChange={e => settingLastName(e)}
              onBlur={e => blurHandler(e)}
              type="text"
              name="lastName"
              value={lastName}
              placeholder="Enter your last name"
            />
          </FormGroup>
          <br />
          <FormGroup>
            {dateDirty && dateError && <div style={{ color: 'red' }}>{dateError}</div>}
            <Input
              onChange={e => settingDateOfBirth(e)}
              onBlur={e => blurHandler(e)}
              type="date"
              name="date"
              value={date}
              placeholder="date placeholder"
            />
          </FormGroup>
          <br />
          <FormGroup>
            <Input
              onChange={e => settingReportSubject(e)}
              onBlur={e => blurHandler(e)}
              type="textarea"
              name="report"
              value={report}
              placeholder="Report subject"
            />
          </FormGroup>
          <br />
          <PhoneInput
            onChange={e => settingPhoneNumber(e)}
            onBlur={e => blurHandler(e)}
            country={'us'}
          />
          <br />

          <FormGroup>
            {emailDirty && emailError && <div style={{ color: 'red' }}>{emailError}</div>}
            <Input
              onChange={settingEmail}
              onBlur={e => blurHandler(e)}
              type="email"
              name="email"
              value={email}
              placeholder="Email"
            />
          </FormGroup>

          <Button onClick={getData}>Next</Button>
        </Form>
      </div>
    </div>
  );
};

export default NewRegForm;
