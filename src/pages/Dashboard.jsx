import { useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Users,
  RefreshCw,
  Download,
  Search,
  LogOut,
  AlertCircle,
} from 'lucide-react'
import StatCard from '../components/dashboard/StatCard'
import UserTable from '../components/dashboard/UserTable'
import { fetchUsers } from '../utils/sheets'
import { exportToCsv } from '../utils/exportCsv'

export default function Dashboard() {
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [refreshing, setRefreshing] = useState(false)

  // Auth guard
  useEffect(() => {
    const session = localStorage.getItem('integrit_admin_session')
    if (session !== 'true') {
      navigate('/admin', { replace: true })
    }
  }, [navigate])

  const loadUsers = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true)
    else setLoading(true)
    setError('')

    try {
      const data = await fetchUsers()
      setUsers(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('Fetch error:', err)
      setError(
        'Unable to fetch users. Ensure your Google Apps Script URL is set in src/config/api.js and deployed with public access.'
      )
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    loadUsers()
  }, [])

  const filteredUsers = useMemo(() => {
    if (!search.trim()) return users
    const q = search.toLowerCase()
    return users.filter(
      (u) =>
        (u.name || '').toLowerCase().includes(q) ||
        (u.email || '').toLowerCase().includes(q)
    )
  }, [users, search])

  const handleLogout = () => {
    localStorage.removeItem('integrit_admin_session')
    navigate('/admin')
  }

  const handleExport = () => {
    exportToCsv(filteredUsers)
  }

  // Latest signup date
  const latestJoin = useMemo(() => {
    if (!users.length) return '—'
    const sorted = [...users].sort(
      (a, b) => new Date(b.joinedAt) - new Date(a.joinedAt)
    )
    try {
      return new Date(sorted[0].joinedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    } catch {
      return '—'
    }
  }, [users])

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Top bar */}
      <header className="glass border-b border-white/08 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Integrit logo"
              className="w-9 h-9 object-contain drop-shadow-[0_0_8px_rgba(195,255,51,0.6)]"
            />
            <div>
              <span className="font-display text-xl text-white tracking-wider">INTEGRIT</span>
              <span className="ml-2 text-text-muted text-xs font-mono bg-accent/10 border border-accent/20 px-2 py-0.5 rounded-md text-accent">
                ADMIN
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/"
              className="text-text-muted hover:text-white text-xs font-mono transition-colors hidden sm:block"
            >
              ← Landing Page
            </a>
            <button
              id="dashboard-logout"
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg glass border border-white/10 hover:border-red-500/30 hover:text-red-400 text-text-muted text-sm transition-all duration-300"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:block">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="font-display text-4xl text-white mb-2">WAITLIST DASHBOARD</h1>
          <p className="text-text-muted text-sm">
            All waitlist signups fetched live from Google Sheets.
          </p>
        </motion.div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <StatCard
            label="Total Signups"
            value={users.length.toLocaleString()}
            icon={Users}
            sublabel="All-time waitlist entries"
          />
          <StatCard
            label="Search Results"
            value={filteredUsers.length.toLocaleString()}
            icon={Search}
            sublabel={search ? `Matching "${search}"` : 'All users shown'}
          />
          <StatCard
            label="Latest Signup"
            value={latestJoin}
            sublabel="Most recent entry"
          />
        </div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass rounded-2xl neon-border overflow-hidden"
        >
          {/* Toolbar */}
          <div className="px-6 py-4 border-b border-white/08 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            {/* Search */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                id="dashboard-search"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search name, email..."
                className="input-field w-full pl-10 pr-4 py-2.5 rounded-xl text-sm"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                id="dashboard-refresh"
                onClick={() => loadUsers(true)}
                disabled={refreshing || loading}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass border border-white/10 hover:border-accent/30 text-text-muted hover:text-accent text-sm transition-all duration-300 disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                <span className="hidden sm:block">Refresh</span>
              </button>

              <button
                id="dashboard-export"
                onClick={handleExport}
                disabled={!filteredUsers.length}
                className="btn-primary flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="w-4 h-4" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          {/* Table content */}
          <div className="min-h-64">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-10 h-10 border-2 border-accent/20 border-t-accent rounded-full animate-spin" />
                  <p className="text-text-muted text-sm font-mono">Fetching from Google Sheets...</p>
                </div>
              </div>
            ) : error ? (
              <div className="flex items-start gap-3 px-6 py-8 mx-6 my-6 rounded-xl bg-red-500/05 border border-red-500/20">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-red-400 font-semibold text-sm mb-1">Connection Error</p>
                  <p className="text-text-muted text-xs leading-relaxed">{error}</p>
                </div>
              </div>
            ) : (
              <UserTable users={filteredUsers} />
            )}
          </div>

          {/* Footer count */}
          {!loading && !error && (
            <div className="px-6 py-3 border-t border-white/06">
              <span className="text-text-muted text-xs font-mono">
                {filteredUsers.length} of {users.length} entries
                {search && ` · filtered by "${search}"`}
              </span>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  )
}
