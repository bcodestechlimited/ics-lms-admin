import { CirclePlusIcon, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { TextInput } from "./inputs";

const KnowledgeCheck = ({
  initialData,
  section,
  onUpdate,
  isStandalone = false,
}) => {
  const generateId = () =>
    `question-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  const defaultQuestion = {
    id: generateId(),
    question: "",
    type: "single",
    options: [
      { id: 1, text: "", isCorrect: false },
      { id: 2, text: "", isCorrect: false },
      { id: 3, text: "", isCorrect: false },
      { id: 4, text: "", isCorrect: false },
    ],
  };

  const [questions, setQuestions] = useState(
    Array.isArray(initialData) && initialData.length
      ? initialData
      : [defaultQuestion]
  );

  useEffect(() => {
    if (initialData && Array.isArray(initialData)) {
      setQuestions(initialData);
    }
  }, [initialData]);

  // Update parent component whenever state changes
  const handleStateUpdate = (updatedQuestions) => {
    if (isStandalone) {
      onUpdate(updatedQuestions);
    } else {
      onUpdate(section.id, updatedQuestions);
    }
  };

  const handleQuestionChange = (questionId, field, value) => {
    const updatedQuestions = questions.map((q) => {
      // Accept both generated id and _id (from server) for identification.
      if (q.id === questionId || q._id === questionId) {
        if (field === "type") {
          // Reset all correct answers when switching types.
          const resetOptions = q.options.map((opt) => ({
            ...opt,
            isCorrect: false,
          }));
          return { ...q, [field]: value, options: resetOptions };
        }
        return { ...q, [field]: value };
      }
      return q;
    });

    setQuestions(updatedQuestions);
    handleStateUpdate(updatedQuestions);
  };

  const handleOptionChange = (questionId, optionId, field, value) => {
    const updatedQuestions = questions.map((q) => {
      if (q.id === questionId || q._id === questionId) {
        const newOptions = q.options.map((option) => {
          if (option.id === optionId) {
            if (field === "isCorrect" && q.type === "single") {
              return { ...option, isCorrect: value };
            }
            return { ...option, [field]: value };
          }
          if (field === "isCorrect" && q.type === "single") {
            return { ...option, isCorrect: false };
          }
          return option;
        });
        return { ...q, options: newOptions };
      }
      return q;
    });

    setQuestions(updatedQuestions);
    handleStateUpdate(updatedQuestions);
  };

  const addNewQuestion = () => {
    const newQuestion = {
      id: generateId(),
      question: "",
      type: "single",
      options: [
        { id: 1, text: "", isCorrect: false },
        { id: 2, text: "", isCorrect: false },
        { id: 3, text: "", isCorrect: false },
        { id: 4, text: "", isCorrect: false },
      ],
    };

    const updatedQuestions = [...questions, newQuestion];
    setQuestions(updatedQuestions);
    handleStateUpdate(updatedQuestions);
  };

  const removeQuestion = (questionId) => {
    const updatedQuestions = questions.filter(
      (q) => q.id !== questionId && q._id !== questionId
    );
    setQuestions(updatedQuestions);
    handleStateUpdate(updatedQuestions);
  };

  return (
    <div className="space-y-8">
      {questions.map((question, questionIndex) => (
        <div
          key={question.id || question._id}
          className="space-y-4 border border-gray-200 rounded-lg p-6"
        >
          <div className="flex justify-between items-center">
            {isStandalone && (
              <h3 className="text-lg font-medium">
                Question {questionIndex + 1}
              </h3>
            )}

            {questions.length > 1 && (
              <button
                onClick={() => removeQuestion(question.id || question._id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}
          </div>

          <div>
            <label className="block mb-2">Question:</label>
            <TextInput
              value={question.question}
              onChange={(e) =>
                handleQuestionChange(
                  question.id || question._id,
                  "question",
                  e.target.value
                )
              }
              placeholder="Enter Question here"
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          <div>
            <p className="mb-2">Select question type</p>
            <div className="flex gap-x-6 items-center">
              <div className="space-x-2">
                <input
                  type="radio"
                  id={`single-${question.id || question._id}`}
                  checked={question.type === "single"}
                  onChange={() =>
                    handleQuestionChange(
                      question.id || question._id,
                      "type",
                      "single"
                    )
                  }
                  className="mr-2"
                />
                <label htmlFor={`single-${question.id || question._id}`}>
                  Single Answer
                </label>
              </div>
              <div className="space-x-2">
                <input
                  type="radio"
                  id={`multiple-${question.id || question._id}`}
                  checked={question.type === "multiple"}
                  onChange={() =>
                    handleQuestionChange(question.id, "type", "multiple")
                  }
                  className="mr-2"
                />
                <label htmlFor={`multiple-${question.id || question._id}`}>
                  Multiple Answers
                </label>
              </div>
            </div>
          </div>

          <div className="w-full space-y-4">
            <label className="block">Answers:</label>
            {question.options.map((option, index) => (
              <div key={option.id} className="space-y-2">
                <p>Option {String.fromCharCode(65 + index)}</p>
                <div className="flex justify-between px-2 border rounded-md gap-x-2 h-[40px]">
                  <input
                    type="text"
                    value={option.text}
                    onChange={(e) =>
                      handleOptionChange(
                        question.id || question._id,
                        option.id,
                        "text",
                        e.target.value
                      )
                    }
                    placeholder="Enter answer option"
                    className="flex-1 h-[36px] w-full px-1"
                  />
                  <div className="flex items-center gap-x-2">
                    <input
                      type={question.type === "single" ? "radio" : "checkbox"}
                      name={`correct-answer-${question.id || question._id}`}
                      checked={option.isCorrect}
                      onChange={(e) =>
                        handleOptionChange(
                          question.id || question._id,
                          option.id,
                          "isCorrect",
                          e.target.checked
                        )
                      }
                    />
                    <label>Correct answer</label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {isStandalone && (
        <div className="mt-8">
          <button
            onClick={addNewQuestion}
            className="flex items-center gap-x-4 text-myblue hover:text-blue-700"
          >
            <CirclePlusIcon className="w-5 h-5" />
            <p className="underline">Add Another Question</p>
          </button>
        </div>
      )}
    </div>
  );
};

export default KnowledgeCheck;
