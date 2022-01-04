import Loader from 'react-loader-spinner';

type SpinnerProps = {
  message: string;
};

export const Spinner = ({ message }: SpinnerProps) => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <Loader type="TailSpin" color="#00bfff" height={50} width={200} />
      <p className="text-lg text-center px-2 mt-5">{message}</p>
    </div>
  );
};
