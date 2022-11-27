import "./FormElement.scss";

interface IProps {
  labelText: string;
  placeholderText: string;
  inputState: string;
  setInputState: React.Dispatch<React.SetStateAction<string>>;
  type?: string;
}

export default function FormElement({
  labelText,
  placeholderText,
  inputState,
  setInputState,
  type,
}: IProps): JSX.Element {
  return (
    <>
      <div className="form_element">
        <label htmlFor={labelText}>{labelText}</label>
        <input
          name={labelText}
          id={labelText}
          placeholder={placeholderText}
          value={inputState}
          onChange={(e) => setInputState(e.target.value)}
          type={type ? type : "text"}
        ></input>
      </div>
      {/* TODO: put within input tag 
                value={inputState} onChange={(e) => setInputState(e.target.value)} */}
    </>
  );
}
