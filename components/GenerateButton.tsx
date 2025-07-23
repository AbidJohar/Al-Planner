interface GenerateButtonProps {
  label: string;
}

const GenerateButton = ({ label }: GenerateButtonProps) => {
  return (
    <button
      className="bg-gradient-to-br from-purple-900 to-purple-600 text-white px-4 py-1.5 rounded-[25px] text-lg font-medium shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
      style={{
        boxShadow: '0 0 20px #A63AFF, inset 0 0 10px #6B2AEE',
        WebkitBoxShadow: '0 0 20px #A63AFF, inset 0 0 10px #6B2AEE', 
      }}
    >
      {label}
    </button>
  );
};

export default GenerateButton;