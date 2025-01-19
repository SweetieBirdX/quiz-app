import React, { useRef, useState } from 'react';
import { data } from '../../assets/data';

const Quiz = () => {
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(data[index]);
  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);

  let Option1 = useRef(null);
  let Option2 = useRef(null);
  let Option3 = useRef(null);
  let Option4 = useRef(null);

  let option_array = [Option1, Option2, Option3, Option4];

  const checkAns = (e, ans) => {
    if (lock === false) {
      if (question.ans === ans) {
        e.target.classList.add('bg-green-500');
        setLock(true);
        setScore((prev) => (prev < data.length ? prev + 1 : prev));
      } else {
        e.target.classList.add('bg-red-500');
        setLock(true);
        option_array[question.ans - 1].current.classList.add('bg-green-500');
      }
    }
  };

  const next = () => {
    if (lock === true) {
      if (index === data.length - 1) {
        setResult(true);
        return;
      }
      setIndex((prev) => prev + 1);
      setQuestion(data[index + 1]);
      setLock(false);
      option_array.forEach((option) => {
        option.current.classList.remove('bg-red-500');
        option.current.classList.remove('bg-green-500');
      });
    }
  };

  const previous = () => {
    if (index > 0) {
      setIndex((prev) => prev - 1);
      setQuestion(data[index - 1]);
      setLock(false);
      option_array.forEach((option) => {
        option.current.classList.remove('bg-red-500');
        option.current.classList.remove('bg-green-500');
      });
    }
  };

  const reset = () => {
    setIndex(0);
    setQuestion(data[0]);
    setScore(0);
    setLock(false);
    setResult(false);
  };

  return (
    <div className="w-[640px]  mx-auto mt-[75px] mb-[100px] bg-white text-[#262626] flex flex-col gap-5 rounded-lg p-10" style={{ background: 'linear-gradient(to bottom, #cce4f6, #336699)', minHeight: '10px' }}>
      <h1 className="text-center text-2xl font-bold">Quiz App</h1>
      <hr className="h-[2px] bg-gray-400 border-none" />
      {result ? (

        <><h2 className="text-center text-lg font-medium">
          {score === data.length
            ? "Congratulations! You answered all questions correctly!"
            : `You Scored ${score} out of ${data.length} --> You have to be careful!`}</h2>

          <button
            className="mx-auto w-[250px] h-[65px] transition-background-color duration-500 ease bg-[#336699] hover:bg-sky-900 text-white text-lg font-medium rounded-lg cursor-pointer"
            onClick={reset}>Reset</button></>
      ) : (
        <>
          <h2 className="text-lg font-medium">
            {index + 1}. {question.question}
          </h2>
          <ul>
            <li
              ref={Option1}
              className="flex items-center h-[70px] pl-4 border border-gray-500 rounded-md mb-5 text-lg cursor-pointer cursor-pointer transition-background-color duration-700 ease bg-[ #336699] hover:bg-sky-600"
              onClick={(e) => checkAns(e, 1)}>{question.option1}</li>
            <li
              ref={Option2}
              className="flex items-center h-[70px] pl-4 border border-gray-500 rounded-md mb-5 text-lg cursor-pointer cursor-pointer transition-background-color duration-700 ease bg-[ #336699] hover:bg-sky-600"
              onClick={(e) => checkAns(e, 2)}>{question.option2}</li>
            <li
              ref={Option3}
              className="flex items-center h-[70px] pl-4 border border-gray-500 rounded-md mb-5 text-lg cursor-pointer transition-background-color duration-700 ease bg-[ #336699] hover:bg-sky-600"
              onClick={(e) => checkAns(e, 3)}>{question.option3}</li>
            <li
              ref={Option4}
              className="flex items-center h-[70px] pl-4 border border-gray-500 rounded-md mb-5 text-lg cursor-pointer cursor-pointer transition-background-color duration-700 ease bg-[ #336699] hover:bg-sky-600"
              onClick={(e) => checkAns(e, 4)}>{question.option4}</li>
          </ul>
          <div className="flex justify-center gap-3">
            <button
              className="w-[250px] h-[65px] transition-background-color duration-500 ease bg-[#336699] hover:bg-sky-900 text-white text-lg font-medium rounded-lg cursor-pointer"
              onClick={previous}>Previous</button>
            <button
              className="w-[250px] h-[65px] transition-background-color duration-500 ease bg-[#336699] hover:bg-sky-900 text-white text-lg font-medium rounded-lg cursor-pointer"
              onClick={next}>Next</button>
          </div>
          <div className="mx-auto text-sm">
            {index + 1} of {data.length} questions
          </div></>
      )}
    </div>
  );
};

export default Quiz;
