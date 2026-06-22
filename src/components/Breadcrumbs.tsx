import Link from "next/link"

interface Crumb {
  label: string
  href?: string
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav className="flex items-center gap-1.5 text-sm text-foreground/50 mb-6 overflow-x-auto">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <span>/</span>}
          {item.href ? (
            <Link href={item.href} className="hover:text-primary transition-colors whitespace-nowrap">
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground/70 whitespace-nowrap">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
