import {Icon, Text, Flex} from '@ledgerhq/react-ui';
import React from "react";
import SplitSearch from '../SplitSearch/SplitSearch'
import styles from '../../styles/Home.module.css'

  export const Header = (): JSX.Element => {
  return (
    <div className={styles.header}>
      <Flex flexGrow={2} flexDirection="row" alignItems="right" justifyContent="space-evenly" >
        <Text fontWeight="semiBold" variant={"paragraph"}>
          Ledger
      </Text>
      <SplitSearch />
      </Flex>
      </div>
  );
};

export default Header