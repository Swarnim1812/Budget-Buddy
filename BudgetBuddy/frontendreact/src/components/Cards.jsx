import { AiFillStar } from "react-icons/ai";
import {BsFillBagFill} from 'react-icons/bs';

function Cards(props){
  return(
      <>
        <div class="cards">
          <img src={props.img1} alt="card img" className="img0"/>
          <div className="card_details">
            <h3 className="card_title">{props.title}</h3>
            <section className="card_reviews">
              <AiFillStar className="rating-star"/>
              <AiFillStar className="rating-star"/>
              <AiFillStar className="rating-star"/>
              <AiFillStar className="rating-star"/>
              <span className="total_reviews">{props.reviews}</span>
            </section>
            <section className="card_price">
              <div className="price">
                <del>RS. 499</del><span>RS. 299</span>
              </div>
              <div className="bag">
                <BsFillBagFill/>
              </div>
            </section>
          </div>
        </div>
      </>
  );
}

export default Cards;