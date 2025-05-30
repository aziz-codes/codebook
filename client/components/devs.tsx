import Image from "next/image";

const DeveloperCard = () => {
  const items = {
    username: "Dev123",
    avatarUrl: "https://via.placeholder.com/150",
    topLanguage: "JavaScript",
  };
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-6">
      <Image
        src={items.avatarUrl}
        alt={`${items.username}'s avatar`}
        height={48}
        width={48}
        className="rounded-full border-2 border-gray-300"
      />
      <div className="flex-grow">
        <h2 className="text-xl font-semibold text-gray-800">
          {items.username}
        </h2>
        <p className="text-gray-600">
          Top Language:{" "}
          <span className="text-blue-500 font-medium">{items.topLanguage}</span>
        </p>
      </div>
      <button className="px-4 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold rounded-lg shadow-md hover:from-green-500 hover:to-blue-600 transition duration-300">
        Follow
      </button>
    </div>
  );
};

export default DeveloperCard;
