export const BackgroundEffects = () => (
  <>
    <div className="fixed inset-0 bg-[radial-gradient(circle_at_55%_-10%,rgba(124,131,255,.10),transparent_28rem)] pointer-events-none" />
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