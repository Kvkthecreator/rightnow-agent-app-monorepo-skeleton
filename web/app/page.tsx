 'use client';

 import { useState } from 'react';

 export default function Page() {
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  return (
    <div className="flex flex-col min-h-screen">
      <nav className="flex justify-between items-center py-4 px-8">
        <div className="logo-placeholder h-8 w-8 bg-gray-200" />
        <a href="/sign-up" className="text-blue-600 hover:underline">
          sign-up / login
        </a>
      </nav>

      <main className="flex-grow">
        <section className="flex flex-col items-center text-center py-16 px-4 sm:py-32 sm:px-6">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            want to be an influencer or content creator?
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8">
            but not sure what&apos;s your niche? or where to start?
          </p>
          <div className="flex space-x-4">
            <button
              onClick={() => setShowHowItWorks(!showHowItWorks)}
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              tell me how it works
            </button>
            <a
              href="#"
              className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              create profile
            </a>
          </div>
        </section>

        {showHowItWorks && (
          <section className="bg-gray-50 py-16 px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">
                how it works...
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
                <div className="text-center">
                  <div className="image-placeholder h-12 w-12 mx-auto mb-4 bg-gray-200 rounded-full" />
                  <h3 className="text-xl font-semibold mb-2">Create Profile</h3>
                </div>
                <div className="text-center">
                  <div className="image-placeholder h-12 w-12 mx-auto mb-4 bg-gray-200 rounded-full" />
                  <h3 className="text-xl font-semibold mb-2">Meet Your Agent</h3>
                </div>
                <div className="text-center">
                  <div className="image-placeholder h-12 w-12 mx-auto mb-4 bg-gray-200 rounded-full" />
                  <h3 className="text-xl font-semibold mb-2">Grow with Clarity</h3>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-4">Who is this for?</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Aspiring influencers</li>
                  <li>Small businesses</li>
                  <li>Content creators</li>
                </ul>
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-4">Our AI Agent Tools</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Profile Engine</li>
                  <li>Strategy Generator</li>
                  <li>Content Assistant</li>
                  <li>Repurposing Tool</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-4">Not just another tool</h3>
                <ul className="space-y-2">
                  <li>✓ Personalized strategy, not generic advice</li>
                  <li>✓ Tailored growth plans, not one-size-fits-all</li>
                  <li>× Manual processes, ✓ Automated insights</li>
                </ul>
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="py-4 bg-white">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center text-gray-500 text-sm space-y-2 sm:space-y-0">
          <p>powered using OpenAI</p>
          <div className="flex space-x-4">
            <a
              href="https://www.rgtnow.com/privacy"
              className="underline hover:text-gray-700"
            >
              Privacy
            </a>
            <a
              href="https://www.rgtnow.com/services"
              className="underline hover:text-gray-700"
            >
              Services
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}