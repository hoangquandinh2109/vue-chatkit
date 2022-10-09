// Helper function for displaying error messages
export function handleError(commit, error) {
  const message = error.message || error.info?.error_description || error || 'error'
  commit('setError', message)
}
