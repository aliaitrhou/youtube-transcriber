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
      px={'lg'}
      fontFamily={'sora'}
      onValueChange={(e: { value: string }) => onValueChange(e.value)}
      borderWidth={1}
      borderColor={'black'}
    >
      <Tabs.List gap={0}>
        <Tabs.Trigger
          bg={'white'}
          w={'50%'}
          value="progress"
          textAlign={'center'}
          borderRightWidth={1}
          borderBottomWidth={0.8}
          borderColor={'black'}
          color="gray.500"
          _selected={{
            color: 'black',
            borderBottomWidth: 2,
            borderBottomColor: 'black'
          }}
        >
          Progress
        </Tabs.Trigger>
        <Tabs.Trigger
          bg={'white'}
          w={'50%'}
          value="result"
          borderRightWidth={0.8}
          borderBottomWidth={0.8}
          borderColor={'black'}
          color="gray.500"
          _selected={{
            color: 'black',
            borderBottomWidth: 2,
            borderBottomColor: 'black'
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
