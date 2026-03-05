import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import ResilienceScore from "@/components/ResilienceScore";
import TerminalLog, { LogEntry } from "@/components/TerminalLog";
import LiveAppPanel from "@/components/LiveAppPanel";
import LevelPanel from "@/components/LevelPanel";
import SecurityReport from "@/components/SecurityReport";
import WinState from "@/components/WinState";

type LevelState = { compromised: boolean; fixed: boolean; wrongAttempts: number };

const initialLevels: Record<number, LevelState> = {
  1: { compromised: false, fixed: false, wrongAttempts: 0 },
  2: { compromised: false, fixed: false, wrongAttempts: 0 },
  3: { compromised: false, fixed: false, wrongAttempts: 0 },
};

const initialLogs: LogEntry[] = [
  { id: "0", type: "info", timestamp: "00:00:00", message: "Gauntlet Guardian security console initialized." },
  { id: "1", type: "info", timestamp: "00:00:01", message: "Scanning Student Marketplace for vulnerabilities..." },
  { id: "2", type: "warning", timestamp: "00:00:02", message: "3 critical vulnerabilities detected. Begin threat assessment." },
];

const Index = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [levels, setLevels] = useState<Record<number, LevelState>>({ ...initialLevels });
  const [bruteForceProgress, setBruteForceProgress] = useState(0);
  const [logs, setLogs] = useState<LogEntry[]>(initialLogs);
  const [showReport, setShowReport] = useState(false);
  const [showWin, setShowWin] = useState(false);
  const [xp, setXp] = useState(0);
  const [exposedRecords, setExposedRecords] = useState(0);
  const [protectedRecords, setProtectedRecords] = useState(0);

  const allFixed = levels[1].fixed && levels[2].fixed && levels[3].fixed;
  const fixedCount = [1, 2, 3].filter((l) => levels[l].fixed).length;
  const score = fixedCount === 3 ? 99 : fixedCount * 33;
  const totalWrong = [1, 2, 3].reduce((sum, l) => sum + levels[l].wrongAttempts, 0);

  const addLog = useCallback((type: LogEntry["type"], message: string) => {
    const now = new Date();
    const ts = now.toLocaleTimeString("en-US", { hour12: false });
    setLogs((prev) => [...prev, { id: `${Date.now()}-${Math.random()}`, type, timestamp: ts, message }]);
  }, []);

  const handleAttack = useCallback(() => {
    setLevels((prev) => ({ ...prev, [currentLevel]: { ...prev[currentLevel], compromised: true } }));

    const recordCounts = { 1: 2847, 2: 1523, 3: 4200 };
    setExposedRecords((prev) => prev + recordCounts[currentLevel as keyof typeof recordCounts]);

    if (currentLevel === 1) {
      addLog("error", "SQL Injection detected on /api/login endpoint!");
      addLog("error", "Malicious payload: ' OR 1=1 --");
      addLog("error", "Database returned 2,847 unauthorized records.");
      addLog("warning", "CRITICAL: Full user table exposed. Choose a defense now.");
    } else if (currentLevel === 2) {
      addLog("error", "Man-in-the-Middle attack detected on HTTP channel!");
      addLog("error", "Packet sniffer intercepting plain-text student data...");
      addLog("error", "1,523 student records captured by attacker.");
      addLog("warning", "CRITICAL: Data confidentiality compromised. Select a mitigation.");
    } else if (currentLevel === 3) {
      addLog("error", "Brute force attack initiated — 100 attempts/sec!");
      addLog("error", "Credential stuffing from 4,200 leaked passwords.");
      setBruteForceProgress(0);
      const interval = setInterval(() => {
        setBruteForceProgress((prev) => {
          if (prev >= 99) { clearInterval(interval); return 99; }
          return prev + 3;
        });
      }, 60);
      addLog("warning", "CRITICAL: Admin account at risk. Apply controls immediately.");
    }
  }, [currentLevel, addLog]);

  const handleFix = useCallback((correct: boolean) => {
    if (!correct) {
      setLevels((prev) => ({
        ...prev,
        [currentLevel]: { ...prev[currentLevel], wrongAttempts: prev[currentLevel].wrongAttempts + 1 },
      }));
      setExposedRecords((prev) => prev + 500);
      addLog("error", "Wrong defense selected! Additional 500 records exposed during delay.");
      addLog("warning", "The vulnerability remains active. Try again.");
      return;
    }

    // Correct answer
    setLevels((prev) => ({ ...prev, [currentLevel]: { ...prev[currentLevel], fixed: true } }));
    const wrongCount = levels[currentLevel].wrongAttempts;
    const baseXp = 100;
    const bonus = Math.max(0, baseXp - wrongCount * 25);
    setXp((prev) => prev + bonus);

    const recordCounts = { 1: 2847, 2: 1523, 3: 4200 };
    setProtectedRecords((prev) => prev + recordCounts[currentLevel as keyof typeof recordCounts]);
    setExposedRecords((prev) => Math.max(0, prev - recordCounts[currentLevel as keyof typeof recordCounts]));

    if (currentLevel === 1) {
      addLog("success", "✓ Parameterized queries implemented.");
      addLog("success", "✓ SQL Injection vector neutralized. 2,847 records secured.");
      addLog("info", `+${bonus} XP earned${wrongCount > 0 ? ` (−${wrongCount * 25} penalty for wrong attempts)` : " (Perfect!)"}`);
    } else if (currentLevel === 2) {
      addLog("success", "✓ AES-256 encryption enabled on all channels.");
      addLog("success", "✓ MITM attack neutralized. 1,523 records encrypted.");
      addLog("info", `+${bonus} XP earned${wrongCount > 0 ? ` (−${wrongCount * 25} penalty)` : " (Perfect!)"}`);
    } else if (currentLevel === 3) {
      setBruteForceProgress(0);
      addLog("success", "✓ Rate limiting + MFA activated.");
      addLog("success", "✓ Brute force blocked. 4,200 accounts protected.");
      addLog("info", `+${bonus} XP earned${wrongCount > 0 ? ` (−${wrongCount * 25} penalty)` : " (Perfect!)"}`);
    }

    const nextLevel = currentLevel + 1;
    if (nextLevel <= 3) {
      setTimeout(() => {
        setCurrentLevel(nextLevel);
        addLog("info", `━━━ LEVEL ${nextLevel} INITIALIZED ━━━`);
      }, 2000);
    } else {
      setTimeout(() => {
        addLog("success", "ALL THREATS NEUTRALIZED. System resilience at 99%.");
        setShowWin(true);
      }, 2000);
    }
  }, [currentLevel, addLog, levels]);

  const handleRestart = () => {
    setCurrentLevel(1);
    setLevels({ ...initialLevels });
    setBruteForceProgress(0);
    setShowWin(false);
    setShowReport(false);
    setXp(0);
    setExposedRecords(0);
    setProtectedRecords(0);
    setLogs([
      { id: "r0", type: "info", timestamp: "00:00:00", message: "Gauntlet Guardian console re-initialized." },
      { id: "r1", type: "warning", timestamp: "00:00:01", message: "3 critical vulnerabilities detected. Begin assessment." },
    ]);
  };

  return (
    <div className="min-h-screen bg-background grid-bg relative overflow-hidden">
      <div className="fixed inset-0 scanline pointer-events-none z-30 opacity-20" />

      <div className="relative z-10 flex flex-col h-screen p-4 gap-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
              <Shield className="w-7 h-7 text-primary" />
            </motion.div>
            <div>
              <h1 className="font-display text-lg tracking-widest text-foreground text-glow-cyan">
                GAUNTLET GUARDIAN
              </h1>
              <p className="font-mono text-[0.55rem] text-muted-foreground uppercase tracking-wider">
                Secure Student Marketplace Simulator
              </p>
            </div>
          </div>

          {allFixed && (
            <Button
              onClick={() => setShowReport(true)}
              className="bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30 font-mono text-xs uppercase tracking-wider glow-cyan"
            >
              <FileText className="w-4 h-4 mr-2" />
              Security Report
            </Button>
          )}
        </div>

        {/* Resilience Score + Restart */}
        <ResilienceScore score={score} level={currentLevel} xp={xp} wrongTotal={totalWrong} onRestart={handleRestart} />

        {/* Main split layout */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-3 min-h-0">
          {/* LEFT: Live App */}
          <div className="flex flex-col min-h-0">
            <LiveAppPanel
              level={currentLevel}
              isCompromised={levels[currentLevel].compromised}
              isFixed={levels[currentLevel].fixed}
              exposedRecords={exposedRecords}
              protectedRecords={protectedRecords}
            />
          </div>

          {/* RIGHT: Level Controls + Terminal */}
          <div className="flex flex-col gap-3 min-h-0">
            <LevelPanel
              level={currentLevel}
              isCompromised={levels[currentLevel].compromised}
              isFixed={levels[currentLevel].fixed}
              onTriggerAttack={handleAttack}
              onApplyFix={handleFix}
              bruteForceProgress={bruteForceProgress}
              wrongAttempts={levels[currentLevel].wrongAttempts}
            />
            <div className="flex-1 min-h-0">
              <TerminalLog logs={logs} />
            </div>
          </div>
        </div>

        {/* Level indicators */}
        <div className="flex justify-center gap-3 py-1.5">
          {[1, 2, 3].map((l) => (
            <div key={l} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                levels[l].fixed ? "bg-neon-green glow-green" : l === currentLevel ? "bg-primary glow-cyan" : "bg-muted"
              }`} />
              <span className={`font-mono text-[0.6rem] ${levels[l].fixed ? "text-neon-green" : l === currentLevel ? "text-primary" : "text-muted-foreground"}`}>
                {levels[l].fixed ? "SECURED" : l === currentLevel ? "ACTIVE" : "LOCKED"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Win State */}
      <AnimatePresence>
        {showWin && (
          <WinState
            xp={xp}
            wrongTotal={totalWrong}
            onViewReport={() => { setShowWin(false); setShowReport(true); }}
            onRestart={handleRestart}
          />
        )}
      </AnimatePresence>

      {/* Security Report Modal */}
      <AnimatePresence>
        {showReport && <SecurityReport onClose={() => setShowReport(false)} xp={xp} wrongTotal={totalWrong} />}
      </AnimatePresence>
    </div>
  );
};

export default Index;
