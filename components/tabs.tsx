import React, { useState } from 'react';
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
      variant="outline"
      px={'lg'}
      bg={'#ff000009'}
      fontFamily={'sora'}
      onValueChange={(e: { value: string }) => onValueChange(e.value)}
    >
      <Tabs.List gap={0}>
        <Tabs.Trigger
          bg={'white'}
          w={'50%'}
          value="progress"
          textAlign={'center'}
          borderWidth={1}
          color={'gray.500'}
          borderBottomColor={'red.400'}
          mr="1px"
          _selected={{
            borderWidth: 1,
            color: 'gray.700',
            borderBottom: 'none',
            borderRightRadius: 'none',
            borderColor: 'red.400'
          }}
        >
          Progress
        </Tabs.Trigger>
        <Tabs.Trigger
          bg={'white'}
          w={'50%'}
          value="result"
          borderWidth={1}
          color={'gray.500'}
          borderBottomColor={'red.400'}
          _selected={{
            borderWidth: 1,
            color: 'gray.700',
            borderBottom: 'none',
            borderLeftRadius: 'none',
            borderColor: 'red.400'
          }}
        >
          Result
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content p={0} value="progress">
        <Output>{progressOutput}</Output>
      </Tabs.Content>
      <Tabs.Content p={0} value="result">
        <Output>{resultOutput}</Output>
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default TabsUI;
