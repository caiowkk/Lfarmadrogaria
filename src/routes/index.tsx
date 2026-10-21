import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Search, MessageCircle, Clock, MapPin, Phone, Star, Truck, Accessibility, CreditCard, Zap,
  Pill, Droplets, Sparkles, Baby, Cross, ChevronLeft, ChevronRight, Navigation, Tag,
} from "lucide-react";
import loja from "@/assets/loja-lfarma.jpg.asset.json";

const PHONE = "5581992098314";
const DEFAULT_MSG = "Olá! Vim pelo site da LFarma e gostaria de tirar uma dúvida/fazer um pedido.";
const wa = (msg = DEFAULT_MSG) => `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`;
const ADDRESS = "Rua Rui Limeira Rosal, 14 - Vassoural, Caruaru - PE, 55030-640";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Drogaria LFarma | Farmácia no Vassoural, Caruaru-PE" },
      { name: "description", content: "Farmácia de confiança no Vassoural, Caruaru. Delivery rápido, menor preço e pedidos pelo WhatsApp. Aberto todos os dias das 07h às 22h." },
      { property: "og:title", content: "Drogaria LFarma — Caruaru-PE" },
      { property: "og:description", content: "Peça pelo WhatsApp e receba em minutos no Vassoural e região. 4.9★ no Google." },
    ],
  }),
  component: Index,
});

function useOpenStatus() {
  const [open, setOpen] = useState(true);
  useEffect(() => {
    const check = () => {
      const h = Number(new Intl.DateTimeFormat("pt-BR", { hour: "numeric", hour12: false, timeZone: "America/Recife" }).format(new Date()));
      setOpen(h >= 7 && h < 22);
    };
    check();
    const t = setInterval(check, 60000);
    return () => clearInterval(t);
  }, []);
  return open;
}

