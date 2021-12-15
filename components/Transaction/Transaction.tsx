import styles from '../../styles/Home.module.css'
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Button, Flex, Text} from '@ledgerhq/react-ui'
import * as trans from './model'
import TxStatus from './TxStatus';
import {CopyButton} from './CopyButton'
import "@ledgerhq/react-ui/assets/fonts";
import styled from 'styled-components'

const MyButton = styled(Button)`
  margin-inline: 10px;
  margin-inline-end: 0px;
`

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

const rows = (tx: trans.TX): Row[] => [
    {name: 'Timestamp', value: ago(tx.received_at)},
    {name: 'Value', value: toEth(tx.value) },
    {name: 'From', value: tx.from, copy: true },
    {name: 'To', value: tx.to, copy: true },
    {name: 'Transaction Fee', value: toEth(tx.gas_used * tx.gas_price) },
    {name: 'Ethereum Price', value: "$3,878.47" },
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

const Confirmation = (confirmations: number, address: string, status?: boolean) => {
  return (
    <div className={styles.confirmation}>
      <div>
        <Text>{confirmations} CONFIRMATIONS</Text> 
        <div className={styles.txHash}>
          <Text>{address}</Text> 
          <CopyButton text={address}/>
        </div>
      </div>
      <TxStatus status={!!status} ok="SUCCESS" ko="PENDING" />

    </div>
)
}

export const Transaction = (tx: any): React.ReactElement => {
  const props = tx as trans.TX; //nasty
  return (
    <div className={styles.transaction}>
      <div className={styles.txHeader}>
        <div>TRANSACTION DETAILS</div>
        <Flex>  
          <MyButton variant="color" size={"small"} disabled={true} outline={false}>{"Stake"}</MyButton>
          <MyButton variant="color" size={"small"} disabled={false} outline={false}>{"Buy"}</MyButton>
          <MyButton variant="color" size={"small"} disabled={false} outline={false}>{"Swap"}</MyButton>
        </Flex>
      </div>
      {Confirmation(props.confirmations, props.hash, props.status == 1)}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            {rows(props).map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell className={styles.tableCell} component="th" scope="row">
                  <Text>{row.name}</Text>
                </TableCell>
                <TableCell className={styles.tableCell} align="right">
                  <Text style={{ marginRight: !!row.copy ? '10px' : '0px'}}>{row.value}</Text>
                  {!!row.copy && <CopyButton text={row.value}/>}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Transaction
