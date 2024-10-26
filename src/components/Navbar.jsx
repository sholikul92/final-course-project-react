import { Box, Flex, Text, Link } from '@chakra-ui/react';
import { Link as LinkTo } from 'react-router-dom';

const NavBar = () => {
  return (
    <Box py={2} px={4} bg={'blue.600'} position={'fixed'} top={0} left={0} right={0} zIndex={1}>
      <Flex justify={'space-between'}>
        <Text textColor='white' fontSize={'2xl'} fontWeight={'bold'} data-testid='home-page' as={LinkTo} to='/'>
          Student Portal
        </Text>
        <Flex gap={8} textColor={'white'} alignItems={'center'}>
          <Link as={LinkTo} to='/student' data-testid='student-page'>
            All Student
          </Link>
          <Link as={LinkTo} to='/add' data-testid='add-page'>
            Add Student
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default NavBar;
