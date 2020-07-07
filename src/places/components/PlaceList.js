import React from "react";
import { Link } from "react-router-dom";
import PlaceItem from "./PlaceItem";
import Card from "../../shared/components/UIelement/Card";
import "./PlaceList.css";

const PlaceList = props => {
  if (props.items.length === 0) {
    return (
      <div className="place-list">
        <Card>
          <h2>No Places found</h2>
          <Link to="/places/new">
            <button className="to-btn">Share Places</button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <ul className="place-list">
      {props.items.map(place => (
        <PlaceItem
          key={place.id}
          id={place.id}
          image={place.image}
          title={place.title}
          description={place.description}
          address={place.address}
          creator={place.creator}
          coordinates={place.location}
          onDelete={props.onPlaceDelete}
        />
      ))}
    </ul>
  );
};
export default PlaceList;
