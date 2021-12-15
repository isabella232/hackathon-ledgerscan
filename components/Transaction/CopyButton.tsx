import React, {useState} from "react";
import {Button} from '@ledgerhq/react-ui'
import { CopyMedium } from "@ledgerhq/icons-ui/react"
import styles from '../../styles/Home.module.css'


export interface Props {
  text: string;
}


function copyToClipboard(e: Event, data: string): void {
  data.select()
  document.clipboard = data
  .setData("Text", text);
  document.execCommand('copy')
}

export const CopyButton = (props: Props): JSX.Element => {

  const [text, setText] = useState<string>(props.text)

  return <Button Icon={CopyMedium} variant="color" size={"small"} disabled={false} outline={false} onClick={(e) => copyToClipboard(e, text)}/>
    
};

export default CopyButton