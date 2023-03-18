import React from 'react';

import styles from './Footer.module.css';

function Footer() {
  return (
    <div className={ styles.footer }>
      <h3>This is just a exercise</h3>
      <h5>Based on <a href="https://www.udemy.com/course/react-do-zero-a-maestria-c-hooks-router-api-projetos/" target="_blank" rel="noreferrer">Hora de Codar</a> course at Udemy</h5>
      <p>Mini Blog &copy; 2023</p>
    </div>
  )
};

export default Footer;
