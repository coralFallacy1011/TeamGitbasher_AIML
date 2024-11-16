import React from 'react';
import 'D:/Akshat/RVCE/Extracurriculars/Gitbashers/jmss/jmss/src/styles/HomePage.css';
import mainpic from 'D:/Akshat/RVCE/Extracurriculars/Gitbashers/jmss/jmss/src/resources/pic.png';
import mainpic2 from 'D:/Akshat/RVCE/Extracurriculars/Gitbashers/jmss/jmss/src/resources/pic2.png';
import harshit from 'D:/Akshat/RVCE/Extracurriculars/Gitbashers/jmss/jmss/src/resources/harshit.png';
import arya from 'D:/Akshat/RVCE/Extracurriculars/Gitbashers/jmss/jmss/src/resources/arya.png';
import amol from 'D:/Akshat/RVCE/Extracurriculars/Gitbashers/jmss/jmss/src/resources/amol.png';
import akshat from 'D:/Akshat/RVCE/Extracurriculars/Gitbashers/jmss/jmss/src/resources/akshat.png';
import { Sidebar } from './Sidebar';
import { useHref } from 'react-router-dom';

const sendProfile = () => {
  window.location.href = "./login"
};

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <Sidebar />
      <div className="content">
        <section className='sec1'>
          <img src = {mainpic} alt='mainpic' className='mainpic1' />
          <h1>TEAM GITBASHERS</h1>
        </section>
        <section className='sec2'>
          <img src = {mainpic2} alt="mainpic2" className='mainpic2'/>
          <h2>Who We Are</h2>
          <p>We are a platform committed to helping individuals find their dream jobs effortlessly.</p>
        </section>
        <section className='sec3'>
          <h3>What We Have Done</h3>
          <p className='p3'>Successfully matched thousands of candidates to their desired roles.</p>
        </section>
        <section className='sec4'>
          <h4>Meet our Team</h4>
          <div className = 'container'>
            <img src = {harshit} className='crop' alt=''/>
            <img src = {akshat} className='crop' alt=''/>
            <img src = {amol} className='crop' alt=''/>
            <img src = {arya} className='crop' alt=''/>
          </div>
          <div className='container'>
            <p className='arranged-text'>Harshit Saroha</p>
            <p className='arranged-text'>Akshat Gupta</p>
            <p className='arranged-text'>Amol Vyas</p>
            <p className='arranged-text'>Akshat Arya</p>
          </div>
        </section>
        <section className='sec5'>
          <button className='btn' onClick={sendProfile}>Get Started</button>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
