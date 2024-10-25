import { useState, useEffect } from 'react';
import { Table, Thead, Tr, Th, Tbody, Td, Button } from '@chakra-ui/react';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';

const Student = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    // setLoading(true);
    getStudents();
  }, []);

  if (error) return <p>Error</p>;

  return (
    <>
      <NavBar />
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
            {students?.map((student, index) => (
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
