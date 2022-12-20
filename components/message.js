export default function Message({ children, avatar, username, description }) {
  return (
    <div className="bg-white p-8 border-b-2 rounded-lg">
      <div className="flex items-center gap-2">
        <h2 className="font-object font-bold">👨‍💻 {username}</h2>
      </div>
      <div className="py-4 break-words">
        <p>{description}</p>
      </div>
      {children}
    </div>
  );
}