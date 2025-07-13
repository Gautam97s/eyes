// app/lost-found/page.tsx

"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useState } from "react"
import axios from "axios"
import { Input } from "@/Components/ui/input"
import { Button } from "@/Components/ui/button"
import { Textarea } from "@/Components/ui/textarea"
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "@/Components/ui/select"
import { format } from "date-fns"

const formSchema = z.object({
  id: z.string().min(1),
  type: z.enum(["lost", "found"]),
  category: z.enum(["person", "object"]),
  name: z.string().optional(),
  description: z.string().min(5),
  zone: z.string().min(1),
  photo_url: z.string().url().optional(),
  reported_at: z.string(),
})

export default function LostFoundPage() {
  const [loading, setLoading] = useState(false)
  const [reportType, setReportType] = useState<"lost" | "found">("lost")
  const [category, setCategory] = useState<"person" | "object">("person")

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      type: "lost",
      category: "person",
      name: "",
      description: "",
      zone: "",
      photo_url: "",
      reported_at: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
    },
  })

  const onSubmit = async (data: any) => {
    setLoading(true)
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/${data.type}`,
        data
      )
      alert(`${data.type === "lost" ? "Lost" : "Found"} report submitted!`)
    } catch (err) {
      console.error(err)
      alert("Something went wrong!")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Lost & Found Form</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Select
          onValueChange={(val: "lost" | "found") => {
            setReportType(val)
            setValue("type", val)
          }}
          defaultValue="lost"
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Report Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="lost">Lost</SelectItem>
            <SelectItem value="found">Found</SelectItem>
          </SelectContent>
        </Select>

        <Select
          onValueChange={(val: "person" | "object") => {
            setCategory(val)
            setValue("category", val)
          }}
          defaultValue="person"
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="person">Person</SelectItem>
            <SelectItem value="object">Object</SelectItem>
          </SelectContent>
        </Select>

        <Input placeholder="Report ID" {...register("id")} />
        {errors.id && <p className="text-red-500 text-sm">{errors.id.message}</p>}

        {(reportType === "lost" && category === "person") ||
          reportType === "found" ? (
          <Input placeholder="Name (optional for object)" {...register("name")} />
        ) : null}

        <Textarea placeholder="Description" {...register("description")} />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}

        <Input placeholder="Zone (e.g. Zone A)" {...register("zone")} />
        <Input placeholder="Photo URL (optional)" {...register("photo_url")} />
        <Input type="datetime-local" {...register("reported_at")} />

        <Button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </div>
  )
}
