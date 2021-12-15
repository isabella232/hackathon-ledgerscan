import {Header as LedgerHeader,Text, Log, Flex} from '@ledgerhq/react-ui';
import styled from 'styled-components';
import SplitSearch from '../SplitSearch/SplitSearch'
import { useRouter } from 'next/router';

const LedgerLog = styled(Log).attrs(() => ({
  width: "180px"
}))`
`
const ScanPart = styled(Text)`
  line-height: 48px;
  font-size: 28px !important;
  padding-left: 15px;
` 

export const Logo = ({header}: {header?: boolean}): JSX.Element  => {
  const router = useRouter()

  return <Flex flexDirection={"row"}
    style={{ cursor: header ? "pointer" : "inherit" }}
    onClick={() => header && router.push('/')}
  >
    <LedgerLog>LEDGER</LedgerLog>
    <ScanPart variant='h4'>SCAN</ScanPart>
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
        left={<Logo header={true} />} 
        right={<SplitSearch />} 
      />
    </HeaderZone>
  );
};

export default Header