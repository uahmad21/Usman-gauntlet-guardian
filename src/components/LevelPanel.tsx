import { motion, AnimatePresence } from "framer-motion";
import { Shield, Lock, Key, Zap, AlertTriangle, CheckCircle, XCircle, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface LevelPanelProps {
  level: number;
  isCompromised: boolean;
  isFixed: boolean;
  onTriggerAttack: () => void;
  onApplyFix: (correct: boolean) => void;
  bruteForceProgress?: number;
  wrongAttempts: number;
}

interface QuizOption {
  label: string;
  correct: boolean;
  explanation: string;
  icon: React.ReactNode;
}

const levelData = [
  {
    title: "THE INJECTION BREACH",
    threat: "SQL Injection",
    description: "An attacker has found a vulnerability in the login form. They can inject malicious SQL to bypass authentication.",
    attackVector: "Input: ' OR 1=1 --",
    briefing: "The login form directly concatenates user input into SQL queries. You need to choose the correct defense.",
    achievement: "Prevents unauthorized data access",
    options: [
      { label: "Add CAPTCHA to login", correct: false, explanation: "CAPTCHA only stops bots, not SQL injection. The query is still vulnerable to malicious input.", icon: <XCircle className="w-4 h-4" /> },
      { label: "Implement Parameterized Queries", correct: true, explanation: "Parameterized queries separate SQL code from data, making injection impossible!", icon: <Shield className="w-4 h-4" /> },
      { label: "Hide the login form errors", correct: false, explanation: "Security through obscurity doesn't fix the vulnerability — the attacker can still inject SQL.", icon: <XCircle className="w-4 h-4" /> },
      { label: "Limit password length to 8 chars", correct: false, explanation: "Limiting length doesn't prevent SQL injection and actually weakens passwords!", icon: <XCircle className="w-4 h-4" /> },
    ] as QuizOption[],
  },
  {
    title: "THE EAVESDROPPER",
    threat: "Man-in-the-Middle",
    description: "Student data is being transmitted in plain text across the network. Anyone can intercept and read it.",
    attackVector: "Protocol: HTTP (Unencrypted)",
    briefing: "Data packets are visible to anyone on the network. You must encrypt the transmission channel.",
    achievement: "Ensures Data Confidentiality",
    options: [
      { label: "Use Base64 encoding", correct: false, explanation: "Base64 is encoding, NOT encryption. Anyone can decode it instantly — it provides zero security.", icon: <XCircle className="w-4 h-4" /> },
      { label: "Rename sensitive fields", correct: false, explanation: "Renaming fields is security through obscurity. The data is still transmitted in plain text.", icon: <XCircle className="w-4 h-4" /> },
      { label: "Enable AES-256 Encryption", correct: true, explanation: "AES-256 encrypts all data in transit, making intercepted packets unreadable to attackers!", icon: <Lock className="w-4 h-4" /> },
      { label: "Compress the data with gzip", correct: false, explanation: "Compression reduces size but doesn't encrypt. Compressed data can still be decompressed by attackers.", icon: <XCircle className="w-4 h-4" /> },
    ] as QuizOption[],
  },
  {
    title: "THE IDENTITY THIEF",
    threat: "Broken Authentication",
    description: "An attacker is brute-forcing user accounts, trying thousands of password combinations per second.",
    attackVector: "Method: Credential Stuffing",
    briefing: "The auth system has no limits on login attempts. You need to implement proper access controls.",
    achievement: "Secures the Identity Perimeter",
    options: [
      { label: "Block the attacker's IP", correct: false, explanation: "Attackers use VPNs and proxies to rotate IPs. IP blocking is easily bypassed.", icon: <XCircle className="w-4 h-4" /> },
      { label: "Make passwords case-sensitive", correct: false, explanation: "Passwords are already case-sensitive. This doesn't stop brute force attacks at all.", icon: <XCircle className="w-4 h-4" /> },
      { label: "Log failed attempts only", correct: false, explanation: "Logging is good for forensics but doesn't actively prevent the attack from succeeding.", icon: <XCircle className="w-4 h-4" /> },
      { label: "Enable Rate Limiting + MFA", correct: true, explanation: "Rate limiting throttles attempts, and MFA adds a second factor the attacker can't brute force!", icon: <Key className="w-4 h-4" /> },
    ] as QuizOption[],
  },
];

const LevelPanel = ({
  level,
  isCompromised,
  isFixed,
  onTriggerAttack,
  onApplyFix,
  bruteForceProgress,
  wrongAttempts,
}: LevelPanelProps) => {
  const data = levelData[level - 1];
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [lastWrong, setLastWrong] = useState<number | null>(null);

  const handleOptionClick = (index: number) => {
    const option = data.options[index];
    setSelectedOption(index);
    setShowExplanation(true);
    
    if (option.correct) {
      setTimeout(() => {
        onApplyFix(true);
        setSelectedOption(null);
        setShowExplanation(false);
        setLastWrong(null);
      }, 2000);
    } else {
      setLastWrong(index);
      onApplyFix(false);
      setTimeout(() => {
        setShowExplanation(false);
        setSelectedOption(null);
      }, 2500);
    }
  };

  return (
    <motion.div
      key={level}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-panel rounded-lg p-5 space-y-4"
    >
      {/* Level header */}
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
          isFixed ? "bg-neon-green/20 glow-green" : isCompromised ? "bg-neon-red/20 glow-red" : "bg-primary/20 glow-cyan"
        }`}>
          <span className="font-display text-lg text-foreground">{level}</span>
        </div>
        <div className="flex-1">
          <h2 className="font-display text-sm tracking-wider text-foreground">{data.title}</h2>
          <div className="flex items-center gap-2 mt-0.5">
            <AlertTriangle className={`w-3.5 h-3.5 ${isFixed ? "text-neon-green" : "text-neon-red"}`} />
            <span className={`font-mono text-xs ${isFixed ? "text-neon-green" : "text-neon-red"}`}>
              {data.threat}
            </span>
          </div>
        </div>
        {wrongAttempts > 0 && !isFixed && (
          <div className="flex items-center gap-1 bg-neon-red/10 border border-neon-red/30 rounded-md px-2 py-1">
            <XCircle className="w-3 h-3 text-neon-red" />
            <span className="font-mono text-[0.65rem] text-neon-red">{wrongAttempts} wrong</span>
          </div>
        )}
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed">{data.description}</p>

      {/* Attack vector */}
      <div className="bg-muted/50 rounded-md px-3 py-2 font-mono text-xs text-muted-foreground">
        <span className="text-neon-amber">VECTOR:</span> {data.attackVector}
      </div>

      {/* Brute force progress for level 3 */}
      {level === 3 && isCompromised && !isFixed && bruteForceProgress !== undefined && (
        <div className="space-y-1.5">
          <div className="flex justify-between font-mono text-xs">
            <span className="text-neon-red">Brute Force Progress</span>
            <span className="text-neon-red">{bruteForceProgress}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-neon-amber to-neon-red rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${bruteForceProgress}%` }}
              transition={{ duration: 2, ease: "easeOut" }}
              style={{ boxShadow: "0 0 10px hsl(0 100% 55% / 0.5)" }}
            />
          </div>
        </div>
      )}

      {/* PRE-ATTACK: Simulate button */}
      {!isCompromised && !isFixed && (
        <div className="space-y-3 pt-1">
          <div className="bg-muted/30 border border-border rounded-md p-3">
            <div className="flex items-center gap-2 mb-1">
              <HelpCircle className="w-3.5 h-3.5 text-primary" />
              <span className="font-display text-[0.65rem] tracking-wider text-primary">MISSION BRIEFING</span>
            </div>
            <p className="font-mono text-xs text-muted-foreground">{data.briefing}</p>
          </div>
          <Button
            onClick={onTriggerAttack}
            className="w-full bg-neon-red/20 text-neon-red border border-neon-red/30 hover:bg-neon-red/30 font-mono text-xs uppercase tracking-wider glow-red"
          >
            <Zap className="w-4 h-4 mr-2" />
            Simulate Attack
          </Button>
        </div>
      )}

      {/* POST-ATTACK: Multi-choice quiz */}
      {isCompromised && !isFixed && (
        <div className="space-y-3 pt-1">
          <div className="bg-neon-amber/10 border border-neon-amber/30 rounded-md p-3">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="w-3.5 h-3.5 text-neon-amber" />
              <span className="font-display text-[0.65rem] tracking-wider text-neon-amber">CHOOSE YOUR DEFENSE</span>
            </div>
            <p className="font-mono text-xs text-muted-foreground">Select the correct security control to neutralize this threat:</p>
          </div>
          
          <div className="grid grid-cols-1 gap-2">
            {data.options.map((option, i) => {
              const isSelected = selectedOption === i;
              const wasWrong = lastWrong === i;
              const isCorrect = option.correct && isSelected;
              
              return (
                <motion.button
                  key={i}
                  onClick={() => !showExplanation && handleOptionClick(i)}
                  disabled={showExplanation || wasWrong}
                  whileHover={!showExplanation && !wasWrong ? { scale: 1.01 } : {}}
                  whileTap={!showExplanation && !wasWrong ? { scale: 0.99 } : {}}
                  className={`text-left px-3 py-2.5 rounded-md border font-mono text-xs transition-all duration-300 flex items-center gap-2
                    ${wasWrong 
                      ? "bg-neon-red/5 border-neon-red/20 text-neon-red/40 cursor-not-allowed line-through" 
                      : isCorrect
                      ? "bg-neon-green/20 border-neon-green/50 text-neon-green glow-green"
                      : isSelected && !option.correct
                      ? "bg-neon-red/20 border-neon-red/50 text-neon-red glow-red"
                      : "bg-muted/50 border-border text-muted-foreground hover:border-primary/50 hover:text-foreground hover:bg-muted"
                    }`}
                >
                  <span className="shrink-0 w-5 h-5 rounded-full border border-current flex items-center justify-center text-[0.6rem] font-display">
                    {String.fromCharCode(65 + i)}
                  </span>
                  {option.label}
                </motion.button>
              );
            })}
          </div>

          {/* Explanation popup */}
          <AnimatePresence>
            {showExplanation && selectedOption !== null && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className={`rounded-md p-3 border font-mono text-xs ${
                  data.options[selectedOption].correct
                    ? "bg-neon-green/10 border-neon-green/30 text-neon-green"
                    : "bg-neon-red/10 border-neon-red/30 text-neon-red"
                }`}
              >
                <div className="flex items-start gap-2">
                  {data.options[selectedOption].correct 
                    ? <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    : <XCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  }
                  <span>{data.options[selectedOption].explanation}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* FIXED state */}
      {isFixed && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center justify-center gap-2 bg-neon-green/10 border border-neon-green/30 rounded-lg py-3"
        >
          <CheckCircle className="w-4 h-4 text-neon-green" />
          <span className="font-mono text-xs text-neon-green uppercase tracking-wider">
            {data.achievement}
          </span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default LevelPanel;
