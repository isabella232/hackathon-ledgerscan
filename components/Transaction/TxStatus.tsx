import React from "react";
import styles from '../../styles/Home.module.css'


export interface Props {
  confirmed: boolean;
}

export const TxStatus = (props: Props): JSX.Element => {

  if (props.confirmed) { 
      return (<div className={styles.txStatusConfirmed}>{"CONFIRMED"}</div>)
  } else return (<div className={styles.txStatusPending}>{"PENDING"}</div> )
    
};

export default TxStatus