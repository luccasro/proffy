import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import PageHeader from 'components/PageHeader';
import Input from 'components/Input';
import Textarea from 'components/Textarea';
import Select from 'components/Select';

import warningIcon from 'assets/images/icons/warning.svg';

import api from 'services/api';

import { subjects } from 'utils/subjects';
import { week_days } from 'utils/week_days';
import './styles.css';

function TeacherForm() {
  const history = useHistory();

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');

  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');

  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: '', to: '' },
  ]);

  function addNewScheduleItem() {
    setScheduleItems([...scheduleItems, { week_day: 0, from: '', to: '' }]);
  }

  function removeScheduleItem(index: number) {
    const newScheduleItems = [...scheduleItems];
    newScheduleItems.splice(index, 1);
    setScheduleItems(newScheduleItems);
  }

  function setScheduleItemValue(
    position: number,
    field: string,
    value: string,
  ) {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return { ...scheduleItem, [field]: value };
      }

      return scheduleItem;
    });

    setScheduleItems(updatedScheduleItems);
  }

  function handleCreateClass(e: FormEvent) {
    e.preventDefault();

    api
      .post('classes', {
        name,
        avatar,
        whatsapp,
        bio,
        subject,
        cost: Number(cost),
        schedule: scheduleItems,
      })
      .then(() => {
        alert('Class created successfully!');

        history.push('/learn');
      })
      .catch(() => {
        alert('Error on creating class!');
      });
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="How awesome that you want to teach!"
        description="The first step is to complete this registration form."
      />
      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Your Information</legend>
            <Input
              name="name"
              label="Full Name*"
              value={name}
              required
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <Input
              name="avatar"
              label="Avatar URL"
              value={avatar}
              onChange={(e) => {
                setAvatar(e.target.value);
              }}
            />
            <Input
              name="whatsapp"
              label="WhatsApp*"
              value={whatsapp}
              required
              onChange={(e) => {
                setWhatsapp(e.target.value);
              }}
            />
            <Textarea
              name="bio"
              label="Biography"
              value={bio}
              onChange={(e) => {
                setBio(e.target.value);
              }}
            />
          </fieldset>
          <fieldset>
            <legend>About the class</legend>
            <Select
              name="subject"
              label="Subject*"
              required
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
              }}
              options={subjects}
            />
            <Input
              name="cost"
              label="Hourly rate per class*"
              value={cost}
              required
              onChange={(e) => {
                setCost(e.target.value);
              }}
            />
          </fieldset>
          <fieldset>
            <legend>
              Available Time Slots
              <div>
                <button type="button" onClick={addNewScheduleItem}>
                  + New Time Slot
                </button>
              </div>
            </legend>
            {scheduleItems.map((scheduleItem, index) => {
              return (
                <div key={scheduleItem.week_day} className="schedule-item">
                  <Select
                    name="week_day"
                    label="Day of the week*"
                    value={scheduleItem.week_day}
                    required
                    onChange={(e) =>
                      setScheduleItemValue(index, 'week_day', e.target.value)
                    }
                    options={week_days}
                  />
                  <Input
                    name="from"
                    label="From*"
                    type="time"
                    value={scheduleItem.from}
                    required
                    onChange={(e) =>
                      setScheduleItemValue(index, 'from', e.target.value)
                    }
                  />
                  <div>
                    <Input
                      name="to"
                      label="To*"
                      type="time"
                      value={scheduleItem.to}
                      required
                      onChange={(e) =>
                        setScheduleItemValue(index, 'to', e.target.value)
                      }
                    />
                    {index !== 0 && (
                      <div className="remove-schedule">
                        <button
                          type="button"
                          onClick={() => removeScheduleItem(index)}
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </fieldset>
          <footer>
            <p>
              <img src={warningIcon} alt="Important warning" />
              Important! <br />
              Complete all the required(*) fields.
            </p>
            <button type="submit">Create class</button>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default TeacherForm;
