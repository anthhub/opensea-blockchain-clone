import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "335ob3b2",
  dataset: "production",
  apiVersion: "2021-03-25",
  token:
    "skTpYG9lm1h8koB05Deck2K5WFXAvYk9safHlbk16MNzsyM8k4uJmaGBXfpvOUW50zFcy3wVfx2bkLbrQPdvNb4r32k2UwJqIFfxIxKPx9AwL3ipYY2kPc0tyMhMcWGdZ6o1pFogeCbDvHlzczEMDtp2jhU6QkoOXcCN1EBclBhXtBclxw93",
  useCdn: false,
});
