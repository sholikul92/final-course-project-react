import { Button, Flex, Box } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <Flex direction={'column'} h={'100vh'}>
      <Flex flex={1} justify={'center'} align={'center'}>
        <Button as={Link} to='student' data-testid='student-btn' variant='outline' colorScheme='blue'>
          All Student
        </Button>
      </Flex>
      <Footer />
    </Flex>
  );
};

export default Home;
