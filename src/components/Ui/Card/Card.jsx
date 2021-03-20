import React from "react";
const Card = (props) => {
  let card = null;
  switch (props.type) {
    case "list":
      card = (
        <div className="card" title={props.title}>
          <div className="card-title text-center ">List of {props.title}</div>
          <ul className="list-group list-group-flush">{props.children}</ul>
        </div>
      );
      break;
  }
  return card;
};

export default Card;
