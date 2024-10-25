import { Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Button as={Link} to='student' data-testid='student-btn' variant='outline' colorScheme='blue'>
      All Student
    </Button>
  );
};

export default Home;
