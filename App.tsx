
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PracticeAreas from './components/PracticeAreas';
import Insights from './components/Insights';
import Footer from './components/Footer';
import LegalAssistant from './components/LegalAssistant';
import { View, Article as ArticleType } from './types';
import { PRACTICE_AREAS } from './constants';

const SANITY_PROJECT_ID = 'f1isnmso';
const SANITY_DATASET = 'production';

// Robust fallback data for when Sanity fetch fails (e.g., CORS issues)
const FALLBACK_ARTICLES: ArticleType[] = [
  {
    id: 'fb-1',
    title: 'A Nova Era da Regulamentação Digital no Brasil',
    category: 'Tecnologia',
    date: '15 Mai 2024',
    author: 'Dra. Marina Silva',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=1200',
    excerpt: 'Como o novo marco legal das garantias digitais impacta o setor de fintechs e bancos tradicionais no cenário nacional.',
    content: [
      'A evolução tecnológica tem imposto desafios sem precedentes ao ordenamento jurídico brasileiro. Recentemente, a aprovação de novas diretrizes para o mercado digital sinaliza uma mudança de paradigma.',
      'O foco central das novas regulamentações reside na transparência algorítmica e na proteção de dados sensíveis em transações de alta frequência.',
      'Para as empresas do setor, a conformidade não é mais apenas uma obrigação acessória, mas um diferencial competitivo estratégico no mercado global.'
    ]
  },
  {
    id: 'fb-2',
    title: 'Fusões e Aquisições: Tendências para o Mercado Global',
    category: 'Corporativo',
    date: '12 Mai 2024',
    author: 'Dr. Roberto Almeida',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1200',
    excerpt: 'Análise detalhada sobre o aquecimento do mercado de M&A em setores de energia limpa e infraestrutura.',
    content: [
      'O mercado de M&A demonstra uma resiliência notável apesar da volatilidade dos juros globais. Observamos um movimento agressivo de consolidação no setor de infraestrutura sustentável.',
      'Investidores institucionais estão priorizando ativos que apresentam métricas ESG auditáveis e fluxos de caixa previsíveis a longo prazo.',
      'Nossa análise sugere que o segundo semestre será marcado por transações "cross-border" de grande porte.'
    ]
  },
  {
    id: 'fb-3',
    title: 'Impactos da Reforma Tributária no Setor de Serviços',
    category: 'Tributário',
    date: '08 Mai 2024',
    author: 'Sócio Senior Arthur Mello',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=1200',
    excerpt: 'Uma análise técnica sobre a transição para o novo modelo de IVA e as estratégias de planejamento fiscal.',
    content: [
      'A reforma tributária é, talvez, a mudança legislativa mais significativa da última década. A simplificação prometida pelo IVA traz consigo um período de transição complexo.',
      'Empresas de serviços precisarão reavaliar suas cadeias de suprimentos e modelos de precificação para absorver a nova carga tributária de forma eficiente.',
      'O planejamento antecipado é a única salvaguarda contra surpresas no fluxo de caixa operacional.'
    ]
  }
];

