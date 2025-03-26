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
      minHeight={400}
      maxHeight={400}
      padding={4}
      paddingTop={2}
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
        color={'green.600/90'}
        fontWeight={'semibold'}
        fontSize={14}
        whiteSpace={'pre-wrap'}
        lineHeight={'shorter'}
      >
        {children}
      </Box>
    </Box>
  );
};
