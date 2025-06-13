export default function handler(req, res) {
  const { primary, sector, avatar } = req.query;

  // Default values to avoid crashes
  const primaryColor = primary || "#FF5733";
  const sectorKey = (sector || "").toLowerCase();
  const avatarKey = avatar || "Professionals";

  const sectorColors = {
    fashion: ["#000000", "#FF69B4", "#FFD700", "#FFFFFF", "#808080"],
    fintech: ["#0A192F", "#00BFFF", "#1C1C1C", "#2E8B57", "#F0F8FF"],
    logistics: ["#1E3A8A", "#2563EB", "#E5E7EB", "#FCD34D", "#111827"],
    health: ["#006400", "#00FA9A", "#F5FFFA", "#A9DFBF", "#2C3E50"],
    education: ["#4B0082", "#9370DB", "#E6E6FA", "#F8F9FA", "#343A40"]
  };

  const avatarColors = {
    "Gen Z": ["#FF5E57", "#7D5FFF", "#FDCB6E", "#55EFC4", "#D63031"],
    "Middle-income Women": ["#E84393", "#F8A5C2", "#FFC3A0", "#FDA7DC", "#F3A683"],
    "Professionals": ["#2C3E50", "#BDC3C7", "#7F8C8D", "#34495E", "#95A5A6"],
    "Small business owners": ["#27AE60", "#F39C12", "#D35400", "#C0392B", "#2980B9"]
  };

  const palette = [
    primaryColor,
    ...(sectorColors[sectorKey]?.slice(0, 2) || []),
    ...(avatarColors[avatarKey]?.slice(0, 2) || [])
  ].slice(0, 5);

  res.setHeader('Access-Control-Allow-Origin', '*'); // Optional for Blogger fetch
  res.status(200).json({ palette });
}
