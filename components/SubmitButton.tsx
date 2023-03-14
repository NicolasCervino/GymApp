const SubmitButton = ({ text }: { text: string }) => {
  return (
    <button
      className="w-full h-12 text-white font-semibold rounded-lg bg-primary-green text-lg flex items-center justify-center mt-6 hover:bg-[#1f8b60]"
      type="submit"
    >
      {text}
    </button>
  );
};

export default SubmitButton;
