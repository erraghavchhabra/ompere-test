"use client";

export default function Steps({ data }: any) {
  return (
    <section className="w-full py-20">
      <style>
        {`
       .process-section{
    padding:60px 15px;
}

.process-container{
    max-width:900px;
    margin:0 auto;
}

.process-heading{
    text-align:center;
    margin-bottom:40px;
}

.process-heading h2{
    font-size:32px;
    font-weight:700;
    margin-bottom:10px;
    color:#111827;
}

.process-heading p{
    font-size:15px;
    color:#6b7280;
    max-width:650px;
    margin:0 auto;
    line-height:1.7;
}

.process-list{
    position:relative;
    padding-left:70px;
}

.process-list::before{
    content:"";
    position:absolute;
    left:24px;
    top:0;
    bottom:0;
    width:2px;
    background:#e5e7eb;
}

.process-card{
    position:relative;
    background:#fff;
    border:1px solid #e5e7eb;
    border-radius:14px;
    padding:24px;
    margin-bottom:20px;
    transition:.3s ease;
}

.process-card:hover{
    transform:translateY(-3px);
    box-shadow:0 10px 25px rgba(0,0,0,.06);
}

.process-number{
    position:absolute;
    left:-71px;
    top:22px;
    width:48px;
    height:48px;
    border-radius:50%;
    background:#f07020;
    color:#fff;
    font-size:14px;
    font-weight:700;
    display:flex;
    align-items:center;
    justify-content:center;
    z-index:2;
}

.process-title{
    font-size:20px;
    font-weight:600;
    margin-bottom:10px;
    color:#111827;
}

.process-time{
    display:inline-block;
    padding:6px 12px;
    background:#fff4ed;
    color:#f07020;
    border-radius:30px;
    font-size:13px;
    font-weight:600;
    margin-bottom:18px;
}

.process-card ul{
    list-style:none;
}

.process-card ul li{
    position:relative;
    padding-left:18px;
    margin-bottom:8px;
    font-size:14px;
    color:#4b5563;
    line-height:1.7;
}

.process-card ul li::before{
    content:"•";
    position:absolute;
    left:0;
    color:#f07020;
    font-weight:bold;
}

.process-btn{
    display:inline-block;
    margin-top:15px;
    padding:10px 18px;
    background:#f07020;
    color:#fff;
    text-decoration:none;
    border-radius:8px;
    font-size:14px;
    font-weight:600;
    transition:.3s;
}

.process-btn:hover{
    background:#d95f14;
}

@media(max-width:768px){

    .process-section{
        padding:50px 12px;
    }

    .process-heading h2{
        font-size:24px;
    }

    .process-heading p{
        font-size:14px;
    }

    .process-list{
        padding-left:55px;
    }

    .process-list::before{
        left:18px;
    }

    .process-number{
        width:38px;
        height:38px;
        left:-46px;
        font-size:12px;
    }

    .process-card{
        padding:18px;
    }

    .process-title{
        font-size:17px;
    }

    .process-card ul li{
        font-size:13px;
    }

    .process-btn{
        width:100%;
        text-align:center;
    }
}

@media(max-width:480px){

    .process-heading h2{
        font-size:22px;
    }

    .process-title{
        font-size:16px;
    }

    .process-card{
        padding:16px;
    }

    .process-card ul li{
        font-size:12px;
    }
}
`}
      </style>
      <div
        className="max-w-6xl mx-auto px-6"
        dangerouslySetInnerHTML={{
          __html: data || "",
        }}
      />
    </section>
  );
}
