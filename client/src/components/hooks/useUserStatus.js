import React from "react";
import getUserFromLs from "../../helpers/get-user-from-ls";

export default () => {
  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
    if (!user) {
      setUser(getUserFromLs());
    }
  }, [user]);
  return { user, setUser };
};
