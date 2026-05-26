import React from "react";

interface HeroProps {
  name: string;
  title: string;
  bio: string;
  location: string;
  avatar: { src: string; alt: string };
  portfolioButton: { text: string; url: string };
}

export const Hero: React.FC<HeroProps> = ({
  name,
  title,
  bio,
  location,
  avatar,
  portfolioButton,
}) => {
  return (
    <section className="relative overflow-hidden py-24 lg:py-36 border-b border-zinc-900">
      {/* Ambient radial glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(245,158,11,0.07),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(245,158,11,0.04),transparent_50%)]" />

      <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Text Content */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-500/25 bg-amber-500/5 text-amber-500 text-[11px] font-mono tracking-widest mb-8">
            <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
            AVAILABLE · Technical Solutions &amp; Automation
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-none mb-4">
            {name}
          </h1>

          {/* Animated gradient title */}
          <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-amber-400 via-orange-400 to-amber-600 bg-clip-text text-transparent mb-8 leading-snug">
            {title}
          </p>

          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-2xl mb-10">
            {bio}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#projects"
              className="inline-flex h-12 items-center justify-center rounded-lg bg-amber-500 px-7 font-semibold text-sm text-black hover:bg-amber-400 active:scale-95 transition-all shadow-lg shadow-amber-500/15"
            >
              View My Projects
            </a>
            <a
              href={portfolioButton.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/60 backdrop-blur px-7 font-semibold text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white active:scale-95 transition-all"
            >
              {portfolioButton.text}
            </a>
            <a
              href="#contact"
              className="inline-flex h-12 items-center justify-center rounded-lg border border-zinc-800 px-7 font-semibold text-sm text-zinc-400 hover:text-white hover:border-zinc-700 active:scale-95 transition-all"
            >
              Get in Touch
            </a>
          </div>
        </div>

        {/* Avatar Card */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="relative group">
            {/* Glow halo */}
            <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-br from-amber-500/30 to-orange-600/10 blur-2xl opacity-40 group-hover:opacity-60 transition-all duration-700" />

            <div className="relative bg-zinc-900 border border-zinc-800 p-3 rounded-2xl shadow-2xl shadow-zinc-950/60">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={avatar.src}
                alt={avatar.alt}
                className="w-72 h-72 sm:w-80 sm:h-80 object-cover rounded-xl grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700"
              />

              {/* Location overlay */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center gap-2 px-3 py-2.5 rounded-lg bg-zinc-950/85 backdrop-blur-sm border border-zinc-800/80">
                <svg className="h-3.5 w-3.5 text-amber-500 shrink-0 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <div>
                  <p className="text-[10px] font-mono text-amber-500/80 uppercase tracking-widest leading-none mb-0.5">
                    Location
                  </p>
                  <p className="text-xs font-semibold text-zinc-100 leading-none">{location}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
