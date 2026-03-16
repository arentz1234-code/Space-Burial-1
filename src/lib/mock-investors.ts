// Mock investor accounts — replace with real DB in production
export const mockInvestors = [
  {
    id: "inv-001",
    email: "investor@example.com",
    // Password: "investor123" — hashed with bcryptjs
    passwordHash: "$2a$10$PLACEHOLDER_HASH_GENERATE_AT_SETUP",
    name: "Alexandra Chen",
    accredited: true,
    investmentAmount: 250000,
    shares: 50000,
    dateJoined: "2025-06-15",
  },
  {
    id: "inv-002",
    email: "demo@spaceburial.com",
    passwordHash: "$2a$10$PLACEHOLDER_HASH_GENERATE_AT_SETUP",
    name: "Marcus Webb",
    accredited: true,
    investmentAmount: 100000,
    shares: 20000,
    dateJoined: "2025-09-01",
  },
];

// Run this once at setup to generate real hashes:
// node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('investor123', 10).then(h => console.log(h))"
