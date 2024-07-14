// import Popularity from "./Popularity/Popularity";
import Price from "./Price/Price";
import "./Sidebar.css";
import Sites from "./Sites/Sites";
const Sidebar = ({ handleChange }) => {
  return (
    <>
      <section className="sidebar">
        <div className="logo-container">
          MENU
        </div>
        <Sites handleChange={handleChange} />
        <Price handleChange={handleChange} />
        {/* <Popularity handleChange={handleChange} /> */}
      </section>
    </>
  );
};

export default Sidebar;
