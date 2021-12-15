import { Link, Flex } from '@ledgerhq/react-ui'
import styled from 'styled-components';

const FooterZone = styled(Flex)`
  width: 100%;
  display: flex;
  border-top: 1px solid ${(p) => p.theme.colors.neutral.c40};
  justify-content: center;
  align-items: center;
`

const FooterLink = styled(Link)`
  padding: 30px 40px;
`

const Footer = () => (
  <FooterZone>
    <FooterLink href="http://www.google.com">
      Explorer as a Service
    </FooterLink>
    <FooterLink href="https://www.ledger.com">
      Ledger.com
    </FooterLink>
  </FooterZone>
);

export default Footer;