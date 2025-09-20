import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/server.ts"],
  splitting: false,
  sourcemap: true,
  clean: true,
  format: ["cjs"],
  target: "node18",
});
