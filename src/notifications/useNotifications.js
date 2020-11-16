import { useDispatch } from "react-redux";
import { enqueueSnackbar } from "../ducks/notifications";

const useNotifications = () => {
  const dispatch = useDispatch();
  return {
    ok: message =>
      dispatch(
        enqueueSnackbar({
          message,
          options: {
            variant: "success"
          }
        })
      ),
    ko: message =>
      dispatch(
        enqueueSnackbar({
          message,
          options: {
            variant: "error"
          }
        })
      )
  };
};

export default useNotifications;
