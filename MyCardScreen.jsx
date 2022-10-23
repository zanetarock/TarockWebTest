import { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../../context';
import Loading from '../common/Loading';
import Card from './CommonCard';
import { useNavigate } from "react-router-dom";

const MyCard = () => {
    const { userId } = useContext(GlobalContext);
    const [cardData, setCardData] = useState({});
    const [userData, setUserData] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async (userId) => {
            try {
              const res = await fetch(`http://35.184.195.100:3000/api/user/${userId}`);
              const data = await res.json();
      
              if (data.length>0) {
                setUserData(data[0]);
              }
            } catch (err) {
              console.error( err);
            }
      
            fetchResult(userId);
          };
      
          const fetchResult = async (userId) => {
            try {
              const res = await fetch(`http://35.184.195.100:3000/api/result?userId=${userId}`);
              const data = await res.json();
      
              if (data.length > 0) {
                const type = data[0].result_code;
                try {
                fetchType(type);
      
                } catch (err) {
                  console.error(err)
                }
              } else {
                // User hasn't tested, navigate to the test page.
                // TODO(Zane): show popup window.
                navigate("/test");
              }
            } catch (err) {
              console.error(err);
            }
          };
          const fetchType = async (type) => {
            try {
              const res = await fetch(`http://35.184.195.100:3000/api/card/${type}`);
              const data = await res.json()
      
              setCardData(data)
            } catch (err) {
              console.error(err);
            }
      
          };

          fetchUser(userId);
          
    }, [userId]);
    if (userData.name && cardData.description) {
        return (
            <div className='d-flex flex-column vh-100' style={{ backgroundColor: '#3069B3' }}>
                <Card userData={userData} cardData={cardData} showDescription={true} showShare={true}/>
            </div>
        );
    } else {
        return <Loading/>
    }
}

export default MyCard;