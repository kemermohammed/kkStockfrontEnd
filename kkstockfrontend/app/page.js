export default function Home() {
  return (
    <div className="flex min-h-screen">
      {/* Left Side: Background Image */}
      <div
        className="w-1/2 bg-cover bg-center"
        style={{
          backgroundImage: `url('/background.webp')`,
        }}
      ></div>

      {/* Right Side: Buttons */}
      <div className="w-1/2 flex flex-col items-center justify-center bg-gray-100 relative">
        {/* Logo in the Top Corner */}
        <div className="absolute top-4 right-4">
          <img src="/logo.png" alt="Logo" className="h-16" />
        </div>

        {/* Content */}
        <h1 className="text-4xl font-bold mb-6">Welcome to KK Stock</h1>
        <p className="text-lg text-gray-600 mb-8 text-center">
          Manage your stock efficiently. Please log in or register to continue.
        </p>
        <div className="flex space-x-4">
          <a
            href="/login"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Login
          </a>
          <a
            href="/register"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            Register
          </a>
        </div>
      </div>
    </div>
  );
}
