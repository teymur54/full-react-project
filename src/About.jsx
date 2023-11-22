import React from 'react'
import kursantVideo from './Assets/Kursant.mp4'
import './About.css'

const About = () => {
  return (
    <div className='home-page'>
      <video src={kursantVideo} autoPlay loop muted></video>
    </div>
  )
}

export default About
