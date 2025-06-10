type GreetingMessageProps = {
  userFirstName: string;
};

export default function GreetingMessage({
  userFirstName,
}: GreetingMessageProps) {
  const user = userFirstName ?? null;
  const hour = new Date().getHours();
  let greeting;

  switch (true) {
    case hour < 12:
      greeting = "Good Morning";
      break;
    case hour < 18:
      greeting = "Good Afternoon";
      break;
    default:
      greeting = "Good Evening";
  }

  return (
    <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-montserrat font-extrabold text-white text-center sm:w-full w-2/3 mx-auto">
      {user ? `${greeting}, ${user}.` : `${greeting}.`}
    </h1>
  );
}
