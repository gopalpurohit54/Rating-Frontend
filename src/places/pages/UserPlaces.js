import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../components/PlaceList";
import { useHttpClient } from "../../shared/components/hooks/httpHook";
import ErrorModal from "../../shared/components/UIelement/ErrorModal";
import LoadingSpinner from "../../shared/components/UIelement/LoadingSpinner";

const UserPlaces = () => {
  const [loadedPlaces, setLoadedPlaces] = useState();

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const userID = useParams().userID;

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/places/user/${userID}`
        );
        setLoadedPlaces(responseData.places);
        console.log(responseData.places);
      } catch (err) {}
    };
    fetchPlaces();
  }, [sendRequest, userID]);

  const placeDeletedHandler = deletedPlaceId => {
    setLoadedPlaces(prevPlaces =>
      prevPlaces.filter(place => place.id !== deletedPlaceId)
    );
    console.log(loadedPlaces);
  };

  //onst loadedPlaces = DUMMY_PLACES.filter(places => places.creator === userID);
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPlaces && (
        <PlaceList items={loadedPlaces} onPlaceDelete={placeDeletedHandler} />
      )}
    </React.Fragment>
  );
};
export default UserPlaces;
