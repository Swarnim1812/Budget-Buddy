import { BsFillBagFill } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import { Link,useNavigate } from "react-router-dom";

const Card = ({ img, title, star, reviews, newPrice, site, expectedPrice, productURL }) => {
  const data={
    img,title,newPrice,expectedPrice,productURL
  }
  const Navigate = useNavigate();
  const sendtodisplay=()=>{
    Navigate('/display',{state:data});
  }
  return (
    <div onClick={ sendtodisplay}>
      <section className="card">
        <img src={img} alt={title} className="card-img" />
        <div className="card-details">
          <h3 className="card-title">{title}</h3>
          <section className="card-reviews">
            {Array.from({ length: 4 }, () => <AiFillStar className="rating-star" />)}
            <span className="total-reviews">{reviews}</span>
          </section>
          <section className="card-price">
            <div className="price">
              ₹{newPrice}
            </div>
            <div className="bag">
              {site}
              <BsFillBagFill className="bag-icon" />
            </div>
          </section>
        </div>
      </section>
    </div>
    // </Link>
  );
};

export default Card;
