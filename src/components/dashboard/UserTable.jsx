import { motion } from 'framer-motion'

function formatDate(isoString) {
  if (!isoString) return '—'
  try {
    return new Date(isoString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return isoString
  }
}

export default function UserTable({ users }) {
  if (!users || users.length === 0) {
    return (
      <div className="text-center py-16 text-text-muted">
        <p className="font-mono text-sm">No users found.</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="admin-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Joined At</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => (
            <motion.tr
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
            >
              <td className="text-text-muted font-mono text-xs">{i + 1}</td>
              <td className="text-white font-medium">{user.name || '—'}</td>
              <td className="text-text-muted text-sm font-mono">{user.email || '—'}</td>
              <td className="text-text-muted text-xs font-mono">{formatDate(user.timestamp || user.joinedAt)}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
