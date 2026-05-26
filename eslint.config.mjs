import { defineConfig } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "duyn491kcolsw.cloudfront.net/**",
      "romartel.webnode.page/**",
      "*.html",
      "*.gif",
      "hts-cache/**",
    ],
  },
  ...nextVitals,
  ...nextTs,
]);

export default eslintConfig;

