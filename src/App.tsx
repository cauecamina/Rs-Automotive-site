import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Entrance
      const tl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.5 } });

      tl.to(".word", { y: 0, opacity: 1, stagger: 0.1, duration: 1.2 })
        .to("#hero-sub", { opacity: 1, y: 0 }, "-=0.8")
        .to("#hero-cta", { opacity: 1, scale: 1 }, "-=1.0")
        .from("#hero-bg", { scale: 1.2, duration: 3 }, 0);

      // Parallax effect for hero background
      gsap.to("#hero-bg", {
        scrollTrigger: {
          trigger: "section",
          start: "top top",
          end: "bottom top",
          scrub: true
        },
        y: 100,
        ease: "none"
      });

      // Scroll Reveal
      const reveals = document.querySelectorAll('.reveal');
      reveals.forEach(el => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none"
          },
          opacity: 0,
          y: 30,
          duration: 1,
          ease: "power3.out"
        });
      });

      // Header scroll effect
      const handleScroll = () => {
        const header = document.querySelector('header nav');
        if (header) {
          if (window.scrollY > 50) {
            header.classList.add('py-2');
            header.classList.remove('py-4');
          } else {
            header.classList.add('py-4');
            header.classList.remove('py-2');
          }
        }
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="font-sans antialiased">
      {/* HEADER */}
      <header className="hidden md:block fixed top-0 left-0 w-full z-50 px-6 py-4">
        <nav className="max-w-7xl mx-auto glass rounded-full px-8 py-4 flex items-center justify-between border-white/10 transition-all duration-300">
          <div className="flex items-center gap-3">
            <div className="flex flex-col leading-none">
              <span className="font-display font-black text-2xl tracking-tighter italic">RS<span className="text-accent">AUTOMOTIVE</span></span>
              <div className="flex gap-1 mt-0.5">
                <div className="w-2 h-2 bg-accent"></div>
                <div className="w-2 h-2 bg-white"></div>
                <div className="w-2 h-2 bg-accent"></div>
                <div className="w-2 h-2 bg-white"></div>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
            <a href="#servicos" className="hover:text-accent transition-colors">Serviços</a>
            <a href="#diferenciais" className="hover:text-accent transition-colors">Diferenciais</a>
            <a href="#depoimentos" className="hover:text-accent transition-colors">Depoimentos</a>
            <a href="#contato" className="hover:text-accent transition-colors">Contato</a>
          </div>

          <a href="https://wa.me/5511974344145" target="_blank" rel="noopener noreferrer" className="bg-accent text-black px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest hover:scale-105 transition-all">
            Agendar
          </a>
        </nav>
      </header>

      <main>
        {/* HERO SECTION */}
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop"
              alt="Luxury Car Detailing"
              className="w-full h-full object-cover opacity-50 scale-110"
              id="hero-bg"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark/50 to-dark"></div>
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
            <h1 className="font-display text-5xl md:text-8xl font-extrabold tracking-tighter leading-[0.9] mb-8" id="hero-title">
              <span className="inline-block overflow-hidden"><span className="word">O</span></span>
              <span className="inline-block overflow-hidden ml-4"><span className="word">BRILHO</span></span>
              <span className="inline-block overflow-hidden ml-4"><span className="word">QUE</span></span>
              <span className="inline-block overflow-hidden ml-4"><span className="word">SEU</span></span>
              <br />
              <span className="inline-block overflow-hidden"><span className="word text-gradient">CARRO</span></span>
              <span className="inline-block overflow-hidden ml-4"><span className="word text-gradient">MERECE.</span></span>
            </h1>
            <p className="text-muted text-lg md:text-xl max-w-2xl mx-auto mb-10 opacity-0 translate-y-10" id="hero-sub">
              Estética automotiva especializada em limpeza detalhada, polimento técnico e vitrificação de alta performance em Guarulhos.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 opacity-0 scale-90" id="hero-cta">
              <a href="https://wa.me/5511974344145" target="_blank" rel="noopener noreferrer" className="btn-glow cta-pulse bg-accent text-black px-10 py-5 rounded-full text-sm font-black uppercase tracking-widest">
                Falar com Especialista
              </a>
              <a href="#servicos" className="glass px-10 py-5 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-white/10 transition-all border-white/10 text-white">
                Ver Serviços
              </a>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
            <span className="text-[10px] uppercase tracking-[0.3em] text-white">Scroll</span>
            <div className="w-px h-12 bg-gradient-to-b from-white to-transparent"></div>
          </div>
        </section>

        {/* AUTHORITY MARQUEE */}
        <section className="py-12 border-y border-white/5 overflow-hidden bg-white/5">
          <div className="marquee-content whitespace-nowrap flex gap-12 items-center">
            <div className="flex gap-12 items-center">
              <span className="font-display text-2xl font-bold uppercase tracking-tighter text-white">5.040+ AVALIAÇÕES NO GOOGLE</span>
              <div className="w-2 h-2 rounded-full bg-accent"></div>
              <span className="font-display text-2xl font-bold uppercase tracking-tighter text-white">REFERÊNCIA EM GUARULHOS</span>
              <div className="w-2 h-2 rounded-full bg-accent"></div>
              <span className="font-display text-2xl font-bold uppercase tracking-tighter text-white">VITRIFICAÇÃO PREMIUM</span>
              <div className="w-2 h-2 rounded-full bg-accent"></div>
              <span className="font-display text-2xl font-bold uppercase tracking-tighter text-white">POLIMENTO TÉCNICO</span>
              <div className="w-2 h-2 rounded-full bg-accent"></div>
              <span className="font-display text-2xl font-bold uppercase tracking-tighter text-white">POLIMENTO COMERCIAL</span>
              <div className="w-2 h-2 rounded-full bg-accent"></div>
              <span className="font-display text-2xl font-bold uppercase tracking-tighter text-white">MARTELINHO DE OURO</span>
              <div className="w-2 h-2 rounded-full bg-accent"></div>
            </div>
            {/* Duplicate for seamless loop */}
            <div className="flex gap-12 items-center">
              <span className="font-display text-2xl font-bold uppercase tracking-tighter text-white">5.040+ AVALIAÇÕES NO GOOGLE</span>
              <div className="w-2 h-2 rounded-full bg-accent"></div>
              <span className="font-display text-2xl font-bold uppercase tracking-tighter text-white">REFERÊNCIA EM GUARULHOS</span>
              <div className="w-2 h-2 rounded-full bg-accent"></div>
              <span className="font-display text-2xl font-bold uppercase tracking-tighter text-white">VITRIFICAÇÃO PREMIUM</span>
              <div className="w-2 h-2 rounded-full bg-accent"></div>
              <span className="font-display text-2xl font-bold uppercase tracking-tighter text-white">POLIMENTO TÉCNICO</span>
              <div className="w-2 h-2 rounded-full bg-accent"></div>
              <span className="font-display text-2xl font-bold uppercase tracking-tighter text-white">POLIMENTO COMERCIAL</span>
              <div className="w-2 h-2 rounded-full bg-accent"></div>
              <span className="font-display text-2xl font-bold uppercase tracking-tighter text-white">MARTELINHO DE OURO</span>
              <div className="w-2 h-2 rounded-full bg-accent"></div>
            </div>
          </div>
        </section>

        {/* BENTO GRID (DIFERENCIAIS) */}
        <section id="diferenciais" className="py-16 md:py-32 px-6 max-w-7xl mx-auto">
          <div className="mb-12 md:mb-20 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.4em] text-muted mb-4 block">Excelência em cada detalhe</span>
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter text-white">POR QUE ESCOLHER A <br /> <span className="text-gradient">RS AUTOMOTIVE?</span></h2>
            <p className="text-muted text-sm mt-6 max-w-2xl mx-auto">Referência em estética automotiva e martelinho de ouro em Guarulhos, unindo tecnologia e cuidado artesanal.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[800px]">
            {/* Item 1: Polimento (Large) */}
            <div className="min-h-[300px] md:col-span-2 md:row-span-2 bento-item group reveal">
              <img src="https://lh3.googleusercontent.com/d/1m8F5BWYRIhTp0Uj4bA08noPhUV6pMT02"
                className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-700"
                alt="Polimento Técnico" />
              <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-10">
                <span className="bg-accent text-black text-[10px] font-black px-3 py-1 rounded-full uppercase mb-4 inline-block tracking-widest">Especialidade</span>
                <h3 className="font-display text-3xl font-bold mb-4 text-white">Polimento Técnico</h3>
                <p className="text-muted text-sm max-w-xs">Remoção de riscos e imperfeições, devolvendo o brilho original e a profundidade da cor do seu veículo.</p>
              </div>
            </div>

            {/* Item 2: Vitrificação */}
            <div className="min-h-[250px] md:col-span-2 bento-item group reveal">
              <img src="https://i.pinimg.com/736x/90/55/89/905589854e8b82a4adb6d2bb935b8ae8.jpg"
                className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:scale-110 transition-transform duration-700"
                alt="Vitrificação 9H" />
              <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="font-display text-2xl font-bold mb-2 text-white">Vitrificação 9H</h3>
                <p className="text-muted text-xs max-w-xs">Proteção cerâmica de longa duração contra raios UV, poluição e agentes químicos.</p>
              </div>
            </div>

            {/* Item 3: Higienização */}
            <div className="min-h-[250px] bento-item group reveal">
              <img src="https://lh3.googleusercontent.com/d/1FGGwQMLhPFH3uaz8u3d5DYubUdtxjkrJ"
                className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:scale-110 transition-transform duration-700"
                alt="Higienização" />
              <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent"></div>
              <div className="p-8 h-full flex flex-col justify-end relative z-10">
                <div className="mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="font-display text-xl font-bold mb-2 text-white">Higienização</h3>
                <p className="text-muted text-xs">Limpeza profunda interna com retirada dos bancos para higienização completa.</p>
              </div>
            </div>

            {/* Item 4: Lavagem Detail */}
            <div className="min-h-[250px] bento-item group reveal">
              <img src="https://lh3.googleusercontent.com/d/1mn_rfBmATU5E1FonxnR2Krt4vamdU7DY"
                className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:scale-110 transition-transform duration-700"
                alt="Lavagem Detail" />
              <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent"></div>
              <div className="p-8 h-full flex flex-col justify-end relative z-10">
                <h3 className="font-display text-xl font-bold mb-2 text-white">Lavagem Detail</h3>
                <p className="text-muted text-xs">Cuidado minucioso em cada fresta, motor e caixas de roda.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES / ABOUT */}
        <section id="servicos" className="py-16 md:py-32 bg-card overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
            <div className="reveal text-center lg:text-left">
              <span className="text-xs font-bold uppercase tracking-[0.4em] text-muted mb-4 block">Nossa Expertise</span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-6xl font-bold tracking-tighter mb-8 leading-[1.1] text-white">TRANSFORMANDO <br /> <span className="text-gradient">METAL EM ARTE.</span></h2>
              <p className="text-muted text-lg mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Na RS Automotive, não apenas lavamos carros. Nós restauramos a paixão de dirigir. Com técnicas avançadas e produtos de elite, garantimos um acabamento impecável que protege seu investimento.
              </p>

              <ul className="space-y-6 inline-block text-left">
                {[
                  { title: "Polimento Técnico", desc: "Correção minuciosa da pintura com remoção de riscos e imperfeições profundas para um brilho espelhado." },
                  { title: "Polimento Comercial", desc: "Serviço especializado para concessionárias e lojistas, focado em agilidade e realce visual para venda." },
                  { title: "Higienização", desc: "Limpeza profunda interna com retirada dos bancos para higienização completa, eliminando ácaros, fungos e bactérias." },
                  { title: "Lavagem Detail", desc: "Cuidado minucioso em cada fresta, motor e caixas de roda com produtos de elite." },
                  { title: "Vitrificação", desc: "Proteção cerâmica de alta performance contra raios UV e agentes químicos." },
                  { title: "Martelinho de Ouro", desc: "Remoção de amassados sem danificar a pintura original, preservando a valorização." }
                ].map((service, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-accent/10 flex-shrink-0 flex items-center justify-center mt-1">
                      <div className="w-2 h-2 rounded-full bg-accent"></div>
                    </div>
                    <div>
                      <h4 className="font-bold uppercase text-xs tracking-widest mb-1 text-white">{service.title}</h4>
                      <p className="text-muted text-sm">{service.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative reveal">
              <div className="aspect-[4/5] rounded-[40px] overflow-hidden">
                <img src="https://lh3.googleusercontent.com/d/11DhkUo3VyLTWDSrjrubZTUYJaWyuOJPn"
                  alt="Detailing Process"
                  className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-10 -left-10 glass p-8 rounded-3xl hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="text-4xl font-display font-bold text-white">5.0</div>
                  <div className="text-muted text-xs uppercase tracking-widest leading-tight">Rating Médio<br />no Google</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section id="depoimentos" className="py-16 md:py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 md:mb-20 gap-8 text-center md:text-left">
              <div className="reveal">
                <span className="text-xs font-bold uppercase tracking-[0.4em] text-muted mb-4 block">Voz dos Clientes</span>
                <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter text-white">O QUE DIZEM <br /> <span className="text-gradient">SOBRE NÓS.</span></h2>
              </div>
              <div className="reveal">
                <a href="https://www.google.com/search?q=RS+Automotive+Guarulhos#lrd=0x94cef54bc7af61b7:0x57b74197086247d5,1,,,," target="_blank" class="text-sm font-bold uppercase tracking-widest border-b border-white/20 pb-2 hover:border-white transition-all inline-block">
                  Ver todas as avaliações
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: "Peterson", initial: "P", text: "Pessoal gente boa, trabalham bem e prestam um serviço de qualidade! Recomendo a todos em Guarulhos." },
                { name: "Ricardo Boni", initial: "R", text: "Nem perca tempo indo em outra. Melhores produtos e melhor preço. Trabalho realmente de primeira, carro ficou zero." },
                { name: "Edson De Oliveira", initial: "E", text: "Levei minha Sprinter para limpeza detalhada e polimento. Ficou excelente. Profissionais muito bons. Gratidão." }
              ].map((testimonial, idx) => (
                <div key={idx} className="glass p-10 rounded-[32px] reveal border-white/5">
                  <div className="flex gap-1 mb-6">
                    <span className="text-accent">★</span><span className="text-accent">★</span><span className="text-accent">★</span><span className="text-accent">★</span><span className="text-accent">★</span>
                  </div>
                  <p className="text-muted italic mb-8 leading-relaxed">"{testimonial.text}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center font-bold text-accent">{testimonial.initial}</div>
                    <span className="font-bold text-sm text-white">{testimonial.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LOCALIZAÇÃO */}
        <section id="localizacao" className="py-16 md:py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 md:mb-16 reveal">
              <span className="text-xs font-bold uppercase tracking-[0.4em] text-muted mb-4 block">Como Chegar</span>
              <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter text-white">NOSSA <span className="text-gradient">LOCALIZAÇÃO.</span></h2>
              <p className="text-muted text-sm mt-6 max-w-2xl mx-auto">Venha tomar um café conosco e conhecer nossa estrutura premium de perto.</p>
            </div>
            
            <div className="reveal glass rounded-[32px] overflow-hidden border-white/5 p-2 md:p-4">
              <iframe 
                src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=pt-BR&amp;q=RS%20Automotive,%20Av.%20Avelino%20Alves%20Machado,%20139,%20Guarulhos,%20SP+(RS%20Automotive)&amp;t=&amp;z=17&amp;ie=UTF8&amp;iwloc=B&amp;output=embed" 
                width="100%" 
                height="450" 
                style={{ border: 0, borderRadius: '24px' }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps RS Automotive"
                className="opacity-90 hover:opacity-100 transition-all duration-700"
              ></iframe>
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="py-16 md:py-32 px-6 checkered-bg">
          <div className="max-w-5xl mx-auto glass p-8 md:p-24 rounded-[48px] text-center reveal border-accent/20">
            <h2 className="font-display text-4xl md:text-7xl font-bold tracking-tight mb-8 italic text-white pr-4">PRONTO PARA <br /> <span className="text-gradient pr-2 inline-block">O PRÓXIMO NÍVEL?</span></h2>
            <p className="text-muted text-lg mb-12 max-w-xl mx-auto">
              Agende agora sua avaliação técnica e descubra como podemos proteger e valorizar seu veículo com a melhor estética de Guarulhos.
            </p>
            <a href="https://wa.me/5511974344145" target="_blank" rel="noopener noreferrer" className="bg-accent text-black px-12 py-6 rounded-full text-sm font-black uppercase tracking-widest hover:scale-105 transition-transform inline-block">
              Agendar via WhatsApp
            </a>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer id="contato" className="py-12 md:py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-12">
          <div className="md:col-span-2">
            <span className="font-display font-bold text-2xl tracking-tighter mb-6 block text-white">RS AUTOMOTIVE</span>
            <p className="text-muted text-sm max-w-sm mb-8">
              Estética automotiva especializada em Guarulhos. Qualidade, transparência e paixão por carros em cada serviço prestado.
            </p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/rsautomotive2020/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-accent hover:text-black transition-all border-white/10 text-white">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold uppercase text-xs tracking-widest mb-6 text-white">Endereço</h4>
            <p className="text-muted text-sm leading-relaxed">
              Av. Avelino Alves Machado, 139<br />
              Jardim Pinhal, Guarulhos - SP<br />
              CEP: 07120-000
            </p>
          </div>

          <div>
            <h4 className="font-bold uppercase text-xs tracking-widest mb-6 text-white">Horários</h4>
            <p className="text-muted text-sm leading-relaxed">
              Seg - Sex: 08:00 – 18:00<br />
              Sábado: 08:00 – 16:00<br />
              Domingo: Fechado
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 md:mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted text-[10px] uppercase tracking-widest text-center md:text-left">© 2026 RS AUTOMOTIVE. TODOS OS DIREITOS RESERVADOS.</p>
          <p className="text-muted text-[10px] uppercase tracking-widest">DESIGNED FOR EXCELLENCE</p>
        </div>
      </footer>
    </div>
  );
}
