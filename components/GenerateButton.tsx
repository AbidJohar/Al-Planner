interface GenerateButtonProps {
  label: string;
}

const GenerateButton = ({ label }: GenerateButtonProps) => {
  return (
    <button
      className="bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600 text-white px-4 py-1.5 rounded-[25px] text-lg font-medium shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
      style={{
        boxShadow: '0 0 20px #FDBA74, inset 0 0 10px #FACC15',
        WebkitBoxShadow: '0 0 20px #FDBA74, inset 0 0 10px #FACC15',
      }}
    >
      {label}
    </button>
  );
};

export default GenerateButton;
