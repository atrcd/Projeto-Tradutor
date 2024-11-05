import { useEffect, useState } from "react";

const languages = [
  { code: "en", name: "Inglês" },
  { code: "es", name: "Espanhol" },
  { code: "fr", name: "Francês" },
  { code: "de", name: "Alemão" },
  { code: "it", name: "Italiano" },
  { code: "pt", name: "Português" },
];

function App() {
  const [sourceLang, setSourceLang] = useState("pt");
  const [targetLang, setTargetLang] = useState("en");
  const [sourceText, setSourceText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [translatedText, setTranslatedText] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (sourceText) {
      const delay = setTimeout(() => {
        handleTranslate();
      }, 500);
      return () => clearTimeout(delay);
    }
  }, [sourceText, targetLang, sourceLang]);

  const handleTranslate = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${sourceText}&langpair=${sourceLang}|${targetLang}`
      );
      if (!response.ok) throw new Error(`HTTP ERROR: ${response.status}`);

      const data = await response.json();
      setTranslatedText(data.responseData.translatedText);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwapLanguages = () => {
    const temp = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(temp);
    setTranslatedText(""); // Reset translated text on language swap
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center">
          <h1 className="text-headerColor text-2xl font-bold">
            Tradutor-Riofer
          </h1>
        </div>
      </header>

      <main className="flex-grow flex items-start justify-center px-4 py-8">
        <div className="w-full max-w-5xl bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <select
              value={sourceLang}
              onChange={(event) => setSourceLang(event.target.value)}
              className="text-sm text-textColor bg-transparent border-none font-semibold focus:outline-none cursor-pointer"
            >
              {languages.map((lang) => (
                <option
                  className="font-semibold"
                  key={lang.code}
                  value={lang.code}
                >
                  {lang.name}
                </option>
              ))}
            </select>

            <button
              onClick={handleSwapLanguages}
              className="p-2 rounded-full hover:bg-gray-100 outline-none"
            >
              <svg
                className="w-5 h-5 text-headerColor"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                />
              </svg>
            </button>

            <select
              value={targetLang}
              onChange={(event) => setTargetLang(event.target.value)}
              className="text-sm text-textColor bg-transparent border-none font-semibold focus:outline-none cursor-pointer"
            >
              {languages.map((lang) => (
                <option
                  className="font-semibold"
                  key={lang.code}
                  value={lang.code}
                >
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-4">
              <textarea
                value={sourceText}
                onChange={(event) => setSourceText(event.target.value)}
                placeholder="Digite seu texto..."
                className="w-full h-40 text-lg text-textColor bg-transparent resize-none border-none outline-none font-semibold"
              ></textarea>
            </div>

            <div className="p-4 relative bg-secondaryBackground border-l border-gray-200">
              <div className="absolute inset-0 flex items-center justify-center">
                {isLoading ? (
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
                ) : error ? (
                  <p className="text-lg text-red-500">{error}</p>
                ) : (
                  <p className="text-lg text-textColor">{translatedText}</p>
                )}
              </div>
            </div>
          </div>
          {error && (

          
          <div className="p-4 bg-red-100 border-red-400 text-red-700">
            {error}
          </div>
          )}
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-5xl mx-auto px-4 py-3 text-sm text-headerColor font-semibold">
          &copy; {new Date().getFullYear()} Tradutor Riofer
        </div>
      </footer>
    </div>
  );
}

export default App;
