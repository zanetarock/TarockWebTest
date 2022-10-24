import Container from "react-bootstrap/Container";
import male from "../../assets/avatarMale.svg";
import female from "../../assets/avatarFemale.svg";
import RadarChart from "../Charts/RadarChart";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import strengths from "../../assets/myCard/strengths.svg";
import weakness from "../../assets/myCard/weakness.svg";
import superpower from "../../assets/myCard/superpower.svg";
import blindSpot from "../../assets/myCard/blindSpot.svg";
import idealEnv from "../../assets/myCard/idealEnv.svg";
import Header from "../common/Header";
import share from "../../assets/myCard/share.svg";
import { Link } from "react-router-dom";

const CommonCard = ({ userData, cardData, showDescription, showShare }) => {
  const { avatar_index, name, internal_user_id } = userData;
  const {
    description: {
      STRENGTHS,
      WEAKNESS,
      SUPERPOWER,
      BLINDSPOT,
      IDEALENVIRONMENT,
    },
    dimensional_values,
  } = cardData;

  const gender = avatar_index == 1 ? "male" : "female";
  const genderSvg = avatar_index == 1 ? male : female;

  return (
    <Container className="d-flex flex-column h-100 flex-grow-1">
      <Header />
      <div className="d-flex justify-content-center">
        <img
          className="rounded-circle mx-auto"
          src={genderSvg}
          alt={gender}
          style={{ backgroundColor: "#FFFFFF" }}
        />
      </div>
      <div
        style={{
          fontFamily: "Montserrat",
          fontStyle: "normal",
          fontWeight: "400",
          fontSize: "14px",
          lineHeight: "28px",
          color: "#FFFFFF",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        Let's meet {name}
      </div>
      <div
        style={{
          fontFamily: "Montserrat",
          fontStyle: "normal",
          fontWeight: "700",
          fontSize: "18px",
          lineHeight: "22px",
          color: "#FFFFFF",
          alignItems: "center",
          textAlign: "center",
        }}
        className="py-3"
      >
        {name} is {STRENGTHS.replaceAll(";", ",")}.
      </div>
      <Container className="flex-grow-1 overflow-auto">
        <div
          style={{
            background:
              "linear-gradient(180deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.6) 100%)",
            backdropFilter: "blur(10px)",
            borderRadius: "8px",
            height: "300px",
            margin: "0 auto",
          }}
        >
          <div className="d-flex justify-content-center">
            <div className="mx-auto">
              <RadarChart
                apiResponse={dimensional_values}
                enableLabels={true}
              />
            </div>
          </div>
        </div>
        {showDescription && (
          <div
            className="py-3"
            style={{
              fontFamily: "Montserrat",
              fontStyle: "normal",
              fontWeight: "700",
              fontSize: "14px",
              lineHeight: "20px",
              color: "#49304D",
            }}
          >
            <CardElement
              style={{
                background: "#FFFFFF",
                borderRadius: "8px 8px 0px 0px",
                fontSize: "18px",
                lineHeight: "24px",
              }}
              image={<img src={strengths} alt="strengths" />}
              data={STRENGTHS.split(";")}
            />

            <CardElement
              style={{
                background: "#FFFFFF",
                opacity: "0.9",
                backdropFilter: "blur(10px)",
                fontFamily: "Montserrat",
                fontStyle: "normal",
                fontWeight: "700",
                fontSize: "14px",
                lineHeight: "20px",
                color: "#49304D",
              }}
              image={<img src={weakness} alt="weakness" />}
              data={WEAKNESS.split(";")}
            />

            <CardElement
              style={{
                background: "#FFFFFF",
                opacity: "0.8",
                backdropFilter: "blur(10px)",
              }}
              image={<img src={superpower} alt="superpower" />}
              data={SUPERPOWER}
            />

            <CardElement
              style={{
                background: "#FFFFFF",
                opacity: "0.7",
                backdropFilter: "blur(10px)",
              }}
              image={<img src={blindSpot} alt="blind spot" />}
              data={BLINDSPOT}
            />

            <CardElement
              style={{
                background: "#FFFFFF",
                opacity: "0.6",
                backdropFilter: "blur(10px)",
                borderRadius: "0px 0px 8px 8px",
              }}
              image={<img src={idealEnv} alt="ideal environment" />}
              data={IDEALENVIRONMENT}
            />
          </div>
        )}
      </Container>
      {showShare && (
        <Link to={`/share/${internal_user_id}`}>
          <div className="d-flex justify-content-center py-3 mt-auto">
            <img src={share} alt="share" />
          </div>
        </Link>
      )}
    </Container>
  );
};

export default CommonCard;

const CardElement = ({ style, image, data }) => {
  return (
    <Row className="mx-auto p-3" style={style}>
      <Col className="col-4 d-flex justify-content-center align-self-center">
        {image}
      </Col>
      <Col>
        {Array.isArray(data) ? (
          data.map((element, index) => <div key={index}>{element.trim()}</div>)
        ) : (
          <div>{data}</div>
        )}
      </Col>
    </Row>
  );
};
