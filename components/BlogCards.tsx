"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { API } from "@/lib/api";

type Blog = {
  id: number;
  slug: string;
  image: string;
  created_at: string;
  title: string;
  description: string;
};

export default function BlogCards() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    fetch(API.blogs)
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data.data || []);
      });
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-white to-orange-50/40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <article
              key={blog.id}
              className="group bg-white rounded-3xl overflow-hidden border border-orange-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <Link href={`/blogs/${blog.slug}`} className="block relative">
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </Link>

              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                  <CalendarDays className="w-4 h-4 text-[#f07020]" />
                  <span>
                    {new Date(blog.created_at).toDateString()}
                  </span>
                </div>

                <Link href={`/blogs/${blog.slug}`}>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-[#f07020] transition-colors duration-300 leading-snug">
                    {blog.title}
                  </h3>
                </Link>

                <p
                  className="text-gray-600 leading-relaxed text-sm mb-6"
                  dangerouslySetInnerHTML={{
                    __html: blog.description.substring(0, 120) + "...",
                  }}
                />

                <Link
                  href={`/blogs/${blog.slug}`}
                  className="inline-flex items-center gap-2 text-[#f07020] font-semibold hover:gap-3 transition-all duration-300"
                >
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}