import fetch from "node-fetch";
import { Handler } from "@netlify/functions";
import invariant from "tiny-invariant";

const { DISCORD_WEBHOOK } = process.env;
invariant(DISCORD_WEBHOOK, "DISCORD_WEBHOOK is required");

const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { content } = JSON.parse(event.body as string);

  return fetch(DISCORD_WEBHOOK, {
    method: "POST",
    body: JSON.stringify({ content }),
    headers: { "Content-Type": "application/json" },
  })
    .then(() => ({
      statusCode: 200,
      body: JSON.stringify({ message: "Success" }),
    }))
    .catch(() => ({
      statusCode: 500,
      body: JSON.stringify({ message: "Error" }),
    }));
};

export { handler };
