import { React, useState, useEffect, useRef } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { CountryDropdown } from 'react-country-region-selector';

import { addDoc, collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '../plugins/firebase';

import Map from './Map';

const NewRegForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [reportSubject, setReportSubject] = useState('');
  const [country, setCountry] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [countUsers, setCountUsers] = useState(0);

  const [emailError, setEmailError] = useState('');
  const [validationError, setValidationError] = useState('');

  const [output, setOutput] = useState([]);

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
      setDateOfBirth('');
    } else {
      setDateOfBirth(window.localStorage.getItem('dateOfBirth'));
    }

    if (window.localStorage.getItem('reportSubject') === null) {
      setReportSubject('');
    } else {
      setReportSubject(window.localStorage.getItem('reportSubject'));
    }

    if (window.localStorage.getItem('phoneNumber') === null) {
      setPhoneNumber('');
    } else {
      setPhoneNumber(window.localStorage.getItem('phoneNumber'));
    }

    if (window.localStorage.getItem('email') === null) {
      setEmail('');
    } else {
      setEmail(window.localStorage.getItem('email'));
    }

    const q = query(collection(db, 'users'));
    const userArr = [];
    onSnapshot(q, snaps => {
      snaps.forEach(doc => {
        const userObj = doc._document.data.value.mapValue.fields;
        userArr.push(userObj);
      });
      setOutput(userArr);
      setCountUsers(userArr.length);
    });
  }, []);

  const settingFirstName = e => {
    setFirstName(e.target.value);
    localStorage.setItem('firstName', e.target.value);
    e.target.style.backgroundColor = '#e2f0fd';
  };

  const settingLastName = e => {
    setLastName(e.target.value);
    localStorage.setItem('lastName', e.target.value);
    e.target.style.backgroundColor = '#e2f0fd';
  };

  const settingDateOfBirth = e => {
    setDateOfBirth(e.target.value);
    localStorage.setItem('dateOfBirth', e.target.value);
    e.target.style.backgroundColor = '#e2f0fd';
  };

  const settingReportSubject = e => {
    setReportSubject(e.target.value);
    localStorage.setItem('reportSubject', e.target.value);
    e.target.style.backgroundColor = '#e2f0fd';
  };

  const settingCountry = e => {
    setCountry(e);
    localStorage.setItem('country', e);
  };

  const settingPhoneNumber = e => {
    setPhoneNumber(e);
    localStorage.setItem('phoneNumber', e);
  };

  const settingEmail = e => {
    setEmail(e.target.value);
    e.target.style.backgroundColor = '#e2f0fd';

    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError('Incorrect email');
    } else {
      setEmailError('');
      localStorage.setItem('email', e.target.value);
    }
  };

  const checkEmail = e => {
    if (firstName && lastName && phoneNumber && dateOfBirth && email) {
      const emailForCheck =
        e.target.parentElement.previousElementSibling.previousElementSibling.lastElementChild.value;

      const duplicateEmail = output.find(el => el.email.stringValue === emailForCheck);
      if (duplicateEmail) {
        setEmailError('This email was used');
      } else {
        setEmailError('');
        setEmail(emailForCheck);
        getData();
      }
    } else {
      setValidationError('Empty fields');
    }
  };

  async function getData() {
    if (firstName && lastName && phoneNumber && dateOfBirth && email) {
      try {
        const docRef = await addDoc(collection(db, 'users'), {
          firstName: localStorage.getItem(`firstName`),
          lastName: localStorage.getItem(`lastName`),
          dateOfBirth: localStorage.getItem(`dateOfBirth`),
          reportSubject: localStorage.getItem(`reportSubject`),
          phoneNumber: localStorage.getItem(`phoneNumber`),
          email: localStorage.getItem(`email`),
        });

        // localStorage.clear();
        localStorage.setItem('id', docRef.id);
      } catch (e) {
        console.error('Error adding document', e);
      }

      setValidationError('');
      window.location.href = '/step2';
    } else {
      setValidationError('Empty fields');
    }
  }

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
          <Label for="exampleFor">
            <h4>
              <a href="/list">All members ({countUsers})</a>
            </h4>
          </Label>
          <FormGroup>
            <Input
              onChange={settingFirstName}
              //   onBlur={blurHandler}
              type="text"
              name="firstName"
              value={firstName}
              placeholder="Enter your first name"
            />
            {/* {firstNameDirty && firstNameError && (
              <div style={{ color: 'red', position: 'absolute', fontSize: '12px' }}>
                {firstNameError}
              </div>
            )} */}
          </FormGroup>
          <br />
          <FormGroup>
            <Input
              onChange={e => settingLastName(e)}
              //   onBlur={e => blurHandler(e)}
              type="text"
              name="lastName"
              value={lastName}
              placeholder="Enter your last name"
            />
            {/* {lastNameDirty && lastNameError && (
              <div style={{ color: 'red', position: 'absolute', fontSize: '12px' }}>
                {lastNameError}
              </div>
            )} */}
          </FormGroup>
          <br />
          <FormGroup>
            <Input
              onChange={e => settingDateOfBirth(e)}
              //   onBlur={e => blurHandler(e)}
              type="date"
              name="dateOfBirth"
              value={dateOfBirth}
              placeholder="date placeholder"
            />
            {/* {dateDirty && dateError && (
              <div style={{ color: 'red', position: 'absolute', fontSize: '12px' }}>
                {dateError}
              </div>
            )} */}
          </FormGroup>
          <br />
          <FormGroup>
            <Input
              onChange={e => settingReportSubject(e)}
              //   onBlur={e => blurHandler(e)}
              type="textarea"
              name="reportSubject"
              value={reportSubject}
              placeholder="Report subject"
            />
          </FormGroup>
          <br />

          <CountryDropdown style={{ width: '-webkit-fill-available' }} onChange={settingCountry} />
          <br />
          <br />

          <PhoneInput
            onChange={settingPhoneNumber}
            country={'us'}
            style={{ width: '100% !important' }}
          />
          <br />

          <FormGroup>
            <Input
              onChange={settingEmail}
              //   onBlur={e => blurHandler(e)}
              type="email"
              name="email"
              value={email}
              placeholder="Email"
            />
            {emailError && (
              <div
                style={{
                  color: 'red',
                  position: 'absolute',
                  fontSize: '12px',
                }}
              >
                {emailError}
              </div>
            )}
          </FormGroup>
          {validationError && (
            <div style={{ color: 'red', position: 'relative', fontSize: '12px' }}>
              {validationError}
            </div>
          )}
          <br />

          <div style={{ display: 'flex', justifyContent: 'right' }}>
            <Button onClick={checkEmail}>Next</Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default NewRegForm;
