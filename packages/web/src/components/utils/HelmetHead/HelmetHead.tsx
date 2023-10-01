import { Helmet } from 'react-helmet-async';

export interface IHelmetHeadProps {
  title: string,
  description?: string
};

export const HelmetHead = (props: IHelmetHeadProps) => {
  return (
    <Helmet>
      <meta
        content={props.title}
        property="og:title"
      />
      <title>{props.title}</title>
      {props.description && <meta name="description" content={props.description} />}
    </Helmet>
  );
};

export default HelmetHead;
