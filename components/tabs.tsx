import React from 'react';
import { Tabs } from '@chakra-ui/react';
import { Output } from './output';

interface Props {
  activeTab: string;
  onValueChange: (newValue: string) => void;
  progressOutput: string;
  resultOutput: string;
}

const TabsUI: React.FC<Props> = ({
  activeTab,
  progressOutput,
  onValueChange,
  resultOutput
}) => {
  return (
    <Tabs.Root
      defaultValue={activeTab}
      variant={'outline'}
      px={'lg'}
      fontFamily={'sora'}
      onValueChange={(e: { value: string }) => onValueChange(e.value)}
    >
      <Tabs.List>
        <Tabs.Trigger
          bg={'white'}
          w={'50%'}
          value="progress"
          textAlign={'center'}
          color="gray.400"
          borderWidth={1}
          borderColor={'gray.400'}
          borderBottomColor={'black'}
          borderRightColor={'black'}
          rounded={'none'}
          mr={0.2}
          _selected={{
            color: 'black',
            borderWidth: 1,
            borderColor: 'black',
            borderBottom: 'none'
          }}
        >
          Progress
        </Tabs.Trigger>
        <Tabs.Trigger
          bg={'white'}
          w={'50%'}
          value="result"
          borderBottomWidth={1}
          brderBottomColor={'black'}
          color="gray.400"
          borderWidth={1}
          borderColor={'gray.300'}
          borderBottomColor={'black'}
          rounded={'none'}
          _selected={{
            color: 'black',
            borderWidth: 1,
            borderColor: 'black',
            borderBottom: 'none',
            borderLeft: 'none'
          }}
        >
          Result
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content
        p={0}
        value="progress"
        _focus={{
          outline: 'none'
        }}
      >
        <Output>{progressOutput}</Output>
      </Tabs.Content>
      <Tabs.Content
        p={0}
        value="result"
        _focus={{
          outline: 'none'
        }}
      >
        <Output>{resultOutput}</Output>
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default TabsUI;
