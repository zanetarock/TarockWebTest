import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../../context";
import Loading from "../common/Loading";
import CommonCard from "./CommonCard";
import { useNavigate } from "react-router-dom";

const MyCardScreen = () => {
  const { userId } = useContext(GlobalContext);
  const [cardData, setCardData] = useState(null);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await fetch(
          `http://35.184.195.100:3000/api/user/${userId}`
        );
        const data = response.json();
        if (data.length > 0) {
          setUserData(data[0]);
        }
      } catch (err) {
        // TODO: handle error, rather than print it
      }
    };

    const getCardData = async () => {
      try {
        let response = await fetch(
          `http://35.184.195.100:3000/api/result?userId=${userId}`
        );
        const data = response.json();
        if (data.length > 0) {
          const type = data[0].result_code;
          response = await fetch(`http://35.184.195.100:3000/api/card/${type}`);
          const cardData = response.json();
          setCardData(cardData);
        } else {
          // User hasn't tested, navigate to the test page.
          // TODO(Zane): show popup window.
          navigate("/test");
        }
      } catch (err) {
        // TODO: handle error, rather than print it
      }
    };

    if (userId) {
      getUserData();
      getCardData();
    }
  }, [userId]);

  if (!userData || !cardData) {
    return <Loading />;
  }

  return (
    <div
      className="d-flex flex-column vh-100"
      style={{ backgroundColor: "#3069B3" }}
    >
      <Card
        userData={userData}
        cardData={cardData}
        showDescription={true}
        showShare={true}
      />
    </div>
  );
};

export default MyCardScreen;
