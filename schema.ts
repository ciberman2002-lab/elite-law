
export const schemaTypes = [
  {
    name: 'post',
    title: 'Postagens',
    type: 'document',
    fields: [
      { name: 'title', title: 'Título', type: 'string' },
      { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
      { name: 'author', title: 'Autor', type: 'reference', to: [{ type: 'author' }] },
      { name: 'mainImage', title: 'Imagem Principal', type: 'image', options: { hotspot: true } },
      { name: 'categories', title: 'Categorias', type: 'array', of: [{ type: 'reference', to: [{ type: 'category' }] }] },
      { name: 'publishedAt', title: 'Data de Publicação', type: 'datetime' },
      { name: 'excerpt', title: 'Resumo', type: 'text', rows: 3 },
      { name: 'body', title: 'Conteúdo', type: 'array', of: [{ type: 'block' }] }
    ]
  },
  {
    name: 'author',
    title: 'Autores',
    type: 'document',
    fields: [
      { name: 'name', title: 'Nome', type: 'string' },
      { name: 'image', title: 'Foto', type: 'image', options: { hotspot: true } },
      { name: 'bio', title: 'Biografia', type: 'text' }
    ]
  },
  {
    name: 'category',
    title: 'Categorias',
    type: 'document',
    fields: [
      { name: 'title', title: 'Título', type: 'string' },
      { name: 'description', title: 'Descrição', type: 'text' }
    ]
  }
];
