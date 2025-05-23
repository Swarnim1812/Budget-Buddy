import { useState, useEffect } from "react";
import { useUserContext } from "./userContex";
import Products from "../Products/Products";
import Recommended from "../Recommended/Recommended";
import Sidebar from "../Sidebar/Sidebar";
import Card from "./Card";
import "../index.css";
import { NavLink } from 'react-router-dom';

function Homepage() {
  const userContext = useUserContext();
  useEffect(() => {
    fetch('https://budget-buddy-hoki.onrender.com/authorized', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        userContext.login(userInfo.user_exist);
      })
    })
    // eslint-disable-next-line
  }, []);
  const username = userContext.user;
  console.log(userContext.user);
  const [email, setEmail] = useState('');
  const [products, setProducts] = useState([]);
  const [myproducts, setMyproducts] = useState([]);
  let traderAllProduct=true;
  const [userType, setUserType] = useState(true);
  useEffect(() => {
    const fetchdata = async () => {
      let temp;
      const data = await fetch("https://budget-buddy-hoki.onrender.com/getallproducts", {
        credentials: 'include',
      });
      temp = await data.json();
      console.log(temp.listAllItems);
      setEmail(temp.listTitle);
      if (temp.checkUser === true) {
        setUserType(false);
        setProducts(Object.values(temp.listAllItems));
        setMyproducts(Object.values(temp.listItems));
      }
      else{
        setProducts(Object.values(temp.listItems));
        setUserType(true);
      }
    };
    fetchdata();
    // eslint-disable-next-line
  }, []);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [query] = useState("");

  // ----------- Radio Filtering -----------
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };
  // ------------ Button Filtering -----------
  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };
  function filteredData(products, selected, query) {
    let filteredProducts = products;
    if (selected) {
      console.log(selected);
      console.log(filteredProducts)
      if (selected !== "MyProds") {
        if (selected === "LtoH") {
          filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
        }
        else if (selected === "HtoL") {
          filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
        }
        else {
          filteredProducts = filteredProducts.filter(
            ({ productURL }) => productURL.search(selected) === 12
          );
        }
      }
    }
    console.log(email)
    return filteredProducts.map(
      ({ imageUrl, name, prevPrice, price, site, productURL, expectedPrice}) => (
        <Card
          key={Math.random()}
          img={imageUrl}
          title={name}
          prevPrice={prevPrice}
          newPrice={price}
          site={site}
          expectedPrice={expectedPrice}
          productURL={productURL}
          email={email}
          traderAllProduct={traderAllProduct}
          userType={userType}
        />
      )
    );
  }
  let result = null;
  if (selectedCategory === "MyProds") {
    traderAllProduct = false;
    console.log(myproducts);
    result = filteredData(myproducts, selectedCategory, query);
  }
  else result = filteredData(products, selectedCategory, query);

  return (
    <>
      {!username &&
        <div className="loginfirst">
          <h1>Please Login First</h1>
          <NavLink to='/login'><button className='landingbtn'>Log In</button></NavLink>
        </div>
      }
      {username &&
        <div className="homepage">
          <Sidebar handleChange={handleChange} />
          <Recommended handleClick={handleClick} NumProds={myproducts.length} />
          <Products result={result} />
        </div>
      }
    </>
  );
}
export default Homepage;

