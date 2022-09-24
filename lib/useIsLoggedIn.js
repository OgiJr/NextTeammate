import React from "react";

export default function useIsLoggedIn() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch("/api/user", {
          method: "GET",
        });
        if (response.status === 200) {
          setIsLoggedIn(true);
          return;
        }

        setIsLoggedIn(false);
      } catch {
        setIsLoggedIn(false);
      }
    }

    fetchUser();
  }, [isLoggedIn, setIsLoggedIn]);

  return isLoggedIn;
}
