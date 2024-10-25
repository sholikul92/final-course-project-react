import { Link } from 'react-router-dom';
import { Box, Flex, Text, Button } from '@chakra-ui/react';

const NavBar = () => {
  return (
    <Box py={2} px={4} bg={'blue.600'} position={'fixed'} top={0} left={0} right={0} zIndex={1}>
      <Flex justify={'space-between'}>
        <Text textColor='white' fontSize={'2xl'} fontWeight={'bold'}>
          Student Portal
        </Text>
        <Flex gap={8}>
          <Button as={Link} to='/student' data-testid='student-page'>
            All Student
          </Button>
          <Button as={Link} to='/add' data-testid='add-page'>
            Add Student
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default NavBar;
