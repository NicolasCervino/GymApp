import { ChangeEvent, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordInput = ({ handlePassword }: { handlePassword: (e: ChangeEvent<HTMLInputElement>) => void }) => {
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <div className="grid grid-flow-col items-center bg-transparent border-b py-2 outline-none w-full">
      <input
        className="outline-none bg-transparent"
        type={hidePassword ? "password" : "text"}
        placeholder="password"
        onChange={(e) => handlePassword(e)}
        autoComplete={"on"}
      />
      <label className="justify-self-end pr-4" onClick={() => setHidePassword(!hidePassword)}>
        {hidePassword ? <FaEye /> : <FaEyeSlash />}
      </label>
    </div>
  );
};

export default PasswordInput;
