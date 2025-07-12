"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import axios from "axios"
import { useState } from "react"
import { Input } from "@/Components/ui/input"
import { Button } from "@/Components/ui/button"
import { Textarea } from "@/Components/ui/textarea"
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from "@/Components/ui/select"
import { format } from "date-fns"

const formSchema = z.object({
  id: z.string().min(1),
  type: z.enum(["fire", "medical", "disturbance", "unknown"]),
  description: z.string().min(5),
  zone: z.string().min(1),
  latitude: z.string(),
  longitude: z.string(),
  reported_at: z.string()
})

export default function IncidentFormPage() {
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      type: "unknown",
      description: "",
      zone: "",
      latitude: "",
      longitude: "",
      reported_at: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
    },
  })

  const onSubmit = async (data: any) => {
    setLoading(true)
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/incidents`, {
        ...data,
        latitude: parseFloat(data.latitude),
        longitude: parseFloat(data.longitude),
      })
      alert("Incident reported successfully!")
    } catch (err) {
      console.error(err)
      alert("Something went wrong!")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Report an Incident</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <Input placeholder="Incident ID" {...register("id")} />
        {errors.id && <p className="text-red-500 text-sm">{errors.id.message}</p>}

        <Select onValueChange={(val) => setValue("type", val)}>
          <SelectTrigger>
            <SelectValue placeholder="Select Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fire">Fire</SelectItem>
            <SelectItem value="medical">Medical</SelectItem>
            <SelectItem value="disturbance">Disturbance</SelectItem>
            <SelectItem value="unknown">Unknown</SelectItem>
          </SelectContent>
        </Select>

        <Textarea placeholder="Description" {...register("description")} />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}

        <Input placeholder="Zone (e.g. Zone A)" {...register("zone")} />
        <Input placeholder="Latitude" type="number" step="0.0001" {...register("latitude")} />
        <Input placeholder="Longitude" type="number" step="0.0001" {...register("longitude")} />

        <Input type="datetime-local" {...register("reported_at")} />

        <Button type="submit" disabled={loading}>
          {loading ? "Reporting..." : "Submit"}
        </Button>
      </form>
    </div>
  )
}
