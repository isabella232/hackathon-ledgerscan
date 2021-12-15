import styles from '../../styles/Home.module.css'
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Button, StyleProvider} from '@ledgerhq/react-ui'
import * as trans from './model'
import TxStatus from './TxStatus';
import {CopyButton} from './CopyButton'
import "@ledgerhq/react-ui/assets/fonts";
// import {StyleProvider} from '"@ledgerhq/react-ui"'

type Row = {
    name: string
    value: string
    copy?: boolean
}

const ETHPrice = 3878.46

const rows = (tx: trans.TX): Row[] => [
    {name: 'Timestamp', value: tx.received_at },
    {name: 'Value', value: toEth(tx.value) },
    {name: 'From', value: tx.from, copy: true },
    {name: 'To', value: tx.to, copy: true },
    {name: 'Transaction Fee', value: toEth(tx.gas_used * tx.gas_price) },
    {name: 'Ethereum Price', value: "$3,878.46" },
    {name: 'Gas Limit', value: toGwei(tx.max_fee_per_gas)  },
    {name: 'Gas Fees', value: toGwei(tx.gas_used)},
    {name: 'Gas Price', value: toGwei(tx.gas_price) },
]

function toGwei(value: number): string {
  return !!value ? (value / 1000000000) + " Gwei" : "N/A"
}
function toEth(value: number): string {
  return !!value ? "ETH " + (value / 1000000000000000000) : "N/A"
}

const confirmation = (confirmations: number, address: string) => {
return (
  <div className={styles.confirmation}>
    <div>
      <p>{confirmations} CONFIRMATIONS</p> 
      <div className={styles.txHash}><p>{address}</p> <CopyButton text={address}/></div>
    </div>
    <TxStatus confirmed={confirmations > 24} />
  </div>
)
}

export const Transaction = (tx: any): React.ReactElement => {
  const props = tx as trans.TX; //nasty
  return (
    <div>
      <div className={styles.txHeader}>
        <div>TRANSACTION DETAILS</div>
        <div>  
          <Button variant="color" size={"small"} disabled={true} outline={false}>{"Stake"}</Button>
          <Button variant="color" size={"small"} disabled={false} outline={false}>{"Buy"}</Button>
          <Button variant="color" size={"small"} disabled={false} outline={false}>{"Swap"}</Button>
        </div>
      </div>
      {confirmation(props.confirmations, props.hash)}
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
                <TableCell className={styles.lastCell} align="right">{!!row.copy ? <CopyButton text={row.value}/> : null}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Transaction
