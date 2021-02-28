import axios from 'axios';
import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    const handleKey = (e: any) => {
      console.log(e.code);
      if (triviaData.kind === PossibleStates.success) {
        if (e.code === 'ArrowRight') {
          if (activeIndex < triviaData.data.length - 1) {
            if (isAnswerRevealed) {
              setActiveIndex(activeIndex + 1);
              setIsAnswerRevealed(false);
            } else {
              setIsAnswerRevealed(true);
            }
          } else {
            console.log('restart');
            setActiveIndex(0);
          }
        }
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('keydown', handleKey);
    };
  }, [activeIndex, triviaData, isAnswerRevealed]);
  if (triviaData.kind === PossibleStates.success) {
    return (
      <div className="slide-container">
        {triviaData.data.map((trivia: TriviaDataStructure, index: number) => {
          console.log(index);
          return (
            <TriviaSlideComponent
              key={trivia.question}
              currentIndex={index}
              activeIndex={activeIndex}
              trivia={trivia}
              isAnswerRevealed={isAnswerRevealed}
            />
          );
        })}
      </div>
    );
  }
  return null;
};

export default TriviaComponent;
