export const BackgroundEffects = () => (
  <>
    <div className="fixed inset-0 bg-linear-to-br from-slate-900/20 via-black to-black pointer-events-none" />
    <div 
      className="fixed inset-0 opacity-5 pointer-events-none" 
      style={{
        backgroundImage: `
          linear-gradient(0deg, transparent 24%, rgba(255,255,255,.05) 25%, rgba(255,255,255,.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,.05) 75%, rgba(255,255,255,.05) 76%, transparent 77%, transparent),
          linear-gradient(90deg, transparent 24%, rgba(255,255,255,.05) 25%, rgba(255,255,255,.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,.05) 75%, rgba(255,255,255,.05) 76%, transparent 77%, transparent)
        `,
        backgroundSize: '50px 50px'
      }} 
    />
  </>
)