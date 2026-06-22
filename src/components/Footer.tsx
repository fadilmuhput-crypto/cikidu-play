import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-accent-dark text-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 text-lg font-bold mb-3">
            <span>✦</span>
            <span>cikidu.play</span>
          </div>
          <p className="text-white/80 text-sm leading-relaxed">
            Inspirasi bermain edukatif dan playkit untuk mendukung tumbuh kembang si kecil.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-3 text-sm uppercase tracking-wider">Menu</h3>
          <div className="flex flex-col gap-2">
            <Link href="/explorations" className="text-white/80 hover:text-white text-sm transition-colors">
              Ide Bermain
            </Link>
            <Link href="/playkits" className="text-white/80 hover:text-white text-sm transition-colors">
              Playkit
            </Link>
            <Link href="/blogs" className="text-white/80 hover:text-white text-sm transition-colors">
              Blog
            </Link>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-3 text-sm uppercase tracking-wider">Kontak</h3>
          <div className="flex flex-col gap-2 text-white/80 text-sm">
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              WhatsApp
            </a>
            <a
              href="https://instagram.com/cikidu.play"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/20 py-4 text-center text-white/60 text-xs">
        &copy; {new Date().getFullYear()} cikidu.play. All rights reserved.
      </div>
    </footer>
  )
}
