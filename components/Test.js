import React, { useEffect } from "react";

export default () => {
  useEffect(() => {
    fetch("/api/breach.js", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        code: "this is a test value posted to the database"
      })
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }, []);

  return <p>Testing... Check the console...</p>;
};
