
import { NavItem, PracticeArea } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Quem Somos', view: 'about' },
  { label: 'Áreas de Atuação', view: 'practice' },
  { label: 'Insights & Notícias', view: 'blog' },
  { label: 'Carreiras', view: 'careers' },
  { label: 'Contato', view: 'contact' },
];

export const PRACTICE_AREAS: PracticeArea[] = [
  {
    title: 'Corporativo e M&A',
    description: 'Assessoria em fusões, aquisições e reestruturações societárias complexas.',
    details: 'Lideramos transações de alta relevância, desde a estruturação de deals complexos até o fechamento estratégico para compradores e vendedores nacionais e internacionais.'
  },
  {
    title: 'Mercado de Capitais',
    description: 'Orientação em ofertas públicas de ações (IPO) e títulos de dívida.',
    details: 'Atuamos junto a emissores e coordenadores em operações de equity e debt capital markets, incluindo emissões de debêntures, CRI, CRA e fundos de investimento.'
  },
  {
    title: 'Bancário e Financeiro',
    description: 'Estruturação de operações de crédito e regulação do sistema financeiro.',
    details: 'Consultoria estratégica em financiamentos estruturados, securitização de ativos e conformidade com normas do Banco Central e CVM.'
  },
  {
    title: 'Infraestrutura e Direito Público',
    description: 'Assessoramento em concessões, PPPs e grandes projetos de energia.',
    details: 'Expertise em licitações e contratos administrativos, com foco em rodovias, aeroportos, portos e o setor de saneamento básico.'
  },
  {
    title: 'Tributário Estratégico',
    description: 'Planejamento fiscal complexo e contencioso tributário de alto valor.',
    details: 'Otimização de estruturas fiscais e defesa de teses jurídicas inovadoras em tribunais superiores e instâncias administrativas (CARF).'
  },
  {
    title: 'Contencioso Cível e Comercial',
    description: 'Resolução de disputas corporativas de alta complexidade.',
    details: 'Representação em litígios judiciais envolvendo disputas societárias, contratos comerciais e responsabilidade civil empresarial.'
  },
  {
    title: 'Arbitragem Internacional',
    description: 'Solução extrajudicial de conflitos em fóruns globais.',
    details: 'Atuação em arbitragens nacionais e internacionais sob as regras das principais câmaras (ICC, CAM-CCBC, AMCHAM) para resolução de conflitos estratégicos.'
  },
  {
    title: 'Compliance e Anticorrupção',
    description: 'Implementação de programas de integridade e investigações internas.',
    details: 'Consultoria em governança corporativa, adequação à Lei Anticorrupção e gestão de riscos em transações corporativas.'
  },
  {
    title: 'Trabalhista Estratégico',
    description: 'Assessoria consultiva e contenciosa focada em executivos e RH.',
    details: 'Foco na prevenção de passivos, planos de stock options, contratação de altos executivos e negociações sindicais complexas.'
  },
  {
    title: 'Direito Imobiliário',
    description: 'Operações imobiliárias estruturadas e desenvolvimento urbano.',
    details: 'Assessoria em aquisições de imóveis, incorporações, Built-to-Suit, Sale-Leaseback e regularização fundiária para grandes players.'
  },
  {
    title: 'Agronegócio',
    description: 'Instrumentos financeiros e proteção jurídica para o setor rural.',
    details: 'Especialistas em títulos de crédito do agro (LCA, CPR), contratos agrários, exportação de commodities e regulação ambiental no campo.'
  },
  {
    title: 'Tecnologia e Privacidade',
    description: 'Proteção de dados (LGPD) e regulação de novos negócios digitais.',
    details: 'Consultoria em propriedade intelectual digital, termos de uso, conformidade com a LGPD e estruturação jurídica para startups e Big Techs.'
  }
];
