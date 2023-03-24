import { FC, useState } from 'react';
import Pr from './Pr';
import { PrExcercises } from '@/lib/types';

type Props = {
  options: PrExcercises[];
};

const ComboBox: FC<Props> = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState<PrExcercises | null>(null);

  const handleOptionClick = (option: PrExcercises) => {
    setSelectedOption(option);
  };

  return (
    <div className="relative w-full">
      <select
        value={selectedOption?.id || ''}
        onChange={(e) => {
          const selectedId = e.target.value;
          const selected = options.find((option) => option.id === selectedId);
          setSelectedOption(selected || null);
        }}
        className="w-full px-4 py-2 text-gray-900 bg-gray-100 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
      >
        <option value="">Select an option...</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      {selectedOption && <Pr exercise={selectedOption} />}
    </div>
  );
};

export default ComboBox;
