import React from 'react';
import 'D:/Akshat/RVCE/Extracurriculars/Gitbashers/jmss/jmss/src/styles/HomePage.css';
import mainpic from 'D:/Akshat/RVCE/Extracurriculars/Gitbashers/jmss/jmss/src/resources/pic.png';
import { Sidebar } from './Sidebar';


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
          <h2>Who We Are</h2>
          <p>We are a platform committed to helping individuals find their dream jobs effortlessly.</p>
        </section>
        <section>
          <h2>What We Have Done</h2>
          <p>Successfully matched thousands of candidates to their desired roles.</p>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
