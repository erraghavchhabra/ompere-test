"use client";

export default function WhyProcess({ data }: any) {
  return (
    <section className="w-full py-20">
       <style>
        {`
        .benefits-section{
    padding:60px 15px;
    background:#f8fafc;
}

.benefits-container{
    max-width:1100px;
    margin:0 auto;
}

.section-heading{
    text-align:center;
    margin-bottom:40px;
}

.section-heading h2{
    font-size:32px;
    font-weight:700;
    color:#111827;
    margin-bottom:10px;
}

.section-heading p{
    font-size:15px;
    color:#6b7280;
    margin-top: 20px
}

.benefits-grid{
    display:grid;
    grid-template-columns:repeat(2,1fr);
    gap:20px;
}

.benefit-card{
    background:#fff;
    border:1px solid #e5e7eb;
    border-radius:14px;
    padding:24px;
    transition:.3s ease;
}

.benefit-card:hover{
    transform:translateY(-4px);
    box-shadow:0 10px 25px rgba(0,0,0,.06);
}

.benefit-icon{
    width:48px;
    height:48px;
    display:flex;
    align-items:center;
    justify-content:center;
    background:#fff4ed;
    border-radius:10px;
    font-size:22px;
    margin-bottom:15px;
}

.benefit-card h3{
    font-size:18px;
    font-weight:600;
    color:#111827;
    margin-bottom:12px;
    line-height:1.4;
}

.benefit-card p{
    font-size:14px;
    color:#4b5563;
    line-height:1.8;
}

@media(max-width:768px){

    .section-heading h2{
        font-size:24px;
    }

    .section-heading p{
        font-size:14px;
    }

    .benefits-grid{
        grid-template-columns:1fr;
        gap:15px;
    }

    .benefit-card{
        padding:18px;
    }

    .benefit-card h3{
        font-size:16px;
    }

    .benefit-card p{
        font-size:13px;
    }

    .benefit-icon{
        width:42px;
        height:42px;
        font-size:18px;
    }
}
        `}
      </style>
      <div
        className=""
        dangerouslySetInnerHTML={{
          __html: data || "",
        }}
      />
    </section>
  );
}
