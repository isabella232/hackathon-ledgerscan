import {Header as LedgerHeader} from '@ledgerhq/react-ui';
import SplitSearch from '../SplitSearch/SplitSearch'

export const Header = (): JSX.Element => {
  const left = <p>LOGO</p>
  const right = <SplitSearch/>
    
  return (
    <LedgerHeader left={left} right={right} />
  );
};

export default Header