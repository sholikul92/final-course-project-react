import { useState, useEffect } from 'react';
import { Table, Thead, Tr, Th, Tbody, Td, Button, Flex, Text, Select } from '@chakra-ui/react';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';

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

  if (error) return <p>Error</p>;

  return (
    <>
      <NavBar />
      <Flex mt={100} mb={10} justify={'space-between'} mx={4}>
        <Text fontSize={'2xl'} fontWeight={'bold'}>
          All Student
        </Text>
        <Select w={'lg'} onChange={(e) => setOption(e.target.value)}>
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
        <Table>
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
              <Tr key={index}>
                <Td>{index + 1}</Td>
                <Td>{student.fullname}</Td>
                <Td>{student.faculty}</Td>
                <Td>{student.programStudy}</Td>
                <Td>
                  <Button colorScheme='blue'>Edit</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
      <Footer />
    </>
  );
};

export default Student;
