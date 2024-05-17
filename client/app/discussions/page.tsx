const Discussions = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Start a Discussion
      </h1>
      <form className="bg-white p-6 rounded-lg shadow-md mb-10">
        <div className="mb-6">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="title"
          >
            Discussion Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="Enter the discussion title"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            placeholder="Describe the topic of discussion"
            className="w-full p-3 border border-gray-300 rounded-lg h-32 focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="programmingLanguage"
          >
            Programming Language
          </label>
          <select
            id="programmingLanguage"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            required
          >
            <option value="">Select a programming language</option>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="csharp">C#</option>
            <option value="ruby">Ruby</option>
            <option value="php">PHP</option>
            <option value="cpp">C++</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-purple-600 transition duration-300"
        >
          Post Discussion
        </button>
      </form>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">
          Sample Discussion Title
        </h2>
        <p className="mb-4 text-gray-700">
          This is a sample discussion content. It gives a brief idea about the
          topic and invites others to join in the conversation.
        </p>
        <div className="text-gray-600 text-sm flex justify-between items-center">
          <span className="font-medium">Posted by User123</span>
          <span>May 17, 2024</span>
        </div>
      </div>
    </div>
  );
};

export default Discussions;
