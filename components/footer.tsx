import React from 'react';
import { Text, Link } from '@chakra-ui/react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <Text
      as="p"
      w="full"
      textAlign={'center'}
      fontSize={'.8em'}
      fontWeight={'light'}
      marginTop={50}
      fontFamily={'sora'}
      color="gray.600"
      mx={'auto'}
    >
      © {currentYear} by {'   '}
      <Link
        href="https://x.com/AliRhou17481"
        color="tomato"
        style={{ textDecoration: 'none' }}
        target="_blankhttps://scribehow.com/scribe-ai"
      >
        Ali
      </Link>
      , All Rights Reserved.
    </Text>
  );
};

export default Footer;
