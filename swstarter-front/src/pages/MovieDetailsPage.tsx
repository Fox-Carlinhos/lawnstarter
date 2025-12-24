import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "../components/Card";
import { useFilmById } from "../hooks/useFilms";
import { useMultiplePeople } from "../hooks/useMultiplePeople";
import type { PersonDetails } from "../services/interfaces/Person";

export const MovieDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: film, isLoading: filmLoading } = useFilmById(id);

  const characterIds = useMemo(() => {
    if (!film?.properties.characters?.length) return [];
    return film.properties.characters
      .map((url) => url.split("/").filter(Boolean).pop() || "")
      .filter(Boolean);
  }, [film?.properties.characters]);

  const { data: characters, isLoading: charactersLoading } =
    useMultiplePeople(characterIds);
  const isLoading = filmLoading || charactersLoading;

  const handleBack = () => {
    navigate("/");
  };

  const handleOpenCharacter = (person: PersonDetails) => {
    navigate(`/people/${person.uid}`);
  };

  if (isLoading || !film) {
    return (
      <Card className="w-full p-6">
        <p className="text-[12px] font-semibold text-gray-600">Loading...</p>
      </Card>
    );
  }

  return (
    <Card className="w-full p-6 md:p-8">
      <h2 className="text-[18px] font-bold mb-4">{film.properties.title}</h2>
      <div className="flex flex-col gap-8 md:flex-row">
        <div className="flex-1">
          <h3 className="text-[12px] font-bold mb-1.5">Opening Crawl</h3>
          <div className="w-full h-[0.5px] bg-[#d3d3d3] mb-3" />
          <div className="text-[11px] leading-relaxed text-[#383838]">
            <p>{film.properties.opening_crawl.replace(/\r\n/g, " ")}</p>
          </div>
          <button
            type="button"
            onClick={handleBack}
            className="mt-6 px-6 py-2 rounded-full bg-[#00a85a] text-[10px] font-bold tracking-[0.05em] text-white hover:bg-[#00924e] transition-colors cursor-pointer"
          >
            BACK TO SEARCH
          </button>
        </div>
        <div className="flex-1">
          <h3 className="text-[12px] font-bold mb-1.5">Characters</h3>
          <div className="w-full h-[0.5px] bg-[#d3d3d3] mb-3" />
          <div className="text-[11px] leading-relaxed">
            {characters.length === 0 && (
              <p className="text-[11px] text-gray-500">No characters found.</p>
            )}
            {characters.length > 0 && (
              <p>
                {characters.map((person: PersonDetails, index: number) => (
                  <button
                    key={person.uid}
                    type="button"
                    onClick={() => handleOpenCharacter(person)}
                    className="inline text-left text-[#0074cc] hover:underline"
                  >
                    {person.name}
                    {index < characters.length - 1 && ", "}
                  </button>
                ))}
              </p>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
