export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">WFM Platform</h1>
          <p className="text-gray-500 mt-1">Workforce Management · Chat Channel · 500+ Agents</p>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <p className="text-sm text-gray-500 mb-1">Total Agents</p>
            <p className="text-3xl font-bold text-gray-900">524</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <p className="text-sm text-gray-500 mb-1">Chat SLA Today</p>
            <p className="text-3xl font-bold text-green-600">91.2%</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <p className="text-sm text-gray-500 mb-1">Avg Occupancy</p>
            <p className="text-3xl font-bold text-blue-600">78.4%</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <a href="/staffing" className="bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-400 transition-colors group">
            <p className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">Staffing Calculator</p>
            <p className="text-sm text-gray-500 mt-1">Erlang C · Chat concurrency · HC sizing</p>
          </a>
          <a href="/scheduling" className="bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-400 transition-colors group">
            <p className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">Scheduling</p>
            <p className="text-sm text-gray-500 mt-1">Shift management · Leave · Coverage</p>
          </a>
          <a href="/rta" className="bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-400 transition-colors group">
            <p className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">Real-Time Adherence</p>
            <p className="text-sm text-gray-500 mt-1">Live agent state · Intraday · SLA alerts</p>
          </a>
          <a href="/analytics" className="bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-400 transition-colors group">
            <p className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">Analytics</p>
            <p className="text-sm text-gray-500 mt-1">SLA trends · Shrinkage · Forecast accuracy</p>
          </a>
        </div>
      </div>
    </main>
  )
}