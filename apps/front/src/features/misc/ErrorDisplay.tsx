import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import { css } from "styled-system/css";

export const ErrorDisplay = () => {
  const error = useRouteError();

  let errorMessage: string = "";

  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else {
    errorMessage = "unknown error";
  }

  return (
    <div
      id="error"
      className={css({
        textAlign: "center",
        fontSize: "3xl",
      })}
    >
      <h1
        className={css({
          fontWeight: "bold",
        })}
      >
        Oops!
      </h1>
      <p className={css({ fontSize: "2xl" })}>
        Sorry, an unexpected error has occurred.
      </p>
      <p className={css({ color: "red.600" })}>
        <i>{errorMessage}</i>
      </p>
    </div>
  );
};
