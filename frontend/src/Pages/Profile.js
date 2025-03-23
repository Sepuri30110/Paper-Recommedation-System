import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const ProfilePage = () => {
  const [userData, setUserData] = useState({
    name: '',
    phone: '',
    email: ''
  });

  const [searchHistory, setSearchHistory] = useState([
    { title: 'Deep Learning in Healthcare' },
    { title: 'Graph Neural Networks' },
    { title: 'AI Ethics and Policy' },
  ])

  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [tempEmail, setTempEmail] = useState(userData.email);
  const name = localStorage.getItem("name")

  useEffect(() => {
    try {
      async function fetchData() {
        await axios.post("http://localhost:3005/user/getData", { name })
          .then(res => {
            console.log(res.data)
            setUserData(prev => ({
              ...prev,
              name: res.data.name,
              phone: res.data.mobile,
              email: res.data.email, 
            }));
      
            setSearchHistory(res.data.history || []);
          })
          .catch(err => {
            console.log(err)
          })
      }
      fetchData()
    } catch (err) {
      console.log(err)
    }
  }, [])

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/user');
  };

  const handleEditEmail = () => {
    setIsEditingEmail(true);
  };

  const handleSaveEmail = async() => {
    try{
      const name = localStorage.getItem("name")
      await axios.post("http://localhost:3005/user/saveEmail",{name,email:tempEmail})
      .then(res=>{
        console.log(res.data)
        setUserData((prev) => ({ ...prev, email: tempEmail }));
      })
      .catch(err=>{
        console.log(err)
      })
    } catch(err){
      console.log(err)
    }
    setIsEditingEmail(false);
    setTempEmail("")
  };

  const handleEmailChange = (e) => {
    setTempEmail(e.target.value);
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={handleBackClick}>← Back</BackButton>
        <h1>Profile - Paper Recommendation System</h1>
      </Header>
      <Section>
        <h2>User Information</h2>
        <InfoItem>
          <Label>Name:</Label>
          <span>{userData.name}</span>
        </InfoItem>
        <InfoItem>
          <Label>Phone Number:</Label>
          <span>{userData.phone}</span>
        </InfoItem>
        <InfoItem>
          <Label>Email:</Label>
          {isEditingEmail ? (
            <EditContainer>
              <EmailInput
                type="email"
                value={tempEmail}
                onChange={handleEmailChange}
              />
              <SaveButton onClick={handleSaveEmail}>Save</SaveButton>
            </EditContainer>
          ) : (
            <EmailDisplay>
              <span>{userData.email}</span>
              <EditButton onClick={handleEditEmail}>Edit</EditButton>
            </EmailDisplay>
          )}
        </InfoItem>
      </Section>
      <Section>
        <h2>Search History</h2>
        <SearchList>
          {searchHistory.map((item, index) => (
            <SearchItem key={index}>
              <Query>{item.title}</Query>
            </SearchItem>
          ))}
        </SearchList>
      </Section>
    </Container>
  );
};

// Styled Components with Grayscale
const Container = styled.div`
  max-width: 900px;
  width: 100%;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  margin: 20px auto;
  animation: fadeIn 0.5s ease-in;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const Header = styled.div`
  background: linear-gradient(90deg, #4a4a4a, #1a1a1a);
  color: #fff;
  padding: 20px;
  text-align: center;
  position: relative;

  h1 {
    font-size: 2rem;
    letter-spacing: 1px;
    margin-top: 10px;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 3px;
    background: #ccc;
    border-radius: 2px;
  }
`;

const BackButton = styled.button`
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #fff;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 4px;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const Section = styled.div`
  padding: 30px;
  border-bottom: 1px solid #e0e0e0;

  &:last-child {
    border-bottom: none;
  }

  h2 {
    font-size: 1.5rem;
    color: #333;
    margin-bottom: 20px;
    position: relative;

    &::before {
      content: '';
      width: 30px;
      height: 4px;
      background: #666;
      position: absolute;
      bottom: -8px;
      left: 0;
      border-radius: 2px;
    }
  }
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  margin: 15px 0;
  padding: 10px;
  background: #f5f5f5;
  border-radius: 8px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  }
`;

const Label = styled.label`
  font-weight: 600;
  color: #555;
  min-width: 120px;
`;

const EditContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
`;

const EmailInput = styled.input`
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1.1rem;
  flex: 1;
  outline: none;

  &:focus {
    border-color: #666;
  }
`;

const SaveButton = styled.button`
  background: #4a4a4a;
  color: #fff;
  border: none;
  padding: 5px 15px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #666;
  }
`;

const EmailDisplay = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;

  span {
    color: #333;
    font-size: 1.1rem;
  }
`;

const EditButton = styled.button`
  background: none;
  border: none;
  color: #666;
  font-weight: 600;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 4px;
  transition: background 0.3s ease;

  &:hover {
    background: #e8e8e8;
  }
`;

const SearchList = styled.ul`
  list-style: none;
`;

const SearchItem = styled.li`
  background: #f5f5f5;
  padding: 15px;
  margin: 10px 0;
  border-radius: 8px;
  border-left: 5px solid #666;
  transition: all 0.3s ease;

  &:hover {
    background: #e8e8e8;
    transform: translateX(5px);
  }
`;

const Query = styled.div`
  font-weight: 500;
  color: #1a1a1a;
  font-size: 1.1rem;
`;

const Details = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  font-size: 0.9rem;
  color: #777;
`;

const DetailSpan = styled.span`
  background: #d0d0d0;
  padding: 3px 8px;
  border-radius: 12px;
`;

// Responsive Design
const mediaQuery = `@media (max-width: 600px) {
  ${Container} {
    margin: 10px;
  }
  ${Header} h1 {
    font-size: 1.5rem;
  }
  ${Section} {
    padding: 20px;
  }
  ${InfoItem} {
    flex-direction: column;
    align-items: flex-start;
  }
  ${Label} {
    margin-bottom: 5px;
  }
  ${Details} {
    flex-direction: column;
    gap: 5px;
  }
  ${EditContainer} {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }
  ${EmailInput} {
    width: 100%;
  }
}`;

export default ProfilePage;