import { createHttpServer } from "./server";
import { routes } from "@webssr/web";

//console.log("api_url", process.env.API_URL);
const PORT = process.env.PORT || 3000;
//console.log(`Trying to start at http://localhost:${PORT}/`);

const app = createHttpServer(routes);

app.listen(PORT, () => {
  /* eslint-disable no-console */
  console.log(`Listening on:`);
  console.log(`  http://localhost:${PORT}/`);
  /* eslint-enable no-console */
});
