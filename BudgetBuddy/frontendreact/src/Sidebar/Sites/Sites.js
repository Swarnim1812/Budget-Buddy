import "./Sites.css";
import Input from "../../components/Input";

function Sites({ handleChange }) {
  return (
    <div>
      <h2 className="sidebar-title">Sites</h2>

      <div>
        <label className="sidebar-label-container">
          <input onChange={handleChange} type="radio" value="" name="test" className="sidebarinput"/>
          <span className="checkmark"></span>All
        </label>
        <Input
          handleChange={handleChange}
          value="flipkart"
          title="Flipkart"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="amazon"
          title="Amazon"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="ajio"
          title="Ajio"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="indiamart"
          title="Indiamart"
          name="test"
        />
      </div>
    </div>  
  );
}

export default Sites;
