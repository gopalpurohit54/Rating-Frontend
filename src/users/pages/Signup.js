import React, { useState, useContext } from "react";

import Input from "../../shared/components/form/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL
} from "../../shared/components/utils/validators";
import { useForm } from "../../shared/components/hooks/FormHook";
import "../../shared/components/form/Button.css";
import Card from "../../shared/components/UIelement/Card";
import "./Auth.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../shared/context/auth-context";
import ErrorModal from "../../shared/components/UIelement/ErrorModal";
import LoadingSpinner from "../../shared/components/UIelement/LoadingSpinner";
import { useHttpClient } from "../../shared/components/hooks/httpHook";
import ImageUpload from "../../shared/components/form/ImageUpload";

const Signup = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false
      },
      email: {
        value: "",
        isValid: false
      },
      password: {
        value: "",
        isValid: false
      },
      image: {
        value: null,
        isValid: false
      }
    },
    false
  );

  const placeSubmitHandler = async event => {
    event.preventDefault();

    console.log(formState.inputs);

    try {
      const formData = new FormData();
      formData.append("email", formState.inputs.email.value);
      formData.append("name", formState.inputs.name.value);
      formData.append("password", formState.inputs.password.value);
      formData.append("image", formState.inputs.image.value);
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/users/signup",
        "POST",
        formData
      );
      auth.login(responseData.userID, responseData.token);
    } catch (err) {}
  };

  return (
    <React.Fragment>
      {/* {process.env.REACT_APP_BACKEND_URL + "/users/signup"} */}
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Login Required</h2>
        <hr />
        <form onSubmit={placeSubmitHandler}>
          <Input
            id="name"
            element="input"
            type="text"
            label="NAME"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter your name."
            onInput={inputHandler}
          />
          <ImageUpload
            center
            id="image"
            onInput={inputHandler}
            errorText="Please provide an image"
          />
          <Input
            id="email"
            element="input"
            type="text"
            label="E-MAIL"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid e-mail address."
            onInput={inputHandler}
          />
          <Input
            id="password"
            element="input"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(8)]}
            errorText="Please enter a valid password, atleast 8 characters."
            onInput={inputHandler}
          />
          <button
            type="submit"
            className={formState.isValid === true ? "to-btn" : ""}
            disabled={!formState.isValid}
          >
            Signup
          </button>
          or
          <Link to="/auth"> Login</Link>
        </form>
      </Card>
    </React.Fragment>
  );
};

export default Signup;
