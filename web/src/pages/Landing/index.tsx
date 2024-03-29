import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import logoImg from 'assets/images/logo.svg';
import landingImg from 'assets/images/landing.svg';

import studyIcon from 'assets/images/icons/study.svg';
import giveClassesIcon from 'assets/images/icons/give-classes.svg';
import purpleHeartIcon from 'assets/images/icons/purple-heart.svg';

import api from 'services/api';

import './styles.css';

function Landing() {
  const [totalClasses, setTotalClasses] = useState(0);

  useEffect(() => {
    api.get('classes/total').then((response) => {
      const { total } = response.data;

      setTotalClasses(total);
    });
  }, []);

  return (
    <div id="page-landing">
      <div id="page-landing-content" className="container">
        <div className="logo-container">
          <img src={logoImg} alt="Proffy" />
          <h2>Your online learning platform.</h2>
        </div>
        <img src={landingImg} alt="Study platform" className="hero-image" />
        <div className="buttons-container">
          <Link to="/learn" className="study">
            <img src={studyIcon} alt="learn" />
            Learn
          </Link>
          <Link to="/teach" className="give-classes">
            <img src={giveClassesIcon} alt="Teach" />
            Teach
          </Link>
        </div>
        <span className="total-classes">
          A total of {totalClasses} classes available
          <img src={purpleHeartIcon} alt="Purple heart" />
        </span>
      </div>
    </div>
  );
}

export default Landing;
