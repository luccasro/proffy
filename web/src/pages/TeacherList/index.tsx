import React, { useState, FormEvent, useEffect } from 'react';

import PageHeader from 'components/PageHeader';
import TeacherItem, { Teacher } from 'components/TeacherItem';
import Input from 'components/Input';
import Select from 'components/Select';

import api from 'services/api';

import { subjects } from 'utils/subjects';
import { week_days } from 'utils/week_days';
import './styles.css';

function TeacherList() {
  const [teachers, setTeachers] = useState([]);

  const [subject, setSubject] = useState('all');
  const [week_day, setWeekDay] = useState('all');
  const [time, setTime] = useState('');

  async function searchTeachers(e?: FormEvent) {
    e?.preventDefault();

    const response = await api.get('classes', {
      params: {
        subject,
        week_day,
        time,
      },
    });

    setTeachers(response.data);
  }
  useEffect(() => {
    searchTeachers();
  }, []);

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="These are the proffys available.">
        <form id="search-teachers" onSubmit={searchTeachers}>
          <Select
            name="subject"
            label="Subject"
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value);
            }}
            options={[{ value: 'all', label: 'All' }, ...subjects]}
          />
          <Select
            name="week_day"
            label="Day of the week"
            value={week_day}
            onChange={(e) => {
              setWeekDay(e.target.value);
            }}
            options={[{ value: 'all', label: 'All' }, ...week_days]}
          />
          <Input
            type="time"
            name="time"
            label="Time"
            value={time}
            onChange={(e) => {
              setTime(e.target.value);
            }}
          />
          <button type="submit">Search</button>
        </form>
      </PageHeader>
      <main>
        {teachers.map((teacher: Teacher) => {
          return <TeacherItem key={teacher.id} teacher={teacher} />;
        })}
      </main>
    </div>
  );
}

export default TeacherList;
