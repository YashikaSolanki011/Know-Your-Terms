function Badge({title}: {title: string}) {
  return (
    <div className="about-fade mb-3 inline-block px-4 py-2 rounded-full bg-[#fffbe6] border border-[#CDA047] text-[#CDA047] font-semibold text-xs tracking-wide uppercase shadow-sm">
      {title}
    </div>
  )
}

function Title({ title, span, title1 }: { title: string, span: string, title1: string }) {
  return (
    <div className="w-full max-w-3xl flex justify-center">
      <h2 className="text-3xl sm:text-3xl md:text-5xl font-extrabold mb-4 px-4 max-w-3xl md:max-w-5xl sticky top-4 md:top-10 z-30 bg-gradient-to-br bg-clip-text text-transparent from-[#CDA047] via-[#f3e9d2] to-[#CDA047] text-black">
        {title} <span className="text-[#CDA047]">{span}</span> {title1}
      </h2>
    </div>
  )
}

function Description({ title }: { title: string }) {
  return (
    <p className="text-base w-full max-w-2xl md:text-lg text-[#5c4a1a] mb-8 px-4 md:px-4">
      {title}
    </p>
  )
}

export {Badge, Title, Description}
