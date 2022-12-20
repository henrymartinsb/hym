export default function Message({ children, avatar, username, description }) {
  return (
    <div className="bg-white p-8 border-2 rounded-lg">
      <div className="flex items-center gap-2 ">
        <span className="text-white text-xs font-extrabold p-1 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full">🧸</span>
        <h2 className="font-extrabold text-lg font-object">{username}</h2>
      </div>
      <div className="py-4 text-base whitespace-pre-line break-words">
        <p>{description}</p>
      </div>
      {children}
    </div>
  );
}