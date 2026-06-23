import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import { getBlogBySlug, getAllBlogs, getAllPlayIdeas, getAllPlaykits } from "@/db/queries"
import SafeImage from "@/components/SafeImage"
import SaveButton from "@/components/SaveButton"
import JsonLd from "@/components/JsonLd"
import Breadcrumbs from "@/components/Breadcrumbs"

export const dynamic = "force-dynamic"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  try {
    const blogs = await getAllBlogs()
    return blogs.map((blog) => ({ slug: blog.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { slug } = await params
    const blog = await getBlogBySlug(slug)
    if (!blog) return {}
    return {
      title: blog.seoTitle ?? blog.title,
      description: blog.seoDescription ?? blog.excerpt,
      openGraph: {
        title: blog.seoTitle ?? blog.title,
        description: blog.seoDescription ?? blog.excerpt,
      },
    }
  } catch {
    return {}
  }
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params
  const blog = await getBlogBySlug(slug)
  if (!blog) notFound()

  const [relatedBlogs, relatedIdeas, relatedKits] = await Promise.all([
    getAllBlogs().then((all) =>
      all.filter((b) => b.slug !== slug && b.category === blog.category).slice(0, 3)
    ).catch(() => []),
    getAllPlayIdeas().then((all) =>
      all.filter((i) => i.developmentGoals?.some((g) => g === blog.developmentType)).slice(0, 3)
    ).catch(() => []),
    getAllPlaykits().then((all) =>
      all.filter((k) => k.developmentFocus?.some((f) => f === blog.developmentType)).slice(0, 3)
    ).catch(() => []),
  ])

  return (
    <article className="max-w-3xl mx-auto px-4 py-12 md:py-16">
      <Breadcrumbs items={[
        { label: "Blog", href: "/blogs" },
        { label: blog.title },
      ]} />

      <div className="flex items-center gap-3 text-sm text-foreground/50 mb-4">
        <span className="bg-secondary-light/30 px-3 py-1 rounded-full text-xs font-medium">
          {blog.category}
        </span>
        <span>{blog.ageRange}</span>
        <span>•</span>
        <span>{blog.developmentType}</span>
      </div>

      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-6">
          {blog.title}
        </h1>
        <SaveButton type="blog" slug={blog.slug} title={blog.title} size="md" />
      </div>

      <div className="h-64 md:h-80 rounded-2xl bg-gradient-to-br from-secondary-light/30 to-primary-light/30 flex items-center justify-center text-6xl mb-10 overflow-hidden">
        <SafeImage src={blog.image} alt={blog.title} fallback="📖" className="w-full h-full object-cover" />
      </div>

      <div className="prose prose-lg max-w-none">
        {blog.content.split("\n").map((line, i) => {
          if (line.startsWith("## ")) {
            return (
              <h2 key={i} className="text-2xl font-bold mt-8 mb-4">
                {line.replace("## ", "")}
              </h2>
            )
          }
          if (line.startsWith("**") && line.endsWith("**")) {
            return (
              <p key={i} className="font-semibold text-lg mt-4 mb-2">
                {line.replace(/\*\*/g, "")}
              </p>
            )
          }
          if (line.match(/^\d+\.\s/)) {
            return (
              <p key={i} className="ml-4 mb-1 text-foreground/80">
                {line}
              </p>
            )
          }
          if (line.trim() === "") return <div key={i} className="h-2" />
          return (
            <p key={i} className="mb-4 text-foreground/70 leading-relaxed">
              {line}
            </p>
          )
        })}
      </div>

      <div className="mt-12 pt-8 border-t border-primary-light/20">
        <p className="text-sm text-foreground/50 mb-4">
          Dipublikasikan: {blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }) : "-"}
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/explorations"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            ← Jelajahi Ide Bermain
          </Link>
          <Link
            href="/playkits"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Lihat Playkit →
          </Link>
        </div>
      </div>

      {relatedBlogs.length > 0 && (
        <section className="mt-12 pt-8 border-t border-primary-light/20">
          <h2 className="text-xl font-bold mb-6">Blog Terkait</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {relatedBlogs.map((b) => (
              <Link
                key={b.slug}
                href={`/blogs/${b.slug}`}
                className="group bg-white rounded-xl border border-primary-light/10 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="h-24 bg-gradient-to-br from-primary-light/20 to-secondary-light/20 overflow-hidden">
                  <SafeImage src={b.image} alt={b.title} fallback="📝" className="w-full h-full object-cover" />
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium leading-snug group-hover:text-primary transition-colors line-clamp-2">
                    {b.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: blog.title,
          description: blog.excerpt,
          image: blog.image,
          datePublished: blog.publishedAt,
          author: { "@type": "Organization", name: "cikidu.play" },
        }}
      />

      {(relatedIdeas.length > 0 || relatedKits.length > 0) && (
        <section className="mt-10 p-5 bg-gradient-to-br from-secondary-light/10 to-primary-light/10 rounded-2xl border border-primary-light/10">
          <h2 className="font-semibold mb-3">💡 Coba Juga</h2>
          <div className="space-y-2 text-sm">
            {relatedIdeas.map((idea) => (
              <Link
                key={idea.slug}
                href={`/explorations/${idea.slug}`}
                className="block text-primary hover:underline"
              >
                Ide bermain: {idea.title} →
              </Link>
            ))}
            {relatedKits.map((kit) => (
              <Link
                key={kit.slug}
                href={`/playkits/${kit.slug}`}
                className="block text-primary hover:underline"
              >
                Playkit: {kit.name} →
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  )
}
