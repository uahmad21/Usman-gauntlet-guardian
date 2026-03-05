import { motion, AnimatePresence } from "framer-motion";
import { Terminal, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

export interface LogEntry {
  id: string;
  type: "info" | "warning" | "error" | "success";
  message: string;
  timestamp: string;
}

interface TerminalLogProps {
  logs: LogEntry[];
  title?: string;
}

const iconMap = {
  info: <Terminal className="w-3.5 h-3.5 text-primary" />,
  warning: <AlertTriangle className="w-3.5 h-3.5 text-neon-amber" />,
  error: <XCircle className="w-3.5 h-3.5 text-neon-red" />,
  success: <CheckCircle className="w-3.5 h-3.5 text-neon-green" />,
};

const colorMap = {
  info: "text-primary",
  warning: "text-neon-amber",
  error: "text-neon-red",
  success: "text-neon-green",
};

const TerminalLog = ({ logs, title = "THREAT MONITOR" }: TerminalLogProps) => {
  return (
    <div className="glass-panel rounded-lg overflow-hidden h-full flex flex-col">
      <div className="px-4 py-2 border-b border-border flex items-center gap-2">
        <Terminal className="w-4 h-4 text-primary" />
        <span className="font-display text-xs tracking-widest text-primary text-glow-cyan">
          {title}
        </span>
        <div className="ml-auto flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-neon-red animate-pulse-glow" />
          <div className="w-2.5 h-2.5 rounded-full bg-neon-amber" />
          <div className="w-2.5 h-2.5 rounded-full bg-neon-green" />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 font-mono text-xs space-y-1.5 scanline">
        <AnimatePresence>
          {logs.map((log) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-start gap-2"
            >
              <span className="text-muted-foreground shrink-0">{log.timestamp}</span>
              <span className="shrink-0">{iconMap[log.type]}</span>
              <span className={colorMap[log.type]}>{log.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
        <div className="flex items-center gap-1 text-muted-foreground mt-2">
          <span>{">"}</span>
          <span className="animate-blink">_</span>
        </div>
      </div>
    </div>
  );
};

export default TerminalLog;
