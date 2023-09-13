interface Props {
  name: string;
  size: string;
}

const Avatar = ({ name, size }: Props) => {
  const avatarSizeClass = size === "small" ? "h-8 w-8" : "h-12 w-12"; // Adjust size as needed

  // Extract the first letter from the name (assuming it's a string)
  const firstLetter = name ? name.charAt(0).toUpperCase() : "";

  return (
    <div className={`relative rounded-full overflow-hidden bg-blue-500 text-white ${avatarSizeClass}`}>
      <span className="absolute inset-0 flex items-center justify-center">
        {firstLetter}
      </span>
    </div>
  );
};

export default Avatar;
