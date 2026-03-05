import { motion, AnimatePresence } from "framer-motion";
import { Monitor, ShoppingBag, User, Search, BookOpen, GraduationCap, Database, Eye, EyeOff, AlertTriangle, Shield, Lock } from "lucide-react";

interface LiveAppPanelProps {
  level: number;
  isCompromised: boolean;
  isFixed: boolean;
  exposedRecords: number;
  protectedRecords: number;
}

const studentRecords = [
  { id: "STU-20240001", name: "Jane Doe", gpa: "3.8", email: "jane.doe@uni.edu", ssn: "***-**-4521", balance: "$2,340" },
  { id: "STU-20240002", name: "Mark Liu", gpa: "3.5", email: "mark.liu@uni.edu", ssn: "***-**-7834", balance: "$1,890" },
  { id: "STU-20240003", name: "Priya Singh", gpa: "3.9", email: "priya.s@uni.edu", ssn: "***-**-2156", balance: "$3,100" },
  { id: "STU-20240004", name: "Alex Rivera", gpa: "3.2", email: "alex.r@uni.edu", ssn: "***-**-9903", balance: "$950" },
  { id: "STU-20240005", name: "Sarah Kim", gpa: "3.7", email: "sarah.k@uni.edu", ssn: "***-**-6612", balance: "$2,780" },
];

