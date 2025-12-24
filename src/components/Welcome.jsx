import React from 'react'

const Welcome = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-linear-to-br from-pink-200 via-purple-200 to-blue-200 overflow-hidden relative">

      {/* floating blobs */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-pink-300 rounded-full blur-3xl opacity-60 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-52 h-52 bg-purple-300 rounded-full blur-3xl opacity-60 animate-pulse" />
      <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-blue-300 rounded-full blur-3xl opacity-60 animate-pulse" />

      {/* main card */}
      <div className="relative z-10 bg-white/60 backdrop-blur-xl rounded-3xl px-10 py-12 shadow-2xl text-center max-w-md w-[90%] border border-white/40">

        <div className="text-5xl mb-4 animate-bounce">✨</div>

        <h1 className="text-4xl font-bold bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent mb-3">
          Welcome
        </h1>

        <p className="text-gray-700 text-lg leading-relaxed">
          a small space made with<br />
          <span className="font-semibold text-pink-500">care</span>,
          <span className="font-semibold text-purple-500"> feelings</span>,
          and a little bit of
          <span className="font-semibold text-blue-500"> magic</span> ✨
        </p>

        <div className="mt-6 flex justify-center gap-3 text-2xl">
          <span className="animate-pulse">💗</span>
          <span className="animate-pulse delay-150">🌸</span>
          <span className="animate-pulse delay-300">⭐</span>
          <span className="animate-pulse delay-500">🦋</span>
        </div>

        <p className="mt-6 text-sm text-gray-600 italic">
          scroll slowly… something beautiful awaits 🌙
        </p>

      </div>
    </div>
  )
}

export default Welcome
