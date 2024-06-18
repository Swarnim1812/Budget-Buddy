import React from "react";
import Cards from "./Cards";

function ncard(val) {
  return (
    <Cards imgno={val.id}
      imgsrc={val.img}
      title={val.title}
      type={val.type}
    />
  )
}
export default ncard;