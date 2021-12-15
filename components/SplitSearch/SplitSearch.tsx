import { SelectInput, SearchInput, SplitInput } from '@ledgerhq/react-ui'
import * as React from 'react'
import {Props as SelectInputProps} from '@ledgerhq/react-ui/components/form/SelectInput'
import FlexBox from "@ledgerhq/react-ui/components/layout/Flex";
import { components, StylesConfig } from "react-select";
import { selectCoins, nameOf } from '../../modules/coins';
import { useRouter } from 'next/router';
import { peekCoins, searchInput, SearchLink } from '../../modules/explorer';

const options = selectCoins.map(c => ({
  value: c, 
  label: nameOf[c]
}))

const selectStyles: StylesConfig<Option> = {
  container: (provided, state) => ({
    ...provided,
    height: "100%",
    cursor: state.isDisabled ? "not-allowed" : "text",
    pointerEvents: undefined,
  }),
  control: (_, state) => ({
    display: "flex",
    alignItems: "center",
    height: "100%",
    padding: "0 20px",
    pointerEvents: state.isDisabled ? "none" : undefined,
  }),
};

type Option = typeof options[0];
export const SplitSearch = (): JSX.Element => {
  const router = useRouter()
  const [coin, setCoin] = React.useState<Option | null>(options[0]);
  const [input, setInput] = React.useState("");

  const pushLink = (link: SearchLink) => {
    console.log(link)
    switch(link.kind) {
      case "block":   router.push({pathname: `/[coin]/block/[block]`, query: {coin:link.coin, block:link.param}}); break
      case "tx":      router.push({pathname: `/[coin]/tx/[hash]`, query: {coin:link.coin, hash:link.param}}); break
      case "address": router.push({pathname: `/[coin]/account/[address]`, query: {coin:link.coin, address:link.param}}); break
    }
  }

  const pushMulipleLink = (links: SearchLink[]) => {
    console.log('push mulitple links', links)
    router.push({
      pathname: "/omni/[links]",
      query: { links: JSON.stringify(links) }
    })
  }

  const reset = () => {
    setCoin(options[0])
    setInput("")
  }

  const onSubmit = async (evt:any) => {
    if(evt.key === 'Enter'){
      console.log('enter press here! ')
      evt.preventDefault();
      let links = await peekCoins(searchInput({coin: coin ? coin.value : options[0].value, input}))
      reset()
      console.log('links', links)
      if(links.length === 0) {
        return
      }
      if(links.length === 1) {
        return pushLink(links[0])
      }
      return pushMulipleLink(links)
    }
  }

  return (
    <FlexBox 
      className="split-search-container" 
      flexDirection="row" 
      rowGap={3} 
      maxWidth="600px" 
      onKeyPress={onSubmit}
    >
      <SplitInput
        renderLeft={(props: SelectInputProps<Option>) => (
          <SelectInput
            value={coin}
            options={options}
            unwrapped
            onChange={setCoin}
            components={{
              Control: components.Control,
            }}
            styles={selectStyles}
            {...props}
          />
        )}
        renderRight={() => (
          <SearchInput
            value={input}
            placeholder="Address"
            textAlign="left"
            unwrapped
            onChange={(val: string) => {
              console.log('update', val);
              setInput(val)
            }}
          />
        )}
      />
    </FlexBox>
  );
};

export default SplitSearch;
