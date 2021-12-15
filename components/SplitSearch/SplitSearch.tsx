import { SelectInput, SearchInput, SplitInput } from '@ledgerhq/react-ui'
import * as React from 'react'
import { Props } from '@ledgerhq/react-ui/components/form/SplitInput'
import {Props as SelectInputProps} from '@ledgerhq/react-ui/components/form/SelectInput'
import FlexBox from "@ledgerhq/react-ui/components/layout/Flex";
import { components, StylesConfig } from "react-select";
import { selectCoins } from '../../modules/coins';

const options = selectCoins.map(c => ({
  value: c, 
  label: c
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
  const [leftValue1, setLeftValue1] = React.useState<Option | null>(options[0]);
  const [rightValue1, setRightValue1] = React.useState<string>("");
  return (
    <FlexBox className="split-search-container" flexDirection="row" rowGap={3} maxWidth="600px">
      <SplitInput
        renderLeft={(props: SelectInputProps<Option>) => (
          <SelectInput
            value={leftValue1}
            options={options}
            placeholder="Coin"
            unwrapped
            onChange={setLeftValue1}
            components={{
              Control: components.Control,
            }}
            styles={selectStyles}
            {...props}
          />
        )}
        renderRight={() => (
          <SearchInput
            value={rightValue1}
            placeholder="Address"
            textAlign="right"
            unwrapped
            onChange={setRightValue1}
          />
        )}
      />
    </FlexBox>
  );
};

export default SplitSearch;
