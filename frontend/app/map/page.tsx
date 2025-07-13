"use client"

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { useEffect, useState } from "react"
import axios from "axios"

const backendBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api"
const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"]

export default function HeatmapPage() {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${backendBase}/summary`)
        const formatted = res.data.summaries.map((zone: any) => ({
          name: zone.zone,
          incidents: zone.total_incidents,
          lost: zone.total_lost,
          value: zone.total_incidents + zone.total_lost, // for pie sizing
        }))
        setData(formatted)
      } catch (err) {
        console.error("Error fetching summary data", err)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="p-6 max-w-4xl mx-auto outline-none focus:outline-none">
      <h1 className="text-2xl font-bold mb-6">Zone-wise Heatmap</h1>
      <div className="w-full h-[400px] outline-none focus:outline-none">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={150}
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

// ✅ Custom Tooltip component
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const { name, incidents, lost } = payload[0].payload
    return (
      <div className="bg-white p-2 rounded shadow text-sm border border-gray-200">
        <p className="font-semibold">{name}</p>
        <p>Incidents: {incidents}</p>
        <p>Lost Reports: {lost}</p>
      </div>
    )
  }
  return null
}
