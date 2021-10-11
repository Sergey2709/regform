import { React, useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import { setDoc, doc, collection, query, onSnapshot } from 'firebase/firestore';

import { db } from '../plugins/firebase';

import fbIcon from '../image/facebook.png';
import twIcon from '../image/twitter.png';
import gmailIcon from '../image/gmail.png';

const RegForm2 = () => {
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [about, setAbout] = useState('');
  const [img, setImg] = useState('#');

  const [countUsers, setCountUsers] = useState(0);
  const [output, setOutput] = useState([]);

  const [companyDirty, setCompanyDirty] = useState(false);
  const [positionDirty, setPositionDirty] = useState(false);

  const [companyError, setCompanyError] = useState('Can`t be empty');
  const [positionError, setPositionError] = useState('Can`t be empty');
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    if (window.localStorage.getItem('company') === null) {
      setCompany('');
    } else {
      setCompany(window.localStorage.getItem('company'));
    }

    if (window.localStorage.getItem('position') === null) {
      setPosition('');
    } else {
      setPosition(window.localStorage.getItem('position'));
    }

    if (window.localStorage.getItem('about') === null) {
      setAbout('');
    } else {
      setAbout(window.localStorage.getItem('about'));
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

  //--------------------------------------------------------------------------

  const settingCompany = e => {
    setCompany(e.target.value);
    if (e.target.value < 1) {
      setCompanyError('Can`t be empty');
    } else {
      e.target.style.backgroundColor = '#e2f0fd';
      setCompanyError('');
      localStorage.setItem('company', e.target.value);
    }
  };

  const settingPosition = e => {
    setPosition(e.target.value);
    if (e.target.value < 1 || e.target.value > 20) {
      setPositionError('Can`t be empty');
    } else {
      e.target.style.backgroundColor = '#e2f0fd';
      setPositionError('');
      localStorage.setItem('position', e.target.value);
    }
  };

  const settingAbout = e => {
    e.target.style.backgroundColor = '#e2f0fd';
    setAbout(e.target.value);
    localStorage.setItem('about', e.target.value);
  };

  const setImage = e => {
    const file = e.target.files[0];
    if (e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = e => {
        let image = e.target.result;
        localStorage.setItem('img', image);
        setImg(image);
      };
      reader.readAsDataURL(file);
    }
    //  else {
    //   localStorage.setItem("img", "#");
    // }
  };

  const blurHandler = e => {
    switch (e.target.name) {
      case 'company':
        setCompanyDirty(true);
        break;
      case 'position':
        setPositionDirty(true);
        break;
      default:
        break;
    }
  };

  const pushToLocal = () => {
    localStorage.setItem('company', company);
    localStorage.setItem('position', position);
    localStorage.setItem('about', about);
  };

  const previous = () => {
    pushToLocal();
    window.location.href = '/';
  };

  const submitted = e => {
    if (company && position && about) {
      setValidationError('');
      pushToLocal();
      askServer();
    } else {
      setValidationError('Empty fields');
    }
  };

  const next1 = e => {
    pushToLocal();
    // askServer();
    if (!company && !position && !about) {
      localStorage.clear();
    }
    e.target.parentElement.parentElement.style.display = 'none';
    e.target.parentElement.parentElement.nextElementSibling.style.display = '';
  };

  const next2 = () => {
    window.location.href = '/list';
  };
  //syuda propisat
  const nameOfDoc = localStorage.getItem(`id`);

  async function askServer() {
    // if (nameOfDoc) {
      await setDoc(doc(db, 'users', `${nameOfDoc}`), {
        firstName: localStorage.getItem(`firstName`),
        lastName: localStorage.getItem(`lastName`),
        dateOfBirth: localStorage.getItem(`dateOfBirth`),
        reportSubject: localStorage.getItem(`reportSubject`),
        phoneNumber: localStorage.getItem(`phoneNumber`),
        email: localStorage.getItem(`email`),
        company: localStorage.getItem(`company`),
        position: localStorage.getItem(`position`),
        about: localStorage.getItem(`about`),
        img: localStorage.getItem(`img`),
      });
      setCompany('');
      setPosition('');
      setAbout('');

      localStorage.clear();
    // }
  }

  return (
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
        <br />
        <FormGroup>
          {companyDirty && companyError && <div style={{ color: 'red' }}>{companyError}</div>}
          <Input
            onChange={settingCompany}
            onBlur={e => blurHandler(e)}
            type="text"
            name="company"
            id="exampleCompany"
            placeholder="Company"
            value={company}
          />
        </FormGroup>
        <br />
        <FormGroup>
          {positionDirty && positionError && <div style={{ color: 'red' }}>{positionError}</div>}
          <Input
            onChange={settingPosition}
            onBlur={e => blurHandler(e)}
            type="text"
            name="position"
            id="examplePosition"
            placeholder="Position"
            value={position}
          />
        </FormGroup>
        <br />
        <FormGroup>
          <Input
            onChange={settingAbout}
            type="textarea"
            name="about"
            id="exampleAbout"
            placeholder="Tell us about you"
            value={about}
          />
        </FormGroup>
        <br />
        <FormGroup>
          <Input type="file" name="image" id="exampleFile" onChange={setImage} />
          <FormText color="muted">You can add your PNG file</FormText>
        </FormGroup>
        <br />
        {validationError && <div style={{ color: 'red' }}>{validationError}</div>}
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Button onClick={previous} style={{ width: '100px' }}>
            Previous
          </Button>
          <Button onClick={submitted} style={{ width: '100px', background: 'green' }}>
            Submit
          </Button>{' '}
          <Button onClick={next1} style={{ width: '100px' }}>
            Next
          </Button>
        </div>
      </Form>
      <div style={{ display: 'none' }}>
        <h2>“Check out this Meetup with SoCal! ”</h2>
        <br />
        <ul
          className="social-icons"
          style={{
            display: 'flex',
            listStyleType: 'none',
            justifyContent: 'space-around',
          }}
        >
          <li>
            <a href="http://www.facebook.com">
              <img src={fbIcon} alt="socialIcon" style={{ width: '150px', height: '100px' }} />
            </a>
          </li>
          <li>
            <a href="http://www.twitter.com">
              <img src={twIcon} alt="socialIcon" style={{ width: '100px', height: '100px' }} />
            </a>
          </li>
          <li>
            <a href="http://www.gmail.com">
              <img src={gmailIcon} alt="socialIcon" style={{ width: '160px', height: '100px' }} />
            </a>
          </li>
        </ul>
        <br />
        <Button onClick={next2} style={{ width: '100px' }}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default RegForm2;