function WaButton({ children, msg, className = "" }: { children: React.ReactNode; msg?: string; className?: string }) {
  return (
    <a href={wa(msg)} target="_blank" rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-xl bg-whatsapp px-5 py-3 font-extrabold text-whatsapp-foreground shadow-card transition hover:brightness-95 active:scale-95 ${className}`}>
      <MessageCircle className="h-5 w-5" /> {children}
    </a>
  );
}

const banners = [
  { icon: Truck, title: "Delivery Super Rápido em Caruaru", text: "Receba em minutos no Vassoural e região." },
  { icon: Tag, title: "Ofertas do Mês", text: "Medicamentos e cosméticos com o menor preço." },
  { icon: MessageCircle, title: "Atendimento Humanizado", text: "Fale direto com nossos atendentes, sem robô." },
];

const categories = [
  { icon: Pill, name: "Medicamentos & Genéricos" },
  { icon: Droplets, name: "Cuidados Pessoais & Higiene" },
  { icon: Sparkles, name: "Dermo/Cosméticos & Beleza" },
  { icon: Baby, name: "Infantil & Bebês" },
  { icon: Cross, name: "Primeiros Socorros & Equipamentos" },
];

const offers = [
  { name: "Dipirona 500mg — 10 comp.", old: 8.9, price: 4.99, cat: "Medicamentos" },
  { name: "Protetor Solar FPS 50 — 120ml", old: 69.9, price: 49.9, cat: "Dermo" },
  { name: "Fralda Infantil Pacote G", old: 64.9, price: 47.9, cat: "Infantil" },
  { name: "Creme Dental Kit c/ 3", old: 17.9, price: 11.99, cat: "Higiene" },
  { name: "Vitamina C 1g — 30 comp.", old: 39.9, price: 26.9, cat: "Medicamentos" },
  { name: "Termômetro Digital", old: 34.9, price: 22.9, cat: "Equipamentos" },
];

const reviews = [
  { name: "Marina", text: "Sempre que preciso sou bem atendida. Os preços são bons e a ótima entrega." },
  { name: "Cleyton", text: "Muito bom atendimento, já sou cliente há anos e sempre supre minhas necessidades." },
  { name: "Érika", text: "A melhor farmácia do mundo e o atendimento também excelente!" },
  { name: "Alice", text: "Compro tudo pelo WhatsApp. Meus agradecimentos à equipe!" },
];

const brl = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function Stars({ size = "h-4 w-4" }: { size?: string }) {
  return <span className="inline-flex">{[0,1,2,3,4].map(i => <Star key={i} className={`${size} fill-star text-star`} />)}</span>;
}

function Index() {
  const open = useOpenStatus();
  const [slide, setSlide] = useState(0);
  const [q, setQ] = useState("");
  const [rev, setRev] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % banners.length), 4500);
    return () => clearInterval(t);
  }, []);

  const filtered = useMemo(
    () => offers.filter(o => o.name.toLowerCase().includes(q.toLowerCase()) || o.cat.toLowerCase().includes(q.toLowerCase())),
    [q],
  );

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    document.getElementById("ofertas")?.scrollIntoView();
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-3">
          <a href="#" className="flex items-center gap-2" aria-label="Drogaria LFarma">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground"><Cross className="h-6 w-6" strokeWidth={3} /></span>
            <span className="font-display text-2xl font-extrabold leading-none text-primary">L<span className="text-foreground">Farma</span></span>
          </a>
          <span className={`ml-auto inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold md:order-3 ${open ? "bg-whatsapp/15 text-foreground" : "bg-muted text-muted-foreground"}`}>
            <span className={`h-2 w-2 rounded-full ${open ? "bg-whatsapp animate-pulse" : "bg-muted-foreground"}`} />
            {open ? "Aberto Agora (Até as 22:00)" : "Fechado · Abre às 07:00"}
          </span>
          <form onSubmit={onSearch} className="order-last w-full md:order-2 md:w-auto md:flex-1" role="search">
            <label className="flex items-center gap-2 rounded-xl bg-secondary px-3 py-2.5">
              <Search className="h-5 w-5 text-muted-foreground" />
              <input value={q} onChange={e => setQ(e.target.value)} placeholder="Buscar medicamentos, cosméticos, higiene..."
                className="w-full bg-transparent text-base outline-none placeholder:text-muted-foreground" />
            </label>
          </form>
          <WaButton className="hidden md:order-4 md:inline-flex">Fazer Pedido Rapidamente</WaButton>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden bg-hero text-primary-foreground">
          <img src={loja.url} alt="" width={824} height={646} className="absolute inset-0 h-full w-full object-cover opacity-15" />
          <div className="relative mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-2 md:py-16">
            <div>
              <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary-foreground/15 px-3 py-1 text-sm font-bold">
                <Stars /> 4.9 no Google · 536 avaliações
              </p>
              <h1 className="text-3xl font-extrabold leading-tight md:text-5xl">Precisando de remédios ou produtos de higiene sem sair de casa em Caruaru?</h1>
              <p className="mt-4 text-lg opacity-95">Peça pelo WhatsApp e receba em minutos no Vassoural e região com os melhores preços!</p>
              <WaButton className="mt-6 w-full py-4 text-lg md:w-auto">Fazer Pedido via WhatsApp</WaButton>
              <p className="mt-3 text-sm opacity-90">A sua farmácia de confiança no Vassoural — atendimento humanizado, entrega rápida e o menor preço!</p>
            </div>
            <div className="relative self-center rounded-2xl bg-background p-6 text-foreground shadow-card">
              {banners.map((b, i) => (
                <div key={b.title} className={`${i === slide ? "block animate-in fade-in" : "hidden"}`}>
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-accent text-primary"><b.icon className="h-8 w-8" /></span>
                  <h2 className="mt-4 text-2xl font-extrabold">{b.title}</h2>
                  <p className="mt-1 text-muted-foreground">{b.text}</p>
                </div>
              ))}
              <div className="mt-5 flex items-center justify-between">
                <div className="flex gap-2">
                  {banners.map((_, i) => (
                    <button key={i} aria-label={`Banner ${i + 1}`} onClick={() => setSlide(i)}
                      className={`h-2.5 rounded-full transition-all ${i === slide ? "w-8 bg-primary" : "w-2.5 bg-border"}`} />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button aria-label="Anterior" onClick={() => setSlide((slide + banners.length - 1) % banners.length)} className="rounded-full bg-secondary p-2"><ChevronLeft className="h-5 w-5" /></button>
                  <button aria-label="Próximo" onClick={() => setSlide((slide + 1) % banners.length)} className="rounded-full bg-secondary p-2"><ChevronRight className="h-5 w-5" /></button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CATEGORIAS */}
        <section className="mx-auto max-w-6xl px-4 py-12" id="categorias">
          <h2 className="text-2xl font-extrabold md:text-3xl">Categorias Populares</h2>
          <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-5">
            {categories.map(c => (
              <a key={c.name} href={wa(`Olá! Vim pelo site da LFarma e gostaria de ver produtos de ${c.name}.`)} target="_blank" rel="noopener noreferrer"
                className="group flex flex-col items-center gap-3 rounded-2xl border bg-card p-5 text-center shadow-card transition hover:-translate-y-1 hover:border-primary last:col-span-2 md:last:col-span-1">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-accent text-primary transition group-hover:bg-primary group-hover:text-primary-foreground"><c.icon className="h-7 w-7" /></span>
                <span className="text-sm font-bold leading-snug">{c.name}</span>
              </a>
            ))}
          </div>
        </section>

        {/* OFERTAS */}
        <section id="ofertas" className="scroll-mt-32 bg-secondary py-12">
          <div className="mx-auto max-w-6xl px-4">
            <div className="flex items-end justify-between gap-3">
              <h2 className="text-2xl font-extrabold md:text-3xl">🔥 Ofertas Imbatíveis do Dia</h2>
              {q && <button onClick={() => setQ("")} className="text-sm font-bold text-primary">Limpar busca</button>}
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3">
              {filtered.map(o => {
                const off = Math.round((1 - o.price / o.old) * 100);
                return (
                  <article key={o.name} className="relative flex flex-col rounded-2xl bg-card p-4 shadow-card">
                    <span className="absolute right-3 top-3 rounded-full bg-star px-2 py-0.5 text-xs font-extrabold text-star-foreground">-{off}%</span>
                    <span className="text-xs font-bold uppercase text-primary">{o.cat}</span>
                    <h3 className="mt-1 flex-1 pr-8 font-sans text-sm font-bold md:text-base">{o.name}</h3>
                    <p className="mt-3 text-sm text-muted-foreground line-through">{brl(o.old)}</p>
                    <p className="text-2xl font-extrabold text-primary">{brl(o.price)}</p>
                    <WaButton msg={`Olá! Vim pelo site da LFarma e gostaria de pedir: ${o.name} por ${brl(o.price)}.`} className="mt-3 px-3 py-2.5 text-sm">Pedir no WhatsApp</WaButton>
                  </article>
                );
              })}
            </div>
            {filtered.length === 0 && (
              <div className="mt-5 rounded-2xl bg-card p-6 text-center">
                <p className="font-bold">Não encontrou "{q}" aqui? Temos muito mais na loja!</p>
                <WaButton msg={`Olá! Vim pelo site da LFarma. Vocês têm ${q}?`} className="mt-4">Perguntar no WhatsApp</WaButton>
              </div>
            )}
            <p className="mt-4 text-xs text-muted-foreground">Preços promocionais sujeitos à disponibilidade. Medicamentos: siga a orientação médica.</p>
          </div>
        </section>

        {/* PROVA SOCIAL */}
        <section className="mx-auto max-w-6xl px-4 py-12">
          <div className="rounded-3xl bg-hero p-8 text-center text-primary-foreground">
            <p className="font-display text-7xl font-extrabold leading-none">4.9</p>
            <div className="mt-2 flex justify-center"><Stars size="h-8 w-8" /></div>
            <p className="mt-2 text-lg font-bold">no Google · Mais de 530 avaliações</p>
          </div>
          <div className="relative mt-6">
            <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto no-scrollbar md:grid md:grid-cols-4"
              onScroll={e => { const el = e.currentTarget; setRev(Math.round(el.scrollLeft / (el.clientWidth * 0.85))); }}>
              {reviews.map(r => (
                <figure key={r.name} className="w-[85%] shrink-0 snap-center rounded-2xl border bg-card p-5 shadow-card md:w-auto">
                  <Stars />
                  <blockquote className="mt-3 text-base">“{r.text}”</blockquote>
                  <figcaption className="mt-4 flex items-center gap-2 font-bold">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-accent text-primary">{r.name[0]}</span>{r.name}
                  </figcaption>
                </figure>
              ))}
            </div>
            <div className="mt-3 flex justify-center gap-2 md:hidden">
              {reviews.map((_, i) => <span key={i} className={`h-2 rounded-full ${i === rev ? "w-6 bg-primary" : "w-2 bg-border"}`} />)}
            </div>
          </div>
        </section>

        {/* DIFERENCIAIS */}
        <section className="bg-secondary py-12">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-2xl font-extrabold md:text-3xl">Por que escolher a LFarma?</h2>
            <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
              {[
                { icon: Truck, t: "Delivery Express", d: "No Vassoural e em toda Caruaru" },
                { icon: Accessibility, t: "Acessibilidade Total", d: "Loja preparada para cadeirantes" },
                { icon: CreditCard, t: "Pagamento Facilitado", d: "Cartão, PIX e NFC/Aproximação" },
                { icon: Zap, t: "Retirada Rápida", d: "Pegue seu pedido na porta" },
              ].map(f => (
                <div key={f.t} className="rounded-2xl bg-card p-5 shadow-card">
                  <f.icon className="h-9 w-9 text-primary" />
                  <h3 className="mt-3 font-sans font-extrabold">{f.t}</h3>
                  <p className="text-sm text-muted-foreground">{f.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MAPA */}
        <section className="mx-auto max-w-6xl px-4 py-12" id="localizacao">
          <h2 className="text-2xl font-extrabold md:text-3xl">Como Chegar</h2>
          <div className="mt-5 grid gap-6 md:grid-cols-2">
            <iframe title="Mapa Drogaria LFarma" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${encodeURIComponent(ADDRESS)}&output=embed`}
              className="h-72 w-full rounded-2xl border md:h-full md:min-h-80" />
            <div className="space-y-4">
              <img src={loja.url} alt="Interior da Drogaria LFarma no Vassoural" width={824} height={646} loading="lazy" className="w-full rounded-2xl object-cover shadow-card" />
              <p className="flex gap-3"><MapPin className="h-6 w-6 shrink-0 text-primary" /><span><b>Rua Rui Limeira Rosal, 14</b><br />Vassoural, Caruaru - PE · CEP 55030-640<br /><span className="text-sm text-muted-foreground">♿ Acesso para cadeirantes</span></span></p>
              <p className="flex gap-3"><Clock className="h-6 w-6 shrink-0 text-primary" /><span><b>Todos os dias</b><br />07:00 às 22:00</span></p>
              <p className="flex gap-3"><Phone className="h-6 w-6 shrink-0 text-primary" /><a href="tel:+5581992098314" className="font-bold">(81) 99209-8314</a></p>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <a href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(ADDRESS)}`} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 font-bold text-primary-foreground"><Navigation className="h-5 w-5" />Google Maps</a>
                <a href={`https://waze.com/ul?q=${encodeURIComponent(ADDRESS)}&navigate=yes`} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-primary px-4 py-3 font-bold text-primary"><Navigation className="h-5 w-5" />Waze</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-foreground py-10 text-background">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 text-sm md:grid-cols-3">
          <div>
            <p className="font-display text-2xl font-extrabold"><span className="text-primary">L</span>Farma</p>
            <p className="mt-2 opacity-80">Drogaria LFarma · CNPJ 36.231.941/0001-83</p>
            <p className="opacity-80">{ADDRESS}</p>
          </div>
          <nav className="flex flex-col gap-2 opacity-90">
            <a href="#categorias">Categorias</a><a href="#ofertas">Ofertas do Dia</a><a href="#localizacao">Como Chegar</a>
          </nav>
          <div className="flex flex-col gap-2 opacity-90">
            <span>Política de Privacidade</span><span>Política de Entrega e Trocas</span>
            <span className="text-xs opacity-70">Em caso de persistência dos sintomas, um médico deverá ser consultado.</span>
          </div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP */}
      <a href={wa()} target="_blank" rel="noopener noreferrer" aria-label="Atendimento Online pelo WhatsApp"
        className="fixed inset-x-4 bottom-4 z-50 flex items-center justify-center gap-2 rounded-2xl bg-whatsapp py-4 font-extrabold text-whatsapp-foreground shadow-card md:inset-x-auto md:right-6 md:bottom-6 md:rounded-full md:px-6">
        <MessageCircle className="h-6 w-6" /> Atendimento Online
      </a>
    </div>
  );
}
