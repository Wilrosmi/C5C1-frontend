import "./Avatar.scss";

interface IProps {
  name: string;
}

export default function Avatar({ name }: IProps): JSX.Element {
  return (
    <>
      <div className="avatar">{name.slice(0, 1)}</div>
    </>
  );
}
