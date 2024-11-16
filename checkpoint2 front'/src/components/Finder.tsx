import React, { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import 'D:/Akshat/RVCE/Extracurriculars/Gitbashers/jmss/jmss/src/styles/finder.css';

const Finder: React.FC = () => {
  const randomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const [flashcardColor, setFlashcardColor] = useState(randomColor);
  const flashcards = [
    {
      jobTitle: 'Software Engineer',
      description: 'Work on cutting-edge technologies to build scalable software solutions.',
      companyName: 'TechCorp',
      exp: '0',
      skills: 'Java',
    },
    {
      jobTitle: 'Data Analyst',
      description: 'Analyze complex datasets to derive actionable insights for businesses.',
      companyName: 'DataSolve',
      exp: '4',
      skills: 'Numpy, Pandas',
    },
    {
      jobTitle: 'Project Manager',
      description: 'Coordinate and oversee multiple projects to ensure timely delivery.',
      companyName: 'ManagePro',
      exp: '2',
      skills: 'Management',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');

  const handlePrevious = () => {
    setSlideDirection('left');
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? flashcards.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setSlideDirection('right');
    setCurrentIndex((prevIndex) => (prevIndex === flashcards.length - 1 ? 0 : prevIndex + 1));
  };

  useEffect(() => {
    setFlashcardColor(randomColor());
  }, [currentIndex]);

  return (
    <div className="Finder">
      <Sidebar />
      <div className="finder-content">
        <section className="sec1">
          <h1>Featured Jobs</h1>
        </section>
        <div className="flashcard-container">
          <button className="arrow-button" onClick={handlePrevious}>
            &lt;
          </button>
          <div className={`flashcard-wrapper ${slideDirection}`}>
            <div className="flashcard" style={{ backgroundColor: flashcardColor }}>
              <h2>{flashcards[currentIndex].jobTitle}</h2>
              <p>{flashcards[currentIndex].description}</p>
              <h4>Company: {flashcards[currentIndex].companyName}</h4>
              <h4>Experience: {flashcards[currentIndex].exp}</h4>
              <h4>Skills: {flashcards[currentIndex].skills}</h4>
            </div>
          </div>
          <button className="arrow-button" onClick={handleNext}>
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Finder;
