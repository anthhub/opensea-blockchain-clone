// @ts-ignore
import { defineConfig } from "sanity";
// @ts-ignore
import { structureTool } from "sanity/structure";
// @ts-ignore
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";

// @ts-ignore
export default defineConfig({
  name: "default",
  title: "opensea-blockchain-clone",

  projectId: "335ob3b2",
  dataset: "production",

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
});
