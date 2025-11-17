// Format timestamp to readable time

export const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now - date;

  // If today, show time
  if (diff < 86400000) {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  }

  // If this week, show day
  if (diff < 604800000) {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  }

  // Otherwise show date
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export const getInitials = (name) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};