const LiveAppPanel = ({ level, isCompromised, isFixed, exposedRecords, protectedRecords }: LiveAppPanelProps) => {
  const listings = [
    { title: "Calculus Textbook", price: "$25", seller: "Alex M.", icon: BookOpen },
    { title: "Lab Coat (Size M)", price: "$15", seller: "Sarah K.", icon: GraduationCap },
    { title: "USB-C Hub", price: "$30", seller: "Chris R.", icon: ShoppingBag },
  ];

  return (
    <div className="glass-panel rounded-lg overflow-hidden h-full flex flex-col relative">
      {/* Compromised overlay */}
      {isCompromised && !isFixed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: "repeating-linear-gradient(0deg, transparent, transparent 3px, hsl(0 100% 55% / 0.04) 3px, hsl(0 100% 55% / 0.04) 6px)",
          }}
        >
          <div className="absolute inset-0 border-2 border-neon-red/30 rounded-lg animate-pulse-glow" />
        </motion.div>
      )}

      {isFixed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 z-10 pointer-events-none border-2 border-neon-green/30 rounded-lg"
          style={{ boxShadow: "inset 0 0 30px hsl(150 100% 45% / 0.05)" }}
        />
      )}

      {/* App header bar */}
      <div className="px-4 py-2 border-b border-border flex items-center gap-2">
        <Monitor className="w-4 h-4 text-primary" />
        <span className="font-display text-xs tracking-widest text-primary text-glow-cyan">
          STUDENT MARKETPLACE
        </span>
        <span className={`ml-auto text-xs font-mono px-2 py-0.5 rounded-full ${
          isCompromised && !isFixed ? "bg-neon-red/20 text-neon-red" : isFixed ? "bg-neon-green/20 text-neon-green" : "bg-muted text-muted-foreground"
        }`}>
          {isCompromised && !isFixed ? "● BREACHED" : isFixed ? "● SECURED" : "● ONLINE"}
        </span>
      </div>

      {/* Data exposure stats bar */}
      {(exposedRecords > 0 || protectedRecords > 0) && (
        <div className="px-4 py-2 border-b border-border flex items-center gap-4 text-xs font-mono">
          {exposedRecords > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-1.5 text-neon-red"
            >
              <Eye className="w-3 h-3" />
              <span>{exposedRecords.toLocaleString()} records exposed</span>
            </motion.div>
          )}
          {protectedRecords > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-1.5 text-neon-green"
            >
              <EyeOff className="w-3 h-3" />
              <span>{protectedRecords.toLocaleString()} records secured</span>
            </motion.div>
          )}
        </div>
      )}

      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {/* Level 1: Login + SQL */}
        {level === 1 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
            <h3 className="font-display text-sm text-foreground">LOGIN</h3>
            <div className="space-y-2">
              <div className="bg-muted rounded-md px-3 py-2 flex items-center gap-2">
                <User className="w-4 h-4 text-muted-foreground" />
                <span className={`font-mono text-sm ${isCompromised && !isFixed ? "text-neon-red" : "text-muted-foreground"}`}>
                  {isCompromised && !isFixed ? "' OR 1=1 --" : "student@university.edu"}
                </span>
              </div>
              <div className="bg-muted rounded-md px-3 py-2 flex items-center gap-2">
                <Lock className="w-4 h-4 text-muted-foreground" />
                <span className="font-mono text-sm text-muted-foreground">••••••••</span>
              </div>
            </div>
            {isCompromised && !isFixed && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-neon-red/10 border border-neon-red/30 rounded-md p-3 font-mono text-xs text-neon-red space-y-1">
                <div>⚠ SQL QUERY: SELECT * FROM users WHERE username='' OR 1=1 --'</div>
                <div>→ {exposedRecords.toLocaleString()} records returned to attacker</div>
              </motion.div>
            )}
            {isFixed && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-neon-green/10 border border-neon-green/30 rounded-md p-3 font-mono text-xs text-neon-green space-y-1">
                <div>✓ Query parameterized: SELECT * FROM users WHERE username = $1</div>
                <div>→ Injection attempt rejected. 0 unauthorized records returned.</div>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Level 2: Data Transmission */}
        {level === 2 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
            <h3 className="font-display text-sm text-foreground">DATA TRANSMISSION</h3>
            <div className="space-y-1.5">
              {studentRecords.slice(0, 4).map((rec, i) => (
                <motion.div
                  key={i}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.15 }}
                  className={`font-mono text-xs px-3 py-2 rounded-md border ${
                    isCompromised && !isFixed
                      ? "bg-neon-red/10 border-neon-red/20 text-neon-red"
                      : isFixed
                      ? "bg-neon-green/10 border-neon-green/20 text-neon-green"
                      : "bg-muted/50 border-border text-muted-foreground"
                  }`}
                >
                  {isFixed
                    ? `[AES-256] ${"█".repeat(8)} | ${"█".repeat(6)} | ${"█".repeat(4)}`
                    : `${rec.id} | ${rec.name} | GPA: ${rec.gpa} | ${rec.email}`
                  }
                </motion.div>
              ))}
            </div>
            {isCompromised && !isFixed && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-neon-red/10 border border-neon-red/30 rounded-md p-3 font-mono text-xs text-neon-red space-y-1">
                <div>⚠ PACKET SNIFFER ACTIVE</div>
                <div>→ Intercepted: Names, GPAs, emails, financial data</div>
                <div>→ {exposedRecords.toLocaleString()} student records compromised</div>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Level 3: Auth */}
        {level === 3 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
            <h3 className="font-display text-sm text-foreground">AUTHENTICATION LOG</h3>
            {isCompromised && !isFixed && (
              <div className="space-y-1.5">
                {["admin:password123 ✗", "admin:qwerty ✗", "admin:letmein ✗", "admin:dragon ✗", "admin:P@ssw0rd! ✓ ACCESS GRANTED"].map((attempt, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.15 }}
                    className={`font-mono text-xs px-3 py-1.5 rounded-md ${
                      i === 4 ? "bg-neon-red/20 border border-neon-red/30 text-neon-red" : "text-neon-red/60"
                    }`}
                  >
                    → {attempt}
                  </motion.div>
                ))}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="bg-neon-red/10 border border-neon-red/30 rounded-md p-3 font-mono text-xs text-neon-red space-y-1">
                  <div>⚠ ACCOUNT COMPROMISED</div>
                  <div>→ Attacker gained admin access to {exposedRecords.toLocaleString()} accounts</div>
                </motion.div>
              </div>
            )}
            {isFixed && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                <div className="bg-neon-green/10 border border-neon-green/30 rounded-md p-3 font-mono text-xs text-neon-green space-y-1">
                  <div>✓ Rate limit: 5 attempts per minute enforced</div>
                  <div>✓ MFA enabled: SMS/Authenticator required</div>
                  <div>→ Brute force attack blocked after 5 attempts</div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Database preview panel */}
        <div className="space-y-2 mt-2">
          <div className="flex items-center gap-2">
            <Database className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="font-display text-[0.65rem] tracking-wider text-muted-foreground">DATABASE RECORDS</span>
          </div>
          <div className="overflow-hidden rounded-md border border-border">
            <div className="grid grid-cols-4 gap-px bg-border text-[0.6rem] font-mono uppercase">
              <div className="bg-muted px-2 py-1 text-muted-foreground">ID</div>
              <div className="bg-muted px-2 py-1 text-muted-foreground">Name</div>
              <div className="bg-muted px-2 py-1 text-muted-foreground">GPA</div>
              <div className="bg-muted px-2 py-1 text-muted-foreground">Balance</div>
            </div>
            {studentRecords.map((rec, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 + i * 0.05 }}
                className="grid grid-cols-4 gap-px bg-border text-[0.6rem] font-mono"
              >
                <div className={`px-2 py-1 ${isCompromised && !isFixed ? "bg-neon-red/5 text-neon-red" : isFixed ? "bg-neon-green/5 text-neon-green" : "bg-card text-muted-foreground"}`}>
                  {isFixed ? "████" : rec.id.slice(-4)}
                </div>
                <div className={`px-2 py-1 ${isCompromised && !isFixed ? "bg-neon-red/5 text-neon-red" : isFixed ? "bg-neon-green/5 text-neon-green" : "bg-card text-muted-foreground"}`}>
                  {isFixed ? "████" : rec.name}
                </div>
                <div className={`px-2 py-1 ${isCompromised && !isFixed ? "bg-neon-red/5 text-neon-red" : isFixed ? "bg-neon-green/5 text-neon-green" : "bg-card text-muted-foreground"}`}>
                  {isFixed ? "██" : rec.gpa}
                </div>
                <div className={`px-2 py-1 ${isCompromised && !isFixed ? "bg-neon-red/5 text-neon-red" : isFixed ? "bg-neon-green/5 text-neon-green" : "bg-card text-muted-foreground"}`}>
                  {isFixed ? "████" : rec.balance}
                </div>
              </motion.div>
            ))}
          </div>
          {isCompromised && !isFixed && (
            <div className="flex items-center gap-1.5 font-mono text-[0.6rem] text-neon-red">
              <AlertTriangle className="w-3 h-3" />
              <span>All records visible to attacker</span>
            </div>
          )}
          {isFixed && (
            <div className="flex items-center gap-1.5 font-mono text-[0.6rem] text-neon-green">
              <Shield className="w-3 h-3" />
              <span>Records encrypted and access-controlled</span>
            </div>
          )}
        </div>

        {/* Marketplace listings */}
        <div className="space-y-2 mt-2">
          <div className="flex items-center gap-2 mb-2">
            <Search className="w-4 h-4 text-muted-foreground" />
            <div className="flex-1 bg-muted rounded-md px-3 py-1.5">
              <span className="font-mono text-xs text-muted-foreground">Search listings...</span>
            </div>
          </div>
          {listings.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="flex items-center gap-3 bg-muted/50 rounded-md px-3 py-2"
            >
              <item.icon className="w-4 h-4 text-primary" />
              <div className="flex-1">
                <div className="text-sm text-foreground">{item.title}</div>
                <div className="text-xs text-muted-foreground">by {item.seller}</div>
              </div>
              <span className="font-mono text-sm text-neon-green">{item.price}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveAppPanel;
