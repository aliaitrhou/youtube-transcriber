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
      _focus={{
        outline: 'none'
      }}
      borderWidth={1}
      borderColor={'black'}
      borderTop={'none'}
    >
      <Box
        as="pre"
        fontFamily={'Inconsolata'}
        color={'black'}
        fontWeight={'bold'}
        fontSize={14}
        whiteSpace={'pre-wrap'}
        lineHeight={'shorter'}
      >
        {children}
      </Box>
    </Box>
  );
};
