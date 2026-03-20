"use client"
import { useState } from "react"

function calcChatHC(
  volume: number,
  aht: number,
  concurrency: number,
  shrinkage: number,
  productiveHours: number
) {
  const chatsPerHr = 60 / (aht / concurrency)
  const capacityPerAgent = productiveHours * 0.85 * chatsPerHr
  const rawAgents = volume / capacityPerAgent
  const shrinkageAdjusted = rawAgents / (1 - shrinkage / 100)
  const finalHC = Math.ceil(shrinkageAdjusted + 4.2)
  const occupancy = Math.round((rawAgents / finalHC) * 100)
  return {
    chatsPerHr: Math.round(chatsPerHr * 10) / 10,
    capacityPerAgent: Math.round(capacityPerAgent),
    rawAgents: Math.ceil(rawAgents),
    shrinkageAdjusted: Math.ceil(shrinkageAdjusted),
    finalHC,
    occupancy
  }
}

export default function StaffingPage() {
  const [volume, setVolume] = useState(150000)
  const [aht, setAht] = useState(7)
  const [concurrency, setConcurrency] = useState(2.1)
  const [shrinkage, setShrinkage] = useState(15)
  const [productiveHours, setProductiveHours] = useState(162.75)

  const result = calcChatHC(volume, aht, concurrency, shrinkage, productiveHours)

  const occColor = result.occupancy <= 75
    ? "text-green-600"
    : result.occupancy <= 85
    ? "text-yellow-600"
    : "text-red-600"

  const scenarios = [1.7, 1.8, 1.9, 2.0, 2.1, 2.2, 2.3].map(c => {
    const r = calcChatHC(volume, aht, c, shrinkage, productiveHours)
    const base = calcChatHC(volume, aht, 2.1, shrinkage, productiveHours)
    return { conc: c, hc: r.finalHC, delta: r.finalHC - base.finalHC }
  })
  const maxHC = Math.max(...scenarios.map(s => s.hc))

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <a href="/" className="text-sm text-gray-400 hover:text-gray-600">← Dashboard</a>
          <h1 className="text-3xl font-bold text-gray-900 mt-2">Staffing Calculator</h1>
          <p className="text-gray-500 mt-1">Chat channel · Standard Mode (85% occupancy)</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">Inputs</p>
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="text-sm text-gray-500 block mb-1">Monthly chat volume</label>
              <input type="number" value={volume} onChange={e => setVolume(Number(e.target.value))}
                className="w-full border border-gray-200 rounded-lg px-4 py-2 text-lg font-semibold focus:outline-none focus:border-blue-400" />
            </div>
            <div>
              <label className="text-sm text-gray-500 block mb-1">AHT (minutes)</label>
              <input type="number" value={aht} onChange={e => setAht(Number(e.target.value))}
                className="w-full border border-gray-200 rounded-lg px-4 py-2 text-lg font-semibold focus:outline-none focus:border-blue-400" />
            </div>
            <div>
              <label className="text-sm text-gray-500 block mb-1">Productive hours/agent/month</label>
              <input type="number" value={productiveHours} onChange={e => setProductiveHours(Number(e.target.value))}
                className="w-full border border-gray-200 rounded-lg px-4 py-2 text-lg font-semibold focus:outline-none focus:border-blue-400" />
            </div>
            <div>
              <label className="text-sm text-gray-500 block mb-1">Shrinkage: <strong>{shrinkage}%</strong></label>
              <input type="range" min="10" max="50" step="1" value={shrinkage}
                onChange={e => setShrinkage(Number(e.target.value))}
                className="w-full accent-blue-500 mt-3" />
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-500 block mb-1">Concurrency: <strong>{concurrency}x</strong></label>
            <input type="range" min="1" max="5" step="0.1" value={concurrency}
              onChange={e => setConcurrency(Number(e.target.value))}
              className="w-full accent-blue-500" />
          </div>
        </div>
        <div className="bg-gray-900 rounded-xl p-5 mb-6 font-mono text-sm space-y-1">
          <p className="text-gray-400">// Formula trace</p>
          <p className="text-green-400">Chats/hr per agent = 60 / ({aht} / {concurrency}) = <strong>{result.chatsPerHr}</strong></p>
          <p className="text-blue-400">Capacity/agent/month = {productiveHours} x 85% x {result.chatsPerHr} = <strong>{result.capacityPerAgent}</strong></p>
          <p className="text-yellow-400">Raw agents = {volume.toLocaleString()} / {result.capacityPerAgent} = <strong>{result.rawAgents}</strong></p>
          <p className="text-orange-400">Shrinkage-adjusted = {result.rawAgents} / (1 - {shrinkage}%) = <strong>{result.shrinkageAdjusted}</strong></p>
          <p className="text-pink-400">Final HC = CEILING({result.shrinkageAdjusted} + 4.2) = <strong>{result.finalHC}</strong></p>
        </div>
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-xs text-gray-400 mb-1">Chats/hr per agent</p>
            <p className="text-2xl font-bold text-gray-900">{result.chatsPerHr}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-xs text-gray-400 mb-1">Raw agents</p>
            <p className="text-2xl font-bold text-gray-900">{result.rawAgents}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-xs text-gray-400 mb-1">Final HC</p>
            <p className="text-2xl font-bold text-green-600">{result.finalHC}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-xs text-gray-400 mb-1">Occupancy</p>
            <p className={`text-2xl font-bold ${occColor}`}>{result.occupancy}%</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">Concurrency scenarios</p>
          <div className="space-y-3">
            {scenarios.map(s => (
              <div key={s.conc} className="flex items-center gap-4">
                <span className={`text-sm w-20 ${s.conc === 2.1 ? "font-bold text-blue-600" : "text-gray-500"}`}>
                  {s.conc}x {s.conc === 2.1 ? "(base)" : ""}
                </span>
                <div className="flex-1 bg-gray-100 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full transition-all"
                    style={{ width: `${Math.round((s.hc / maxHC) * 100)}%` }} />
                </div>
                <span className="text-sm font-semibold w-16 text-right">{s.hc} HC</span>
                <span className={`text-xs w-12 text-right ${s.delta < 0 ? "text-green-600" : s.delta > 0 ? "text-red-500" : "text-gray-400"}`}>
                  {s.delta === 0 ? "BASE" : s.delta > 0 ? `+${s.delta}` : s.delta}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
