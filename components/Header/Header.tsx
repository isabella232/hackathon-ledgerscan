import {Header as LedgerHeader,Text, Log, Flex} from '@ledgerhq/react-ui';
import styled from 'styled-components';
import SplitSearch from '../SplitSearch/SplitSearch'

export const LedgerLog = styled(Log).attrs(() => ({
  width: "150px"
}))`
`
export const ScanPart = styled(Text)`
  line-height: 48px;
  font-size: 28px;
  padding-left: 15px;
` 

export const Logo = (): JSX.Element  => {
  return <Flex flexDirection={"row"}>
    <LedgerLog>LEDGER</LedgerLog>
    <ScanPart>SCAN</ScanPart>
  </Flex>
}

export const HeaderZone = styled(Flex)`
  width: 100%;
  height: 96px;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid ${(p) => p.theme.colors.neutral.c40};
`
export const HeaderContent = styled(LedgerHeader)`
  width: 1000px;
`

export const Header = (): JSX.Element => {   
  return (
    <HeaderZone>
      <HeaderContent
        left={<Logo />} 
        right={<SplitSearch />} 
      />
    </HeaderZone>
  );
};

export default Header