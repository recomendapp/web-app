const { loadEnvConfig } = require('@next/env');
import type { CodegenConfig } from '@graphql-codegen/cli';
import { addTypenameSelectionDocumentTransform } from '@graphql-codegen/client-preset';

loadEnvConfig('./');

const config: CodegenConfig = {
  schema: [
    {
      [`${process.env.NEXT_PUBLIC_SUPABASE_URL}/graphql/v1`]: {
        headers: {
          apiKey: String(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
        },
      },
    },
  ],
  // this assumes that all your source files are in a top-level `src/` directory - you might need to adjust this to your file structure
  documents: [
    // 'src/**/*.{ts,tsx}',
    'src/graphql/**/*.ts',
    '!src/graphql/__generated__/**/*',
  ],
  overwrite: true,
  ignoreNoDocuments: true,
  generates: {
    './src/graphql/__generated__/': {
      preset: 'client',
      documentTransforms: [addTypenameSelectionDocumentTransform],
      plugins: [],
      config: {
        scalars: {
          UUID: 'string',
          Date: 'string',
          Time: 'string',
          Datetime: 'string',
          JSON: 'string',
          BigInt: 'string',
          BigFloat: 'string',
          Opaque: 'any',
        },
      },
      presetConfig: {
        gqlTagName: 'gql',
        fragmentMasking: false,
      },
    },
  },
  hooks: {
    // afterAllFileWrite: ['npm run prettier'], // optional
  },
};

export default config;
