import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";

import schema from "./schema";

import axios from "axios";
import moment from "moment";

const getJokeData = async () => {
  const response = await axios.get("https://api.chucknorris.io/jokes/random");
  return response.data;
};

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const data = await getJokeData();
  return formatJSONResponse({
    data: {
      joke: data.value,
      date_created: moment(data.created_at).format("YYYY-MM-DD H:mm:ss"),
      date_updated: moment(data.updated_at).format("YYYY-MM-DD H:mm:ss "),
    },
    // event,
  });
};

export const main = middyfy(handler);
