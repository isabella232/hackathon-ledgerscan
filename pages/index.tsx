import type { NextPage } from 'next';
import React from "react";
import { Carousel, Flex } from "@ledgerhq/react-ui"
import { Logo } from '../components/Header/Header';
import SplitSearch from '../components/SplitSearch/SplitSearch';

const Home: NextPage = () => {
  return (
    <Flex flex={1} flexDirection={"column"} justifyContent={"space-around"} alignItems={"center"}>
      <Logo />

      <SplitSearch />

      <div style={{height: "180px", width: "700px"}}>
      <Carousel
        isDismissed={false}
        onDismiss={function noRefCheck(){}}
        queue={[
          {
            description: 'Enhance your security with the new ledger nano s Plus available now!',
            image: '/s-plus.png',
            onClick: function noRefCheck(){},
            title: 'NEW PRODUCT'
          },
          {
            description: 'Learn more about Crypto at the ledger academy',
            image: '/academy.png',
            onClick: function noRefCheck(){},
            title: 'BLOG'
          },
          {
            description: 'Deploy application on Ledger Scan: the ultimate multi-coin explorer',
            image: '/explorer.png',
            onClick: function noRefCheck(){},
            title: 'NEW SERVICE'
          },
          {
            description: 'Earn rewards by staking on multiple chains on Ledger Live',
            image: '/sampleSlide.png',
            onClick: function noRefCheck(){},
            title: 'EARN CRYPTO'
          }
        ]}
      />
      </div>
    </Flex>
  )
}

export default Home
