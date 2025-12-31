
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schema';

export default defineConfig({
  name: 'default',
  title: 'Elite Legal Admin',
  projectId: 'f1isnmso',
  dataset: 'production',
  basePath: '/admin',
  plugins: [
    structureTool(),
    visionTool()
  ],
  schema: {
    types: schemaTypes,
  },
});
