import { Box, Text, Center } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box className='footer' background={'blue.600'} color={'white'} py={2}>
      <Text className='studentName'>
        <Center>Sholikul Ardian</Center>
      </Text>
      <Text className='studentId'>
        <Center>FS11861819</Center>
      </Text>
    </Box>
  );
};

export default Footer;
