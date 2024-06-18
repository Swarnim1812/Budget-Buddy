import Category from "./Category/Category";
import Price from "./Price/Price";
import "./Sidebar.css";
import Sites from "./Sites/Sites";
// import Colors from "./Colors/Colors";

const Sidebar = ({ handleChange }) => {
  return (
    <>
      <section className="sidebar">
        <div className="logo-container">
          {/* <h1>🛒</h1> */}
        </div>
        <Sites handleChange={handleChange} />
        <Category handleChange={handleChange} />
        <Price handleChange={handleChange} />
        {/* <Colors handleChange={handleChange} /> */}
      </section>
    </>
  );
};

export default Sidebar;
