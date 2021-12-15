import { Link, Flex, Text } from '@ledgerhq/react-ui'
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
    <FooterLink href="/marketing">
      <Text variant='paragraph'>Explorer as a Service</Text>
    </FooterLink>
    <FooterLink href="https://www.ledger.com">
      <Text variant='paragraph'>Ledger.com</Text>
    </FooterLink>
  </FooterZone>
);

export default Footer;