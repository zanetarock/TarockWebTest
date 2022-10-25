import { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../../context';
import Loading from '../common/Loading';
import Card from './CommonCard';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getResult } from "../redux/result/slice";
import { getType } from '../redux/type/slice'

const MyCard = () => {
  const [cardData, setCardData] = useState({});
  const navigate = useNavigate();
  const userId = useSelector(state => state.user.token.userId);
  const userData = useSelector(state => state.user.token.userData)
  const resultData = useSelector(state => state.result.data)
  const typeData = useSelector(state => state.resultType.data)
  const dispatch = useDispatch()
  const loading = useSelector(state => state.result.loading) | useSelector(state => state.resultType.loading)
  const error = useSelector(state => state.result.error) | useSelector(state => state.resultType.error)
  useEffect(() => {
    const fetchResult = async (userId) => {
       dispatch(getResult(userId));
      if (resultData.length > 0) {
        const type = data[0].result_code;

        dispatch(getType(type));

      } else {
        // User hasn't tested, navigate to the test page.
        // TODO(Zane): show popup window.
        console.log('redirect');
        navigate("/test");
      }

    };

    if (userId==null) {
      console.log('User not signed in');

    } else {
      fetchResult(userId);
    }

  }, [userId]);
  if (loading) {
    return <Loading />

  }
  if (error) {
    return <div>Error:{error}</div>

  }
  return (
    <div className='d-flex flex-column vh-100' style={{ backgroundColor: '#3069B3' }}>
      <Card userData={userData} cardData={cardData} showDescription={true} showShare={true} />
    </div>
  );


}

export default MyCard;