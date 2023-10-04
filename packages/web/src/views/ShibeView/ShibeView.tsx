import { Fragment, useEffect } from "react";
import { HelmetHead } from 'helmet-head';
import './ShibeView.scss';
import { shibeActions, useStateSelector } from "../../context";
import { DispatchFunction, useStateDispatch } from "react-reducer-ssr";

const Shibe = () => {
  const dispatch = useStateDispatch();
  const shibe = useStateSelector(root => root.shibe)
  useEffect(() => {
    if(!shibe.shibeLinks) {
      dispatch(shibeActions.getShibe());
    }
  }, [ shibe ])

  return (
    <Fragment>
      <HelmetHead title="Shibe API showcase." description="Shows a random Shibe image." />
      <section className="shiba">
        <div className="image-slot">
          { shibe?.shibeLinks && shibe.shibeLinks.map(link => 
            <img key={link} src={link} />
          )}
        </div>
      </section>
    </Fragment>
  );
}

async function loadData(dispatch: DispatchFunction, cookies: any) {
  await dispatch(shibeActions.getShibe());
}
export default {
  component: Shibe,
  loadData
}