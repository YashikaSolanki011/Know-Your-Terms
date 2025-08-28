import React from "react";

type ScoreProps = {
  label: string;
  score: number; // out of 10
  comment: string;
};

const ScoreCircle: React.FC<ScoreProps> = ({ label, score, comment }) => {
  const percentage = (score / 10) * 100;
  const radius = 40;
  const stroke = 6;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset =
    circumference - (percentage / 100) * circumference;

  return (
    <div className="flex items-center gap-4 p-3 rounded-xl border border-gray-200 shadow-sm bg-white">
      <div className="relative">
        <svg
          height={radius * 2}
          width={radius * 2}
          className="-rotate-90 transform"
        >
          {/* Background circle */}
          <circle
            stroke="#e5e7eb"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          {/* Progress circle */}
          <circle
            stroke="#3b82f6"
            fill="transparent"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            style={{ transition: "stroke-dashoffset 0.5s ease-out" }}
          />
        </svg>
        {/* Score in center */}
        <span className="absolute inset-0 flex items-center justify-center font-semibold text-gray-800">
          {score}/10
        </span>
      </div>

      <div className="flex flex-col">
        <p className="text-sm font-medium text-gray-900">{label}</p>
        <p className="text-xs text-gray-600">{comment}</p>
      </div>
    </div>
  );
};

export default ScoreCircle;
