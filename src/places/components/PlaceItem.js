import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import Modal from "../../shared/components/UIelement/Modal";
import Card from "../../shared/components/UIelement/Card";
import { AuthContext } from "../../shared/context/auth-context";
import Map from "../../shared/components/map/Map";
import ErrorModal from "../../shared/components/UIelement/ErrorModal";
import LoadingSpinner from "../../shared/components/UIelement/LoadingSpinner";
import { useHttpClient } from "../../shared/components/hooks/httpHook";
import "./PlaceItem.css";
import "../../shared/components/form/Button.css";

const PlaceItem = props => {
  const auth = useContext(AuthContext);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [showMap, setShowMap] = useState(false);

  const [showDelete, setShowDelete] = useState(false);

  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);

  const openDeleteHandler = () => setShowDelete(true);
  const closeDeleteHandler = () => setShowDelete(false);

  const confirmDelete = async () => {
    setShowDelete(false);
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/places/${props.id}`,
        "DELETE",
        null,
        { Authorization: "Bearer " + auth.token }
      );
      props.onDelete(props.id);
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={
          <button className="danger-btn" onClick={closeMapHandler}>
            Close
          </button>
        }
      >
        <div className="map-container">
          <Map
            id={props.id}
            coordinates={props.coordinates}
            title={props.title}
          />
        </div>
      </Modal>
      <Modal
        show={showDelete}
        onCancel={closeDeleteHandler}
        header="Are you Sure"
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <button className="danger-btn" onClick={confirmDelete}>
              Yes
            </button>
            <button className="cancel-btn" onClick={closeDeleteHandler}>
              No
            </button>
          </React.Fragment>
        }
      >
        <div className="map-container">
          <h2>Once deleted the place information will be lost.</h2>
        </div>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          {isLoading && <LoadingSpinner asOverlay />}
          <div className="place-item__image">
            <img
              src={`${process.env.REACT_APP_ASSET_URL}/${props.image}`}
              alt={props.title}
            />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <button className="map-btn" onClick={openMapHandler}>
              VIEW ON MAP
            </button>

            {auth.userID === props.creator && (
              <Link to={`/places/${props.id}`}>
                <button className="to-btn">EDIT</button>
              </Link>
            )}
            {auth.userID === props.creator && (
              <button onClick={openDeleteHandler} className="danger-btn">
                DELETE
              </button>
            )}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PlaceItem;
