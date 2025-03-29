import React, { useState } from 'react';
import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';




function Home() {
  const navigate = useNavigate();

  return (
   <><Header /><Footer /></>
  );
}

export default Home;
