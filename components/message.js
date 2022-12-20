export default function Message({ children, avatar, username, description }) {
  return (
    <div className="bg-white p-8 border-2 rounded-lg">
      <div className="flex items-center gap-2">
        <span className="text-spaced text-xl font-extrabold">♙</span>
        <h2 className="font-extrabold text-lg font-object">{username}</h2>
      </div>
      <div className="py-4 break-words text-base indent-7">
        <p>{description}</p>
      </div>
      {children}
    </div>
  );
}