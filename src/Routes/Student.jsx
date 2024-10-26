import { useState, useEffect } from 'react';
import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, Button, Flex, Text, Select, Box } from '@chakra-ui/react';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const Student = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [option, setOption] = useState('All');
  const [ListStudentWithFilters, setListStudentWithFilter] = useState([]);

  const url = 'http://localhost:3001/student';
  const getStudents = () => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setStudents(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getStudents();
  }, []);

  useEffect(() => {
    if (option === 'All') {
      setListStudentWithFilter(students);
    } else {
      setListStudentWithFilter(students.filter((student) => student.faculty === option));
    }
  }, [option, students]);

  const facultyOptions = [
    { name: 'All', value: 'All' },
    { name: 'Fakultas Ekonomi', value: 'Fakultas Ekonomi' },
    { name: 'Fakultas Ilmu Sosial dan Politik', value: 'Fakultas Ilmu Sosial dan Politik' },
    { name: 'Fakultas Teknik', value: 'Fakultas Teknik' },
    { name: 'Fakultas Teknologi Informasi dan Sains', value: 'Fakultas Teknologi Informasi dan Sains' },
  ];

  const handleDeleteButton = (e) => {
    const { id } = e.target;

    fetch(`${url}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => {
      getStudents();
    });
  };

  if (error) return <p>Error</p>;

  return (
    <>
      <Flex minH={'100vh'} bg={'gray.200'} pt={100} direction={'column'}>
        <NavBar />
        <Box flex={1}>
          <Flex mb={10} justify={'space-between'} mx={8}>
            <Text fontSize={'2xl'} fontWeight={'bold'}>
              All Student
            </Text>
            <Select w={'lg'} bg={'white'} onChange={(e) => setOption(e.target.value)} data-testid='filter'>
              {facultyOptions.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.name}
                </option>
              ))}
            </Select>
          </Flex>
          {loading ? (
            <p>Loading ...</p>
          ) : (
            <Box bg={'white'} mx={8} mb={8} rounded={'lg'} boxShadow={'0px 4px 6px rgba(0, 0, 0, 0.1)'}>
              <TableContainer mt='2'>
                <Table id='table-student'>
                  <Thead>
                    <Tr>
                      <Th>No</Th>
                      <Th>Full Name</Th>
                      <Th>Faculty</Th>
                      <Th>Program Study</Th>
                      <Th>Option</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {ListStudentWithFilters?.map((student, index) => (
                      <Tr key={index} className='student-data-row'>
                        <Td>{index + 1}</Td>
                        <Td>
                          <Link to={'/student/' + student.id}>{student.fullname}</Link>
                        </Td>
                        <Td>{student.faculty}</Td>
                        <Td>{student.programStudy}</Td>
                        <Td>
                          <Button colorScheme='red' id={student.id} data-testid={'delete-' + student.id} onClick={handleDeleteButton}>
                            Delete
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </Box>
        <Footer />
      </Flex>
    </>
  );
};

export default Student;
