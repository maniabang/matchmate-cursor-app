// SwipeCards 스타일 객체 분리

export const cardStyle = {
  position: "absolute" as const,
  width: 330,
  height: 520,
  borderRadius: 24,
  boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
  overflow: "hidden" as const,
  left: 0,
  top: 0,
  zIndex: 2,
  background: "#000",
};

export const backCardStyle = {
  ...cardStyle,
  zIndex: 1,
  scale: 0.95,
  opacity: 0.7,
};

export const buttonStyle = (color: string) => ({
  width: 60,
  height: 60,
  borderRadius: "50%",
  background: "transparent",
  border: "none",
  outline: "none",
  boxShadow: "none",
  color,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  fontWeight: 700,
  fontSize: 32,
  padding: 0,
});

export const likeOverlayStyle = {
  position: "absolute" as const,
  top: 40,
  left: 30,
  fontSize: 48,
  fontWeight: 900,
  color: "#4ED964",
  background: "rgba(255,255,255,0.85)",
  border: "4px solid #4ED964",
  borderRadius: 16,
  padding: "8px 32px",
  boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
  transform: "rotate(-18deg)",
  letterSpacing: 2,
  zIndex: 10,
  pointerEvents: "none" as const,
};

export const nopeOverlayStyle = {
  position: "absolute" as const,
  top: 40,
  right: 30,
  fontSize: 48,
  fontWeight: 900,
  color: "#FF6B6B",
  background: "rgba(255,255,255,0.85)",
  border: "4px solid #FF6B6B",
  borderRadius: 16,
  padding: "8px 32px",
  boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
  transform: "rotate(18deg)",
  letterSpacing: 2,
  zIndex: 10,
  pointerEvents: "none" as const,
};

export const infoStyle = {
  position: "absolute" as const,
  left: 0,
  bottom: 0,
  width: "100%",
  height: 120,
  background: "linear-gradient(0deg, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0.0) 100%)",
  zIndex: 2,
  display: "flex",
  flexDirection: "column" as const,
  justifyContent: "flex-end" as const,
  padding: "24px 16px",
};

export const buttonWrapperStyle = {
  position: "absolute" as const,
  left: 0,
  right: 0,
  bottom: 24,
  width: "100%",
  display: "flex",
  justifyContent: "center" as const,
  gap: 32,
  zIndex: 10,
  pointerEvents: "auto" as const,
}; 