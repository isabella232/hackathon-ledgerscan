import styles from '../../styles/Home.module.css'
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import * as trans from './model'

type Row = {
    name: string
    value: string
}

  // An array of 12 items - each mapped to a row in the table.
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
    <span>PENDING</span>
  </div>
)
}

export const Transaction = (tx: any): React.ReactElement => {

        const props = tx as trans.TX;
        return (
          <div>
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
