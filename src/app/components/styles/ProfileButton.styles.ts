export const profileButtonStyle = {
  width: '100%',
  padding: '12px 0',
  background: '#EBA8A6',
  color: '#fff',
  border: 'none',
  borderRadius: 8,
  fontWeight: 600,
  fontSize: 16,
  cursor: 'pointer',
  transition: 'background 0.18s, box-shadow 0.18s, color 0.18s',
  marginBottom: 8,
  boxShadow: '0 2px 8px rgba(235, 168, 166, 0.08)',
};

export const profileBackButtonStyle = {
  position: 'absolute' as const,
  top: 8,
  left: 8,
  background: 'none' as const,
  border: 'none' as const,
  fontSize: '1.5rem',
  color: '#EBA8A6',
  cursor: 'pointer' as const,
  zIndex: 10,
  padding: 0,
};