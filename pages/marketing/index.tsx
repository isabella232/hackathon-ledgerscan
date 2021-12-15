import { Flex } from "@ledgerhq/react-ui";
import Image from "next/image";
import styled from "styled-components";

const Banner = styled.div`
    position: relative;
    height: 300px;
`
const SupportedCoins = styled.div`
position: relative;
    width: 100%;
    height: 300px;
`
const Features = styled.div`
position: relative;
    width: 100%;
    height: 300px;
`
const BelowBanner = styled.div`
    width: 100%;
    position: relative;
    height: 300px;
`

export default function Marketing(){
    return <Flex flex={1} flexDirection="column" width="100%">
        <Banner>
            <Image 
                src="/assets/marketHack/banner.svg" 
                layout={'fill'} 
                objectFit={'contain'} 
                alt=""
            />
        </Banner>
        <BelowBanner>
            <Image 
                src="/assets/marketHack/below_banner_strip.svg" 
                layout={'fill'} 
                objectFit={'contain'} 
                alt=""
            />
        </BelowBanner>
        <Features>
            <Image 
                src="/assets/marketHack/features.svg" 
                layout={'fill'} 
                objectFit={'contain'} 
                alt=""
            />
        </Features>
        <SupportedCoins>
            <Image 
                src="/assets/marketHack/supported_coins_strip.svg" 
                layout={'fill'} 
                objectFit={'contain'} 
                alt=""
            />
        </SupportedCoins>
    </Flex>
}