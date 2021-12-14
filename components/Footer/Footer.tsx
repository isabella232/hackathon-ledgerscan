import React from "react";
import styles from '../../styles/Home.module.css'
import {Flex, Link} from '@ledgerhq/react-ui'

const Footer = () => (
  <div className={styles.footer}>
      <a href="http://www.google.com" className={styles.footerItem}>Explorer as a Service</a>
      <a href="https://www.ledger.com" className={styles.footerItem}>Ledger.com</a>
  </div>
);

export default Footer;