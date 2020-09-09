import React from 'react';

import whatsappIcon from 'assets/images/icons/whatsapp.svg';
import avatar from 'assets/images/avatar.png'; // Tell webpack this JS file uses this image

import './styles.css';

export interface Teacher {
  id: number;
  avatar: string;
  bio: string;
  cost: number;
  name: string;
  subject: string;
  whatsapp: string;
}

interface TeacherItemProps {
  teacher: Teacher;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
  return (
    <article className="teacher-item">
      <header>
        <img
          src={teacher.avatar || avatar}
          alt={teacher.name}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = avatar;
          }}
        />
        <div>
          <strong>{teacher.name}</strong>
          <span>{teacher.subject}</span>
        </div>
      </header>
      <p>{teacher.bio}</p>
      <footer>
        <p>
          Price per Hour
          <strong>€ {teacher.cost}</strong>
        </p>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://wa.me/${teacher.whatsapp}`}
        >
          <img src={whatsappIcon} alt="Whatsapp" />
          Get in touch
        </a>
      </footer>
    </article>
  );
};

export default TeacherItem;
