import Button from "../components/Button";
import "./Recommended.css";
const Recommended = ({ handleClick ,NumProds}) => {
  console.log(NumProds)
  let flag=false ;
  if(NumProds>0){
    flag=true
  }
  console.log(flag)
  return (
    <>
      <div className="recommended">
        <div className="recommended-flex">
          <Button onClickHandler={handleClick} value="" title="All Products" />
          {flag &&<Button onClickHandler={handleClick} value="MyProds" title="My Products" />}
        </div>
      </div>
    </>
  );
};

export default Recommended;
