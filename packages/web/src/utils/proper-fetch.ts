import nodeFetch from "node-fetch";

export default typeof(window) != "undefined" ? window.fetch : nodeFetch;