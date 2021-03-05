import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { randomizeAnswers, fixTextStr, randomBg, alphabets } from '../helper';
import { PossibleStates, TriviaDataStructure, TriviaState } from '../types';

type TriviaSlideComponentProps = {
  trivia: TriviaDataStructure;
  activeIndex: number;
  currentIndex: number;
  isAnswerRevealed: boolean;
};

const TriviaSlideComponent = ({
  trivia,
  activeIndex,
  currentIndex,
  isAnswerRevealed,
}: TriviaSlideComponentProps) => {
  const displaySlide = activeIndex === currentIndex ? 'grid' : 'none';
  const bgColor = randomBg();
  const { question, incorrect_answers, correct_answer } = trivia;
  const [possibleAnswers] = useState(
    randomizeAnswers([correct_answer, ...incorrect_answers])
  );
  return (
    <div
      style={{
        ...{ display: displaySlide, background: bgColor },
        height: '100%',
        color: 'white',
        boxSizing: 'border-box',
        padding: '40px 20px',
        transition: 'all 1s ease-out',
      }}
    >
      <strong className="question">{fixTextStr(question)}</strong>
      {possibleAnswers.map((answer: string, index: number) => {
        const showAnswer =
          isAnswerRevealed && index === possibleAnswers.indexOf(correct_answer)
            ? 'answers highlight-answer'
            : 'answers';
        const hideNonAnswer =
          isAnswerRevealed && index !== possibleAnswers.indexOf(correct_answer)
            ? { display: 'none' }
            : {};
        return (
          <div key={answer} style={hideNonAnswer}>
            {isAnswerRevealed && (
              <strong className="generic-text-with-stroke">
                The Answer is:
              </strong>
            )}
            <div className={showAnswer}>
              {alphabets[index].toUpperCase()}) {fixTextStr(answer)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const TriviaComponent = () => {
  const timeoutRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState<boolean>(false);
  // Trivia States
  const [triviaData, setTriviaData] = useState<TriviaState>({
    kind: PossibleStates.initial,
  });

  useEffect(() => {
    setTriviaData({ kind: PossibleStates.loading });
    axios
      .get(
        'https://opentdb.com/api.php?amount=25&category=11&difficulty=easy&type=multiple'
      )
      .then((res: any) => {
        const data = res.data;
        setTriviaData({ kind: PossibleStates.success, data: data.results });
      })
      .catch((err: any) => {
        if (err.response) {
          console.log('error in response', err.response);
          setTriviaData({ kind: PossibleStates.error, errorStr: err.response });
        } else if (err.request) {
          console.log('error in request', err.request);
          setTriviaData({ kind: PossibleStates.error, errorStr: err.request });
        } else {
          console.log('something else went horribly wrong');
          setTriviaData({
            kind: PossibleStates.error,
            errorStr: 'something went wrong, try again later',
          });
        }
      });
  }, []);

  const next = useCallback(() => {
    if (triviaData.kind === PossibleStates.success) {
      setIsAnswerRevealed(!isAnswerRevealed);
      if (isAnswerRevealed) setActiveIndex((prevIndex) => prevIndex === triviaData.data.length - 1 ? 0 : prevIndex + 1);
    }
  }, [isAnswerRevealed, triviaData]);
  
  const resetTimeOut = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    const handleKey = (e: any) => {
      if (e.code === 'ArrowRight') next();
    };
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('keydown', handleKey);
    };
  }, [activeIndex, isAnswerRevealed, next]);

  useEffect(() => {
    resetTimeOut();
    timeoutRef.current = setTimeout(() => {
      next();
    }, 8000);
    return () => {
      resetTimeOut();
    }
  }, [activeIndex, isAnswerRevealed, next]);


  if (triviaData.kind === PossibleStates.success) {
    return (
      <div className="slide-container">
        {triviaData.data.map((trivia: TriviaDataStructure, index: number) => (
          <TriviaSlideComponent
            key={trivia.question}
            currentIndex={index}
            activeIndex={activeIndex}
            trivia={trivia}
            isAnswerRevealed={isAnswerRevealed}
          />
          ))}
      </div>
    );
  }
  return null;
};

export default TriviaComponent;
