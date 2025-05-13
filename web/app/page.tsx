// Placeholder Header and Footer components
function Header() {
  return (
    <header className="w-full py-4 px-8 flex justify-center">
      <h1 className="text-2xl font-bold">Your Logo</h1>
    </header>
  );
}

function Footer() {
  return (
    <footer className="w-full py-4 px-8 bg-transparent">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center text-gray-500 text-xs">
        <div className="text-center sm:text-left space-y-1">
          <p>Korean Business Reg.: 220-28-01801 | Business Name: rightnow entertainment</p>
          <p>Business Owner: KIM SEUL KI | Contact Email: contactus@rgtnow.com</p>
        </div>
        <div className="flex space-x-4 mt-2 sm:mt-0">
          <a href="/terms" className="underline hover:text-gray-700">
            Terms of Service
          </a>
          <a href="/privacy" className="underline hover:text-gray-700">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center text-center py-16 px-4 sm:py-32 sm:px-6">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Welcome to Your App</h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8">
            Description of your app's value proposition goes here.
          </p>
          <a
            href="#"
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Get Started
          </a>
        </section>
        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="text-center p-4">
              <div className="h-12 w-12 mx-auto mb-4 bg-blue-600 rounded-full" />
              <h3 className="text-xl font-semibold mb-2">Fast Performance</h3>
              <p className="text-gray-600">Experience blazing fast speeds with our app.</p>
            </div>
            <div className="text-center p-4">
              <div className="h-12 w-12 mx-auto mb-4 bg-blue-600 rounded-full" />
              <h3 className="text-xl font-semibold mb-2">Scalable</h3>
              <p className="text-gray-600">Easily scale your projects as your user base grows.</p>
            </div>
            <div className="text-center p-4">
              <div className="h-12 w-12 mx-auto mb-4 bg-blue-600 rounded-full" />
              <h3 className="text-xl font-semibold mb-2">User Friendly</h3>
              <p className="text-gray-600">An intuitive interface that's easy to use.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
