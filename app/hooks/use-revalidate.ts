import { useNavigate } from "@remix-run/react";
import { useCallback } from "react";

function useRevalidate() {
  // We get the navigate function from React Rotuer
  let navigate = useNavigate();
  // And return a function which will navigate to `.` (same URL) and replace it
  return useCallback(
    function revalidate() {
      navigate(".", { replace: true });
    },
    [navigate]
  );
}

export default useRevalidate;
