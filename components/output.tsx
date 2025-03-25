import React, { useEffect, useRef } from 'react';
import { Box } from '@chakra-ui/react';

type Props = {
  children: string | undefined;
};

export const Output: React.FC<Props> = ({ children }) => {
  const refBox = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elBox = refBox.current;
    if (elBox) {
      // scroll to bottom
      elBox.scrollTop = elBox.scrollHeight;
    }
  }, [children]);

  return (
    <Box
      ref={refBox}
      flex={2}
      overflow="auto"
      minHeight={350}
      maxHeight={350}
      paddingTop={'.2em'}
      padding={'.5em'}
      borderXWidth={1}
      borderBottomWidth={1}
      borderColor={'red.400'}
      _active={{
        outline: 'none'
      }}
      _focus={{
        outline: 'none'
      }}
    >
      <Box
        as="pre"
        fontFamily={'Inconsolata'}
        color={'gray.700'}
        fontSize={'1em'}
        whiteSpace={'pre-wrap'}
        lineHeight={'shorter'}
      >
        {children}
      </Box>
    </Box>
  );
};
