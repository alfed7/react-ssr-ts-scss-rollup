import { Helmet } from 'react-helmet-async';

export interface IHelmetHeadProps {
  title: string
};

export const HelmetHead = (props: IHelmetHeadProps) => {
  return (
    <Helmet>
      <meta
        content={props.title}
        property="og:title"
      />
      <title>{props.title}</title>
    </Helmet>
  );
};

export default HelmetHead;
