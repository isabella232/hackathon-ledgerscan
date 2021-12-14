import styles from '../../styles/Home.module.css'
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Button} from '@ledgerhq/react-ui'
import * as trans from './model'
import TxStatus from './TxStatus';

type Row = {
    name: string
    value: string
}

const rows = (tx: trans.TX): Row[] => [
    {name: 'Timestamp', value: tx.received_at },
    {name: 'Value', value: tx.value.toString() },
    {name: 'From', value: tx.from },
    {name: 'To', value: tx.to },
    {name: 'Transaction Fee', value: tx.gas_used.toString() },
    {name: 'Ethereum Price', value: "not sure" },
    {name: 'Gas Limit', value: tx.max_fee_per_gas.toString() },
    {name: 'Gas Fees', value: tx.cumulative_gas_used.toString() },
    {name: 'Gas Price', value: "not sure" },
]

const confirmation = (transactions: number, total: number, address: string) => {
return (
  <div className={styles.confirmation}>
    <div>
      <p>{transactions}/{total} CONFIRMATIONS</p> 
      <p>{address}</p>
    </div>
    <TxStatus confirmed={transactions == total} />
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
      {confirmation(props.confirmations, 1231231, props.hash)}
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Transaction
