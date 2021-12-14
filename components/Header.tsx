import {Icon, Text, Flex} from '@ledgerhq/react-ui';
import React from "react";

export const Header = (): JSX.Element => {
  return (
      <span >
      <Flex backgroundColor="black" alignItems="center" justifyContent="space-evenly" flexDirection="row">
          
        <Icon name="ArrowLeft" weight="Medium" />
        <Text fontWeight="semiBold" variant={"paragraph"}>
        Ledger
      </Text>
      <Icon name="ArrowRight" weight="Medium" />
      </Flex>
      </span>
  );
};

export default Header