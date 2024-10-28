import { Box, Text, Center } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box className='footer' as='footer' background={'blue.600'} color={'white'} py={2}>
      <Center>
        <Text className='studentName'>Sholikul Ardian</Text>
      </Center>
      <Center>
        <Text className='studentId'>FS11861819</Text>
      </Center>
    </Box>
  );
};

export default Footer;
