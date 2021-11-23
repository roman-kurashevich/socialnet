import React from "react";
import {Suspense} from "react";
import Preloader from "../components/common/Preloader/Preloader";

export const withSuspense = (Component) => {
  const ComponentWithSuspense = (props) => {
    return(
      <Suspense fallback={<Preloader/>}><Component {...props}/></Suspense>
    )
  }
  return ComponentWithSuspense;
}

export default withSuspense;