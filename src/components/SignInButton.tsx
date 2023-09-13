interface Props {
  signIn: () => void;
}

const SignInButton = ({ signIn }: Props) => {
  return (
    <>
      <button
        className="bg-slate-300 hover:bg-slate-200 flex items-center gap-2 clear-button rounded-2xl px-5 py-2 my-2"
        onClick={signIn}
      >
        <figure className="w-10 flex items-center">
          <img
            src="/google.png"
            alt="google"
            className="max-w-non overflow-clip w-full self-center"
          />
        </figure>
        <p className="w-full">Sign In With Google</p>
      </button>
    </>
  );
};

export default SignInButton;
