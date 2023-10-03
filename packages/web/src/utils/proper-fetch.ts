import nodeFetch from "node-fetch";
import { isServer } from "./is-server";

export default isServer() ? nodeFetch : window.fetch;