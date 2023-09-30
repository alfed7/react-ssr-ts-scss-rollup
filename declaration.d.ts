declare module "*.css";
declare module "*.scss";
declare module "*.svg" {
  const content: any;
  export default content;
}