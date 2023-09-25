export interface IRouteElementWithLayoutProps {
  component?: any;
  componentTypeId?: number;
  layout?: any;
  menuCreator?: any;
}

const RouteElementWithLayout = (props: IRouteElementWithLayoutProps) => {
  const { component: Component, componentTypeId, menuCreator, ...rest } = props;

  if(props.layout) {
    const Layout = props.layout;  
    return (
      <Layout
        menuCreator={menuCreator}
      >
        <Component
          componentTypeId={componentTypeId}
          {...rest}
        />
      </Layout>
    );
  }
  else {
    return (
      <Component
        componentTypeId={componentTypeId}
        {...rest}
      />
    );
  }
};

export default RouteElementWithLayout;
