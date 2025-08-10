export interface TextInputProps {
  inputValue: number;
  setInputValue: React.Dispatch<React.SetStateAction<number>>;
}

const TextInput: React.FC<TextInputProps> = ({
  inputValue,
  setInputValue,
}) => {
  return (
    <div>
      <div className="flex items-center rounded-md px-2 outline-1 outline-gray-300 has-[input:focus-within]:outline-sky-300">
        <p>£</p>
        <input
          className="block min-w-0 grow py-1.5 px-2 text-base placeholder:text-gray-400 focus:outline-none"
          value={inputValue} 
          onChange={e => e.target.value ? setInputValue(parseFloat(e.target.value)) : setInputValue(0)}
        />
      </div>
    </div>
  )
};

export default TextInput;