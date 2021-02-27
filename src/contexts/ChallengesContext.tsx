import { createContext, useState, ReactNode, useEffect } from 'react';
import Cookie from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengesProviderData {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  levelUp: () => void;
  startNewChallenge: () => void;
  activeChallenge: Challenge;
  resetChallenge: () => void;
  experienceToNextLevel: number;
  completedChallenge: () => void;
  closeLevelUpModal: () => void;
}

interface ChallengesProviderProps {
  children: ReactNode;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}


export const ChallengesContext = createContext({} as ChallengesProviderData);

export function ChallengesProvider({ children, ...rest}: ChallengesProviderProps) {
  const [ level,  setLevel ] = useState(rest.level ?? 1);
  const [ currentExperience, setCurrentExperience ] = useState(rest.challengesCompleted ?? 0);
  const [ challengesCompleted, setChallengesCompleted ] = useState(rest.challengesCompleted ?? 0);
  const [ activeChallenge, setActiveChallenge ] = useState(null);
  const [ isLevelUpModalOpen, setIsLevelUpModalOpen ] = useState(false);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission(); 
  }, []);

  useEffect(() => {
    Cookie.set('level', String(level));
    Cookie.set('currentExperience', String(currentExperience));
    Cookie.set('challengesCompleted', String(challengesCompleted));
  }, [level, currentExperience, challengesCompleted])
  
  function levelUp() {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true);
  }

  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];
    setActiveChallenge(challenge);

    if(Notification.permission === 'granted') {
      new Audio('/notification.mp3').play();
      new Notification('Novo desafio! 💥', {
        body: `Valendo ${challenge.amount} xp!`,
        silent: true,
      })
    }

  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completedChallenge() {
    if(!activeChallenge) return;

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if(finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);

  }

  return (
    <ChallengesContext.Provider 
      value={{ 
        level, 
        currentExperience, 
        challengesCompleted,
        levelUp,
        startNewChallenge,
        activeChallenge,
        resetChallenge,
        experienceToNextLevel,
        completedChallenge,
        closeLevelUpModal
      }}>
      {children}
      { isLevelUpModalOpen && <LevelUpModal /> }
    </ChallengesContext.Provider>
  );
}