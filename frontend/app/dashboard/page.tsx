"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Gauge, Users, Shield, Map } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

const backendBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";

interface Incident {
  id: string;
  type: string;
  description: string;
  zone: string;
  latitude: number;
  longitude: number;
  reported_at: string;
}

interface SummaryZone {
  zone: string;
  total_incidents: number;
  total_lost: number;
  risk_level: string;
}

interface LostReport {
  id: string;
  name: string;
  zone: string;
  description: string;
  photo_url?: string;
  reported_at: string;
}

export default function DashboardPage() {
  const [summary, setSummary] = useState<SummaryZone[]>([]);
  const [incidentCount, setIncidentCount] = useState(0);
  const [lostCount, setLostCount] = useState(0);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [lostPeople, setLostPeople] = useState<LostReport[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Summary
        const summaryRes = await axios.get(`${backendBase}/summary`);
        const zones: SummaryZone[] = summaryRes.data.summaries || [];

        let totalIncidents = 0;
        let totalLost = 0;

        zones.forEach((z) => {
          totalIncidents += z.total_incidents || 0;
          totalLost += z.total_lost || 0;
        });

        setSummary(zones);
        setIncidentCount(totalIncidents);
        setLostCount(totalLost);

        // Incidents
        const incidentRes = await axios.get(`${backendBase}/incident`);
        setIncidents(incidentRes.data || []);

        // Lost Reports
        const lostRes = await axios.get(`${backendBase}/lost`);
        setLostPeople(lostRes.data || []);
      } catch (error) {
        console.error("Dashboard load failed:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <Gauge className="text-blue-500" />
            <div>
              <p className="text-sm text-muted-foreground">Total Incidents</p>
              <p className="text-lg font-bold">{incidentCount}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <Users className="text-green-500" />
            <div>
              <p className="text-sm text-muted-foreground">Lost Persons</p>
              <p className="text-lg font-bold">{lostCount}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <Shield className="text-purple-500" />
            <div>
              <p className="text-sm text-muted-foreground">Responders Active</p>
              <p className="text-lg font-bold">3</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Zone-wise Summary */}
      <div>
        <h2 className="text-lg font-medium mt-4 mb-2">Zone-wise Summary</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {summary.map((zone, index) => (
            <Card key={index}>
              <CardContent className="p-4 space-y-1">
                <div className="flex items-center gap-2">
                  <Map className="text-orange-500" />
                  <h3 className="text-md font-semibold">{zone.zone}</h3>
                </div>
                <p className="text-sm">Incidents: {zone.total_incidents}</p>
                <p className="text-sm">Lost Reports: {zone.total_lost}</p>
                <p className="text-sm">Risk Level: {zone.risk_level}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Incident List */}
      <div>
        <h2 className="text-lg font-medium mt-4 mb-2">Recent Incidents</h2>
        {loading ? (
          <p>Loading incidents...</p>
        ) : incidents.length === 0 ? (
          <p>No incidents found.</p>
        ) : (
          <ul className="space-y-4">
            {incidents.map((incident) => (
              <li key={incident.id} className="border rounded p-4 shadow-sm">
                <p><strong>Type:</strong> {incident.type}</p>
                <p><strong>Description:</strong> {incident.description}</p>
                <p><strong>Zone:</strong> {incident.zone}</p>
                <p><strong>Reported At:</strong> {new Date(incident.reported_at).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Lost Persons List */}
      <div>
        <h2 className="text-lg font-medium mt-4 mb-2">Recent Lost Reports</h2>
        {loading ? (
          <p>Loading lost reports...</p>
        ) : lostPeople.length === 0 ? (
          <p>No lost reports found.</p>
        ) : (
          <ul className="space-y-4">
            {lostPeople.map((person) => (
              <li key={person.id} className="border rounded p-4 shadow-sm">
                <p><strong>Name:</strong> {person.name}</p>
                <p><strong>Description:</strong> {person.description}</p>
                <p><strong>Zone:</strong> {person.zone}</p>
                <p><strong>Reported At:</strong> {new Date(person.reported_at).toLocaleString()}</p>
                {person.photo_url && (
                  <img
                    src={person.photo_url}
                    alt={person.name}
                    className="mt-2 h-32 w-auto object-contain rounded border"
                  />
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