const SANITY_QUERY = encodeURIComponent(`*[_type == "post"] | order(_createdAt desc) {
  "id": _id,
  title,
  "category": coalesce(categories[0]->title, "Informativo"),
  "date": _createdAt,
  "author": coalesce(author->name, "Elite Legal"),
  "image": mainImage.asset->url,
  "excerpt": excerpt,
  "content": body[].children[].text
}`);

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedArticle, setSelectedArticle] = useState<ArticleType | null>(null);
  const [articles, setArticles] = useState<ArticleType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        // Using apicdn for better performance and robustness
        const url = `https://${SANITY_PROJECT_ID}.apicdn.sanity.io/v2021-10-21/data/query/${SANITY_DATASET}?query=${SANITY_QUERY}`;
        
        const response = await fetch(url);
        if (!response.ok) throw new Error('Falha na resposta da rede');
        
        const data = await response.json();
        
        if (data.result && data.result.length > 0) {
          const formattedArticles = data.result.map((art: any) => ({
            ...art,
            date: new Date(art.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
          }));
          setArticles(formattedArticles);
        } else {
          // If query returns empty but successful
          setArticles(FALLBACK_ARTICLES);
        }
      } catch (error) {
        console.warn("Utilizando artigos de backup devido a erro no Sanity (verifique as configurações de CORS em sanity.io/manage):", error);
        setArticles(FALLBACK_ARTICLES);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const navigateToArticle = (article: ArticleType) => {
    setSelectedArticle(article);
    setCurrentView('article');
    window.scrollTo(0, 0);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return (
          <>
            <Hero />
            <section className="py-24 lg:py-32 px-6 lg:px-12 bg-white flex justify-center border-b border-slate-50">
              <div className="max-w-4xl text-center">
                <span className="text-[10px] uppercase tracking-[0.4em] text-slate-400 font-bold mb-6 block">Legacy of Excellence</span>
                <h2 className="text-3xl md:text-5xl font-serif text-slate-900 mb-12 leading-tight">
                  Uma abordagem <span className="italic">distintiva</span> para desafios globais complexos.
                </h2>
                <div className="h-[1px] w-24 bg-slate-900 mx-auto mb-12 opacity-20" />
                <p className="text-slate-600 text-lg md:text-xl font-light leading-relaxed mb-8 max-w-3xl mx-auto">
                  A Elite Legal Chambers é reconhecida pela sua excelência inabalável. Assessoramos as maiores empresas do mundo em suas transações mais críticas e questões regulatórias de alta sensibilidade.
                </p>
                <button 
                  onClick={() => setCurrentView('about')}
                  className="text-xs uppercase tracking-[0.2em] font-bold border-b-2 border-slate-900 pb-2 hover:opacity-50 transition-opacity"
                >
                  Conheça nossa história
                </button>
              </div>
            </section>
            <PracticeAreas />
            <Insights articles={articles} onArticleSelect={navigateToArticle} onSeeAll={() => setCurrentView('blog')} />
          </>
        );

      case 'about':
        return (
          <div className="pt-32 pb-24 px-6 lg:px-12 bg-white">
            <div className="max-w-5xl mx-auto">
              <span className="text-[10px] uppercase tracking-[0.4em] text-slate-400 font-bold mb-8 block">Sobre a Firma</span>
              <h1 className="text-5xl lg:text-7xl font-serif text-slate-900 mb-16 italic">Nossa essência reside na precisão jurídica e visão estratégica.</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 text-lg font-light text-slate-600 leading-relaxed">
                <p>Fundada com o propósito de oferecer assessoria jurídica de elite, nossa firma evoluiu junto com o mercado global. Mantemos uma cultura de independência total, o que nos permite priorizar exclusivamente os interesses de nossos clientes.</p>
                <p>Nossos sócios estão envolvidos diretamente em cada caso, garantindo que a experiência acumulada em décadas de prática seja aplicada a cada detalhe técnico e estratégico.</p>
              </div>
              <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { label: 'Advogados', value: '450+' },
                  { label: 'Países Atendidos', value: '60+' },
                  { label: 'Anos de Tradição', value: '45' }
                ].map(stat => (
                  <div key={stat.label} className="border-t border-slate-100 pt-8">
                    <div className="text-4xl font-serif text-slate-900 mb-2">{stat.value}</div>
                    <div className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'practice':
        return (
          <div className="pt-32 pb-24 px-6 lg:px-12 bg-white">
            <div className="max-w-7xl mx-auto">
              <div className="max-w-3xl mb-24">
                <span className="text-[10px] uppercase tracking-[0.4em] text-slate-400 font-bold mb-4 block">Nossa Atuação</span>
                <h1 className="text-5xl md:text-7xl font-serif text-slate-900 mb-8 leading-tight">Áreas de <span className="italic">Especialização</span></h1>
                <p className="text-xl text-slate-500 font-light leading-relaxed">Oferecemos uma plataforma completa de serviços jurídicos focada em resultados comerciais e segurança jurídica para grandes corporações e grupos familiares.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
                {PRACTICE_AREAS.map((area, i) => (
                  <div key={i} className="border-b border-slate-100 pb-16 group">
                    <div className="flex items-center space-x-6 mb-8">
                      <span className="text-slate-200 font-serif text-4xl group-hover:text-slate-900 transition-colors">{(i+1).toString().padStart(2, '0')}</span>
                      <div className="h-[1px] w-12 bg-slate-100"></div>
                    </div>
                    <h2 className="text-3xl font-serif mb-6 group-hover:italic transition-all duration-300">{area.title}</h2>
                    <p className="text-slate-600 font-light text-lg mb-8 leading-relaxed max-w-xl">{area.details}</p>
                    <button className="text-[10px] uppercase tracking-widest font-bold flex items-center group-hover:translate-x-4 transition-transform">
                      Download Brochure <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" strokeWidth="2" strokeLinecap="round"/></svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'blog':
        return (
          <div className="pt-32 pb-24 px-6 lg:px-12 bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-slate-200 pb-12">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.4em] text-slate-400 font-bold mb-4 block">Insights & Inteligência</span>
                  <h1 className="text-5xl font-serif text-slate-900">Elite Journal</h1>
                </div>
              </div>
              {isLoading ? (
                <div className="h-64 flex items-center justify-center">
                  <div className="w-8 h-8 border-4 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                  {articles.map(article => (
                    <div 
                      key={article.id} 
                      onClick={() => navigateToArticle(article)}
                      className="group cursor-pointer bg-white p-8 shadow-sm hover:shadow-xl transition-all duration-500"
                    >
                      <div className="aspect-video overflow-hidden mb-8">
                        <img src={article.image || 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=1200'} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" alt={article.title} />
                      </div>
                      <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-4 block">{article.category} / {article.date}</span>
                      <h3 className="text-2xl font-serif mb-4 leading-snug group-hover:underline">{article.title}</h3>
                      <p className="text-slate-500 text-sm font-light leading-relaxed mb-6 line-clamp-3">{article.excerpt}</p>
                      <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Ler Artigo Completo +</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case 'article':
        if (!selectedArticle) return null;
        const relatedArticles = articles.filter(a => a.id !== selectedArticle.id).slice(0, 3);
        
        return (
          <div className="bg-white">
            <div className="h-[40vh] md:h-[60vh] w-full relative">
              <img src={selectedArticle.image || 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=1200'} className="w-full h-full object-cover" alt={selectedArticle.title} />
              <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]" />
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <div className="max-w-4xl text-center">
                   <span className="px-3 py-1 bg-white text-slate-900 text-[10px] uppercase tracking-widest font-bold mb-6 inline-block">
                    {selectedArticle.category}
                  </span>
                  <h1 className="text-3xl md:text-5xl lg:text-7xl font-serif text-white leading-tight">
                    {selectedArticle.title}
                  </h1>
                </div>
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 md:py-24">
              <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
                <article className="lg:w-2/3">
                  <div className="flex items-center space-x-4 mb-12 text-slate-400 text-xs uppercase tracking-widest border-b border-slate-100 pb-8">
                    <span>{selectedArticle.date}</span>
                    <span className="w-1 h-1 bg-slate-200 rounded-full" />
                    <span>Tempo de leitura: 5 min</span>
                  </div>

                  <div className="prose prose-slate prose-lg max-w-none font-light text-slate-700 leading-[1.8] space-y-8">
                    {selectedArticle.content ? selectedArticle.content.map((p, i) => (
                      <p key={i} className={i === 0 ? "text-xl md:text-2xl text-slate-900 font-serif leading-relaxed mb-12 italic" : ""}>
                        {p}
                      </p>
                    )) : <p>Conteúdo não disponível.</p>}
                  </div>

                  <div className="mt-20 bg-slate-900 p-8 md:p-16 text-white flex flex-col md:flex-row items-center gap-12 group">
                    <div className="flex-1 text-center md:text-left">
                      <span className="text-[10px] uppercase tracking-[0.4em] text-slate-400 font-bold mb-4 block">Recurso Exclusivo</span>
                      <h3 className="text-3xl md:text-4xl font-serif mb-6 leading-tight">Guia Estratégico de Direito Corporativo 2024</h3>
                      <p className="text-slate-400 font-light mb-8 text-sm md:text-base">Aprofunde seus conhecimentos com o nosso ebook completo sobre as novas regulamentações e tendências de mercado.</p>
                      <button className="bg-white text-slate-900 px-8 py-4 text-xs uppercase tracking-widest font-bold hover:bg-slate-200 transition-colors w-full md:w-auto">
                        Baixar Ebook Grátis
                      </button>
                    </div>
                  </div>
                </article>

                <aside className="lg:w-1/3">
                  <div className="sticky top-32 space-y-16">
                    <div className="border-t-2 border-slate-900 pt-8">
                      <h4 className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-6">Autor do Artigo</h4>
                      <div className="flex items-center space-x-4 mb-6">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center font-serif text-2xl text-slate-400 italic">
                          {selectedArticle.author ? selectedArticle.author[0] : 'E'}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-900">{selectedArticle.author || 'Elite Legal'}</div>
                          <div className="text-xs text-slate-400 uppercase tracking-widest">Sócio Diretor</div>
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed italic mb-6">Especialista com vasta atuação em casos de alta complexidade no cenário internacional.</p>
                    </div>
                  </div>
                </aside>
              </div>
            </div>

            <section className="bg-slate-50 py-24 px-6 lg:px-12 border-t border-slate-200">
              <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-16">
                  <h2 className="text-3xl font-serif text-slate-900">Leituras <span className="italic">Relacionadas</span></h2>
                  <button onClick={() => setCurrentView('blog')} className="text-xs font-bold uppercase tracking-widest border-b border-slate-900 pb-1">Ver todos</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  {relatedArticles.map(article => (
                    <div 
                      key={article.id} 
                      onClick={() => navigateToArticle(article)}
                      className="group cursor-pointer"
                    >
                      <div className="aspect-[16/9] overflow-hidden mb-6">
                        <img src={article.image || 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=1200'} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt={article.title} />
                      </div>
                      <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-3 block">{article.category}</span>
                      <h3 className="text-xl font-serif group-hover:underline leading-snug">{article.title}</h3>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        );

      case 'careers':
        return (
          <div className="pt-32 pb-24 px-6 lg:px-12 bg-white">
            <div className="max-w-4xl mx-auto text-center">
              <span className="text-[10px] uppercase tracking-[0.4em] text-slate-400 font-bold mb-8 block">Recrutamento</span>
              <h1 className="text-5xl lg:text-7xl font-serif text-slate-900 mb-12">Onde grandes carreiras <span className="italic">começam</span>.</h1>
              <p className="text-xl font-light text-slate-600 mb-16 leading-relaxed">Procuramos mentes analíticas, éticas e ambiciosas. Na Elite Legal, você não apenas pratica o direito; você molda transações que definem mercados.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                <div className="p-12 border border-slate-100 hover:bg-slate-900 hover:text-white transition-all duration-500 cursor-pointer group">
                  <h3 className="text-2xl font-serif mb-4">Associados Senior</h3>
                  <p className="text-sm opacity-60 mb-8 font-light">Para profissionais com 5+ anos de experiência em M&A ou Contencioso Internacional.</p>
                  <span className="text-xs uppercase tracking-widest font-bold">Ver Requisitos →</span>
                </div>
                <div className="p-12 border border-slate-100 hover:bg-slate-900 hover:text-white transition-all duration-500 cursor-pointer group">
                  <h3 className="text-2xl font-serif mb-4">Programa Trainee</h3>
                  <p className="text-sm opacity-60 mb-8 font-light">Nossa porta de entrada para os talentos mais brilhantes das melhores universidades.</p>
                  <span className="text-xs uppercase tracking-widest font-bold">Processo Seletivo 2024 →</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="pt-32 pb-24 px-6 lg:px-12 bg-white">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
              <div>
                <h1 className="text-6xl font-serif mb-12">Estamos ao seu alcance.</h1>
                <p className="text-xl font-light text-slate-600 mb-16 leading-relaxed">Para questões urgentes ou consultas estratégicas, nossa equipe global está pronta para responder 24/7.</p>
                <div className="space-y-12">
                  <div>
                    <h4 className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-4">Central de Atendimento</h4>
                    <p className="text-2xl font-serif">+55 (11) 3000-0000</p>
                    <p className="text-slate-500">contato@elitelegal.com</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-4">São Paulo Office</h4>
                      <p className="text-sm font-light text-slate-600">Av. Brigadeiro Faria Lima, 4500<br/>Itaim Bibi, SP</p>
                    </div>
                    <div>
                      <h4 className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-4">London Office</h4>
                      <p className="text-sm font-light text-slate-600">1 Bunhill Row<br/>London, UK</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-slate-50 p-12 lg:p-20">
                <h3 className="text-2xl font-serif mb-8">Envie uma mensagem</h3>
                <form className="space-y-6">
                  <div>
                    <label className="text-[10px] uppercase tracking-widest font-bold block mb-2">Nome Completo</label>
                    <input type="text" className="w-full bg-white border border-slate-200 px-4 py-3 focus:ring-1 focus:ring-slate-900 transition-all outline-none" />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-widest font-bold block mb-2">Email Corporativo</label>
                    <input type="email" className="w-full bg-white border border-slate-200 px-4 py-3 focus:ring-1 focus:ring-slate-900 transition-all outline-none" />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-widest font-bold block mb-2">Assunto</label>
                    <select className="w-full bg-white border border-slate-200 px-4 py-3 focus:ring-1 focus:ring-slate-900 transition-all outline-none">
                      <option>Consulta M&A</option>
                      <option>Questões Regulatórias</option>
                      <option>Litígio Comercial</option>
                      <option>Outros</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-widest font-bold block mb-2">Mensagem</label>
                    <textarea rows={4} className="w-full bg-white border border-slate-200 px-4 py-3 focus:ring-1 focus:ring-slate-900 transition-all outline-none"></textarea>
                  </div>
                  <button className="w-full bg-slate-900 text-white py-4 uppercase tracking-[0.2em] font-bold text-xs hover:bg-slate-800 transition-colors" onClick={(e) => e.preventDefault()}>Enviar Solicitação</button>
                </form>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Em breve.</div>;
    }
  };

  return (
    <div className="min-h-screen selection:bg-slate-900 selection:text-white">
      <Header currentView={currentView} onNavigate={setCurrentView} />
      <main className="transition-all duration-500">
        {renderContent()}
      </main>
      <Footer />
      <LegalAssistant />
    </div>
  );
};

export default App;
