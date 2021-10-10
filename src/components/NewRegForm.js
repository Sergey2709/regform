import { React, useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import { addDoc, collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '../plugins/firebase';

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

    const q = query(collection(db, 'users'));
    const userArr = [];
    onSnapshot(q, snaps => {
      snaps.forEach(doc => {
        const userObj = doc._document.data.value.mapValue.fields;
        userArr.push(userObj);
      });
      setOutput(userArr);
    });
  }, []);

  const pushToLocal = () => {
    localStorage.setItem('phoneNumber', phone);
    localStorage.setItem('reportSubject', report);
    localStorage.setItem('dateOfBirth', date);
    localStorage.setItem('lastName', lastName);
    localStorage.setItem('firstName', firstName);
    localStorage.setItem('email', email);
  };

  async function getData(e) {
    pushToLocal();
    try {
      const docRef = await addDoc(collection(db, 'users'), {
        firstName: localStorage.getItem(`firstName`),
        lastName: localStorage.getItem(`lastName`),
        dateOfBirth: localStorage.getItem(`dateOfBirth`),
        reportSubject: localStorage.getItem(`reportSubject`),
        phoneNumber: localStorage.getItem(`phoneNumber`),
        email: localStorage.getItem(`email`),
      });
      localStorage.setItem('id', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }

    if (firstName && lastName && phone && date && email) {
      setValidationError('');
      window.location.href = '/step2';
    } else {
      setValidationError('Invalid data, try again');
    }
  }

  const settingFirstName = e => {
    setFirstName(e.target.value);
    localStorage.setItem('firstName', e.target.value);
    if (e.target.value < 1) {
      setFirstNameError('Can`t be empty');
    } else {
      setFirstNameError('');
    }
  };

  const settingLastName = e => {
    setLastName(e.target.value);
    localStorage.setItem('lastName', e.target.value);
    if (e.target.value < 1) {
      setLastNameError('Can`t be empty');
    } else {
      setLastNameError('');
    }
  };

  const settingDateOfBirth = e => {
    setDate(e.target.value);
    localStorage.setItem('dateOfBirth', e.target.value);
    if (e.target.value < 1) {
      setDateError('Can`t be empty');
    } else {
      setDateError('');
    }
  };

  const settingReportSubject = e => {
    setReport(e.target.value);
    localStorage.setItem('reportSubject', e.target.value);
  };

  const settingPhoneNumber = e => {
    setPhone(e);
    localStorage.setItem('phoneNumber', e);
  };

  // const checkEmail = () => {
  //   const duplicateEmail = output.filter(el => el.email.stringValue === e.target.value);
  // }

  const settingEmail = e => {
    const duplicateEmail = output.map(el => {
      if (el.email.stringValue === e.target.value) {
        setEmailError('This email is used');
        return 1; 
      }
    });

    if (!duplicateEmail) {
      setEmail(e.target.value);
      localStorage.setItem('email', e.target.value);
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(String(e.target.value).toLowerCase())) {
        setEmailError('incorrect email');
      } else {
        setEmailError('');
        localStorage.setItem('email', e.target.value);
      }
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
      default:
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
              onChange={settingFirstName}
              onBlur={blurHandler}
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
          <br />
          {validationError && <div style={{ color: 'red' }}>{validationError}</div>}
          <div style={{ display: 'flex', justifyContent: 'right' }}>
            <Button onClick={getData}>Next</Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default NewRegForm;
