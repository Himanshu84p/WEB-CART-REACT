import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const Rating = ({ value }) => {
  const stars = [];

  //calculating stars
  for (let i = 0; i < 5; i++) {
    if (i < value) {
      stars.push(
        <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-500" />
      );
    } else {
      stars.push(
        <FontAwesomeIcon key={i} icon={faStar} className="text-gray-300" />
      );
    }
  }

  return <div className="text-left">{stars}</div>;
};

export default Rating;
