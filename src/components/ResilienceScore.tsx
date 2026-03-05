import { motion } from "framer-motion";
import { Shield, RotateCcw, Trophy, Skull } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResilienceScoreProps {
  score: number;
  level: number;
  xp: number;
  wrongTotal: number;
  onRestart: () => void;
}

const ResilienceScore = ({ score, level, xp, wrongTotal, onRestart }: ResilienceScoreProps) => {
  const getScoreColor = () => {
    if (score >= 80) return "from-neon-green to-neon-cyan";
    if (score >= 40) return "from-neon-amber to-neon-cyan";
    return "from-neon-red to-neon-amber";
  };

  return (
    <div className="glass-panel rounded-lg px-4 py-2.5 flex items-center gap-3 flex-wrap">
      <div className="flex items-center gap-2">
        <Shield className="w-4 h-4 text-primary" />
        <span className="font-display text-[0.65rem] uppercase tracking-widest text-primary text-glow-cyan">
          Resilience
        </span>
      </div>
      <div className="flex-1 h-2.5 bg-muted rounded-full overflow-hidden relative min-w-[100px]">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${getScoreColor()}`}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            boxShadow: score >= 80
              ? "0 0 12px hsl(150 100% 45% / 0.5)"
              : score >= 40
              ? "0 0 12px hsl(40 100% 55% / 0.5)"
              : "0 0 12px hsl(0 100% 55% / 0.5)",
          }}
        />
      </div>
      <span className="font-mono text-sm text-foreground min-w-[2.5rem] text-right">{score}%</span>

      <div className="border-l border-border pl-3 flex items-center gap-3">
        <div className="text-center">
          <span className="font-mono text-[0.6rem] text-muted-foreground block">LVL</span>
          <span className="font-display text-sm text-primary text-glow-cyan">{level}/3</span>
        </div>
        <div className="text-center">
          <span className="font-mono text-[0.6rem] text-muted-foreground block">XP</span>
          <motion.span
            key={xp}
            initial={{ scale: 1.3, color: "hsl(150 100% 45%)" }}
            animate={{ scale: 1, color: "hsl(190 100% 50%)" }}
            className="font-display text-sm"
          >
            {xp}
          </motion.span>
        </div>
        {wrongTotal > 0 && (
          <div className="text-center">
            <span className="font-mono text-[0.6rem] text-muted-foreground block">ERR</span>
            <span className="font-display text-sm text-neon-red">{wrongTotal}</span>
          </div>
        )}
      </div>

      <Button
        onClick={onRestart}
        variant="ghost"
        size="sm"
        className="ml-auto text-muted-foreground hover:text-foreground font-mono text-[0.65rem] uppercase tracking-wider gap-1.5 h-8 px-2"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        Restart
      </Button>
    </div>
  );
};

export default ResilienceScore;
