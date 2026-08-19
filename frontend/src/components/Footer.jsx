export default function Footer() {
  return (
    <footer className="w-full border-t border-zinc-800 bg-zinc-950 text-white">
      {/* Container aligned with the header horizontal spacing */}
      <div className="w-full px-4 sm:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 w-full">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-black text-white tracking-widest">
              MOVIARA
            </h2>

            <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
              Stream and download your favorite movies in HD, Full HD and 4K
              quality anytime, anywhere.
            </p>
          </div>

          {/* Movies */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Movies
            </h3>

            <ul className="space-y-2.5 text-sm text-zinc-400">
              <li>
                <a href="#" className="hover:text-white transition">
                  Action
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Adventure
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Comedy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Drama
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Company
            </h3>

            <ul className="space-y-2.5 text-sm text-zinc-400">
              <li>
                <a href="#" className="hover:text-white transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Follow Us
            </h3>

            <div className="flex flex-wrap gap-2.5">
              <a
                href="#"
                className="px-3.5 py-2 text-xs rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 transition"
              >
                Facebook
              </a>

              <a
                href="#"
                className="px-3.5 py-2 text-xs rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 transition"
              >
                Instagram
              </a>

              <a
                href="#"
                className="px-3.5 py-2 text-xs rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 transition"
              >
                Twitter
              </a>

              <a
                href="#"
                className="px-3.5 py-2 text-xs rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 transition"
              >
                YouTube
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="w-full mt-12 pt-6 border-t border-zinc-800 text-center text-xs text-zinc-500">
          © {new Date().getFullYear()} MOVIARA. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
