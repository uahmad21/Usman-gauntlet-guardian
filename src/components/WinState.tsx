import { motion } from "framer-motion";
import { Shield, Award, Star, FileText, RotateCcw, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WinStateProps {
  xp: number;
  wrongTotal: number;
  onViewReport: () => void;
  onRestart: () => void;
}

const WinState = ({ xp, wrongTotal, onViewReport, onRestart }: WinStateProps) => {
  const grade = wrongTotal === 0 ? "S" : wrongTotal <= 2 ? "A" : wrongTotal <= 4 ? "B" : "C";
  const gradeColor = grade === "S" ? "text-neon-amber" : grade === "A" ? "text-neon-green" : grade === "B" ? "text-primary" : "text-muted-foreground";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-40 flex items-center justify-center p-4 grid-bg"
      style={{ background: "hsl(222 47% 6% / 0.95)" }}
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 15, stiffness: 100 }}
        className="text-center space-y-6 max-w-lg"
      >
        {/* Badge */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="relative mx-auto w-36 h-36"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-neon-cyan/20 to-neon-green/20 glow-cyan animate-pulse-glow" />
          <div className="absolute inset-2 rounded-full glass-panel flex items-center justify-center">
            <div className="text-center">
              <Shield className="w-10 h-10 text-primary mx-auto mb-1" />
              <div className="font-display text-[0.5rem] tracking-widest text-primary text-glow-cyan">CERTIFIED</div>
            </div>
          </div>
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6 + i * 0.15 }}
              className="absolute"
              style={{
                top: i === 0 ? "-8px" : "10px",
                left: i === 1 ? "-8px" : i === 0 ? "50%" : "auto",
                right: i === 2 ? "-8px" : "auto",
                transform: i === 0 ? "translateX(-50%)" : "none",
              }}
            >
              <Star className="w-5 h-5 text-neon-amber fill-neon-amber" />
            </motion.div>
          ))}
        </motion.div>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="space-y-2">
          <h1 className="font-display text-2xl tracking-wider text-foreground text-glow-cyan">
            CERTIFIED SECURE-BY-DESIGN
          </h1>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            All critical vulnerabilities neutralized in the Student Marketplace.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.7 }} className="flex justify-center gap-6">
          {[
            { label: "Grade", value: grade, color: gradeColor },
            { label: "XP Earned", value: `${xp}`, color: "text-primary" },
            { label: "Wrong Picks", value: `${wrongTotal}`, color: wrongTotal === 0 ? "text-neon-green" : "text-neon-red" },
            { label: "Resilience", value: "99%", color: "text-neon-green" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className={`font-display text-xl ${stat.color}`}>{stat.value}</div>
              <div className="font-mono text-[0.55rem] text-muted-foreground uppercase tracking-wider mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.9 }}
          className="glass-panel rounded-lg px-6 py-3 inline-flex items-center gap-3 mx-auto">
          <Award className="w-5 h-5 text-neon-amber" />
          <span className="font-display text-xs tracking-widest text-neon-amber">BCS SECURITY ARCHITECT</span>
        </motion.div>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.1 }} className="flex gap-4 justify-center">
          <Button onClick={onViewReport} className="bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30 font-mono text-xs uppercase tracking-wider glow-cyan">
            <FileText className="w-4 h-4 mr-2" />
            View Report
          </Button>
          <Button onClick={onRestart} variant="ghost" className="font-mono text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground">
            <RotateCcw className="w-4 h-4 mr-2" />
            Play Again
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default WinState;
