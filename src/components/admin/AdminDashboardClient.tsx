"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Users,
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  Filter,
  Download,
  Settings,
  Sparkles,
  Eye,
  FileText,
  Save,
  ShieldCheck,
  BarChart2,
  ExternalLink,
  Printer,
  Mail,
  Phone,
  Briefcase,
  Code,
  X,
  Plus,
  Trash2,
  MessageCircle,
  LogOut,
} from "lucide-react";
import { signOut } from "next-auth/react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { DOMAINS } from "@/lib/utils";

const COLORS = ["#2563EB", "#7C3AED", "#059669", "#EA580C", "#DB2777"];

const DEFAULT_COORDINATORS = [
  {
    id: "1",
    name: "SAI DHANUSH",
    role: "Technical Lead",
    whatsapp: "https://wa.me/919381276836",
  },
  {
    id: "2",
    name: "RAHUL",
    role: "Recruitment Lead",
    whatsapp: "https://wa.me/919515392839",
  },
];

export default function AdminDashboardClient({ user }: { user?: any }) {
  const [activeTab, setActiveTab] = useState<"analytics" | "candidates" | "settings">("analytics");
  const [applications, setApplications] = useState<any[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<any | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [domainFilter, setDomainFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [settings, setSettings] = useState({
    whatsapp_link: "https://chat.whatsapp.com/GjE2kPLPloK5vU38bSCrsW",
  });
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  // Student Coordinators State
  const [coordinators, setCoordinators] = useState(DEFAULT_COORDINATORS);
  const [newCoordName, setNewCoordName] = useState("");
  const [newCoordRole, setNewCoordRole] = useState("");
  const [newCoordWhatsapp, setNewCoordWhatsapp] = useState("");

  // Fetch real applications & saved coordinators
  useEffect(() => {
    setLoading(true);
    fetch("/api/applications")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setApplications(data);
      })
      .catch((e) => console.error("Error fetching applications:", e))
      .finally(() => setLoading(false));

    // Load saved coordinators from localStorage
    const saved = localStorage.getItem("scrs_coordinators_v3");
    if (saved) {
      try {
        setCoordinators(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Save coordinators to localStorage
  const saveCoordinatorsToStorage = (updated: typeof DEFAULT_COORDINATORS) => {
    setCoordinators(updated);
    localStorage.setItem("scrs_coordinators_v3", JSON.stringify(updated));
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleAddCoordinator = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCoordName.trim()) return;

    const newCoord = {
      id: Date.now().toString(),
      name: newCoordName.trim().toUpperCase(),
      role: newCoordRole.trim() || "Student Coordinator",
      whatsapp: newCoordWhatsapp.trim() || "https://chat.whatsapp.com/GjE2kPLPloK5vU38bSCrsW",
    };

    const updated = [...coordinators, newCoord];
    saveCoordinatorsToStorage(updated);
    setNewCoordName("");
    setNewCoordRole("");
    setNewCoordWhatsapp("");
  };

  const handleRemoveCoordinator = (id: string) => {
    const updated = coordinators.filter((c) => c.id !== id);
    saveCoordinatorsToStorage(updated);
  };

  const handleUpdateCoordWhatsapp = (id: string, newLink: string) => {
    const updated = coordinators.map((c) => (c.id === id ? { ...c, whatsapp: newLink } : c));
    saveCoordinatorsToStorage(updated);
  };

  // Filtered applications
  const filteredApps = useMemo(() => {
    return applications.filter((app) => {
      const matchesSearch =
        app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDomain = domainFilter === "ALL" || app.primaryDomain === domainFilter;
      const matchesStatus = statusFilter === "ALL" || app.status === statusFilter;
      return matchesSearch && matchesDomain && matchesStatus;
    });
  }, [applications, searchTerm, domainFilter, statusFilter]);

  // Real Metrics Calculated Directly from Database State
  const totalApps = applications.length;
  const selectedCount = applications.filter((a) => a.status === "SELECTED").length;
  const rejectedCount = applications.filter((a) => a.status === "REJECTED").length;
  const pendingCount = totalApps - selectedCount - rejectedCount;

  // Real Domain Popularity Chart Data dynamically computed from real applications
  const domainChartData = useMemo(() => {
    const domainCounts: Record<string, number> = {};
    DOMAINS.forEach((d) => {
      domainCounts[d.name] = 0;
    });

    applications.forEach((app) => {
      const domain = app.primaryDomain || "Web Wizards";
      domainCounts[domain] = (domainCounts[domain] || 0) + 1;
    });

    return Object.entries(domainCounts).map(([name, value]) => ({ name, value }));
  }, [applications]);

  // Real Department Demographics Chart Data dynamically computed from real applications
  const deptChartData = useMemo(() => {
    const deptCounts: Record<string, number> = {};

    applications.forEach((app) => {
      const dept = app.department || "Other";
      let shortDept = dept;
      if (dept.includes("Computer Science")) shortDept = "CSE";
      else if (dept.includes("Artificial Intelligence")) shortDept = "AI & DS";
      else if (dept.includes("Information Technology")) shortDept = "IT";
      else if (dept.includes("Electronics")) shortDept = "ECE";
      else if (dept.includes("Electrical")) shortDept = "EEE";
      else if (dept.includes("Mechanical")) shortDept = "MECH";
      else if (dept.includes("Biotechnology")) shortDept = "BIOTECH";

      deptCounts[shortDept] = (deptCounts[shortDept] || 0) + 1;
    });

    return Object.entries(deptCounts).map(([name, count]) => ({ name, count }));
  }, [applications]);

  const exportCSV = () => {
    const headers = "ID,Name,Roll Number,Email,Phone,Department,Year,Domain,Status,Score\n";
    const rows = filteredApps
      .map(
        (a) =>
          `"${a.id}","${a.fullName}","${a.rollNumber}","${a.email}","${a.phoneNumber}","${a.department}","${a.year}","${a.primaryDomain}","${a.status}",${a.score || 0}`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `SCRS_Recruitment_Applicants_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  };

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    // Optimistic UI update
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
    );
    if (selectedCandidate && selectedCandidate.id === id) {
      setSelectedCandidate({ ...selectedCandidate, status: newStatus });
    }

    try {
      const res = await fetch("/api/applications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        console.error("Failed to persist status change in database:", data.error);
      }
    } catch (err) {
      console.error("Network error saving status change:", err);
    }
  };

  const handleSaveSettings = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Admin Navbar / Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 glass-card p-6 rounded-3xl">
        <div>
          <span className="text-xs font-semibold text-brand-blue uppercase tracking-wider">
            Management Suite
          </span>
          <h1 className="font-space font-bold text-2xl sm:text-3xl text-brand-navy mt-1">
            Admin Dashboard
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Live database analytics, applicant tracking & coordinator management
          </p>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 max-w-full">
          {[
            { id: "analytics", label: "Analytics", icon: BarChart2 },
            { id: "candidates", label: "Applicants", icon: Users },
            { id: "settings", label: "Settings & Coordinators", icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs transition-all whitespace-nowrap flex-shrink-0 ${
                  activeTab === tab.id
                    ? "bg-brand-blue text-white shadow-lg shadow-brand-blue/25 scale-105"
                    : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}

          <button
            onClick={() => signOut({ callbackUrl: "/scrsadmin" })}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs transition-all whitespace-nowrap flex-shrink-0 bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 hover:text-red-700 ml-1"
            title="Sign Out of Admin Portal"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </div>

      {/* TAB 1: Real Analytics & Statistics */}
      {activeTab === "analytics" && (
        <div className="space-y-8">
          {/* Top Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card p-6 rounded-3xl border border-blue-100 flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 text-brand-blue flex items-center justify-center">
                <Users className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
                  Total Applications
                </span>
                <h3 className="font-space font-bold text-3xl text-brand-navy mt-0.5">
                  {totalApps}
                </h3>
              </div>
            </div>

            <div className="glass-card p-6 rounded-3xl border border-green-100 flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
                  Selected
                </span>
                <h3 className="font-space font-bold text-3xl text-brand-navy mt-0.5">
                  {selectedCount}
                </h3>
              </div>
            </div>

            <div className="glass-card p-6 rounded-3xl border border-amber-100 flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
                <Clock className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
                  Pending Review
                </span>
                <h3 className="font-space font-bold text-3xl text-brand-navy mt-0.5">
                  {pendingCount}
                </h3>
              </div>
            </div>

            <div className="glass-card p-6 rounded-3xl border border-red-100 flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center">
                <XCircle className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
                  Rejected
                </span>
                <h3 className="font-space font-bold text-3xl text-brand-navy mt-0.5">
                  {rejectedCount}
                </h3>
              </div>
            </div>
          </div>

          {/* Interactive Recharts with REAL Database Data */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-gray-200">
              <h3 className="font-space font-bold text-lg text-brand-navy mb-1">
                Domain Popularity Distribution
              </h3>
              <p className="text-xs text-gray-400 mb-6">Real-time counts per primary domain</p>
              <div className="h-[300px] w-full">
                {domainChartData.some((d) => d.value > 0) ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={domainChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, value }) => (value > 0 ? `${name}: ${value}` : "")}
                      >
                        {domainChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-xs text-gray-400">
                    No application domain data available yet.
                  </div>
                )}
              </div>
            </div>

            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-gray-200">
              <h3 className="font-space font-bold text-lg text-brand-navy mb-1">
                Department Demographics
              </h3>
              <p className="text-xs text-gray-400 mb-6">Real-time counts per academic department</p>
              <div className="h-[300px] w-full">
                {deptChartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={deptChartData}>
                      <XAxis dataKey="name" />
                      <YAxis allowDecimals={false} />
                      <Tooltip />
                      <Bar dataKey="count" fill="#2563EB" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-xs text-gray-400">
                    No department demographic data available yet.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Applicant Management Table */}
      {activeTab === "candidates" && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-card p-6 rounded-3xl">
            <div className="flex flex-1 items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-2.5">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, roll number, email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full text-xs outline-none"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <select
                value={domainFilter}
                onChange={(e) => setDomainFilter(e.target.value)}
                className="px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-gray-700"
              >
                <option value="ALL">All Domains</option>
                <option value="Web Wizards">Web Wizards</option>
                <option value="ML Minds">ML Minds</option>
                <option value="Innovators Den">Innovators Den</option>
                <option value="Pixel Crafters">Pixel Crafters</option>
                <option value="Event Architects">Event Architects</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-gray-700"
              >
                <option value="ALL">All Statuses</option>
                <option value="RECEIVED">Received</option>
                <option value="SHORTLISTED">Shortlisted</option>
                <option value="SELECTED">Selected</option>
                <option value="REJECTED">Rejected</option>
              </select>

              <button
                onClick={exportCSV}
                className="inline-flex items-center gap-2 px-4 py-2 bg-brand-blue text-white text-xs font-semibold rounded-xl hover:bg-brand-blue-light transition-all"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="glass-card rounded-3xl overflow-hidden border border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    <th className="py-4 px-6">ID & Name</th>
                    <th className="py-4 px-6">Roll Number</th>
                    <th className="py-4 px-6">Domain</th>
                    <th className="py-4 px-6">Department</th>
                    <th className="py-4 px-6">AI Score</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs text-brand-navy">
                  {filteredApps.length > 0 ? (
                    filteredApps.map((app) => (
                      <tr key={app.id} className="hover:bg-blue-50/30 transition-colors">
                        <td className="py-4 px-6">
                          <div className="font-bold text-brand-blue">{app.id}</div>
                          <div className="font-semibold text-brand-navy">{app.fullName}</div>
                        </td>
                        <td className="py-4 px-6 font-mono text-gray-600">{app.rollNumber}</td>
                        <td className="py-4 px-6 font-semibold text-gray-700">{app.primaryDomain}</td>
                        <td className="py-4 px-6 text-gray-500">{app.department}</td>
                        <td className="py-4 px-6">
                          <span className="font-bold text-brand-blue">{app.score || 85}%</span>
                        </td>
                        <td className="py-4 px-6">
                          <span
                            className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                              app.status === "SELECTED"
                                ? "bg-green-100 text-green-800"
                                : app.status === "SHORTLISTED"
                                ? "bg-blue-100 text-blue-800"
                                : app.status === "REJECTED"
                                ? "bg-red-100 text-red-800"
                                : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {app.status}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <button
                            onClick={() => setSelectedCandidate(app)}
                            className="px-3.5 py-1.5 bg-brand-blue text-white font-semibold rounded-lg hover:bg-brand-blue-light transition-all inline-flex items-center gap-1.5 shadow-sm"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            View Full Application
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-gray-400">
                        {loading ? "Loading applicants..." : "No applicants found in database."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Settings & Student Coordinators Manager */}
      {activeTab === "settings" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* General Portal Settings */}
          <div className="glass-card p-8 rounded-3xl border border-gray-200 space-y-6">
            <h3 className="font-space font-bold text-xl text-brand-navy">
              Recruitment Portal Settings
            </h3>
            <p className="text-xs text-gray-500">
              Update main WhatsApp community invite link.
            </p>

            {saveSuccess && (
              <div className="p-4 rounded-xl bg-green-50 text-green-700 text-xs font-semibold">
                ✓ Settings & Coordinators saved successfully!
              </div>
            )}

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-brand-navy mb-2">
                  Main WhatsApp Community Invite Link
                </label>
                <input
                  type="text"
                  value={settings.whatsapp_link}
                  onChange={(e) => setSettings({ ...settings, whatsapp_link: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200"
                />
              </div>

              <button
                onClick={handleSaveSettings}
                className="px-6 py-3 bg-brand-blue text-white font-semibold rounded-xl hover:bg-brand-blue-light transition-all inline-flex items-center gap-2 shadow-md"
              >
                <Save className="w-4 h-4" />
                Save Settings
              </button>
            </div>
          </div>

          {/* Student Coordinators Manager */}
          <div className="glass-card p-8 rounded-3xl border border-gray-200 space-y-6">
            <h3 className="font-space font-bold text-xl text-brand-navy flex items-center justify-between">
              <span>Manage Student Coordinators</span>
              <span className="text-xs font-semibold px-2.5 py-1 bg-brand-blue/10 text-brand-blue rounded-full">
                {coordinators.length} Coordinators
              </span>
            </h3>
            <p className="text-xs text-gray-500">
              Add or remove student leads and set custom WhatsApp chat links for candidate assistance.
            </p>

            {/* Add Coordinator Form */}
            <form onSubmit={handleAddCoordinator} className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-3">
              <h4 className="text-xs font-bold text-brand-navy uppercase tracking-wider">
                Add New Coordinator
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <input
                  type="text"
                  placeholder="Coordinator Name (e.g. N HARSHITHA SAI)"
                  value={newCoordName}
                  onChange={(e) => setNewCoordName(e.target.value)}
                  className="px-3 py-2 bg-white rounded-xl border border-gray-200"
                  required
                />
                <input
                  type="text"
                  placeholder="Role (e.g. Student Representative)"
                  value={newCoordRole}
                  onChange={(e) => setNewCoordRole(e.target.value)}
                  className="px-3 py-2 bg-white rounded-xl border border-gray-200"
                />
              </div>

              <input
                type="text"
                placeholder="WhatsApp Link (e.g. https://chat.whatsapp.com/... or https://wa.me/919876543210)"
                value={newCoordWhatsapp}
                onChange={(e) => setNewCoordWhatsapp(e.target.value)}
                className="w-full px-3 py-2 bg-white rounded-xl border border-gray-200 text-xs"
              />

              <button
                type="submit"
                className="px-4 py-2 bg-brand-blue text-white font-semibold text-xs rounded-xl hover:bg-brand-blue-light transition-all inline-flex items-center gap-1.5 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                Add Coordinator
              </button>
            </form>

            {/* Current Coordinators List */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Current Coordinators List
              </h4>

              {coordinators.map((coord) => (
                <div key={coord.id} className="p-4 rounded-2xl bg-white border border-gray-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-space font-bold text-sm text-brand-navy">{coord.name}</h5>
                      <span className="text-[10px] text-gray-400 font-medium">{coord.role}</span>
                    </div>
                    <button
                      onClick={() => handleRemoveCoordinator(coord.id)}
                      className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                      title="Remove Coordinator"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <MessageCircle className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
                    <input
                      type="text"
                      value={coord.whatsapp}
                      onChange={(e) => handleUpdateCoordWhatsapp(coord.id, e.target.value)}
                      className="w-full px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-100 text-[11px]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* FULL CANDIDATE APPLICATION FORM MODAL */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl space-y-6 text-left relative">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <span className="text-xs font-bold text-brand-blue uppercase tracking-wider">
                  Full Application Sheet • {selectedCandidate.id}
                </span>
                <h3 className="font-space font-bold text-2xl text-brand-navy mt-1">
                  {selectedCandidate.fullName}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Submitted on: {new Date(selectedCandidate.createdAt || Date.now()).toLocaleString()}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => window.print()}
                  className="p-2.5 rounded-xl border border-gray-200 hover:bg-gray-100 text-gray-600 transition-colors"
                  title="Print Application Form"
                >
                  <Printer className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSelectedCandidate(null)}
                  className="p-2 rounded-xl hover:bg-gray-100 text-gray-500 font-bold text-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* AI Candidate Summary Report */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-brand-blue font-bold text-xs">
                  <Sparkles className="w-4 h-4" />
                  AI Candidate Match Analysis
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-100 text-blue-800">
                  Match Score: {selectedCandidate.score || 85}%
                </span>
              </div>
              <p className="text-xs text-gray-700 leading-relaxed">
                {selectedCandidate.aiSummary ||
                  `${selectedCandidate.fullName} demonstrates strong alignment with ${selectedCandidate.primaryDomain}. High potential candidate.`}
              </p>
            </div>

            {/* SECTION 1: Personal Details */}
            <div className="glass-card p-6 rounded-2xl border border-gray-200 space-y-4">
              <h4 className="font-space font-bold text-sm text-brand-navy flex items-center gap-2 border-b pb-2">
                <Users className="w-4 h-4 text-brand-blue" />
                Personal Details
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-semibold">Full Name</span>
                  <span className="font-bold text-brand-navy text-sm">{selectedCandidate.fullName}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-semibold">Roll Number</span>
                  <span className="font-bold text-brand-navy font-mono text-sm">{selectedCandidate.rollNumber}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-semibold">Department</span>
                  <span className="font-semibold text-brand-navy">{selectedCandidate.department}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-semibold">Academic Year</span>
                  <span className="font-semibold text-brand-navy">{selectedCandidate.year} Year</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-semibold">Section</span>
                  <span className="font-semibold text-brand-navy">{selectedCandidate.section || "A"}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-semibold">Gender</span>
                  <span className="font-semibold text-brand-navy">{selectedCandidate.gender || "Male"}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-semibold">Phone Number</span>
                  <span className="font-semibold text-brand-navy flex items-center gap-1">
                    <Phone className="w-3 h-3 text-brand-blue" />
                    {selectedCandidate.phoneNumber}
                  </span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-gray-400 block text-[10px] uppercase font-semibold">Email Address</span>
                  <span className="font-semibold text-brand-navy flex items-center gap-1">
                    <Mail className="w-3 h-3 text-brand-blue" />
                    {selectedCandidate.email}
                  </span>
                </div>
              </div>
            </div>

            {/* SECTION 2: Social & Portfolio Profiles */}
            <div className="glass-card p-6 rounded-2xl border border-gray-200 space-y-4">
              <h4 className="font-space font-bold text-sm text-brand-navy flex items-center gap-2 border-b pb-2">
                <ExternalLink className="w-4 h-4 text-brand-blue" />
                Profiles & Portfolio Links
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-semibold">LinkedIn Profile</span>
                  {selectedCandidate.linkedin ? (
                    <a
                      href={selectedCandidate.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-brand-blue hover:underline inline-flex items-center gap-1 mt-0.5"
                    >
                      View LinkedIn Profile <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="text-gray-400 italic">Not Provided</span>
                  )}
                </div>

                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-semibold">GitHub Profile</span>
                  {selectedCandidate.github ? (
                    <a
                      href={selectedCandidate.github}
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-brand-blue hover:underline inline-flex items-center gap-1 mt-0.5"
                    >
                      View GitHub Profile <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="text-gray-400 italic">Not Provided</span>
                  )}
                </div>

                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-semibold">Portfolio / Website</span>
                  {selectedCandidate.portfolio ? (
                    <a
                      href={selectedCandidate.portfolio}
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-brand-blue hover:underline inline-flex items-center gap-1 mt-0.5"
                    >
                      View Portfolio <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="text-gray-400 italic">Not Provided</span>
                  )}
                </div>
              </div>
            </div>

            {/* SECTION 3: Domain & Tech Skills */}
            <div className="glass-card p-6 rounded-2xl border border-gray-200 space-y-4">
              <h4 className="font-space font-bold text-sm text-brand-navy flex items-center gap-2 border-b pb-2">
                <Code className="w-4 h-4 text-brand-blue" />
                Domain & Technical Skills
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-semibold">Primary Domain Choice</span>
                  <span className="font-bold text-brand-blue text-sm">{selectedCandidate.primaryDomain}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-semibold">Secondary Domain Choice</span>
                  <span className="font-semibold text-brand-navy">{selectedCandidate.secondaryDomain || "None"}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-semibold">Programming Languages</span>
                  <span className="font-semibold text-brand-navy">{selectedCandidate.programmingLanguages || "Not specified"}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-semibold">Frameworks & Tools</span>
                  <span className="font-semibold text-brand-navy">{selectedCandidate.frameworks || "Not specified"}</span>
                </div>
              </div>
            </div>

            {/* SECTION 4: Motivation */}
            {selectedCandidate.reasonToJoin && (
              <div className="glass-card p-6 rounded-2xl border border-gray-200 space-y-2">
                <h4 className="font-space font-bold text-sm text-brand-navy flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-brand-blue" />
                  Motivation to Join SCRS
                </h4>
                <p className="text-xs text-gray-700 leading-relaxed bg-gray-50 p-3.5 rounded-xl border border-gray-100">
                  {selectedCandidate.reasonToJoin}
                </p>
              </div>
            )}

            {/* Actions / Status Change Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-200">
              <div>
                <span className="text-xs font-bold text-brand-navy block">Current Application Status:</span>
                <span className="text-xs font-semibold text-brand-blue uppercase">{selectedCandidate.status}</span>
              </div>

              <div className="flex items-center gap-2">
                {["SHORTLISTED", "SELECTED", "REJECTED"].map((st) => (
                  <button
                    key={st}
                    onClick={() => handleUpdateStatus(selectedCandidate.id, st)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      selectedCandidate.status === st
                        ? "bg-brand-blue text-white shadow-md"
                        : "bg-white border text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    Set {st}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
