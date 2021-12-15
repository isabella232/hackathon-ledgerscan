import styles from '../../styles/Home.module.css'
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import {Button, Text} from '@ledgerhq/react-ui'
import * as trans from './model'
import TxStatus from '../Transaction/TxStatus';
import {CopyButton} from '../Transaction/CopyButton'
import "@ledgerhq/react-ui/assets/fonts";

type Row = {
    name: string
    value: string
    copy?: boolean
}

const ETHPrice = 3878.46

function ago(timestamp: string): string {
  const ms = Date.now() - Date.parse(timestamp)  
  const days: number = Math.floor(ms / (1000 * 60 * 60 * 24));
  const hours: number = Math.floor(ms / (1000 * 60 * 60));
  const minutes: number = Math.floor(ms / (1000 * 60));
  const seconds: number = Math.ceil(ms / (1000));

  let hl = ""
  if (days == 0 && hours == 0 && minutes == 0 && seconds > 0) hl = "A few seconds ago"
  else if (days == 0 && hours == 0 && minutes == 1) hl =`${minutes} minute ago`
  else if (days == 0 && hours == 0) hl =`${minutes} minutes ago`
  else if (days === 0 && hours == 1) hl = `${hours} hours ago`
  else if (days == 1) `1 day ago`
  else  hl = `${days} days ago`


  return `(${hl}) ${timestamp}`
}

const rows = (tx: trans.BtcTransaction): Row[] => [
    {name: 'Transaction Hash', value: tx.hash, copy: true},
    {name: 'Senders', value: stringOrZero(tx.inputs.length) },
    {name: 'Recipients', value: stringOrZero(tx.outputs.length)}
]

function stringOrZero(x: number) { 
  return !!x ? x.toString() : "0"
}

function received(tx: trans.BtcTransaction) { 
  return !!tx.inputs ? tx.inputs.reduce((sum, current) => sum + current.value, 0) : 0;
}

function sent(tx: trans.BtcTransaction) { 
  return !!tx.outputs ? tx.outputs.reduce((sum, current) => sum + current.value, 0) : 0;
}

export const BtcTx = (tx: any): React.ReactElement => {
  const props = tx as trans.BtcTransaction; //nasty

  return (
    <div className={styles.transaction}>

    <div className={styles.confirmation}>
          <Text>{`${received(props)} BTC`}</Text>
          <Text>{ago(props.received_at)}</Text>
        <TxStatus status={props.confirmations > 6} ok="SUCCESS" ko="PENDING" />
        {/* {!!status && <TxStatus confirmed={status} ok="SUCCESS" ko="PENDING" />} */}
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            {rows(props).map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell className={styles.tableCell} component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell className={styles.tableCell} align="right">{row.value}</TableCell>
                {/* <TableCell className={styles.lastCell} align="right">{!!row.copy ? <CopyButton text={row.value}/> : null}</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default BtcTx
