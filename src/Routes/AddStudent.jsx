import { Box, Flex, FormControl, FormLabel, Input, VStack, Button, Select, Heading } from '@chakra-ui/react';
import NavBar from '../components/Navbar';
import { useState, useEffect } from 'react';
import { chooseFaculty } from '../utils/chooseFaculty';
import { useNavigate } from 'react-router-dom';

const AddStudent = () => {
  const navigate = useNavigate();
  const [formStudent, setFormSTudent] = useState({
    fullname: '',
    profilePicture: '',
    address: '',
    phoneNumber: '',
    birthDate: '',
    gender: '',
    programStudy: '',
  });
  const [faculty, setFaculty] = useState('');

  const optionProgramStudy = [
    {
      name: 'Ekonomi',
      value: 'Ekonomi',
    },
    {
      name: 'Manajemen',
      value: 'Manajemen',
    },
    {
      name: 'Akuntansi',
      value: 'Akuntansi',
    },
    {
      name: 'Administrasi Publik',
      value: 'Administrasi Publik',
    },
    {
      name: 'Administrasi Bisnis',
      value: 'Administrasi Bisnis',
    },
    {
      name: 'Hubungan Internasional',
      value: 'Hubungan Internasional',
    },
    {
      name: 'Teknik Sipil',
      value: 'Teknik Sipil',
    },
    {
      name: 'Arsitektur',
      value: 'Arsitektur',
    },
    {
      name: 'Matematika',
      value: 'Matematika',
    },
    {
      name: 'Fisika',
      value: 'Fisika',
    },
    {
      name: 'Informatika',
      value: 'Informatika',
    },
  ];

  useEffect(() => {
    const resultFaculty = chooseFaculty(formStudent.programStudy);
    setFaculty(resultFaculty);
  }, [formStudent.programStudy]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormSTudent({
      ...formStudent,
      [name]: value,
    });
  };

  const handleForm = (e) => {
    e.preventDefault();

    fetch('http://localhost:3001/student', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formStudent,
        faculty,
      }),
    }).then((response) => {
      if (response.ok) {
        navigate('/student');
      }
    });
  };

  return (
    <>
      <NavBar />
      <Flex justify={'center'} alignItems={'center'} bg={'gray.200'} h={'100vh'}>
        <Box bg={'white'} w={'lg'} p={4} mt={12} rounded={'xl'}>
          <form data-testid='form-student' onSubmit={handleForm}>
            <VStack spacing={'4'}>
              <Heading as={'h2'}>Form Student</Heading>
              <FormControl id='fullname' isRequired>
                <FormLabel>Full Name</FormLabel>
                <Input type='text' data-testid='name' name='fullname' onChange={handleInput} />
              </FormControl>
              <FormControl id='profilePicture' isRequired>
                <FormLabel>Profile Picture</FormLabel>
                <Input type='text' name='profilePicture' data-testid='profilePicture' onChange={handleInput} />
              </FormControl>
              <FormControl id='address' isRequired>
                <FormLabel>Adress</FormLabel>
                <Input type='text' name='address' data-testid='address' onChange={handleInput} />
              </FormControl>
              <FormControl id='phoneNumber' isRequired>
                <FormLabel>Phone Number</FormLabel>
                <Input type='text' name='phoneNumber' data-testid='phoneNumber' onChange={handleInput} />
              </FormControl>
              <Flex w={'full'} justify={'space-between'} gap={4}>
                <FormControl id='date' isRequired>
                  <FormLabel>Birth Date</FormLabel>
                  <Input type='date' name='date' data-testid='date' onChange={handleInput} />
                </FormControl>
                <FormControl id='gender' isRequired>
                  <FormLabel>Gender</FormLabel>
                  <Select name='gender' data-testid='gender' onChange={handleInput}>
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
                <Select name='programStudy' data-testid='prody' onChange={handleInput}>
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
              <Button type='submit' rounded={'lg'} bg={'blue.400'} textColor={'white'} _hover={{ bg: 'blue.500' }}>
                Add Student
              </Button>
            </VStack>
          </form>
        </Box>
      </Flex>
    </>
  );
};

export default AddStudent;
