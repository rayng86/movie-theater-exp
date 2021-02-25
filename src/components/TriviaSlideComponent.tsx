import React, { useEffect, useState } from 'react';
import { randomizeAnswers, fixTextStr, randomBg, alphabets } from '../helper';
import { TriviaDataStructure } from '../types';

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
  const [possibleAnswers] = useState(randomizeAnswers([correct_answer, ...incorrect_answers]));
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
        const showAnswer = isAnswerRevealed && (index === possibleAnswers.indexOf(correct_answer)) ? 'answers highlight-answer' : 'answers';
        const hideNonAnswer = isAnswerRevealed && (index !== possibleAnswers.indexOf(correct_answer)) ? { display: 'none' } : {};
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
      )})}
    </div>
  );
};

type TriviaComponentProps = {
  triviaData: Array<TriviaDataStructure>;
};

const TriviaComponent = ({ triviaData }: TriviaComponentProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState<boolean>(false);
  useEffect(() => {
    const handleKey = (e: any) => {
      console.log(e.code);
      if (e.code === 'ArrowRight') {
        if (activeIndex < triviaData.length - 1) {
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
    };
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('keydown', handleKey);
    };
  }, [activeIndex, triviaData, isAnswerRevealed]);
  return (
    <div className="slide-container">
      {triviaData.map((trivia, index) => {
        console.log(index);
        return (
        <TriviaSlideComponent
          key={trivia.question}
          currentIndex={index}
          activeIndex={activeIndex}
          trivia={trivia}
          isAnswerRevealed={isAnswerRevealed}
        />
      )})}
    </div>
  );
};

export default TriviaComponent;