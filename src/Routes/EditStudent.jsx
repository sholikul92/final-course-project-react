import { Box, Flex, FormControl, FormLabel, Input, VStack, Button, Select, Img, Text } from '@chakra-ui/react';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState, useEffect } from 'react';
import { chooseFaculty } from '../utils/chooseFaculty';
import { useNavigate, useParams } from 'react-router-dom';
import { optionProgramStudy } from '../utils/optionPrody';

const EditStudent = () => {
  const [student, setStudent] = useState({});
  const [faculty, setFaculty] = useState('');
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3001/student/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setStudent(data);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    const resultFaculty = chooseFaculty(student.programStudy);
    setFaculty(resultFaculty);
  }, [student.programStudy]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const editStudent = async () => {
    try {
      await fetch(`http://localhost:3001/student/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...student,
          faculty,
        }),
      });
    } catch (err) {
      console.log(err);
    }
  };
  const handleForm = async (e) => {
    e.preventDefault();
    await editStudent();
    navigate('/student');
  };
  return (
    <>
      <NavBar />
      {loading ? (
        <Flex justify={'center'} alignItems={'center'} bg={'gray.200'} h={'100vh'}>
          <Text>Loading ...</Text>
        </Flex>
      ) : (
        <Flex justify={'center'} alignItems={'center'} bg={'gray.200'} h={'100vh'}>
          <Box bg={'white'} w={'lg'} p={4} mt={12} rounded={'xl'}>
            <form data-testid='form-student' onSubmit={handleForm}>
              <VStack spacing={'1'}>
                <Img src={student.profilePicture} alt='profile-picture' />
                <FormControl id='fullname' isRequired>
                  <FormLabel>Full Name</FormLabel>
                  <Input type='text' data-testid='name' name='fullname' onChange={handleInput} value={student.fullname} />
                </FormControl>
                <FormControl id='profilePicture' isRequired>
                  <FormLabel>Profile Picture</FormLabel>
                  <Input type='text' name='profilePicture' data-testid='profilePicture' onChange={handleInput} value={student.profilePicture} />
                </FormControl>
                <FormControl id='address' isRequired>
                  <FormLabel>Adress</FormLabel>
                  <Input type='text' name='address' data-testid='address' onChange={handleInput} value={student.address} />
                </FormControl>
                <FormControl id='phoneNumber' isRequired>
                  <FormLabel>Phone Number</FormLabel>
                  <Input type='text' name='phoneNumber' data-testid='phoneNumber' onChange={handleInput} value={student.phoneNumber} />
                </FormControl>
                <Flex w={'full'} justify={'space-between'} gap={4}>
                  <FormControl id='date' isRequired>
                    <FormLabel>Birth Date</FormLabel>
                    <Input type='date' name='birthDate' data-testid='date' onChange={handleInput} value={student.birthDate} />
                  </FormControl>
                  <FormControl id='gender' isRequired>
                    <FormLabel>Gender</FormLabel>
                    <Select name='gender' data-testid='gender' onChange={handleInput} value={student.gender}>
                      <option value='' hidden>
                        Select Gender
                      </option>
                      <option value='Male'>Male</option>
                      <option value='Female'>Female</option>
                    </Select>
                  </FormControl>
                </Flex>
                <FormControl id='prody' isRequired>
                  <FormLabel>Program Study</FormLabel>
                  <Select name='programStudy' data-testid='prody' onChange={handleInput} value={student.programStudy}>
                    <option value='' hidden>
                      Select Program Study
                    </option>
                    {optionProgramStudy?.map((option, index) => (
                      <option key={index} value={option.value}>
                        {option.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <Button type='submit' data-testid='edit-btn' rounded={'lg'} bg={'blue.400'} textColor={'white'} _hover={{ bg: 'blue.500' }}>
                  Edit Student
                </Button>
              </VStack>
            </form>
          </Box>
        </Flex>
      )}
      <Footer />
    </>
  );
};

export default EditStudent;
