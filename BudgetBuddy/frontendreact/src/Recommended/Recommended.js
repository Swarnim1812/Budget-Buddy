import Button from "../components/Button";
import "./Recommended.css";

const Recommended = ({ handleClick }) => {
  return (
    <>
      <div className="recommended">
        {/* <h2 className="recommended-title">RECOMMENDED</h2> */}
        <div className="recommended-flex">
          <Button onClickHandler={handleClick} value="" title="All Products" />
          <Button onClickHandler={handleClick} value="True" title="Tracking Product" />
        </div>
      </div>
    </>
  );
};

export default Recommended;
