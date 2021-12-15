import React, {useState} from "react";
import {Button} from '@ledgerhq/react-ui'
import {CopyLight} from "@ledgerhq/icons-ui/react"
import styles from '../../styles/Home.module.css'


export interface Props {
  text: string;
}


function copyToClipboard(e: Event, data: string): void {
  null
}

export const CopyButton = (props: Props): JSX.Element => {

  const [text, setText] = useState<string>(props.text)


  return <button className={styles.copyButton}>
    <CopyLight/>
    </button>
  {/* return <Button Icon={CopyLight} variant="color" size={"small"} disabled={false} outline={false} onClick={(e) => copyToClipboard(e, text)}/> */}
    
};

export default CopyButton