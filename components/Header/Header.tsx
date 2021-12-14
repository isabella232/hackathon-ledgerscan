import {Header as LedgerHeader} from '@ledgerhq/react-ui';
import React from "react";
import SplitSearch from '../SplitSearch/SplitSearch'
import styles from '../../styles/Home.module.css'

export const Header = (): JSX.Element => {
  const left = (<p>LOGO</p>);
  const right = (<SplitSearch/>)
    
  return (
    <LedgerHeader left={left} right={right} />
  );
};

export default Header