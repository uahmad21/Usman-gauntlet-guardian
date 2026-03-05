import { motion } from "framer-motion";
import { FileText, Shield, Target, Wrench, AlertTriangle, X, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SecurityReportProps {
  onClose: () => void;
  xp: number;
  wrongTotal: number;
}

const SecurityReport = ({ onClose, xp, wrongTotal }: SecurityReportProps) => {
  const grade = wrongTotal === 0 ? "S" : wrongTotal <= 2 ? "A" : wrongTotal <= 4 ? "B" : "C";

  const sections = [
    {
      icon: Shield,
      title: "ASSETS PROTECTED",
      color: "text-neon-cyan",
      items: [
        "Student Personal Data (2,847 records) — via Parameterized Queries",
        "Network Transmissions (1,523 records) — via AES-256 Encryption",
        "User Accounts (4,200 credentials) — via Rate Limiting + MFA",
        "Academic Records (GPA, Transcripts) — Access-Controlled",
        "Financial Information (Payment Data) — Encrypted at Rest",
      ],
    },
    {
      icon: Target,
      title: "ATTACK SURFACES IDENTIFIED",
      color: "text-neon-amber",
      items: [
        "Login Form — SQL Injection via unsanitized input concatenation",
        "API Endpoints — Plain-text HTTP transmission (no TLS/encryption)",
        "Authentication System — No rate limiting, no MFA requirement",
        "Session Management — Token handling and session fixation risks",
        "Database Layer — Direct query construction from user input",
      ],
    },
    {
      icon: Wrench,
      title: "MITIGATIONS APPLIED",
      color: "text-neon-green",
      items: [
        "✓ Parameterized Queries — Separates SQL logic from user data",
        "✓ AES-256 Encryption — Encrypts all data in transit and at rest",
        "✓ Rate Limiting — Max 5 login attempts per minute per IP",
        "✓ Multi-Factor Authentication — SMS/Authenticator second factor",
      ],
    },
    {
      icon: AlertTriangle,
      title: "RESIDUAL RISK",
      color: "text-neon-magenta",
      items: [
        "Human error remains the final 1% risk factor",
        "Social engineering attacks require ongoing security training",
        "Zero-day vulnerabilities require continuous monitoring & patching",
        "Insider threats require access control audits and least-privilege",
      ],
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "hsl(222 47% 6% / 0.9)" }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="glass-panel rounded-xl p-6 max-w-2xl w-full max-h-[85vh] overflow-y-auto space-y-5"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-primary" />
            <h2 className="font-display text-lg tracking-wider text-foreground text-glow-cyan">SECURITY AUDIT REPORT</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Performance summary */}
        <div className="flex items-center gap-4 bg-muted/30 rounded-lg p-4 border border-border">
          <Trophy className="w-6 h-6 text-neon-amber" />
          <div className="flex-1 grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="font-display text-lg text-primary">{grade}</div>
              <div className="font-mono text-[0.55rem] text-muted-foreground uppercase">Grade</div>
            </div>
            <div>
              <div className="font-display text-lg text-neon-green">{xp} XP</div>
              <div className="font-mono text-[0.55rem] text-muted-foreground uppercase">Earned</div>
            </div>
            <div>
              <div className="font-display text-lg text-neon-amber">{8570}</div>
              <div className="font-mono text-[0.55rem] text-muted-foreground uppercase">Records Secured</div>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-4 space-y-4">
          {sections.map((section, i) => (
            <motion.div key={section.title} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.1 }} className="space-y-2">
              <div className="flex items-center gap-2">
                <section.icon className={`w-4 h-4 ${section.color}`} />
                <h3 className={`font-display text-xs tracking-widest ${section.color}`}>{section.title}</h3>
              </div>
              <div className="space-y-1 ml-6">
                {section.items.map((item, j) => (
                  <div key={j} className="font-mono text-xs text-muted-foreground">{item}</div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="border-t border-border pt-4 text-center">
          <p className="font-mono text-xs text-muted-foreground">
            Report generated by <span className="text-primary">Gauntlet Guardian</span> Security Console
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SecurityReport;
