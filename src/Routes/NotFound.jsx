import { useNavigate } from 'react-router-dom';
import { Text, Flex, Button } from '@chakra-ui/react';

const NotFound = () => {
  const navigate = useNavigate();
  const back = () => {
    navigate(-1);
  };

  return (
    <Flex justify={'center'} alignItems={'center'} h={'100vh'} direction={'column'}>
      <Text>404 | Not Found</Text>
      <Button data-testid='back' onClick={back} bg={'gray.200'}>
        Back
      </Button>
    </Flex>
  );
};

export default NotFound;
