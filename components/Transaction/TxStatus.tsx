import React from "react";
import styles from '../../styles/Home.module.css'


export interface Props {
  confirmed: boolean;
  ok: string;
  ko: string;
}

export const TxStatus = (props: Props): JSX.Element => {

  if (props.confirmed) { 
      return (<div className={styles.txStatusConfirmed}>{props.ok}</div>)
  } else return (<div className={styles.txStatusPending}>{props.ko}</div> )
    
};

export default TxStatus