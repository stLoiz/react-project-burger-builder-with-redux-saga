import React from 'react';

//webpack handles the image with a module added to webpack config  and it will handle the image
// and copy it over to the destination directory it creates only in memory during development
//and will optimize  the image. The burgerLog will receive the path of the image where webpack will copy it to.
import burgerLogo from '../assets/images/burger-logo.png';
import classes from './Logo.module.css';

const logo = () => (
  <div className={classes.Logo}>
    <img src={burgerLogo} alt="MyBurger"></img>
  </div>
);

export default logo;
