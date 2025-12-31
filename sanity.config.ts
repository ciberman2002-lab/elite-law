
import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { schemaTypes } from './schema';

export default defineConfig({
  name: 'default',
  title: 'Elite Legal Admin',
  projectId: 'f1isnmso',
  dataset: 'production',
  plugins: [deskTool()],
  schema: {
    types: schemaTypes,
  },
});
