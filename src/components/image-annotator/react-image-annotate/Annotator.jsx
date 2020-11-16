/* eslint-disable react/prop-types */

import React from "react";
import useEventCallback from "use-event-callback";
import MainLayout from "./MainLayout";
import SettingsProvider from "./SettingsProvider";

export const Annotator = ({ state, dispatchToReducer, RegionEditLabel }) => {
  const onRegionClassAdded = useEventCallback(cls => {
    dispatchToReducer({
      type: "ON_CLS_ADDED",
      cls
    });
  });

  return (
    <SettingsProvider>
      <MainLayout
        RegionEditLabel={RegionEditLabel}
        state={state}
        dispatch={dispatchToReducer}
        onRegionClassAdded={onRegionClassAdded}
      />
    </SettingsProvider>
  );
};

export default Annotator;
