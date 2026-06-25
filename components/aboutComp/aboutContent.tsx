"use client";

export default function AboutContent({ data }: any) {
  return (
    <section className="about-section">
      <style>{`
        .hero {
    padding: 64px 24px 56px;
    text-align: center;
    background-image: url(/assets/img/buy.avif);
    background-position: center;
    background-size: cover;
    
    position: relative
  }
  .hero:after{
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
background: linear-gradient(
    to bottom right,
    rgba(240, 112, 32, 0.8) 0%,
    rgba(75, 45, 22, 0.8) 50%,
    rgba(240, 112, 32, 0.8) 100%
);
)
  }
  .hero-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.22rem 1rem;
    border-radius: 9999px;
    background-color: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: #ffffff;
    font-size: 0.875rem;
    font-weight: 400;
    margin-bottom: 1.5rem !important;
  }
  .hero h1 {
    font-size: 3rem;
    font-weight: 700;
    line-height: 1.2;
    max-width: 700px;
    margin: 0 auto 20px;
    color: #fff;
     z-index: 1;
    position: relative
  }
  .hero-divider {
    width: 56px;
    height: 4px;
    background: #fff;
    margin: 0 auto 22px;
    border-radius: 2px;
     z-index: 1;
    position: relative
  }
  .hero p {
    font-size: 17px;
    color: #fff;
    line-height: 1.7;
    max-width: 600px;
    margin: 0 auto;
     z-index: 1;
    position: relative
  }

  .hero .actions-row {
    display: flex;
    gap: 14px;
    justify-content: center;
    padding: 32px 24px 0;
    flex-wrap: wrap;
     z-index: 1;
    position: relative
  }
  .btn-primary {
   display: inline-block;
    background: #f07020;
    color: #fff;
    padding: 0.75rem 1.25rem;
    border-radius: 9999px;
    font-weight: 500;
    text-decoration: none;
    transition: all 0.3s ease;
  }
  .btn-primary:hover { background: #d85f14; }
  .btn-ghost {
    display: inline-block;
    background: transparent;
    color: #fff;
    padding: 0.75rem 1.25rem;
    border-radius: 9999px;
    font-weight: 500;
    text-decoration: none;
    border: 1px solid #fff;
    transition: all 0.3s ease;
  }
  .btn-ghost:hover {  background: #fff;
    color: #000;}

  .story-section {
    padding: 56px 24px 64px;
    max-width: 760px;
    margin: 0 auto;
  }
  .section-eyebrow {
    font-size: 12px;
    font-weight: 600;
    color: #f07020 !important;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    text-align: center;
    margin-bottom: 32px;
  }
  .story-section p {
    font-size: 16px;
    color: var(--text-secondary);
    line-height: 1.8;
    margin-bottom: 18px;
  }
  .story-highlight {
        background: #ffeade;
    padding: 22px 26px;
    margin: 28px 0;
    border-left: 4px solid #f07020;
    border-radius: 0 12px 12px 0;
  }
  .story-highlight p {
    margin: 0;
    color: var(--orange-900);
    font-size: 16px;
    line-height: 1.7;
    font-weight: 500;
  }
  .story-section strong { font-weight: 700; }

  .stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    border-top: 1px solid #00000014;
    border-bottom: 1px solid #00000014;
  }
  .stat {
    padding: 36px 20px;
    text-align: center;
    border-right: 1px solid #00000014;
  }
  .stat:last-child { border-right: none; }
  .stat-num { font-size: 34px; font-weight: 700; color: #f07020 }
  .stat-label { font-size: 13px; color: var(--text-secondary); margin-top: 6px; }

  .section { padding: 64px 24px; max-width: 1040px; margin: 0 auto; }
  .section-head { text-align: center; margin-bottom: 44px; }
  .section-head h2 { font-size: 2.25rem; font-weight: 700; margin-bottom: 12px; }
  .section-head p { font-size: 16px; color: var(--text-secondary); max-width: 480px; margin: 0 auto; }

  .values-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  .value-card {
    border: 1px solid #00000014;
    border-radius: 16px;
    padding: 28px;
    transition: border-color 0.2s ease;
  }
  .value-card:hover { border-color: var(--border-medium); }
  .value-icon {
       width: 44px;
    height: 44px;
    border-radius: 12px;
    background: linear-gradient(to bottom right, #f07020 0%, #ff9b5e 100%);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 18px;
    font-size: 20px;
    color: #fff;
  }
  .value-card h3 { font-size: 18px; font-weight: 700; margin-bottom: 10px; }
  .value-card p { font-size: 14px; color: var(--text-secondary); line-height: 1.65; margin-bottom: 14px; }
  .tag-row { display: flex; gap: 8px; flex-wrap: wrap; }
  .tag {
    font-size: 12px;
    font-weight: 600;
    padding: 4px 12px;
    border-radius: 20px;
    background: #fdf3ed;
    color: #f07020;
  }

  .why-section { background: #fafafa; padding: 64px 24px; }
  .why-inner { max-width: 1040px; margin: 0 auto; }
  .why-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
  .why-card {
    background: #fff;
    border-radius: 16px;
    padding: 26px;
    border: 1px solid var(--border-light);
  }
  .why-num { font-size: 12px; font-weight: 700; color: var(--orange-400); margin-bottom: 12px; }
  .why-card h4 { 
      font-size: 16px;
    font-weight: 700;
    margin-bottom: 10px;
    color: #f07020;
  }
  .why-card p { font-size: 14px; color: var(--text-secondary); line-height: 1.6; }

  .final-cta {
     background: linear-gradient(to bottom right, #f07020 0%, #ff9b5e 100%);
    padding: 72px 24px;
    text-align: center;
  }
  .final-cta h2 {
    font-size: 2.25rem;
    font-weight: 700;
    color: #fff;
    margin-bottom: 16px;
  }
  .final-cta p {
    font-size: 16px;
    color: rgba(255,255,255,0.92);
    line-height: 1.7;
    max-width: 580px;
    margin: 0 auto 32px;
  }
  .final-cta-actions { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
  .final-cta .btn-primary {
    background: #fff;
    color: var(--orange-600);
  }
  .final-cta .btn-primary:hover { background: #f3f3f3; }
  .final-cta .btn-ghost {
    border-color: rgba(255,255,255,0.5);
    color: #fff;
  }
  .final-cta .btn-ghost:hover { background: rgba(255,255,255,0.12); }

  .footer { padding: 32px 24px; border-top: 1px solid var(--border-light); text-align: center; }
  .footer p { font-size: 13px; color: var(--text-tertiary); }

  @media (max-width: 900px) {
    .why-grid { grid-template-columns: 1fr; }
    .values-grid { grid-template-columns: 1fr; }
  }
  @media (max-width: 700px) {
    .nav-links { display: none; }
    .hero h1 { font-size: 30px; }
    .stats { grid-template-columns: repeat(2, 1fr); }
    .stat:nth-child(2) { border-right: none; }
    .stat:nth-child(odd) { border-right: 1px solid var(--border-light); }
    .final-cta { padding: 48px 24px; }
    .final-cta h2 { font-size: 24px; }
  }

  @media (prefers-reduced-motion: reduce) {
    * { transition: none !important; }
  }

  a:focus-visible, button:focus-visible {
    outline: 2px solid var(--orange-400);
    outline-offset: 2px;
  }
      `}</style>

      <div className="about-container">
        <div
        
            className="about-content prose prose-gray max-w-none
                        prose-headings:text-[#1a1a1a] prose-headings:font-bold
                        prose-h2:text-2xl prose-h3:text-xl
                        prose-p:text-gray-600 prose-p:leading-8
                        prose-li:text-gray-600 prose-li:leading-8
                        prose-strong:text-[#1a1a1a]
                        prose-a:text-[#f07020]"
          dangerouslySetInnerHTML={{ __html: data || "" }}
        />
      </div>
    </section>
  );
}