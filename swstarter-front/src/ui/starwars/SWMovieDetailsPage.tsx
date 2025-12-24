import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SWCard } from "./SWCard";
import { useFilmById } from "../../hooks/useFilms";
import { useMultiplePeople } from "../../hooks/useMultiplePeople";
import type { PersonDetails } from "../../services/interfaces/Person";

const LoadingSkeleton = () => (
  <SWCard className="w-full p-8">
    <div className="animate-pulse">
      <div className="h-8 w-64 bg-[#4a9eff]/20 rounded mb-6" />
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 space-y-3">
          <div className="h-4 w-32 bg-[#4a9eff]/20 rounded" />
          <div className="space-y-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-3 w-full bg-[#4a9eff]/10 rounded" />
            ))}
          </div>
        </div>
        <div className="flex-1 space-y-3">
          <div className="h-4 w-24 bg-[#4a9eff]/20 rounded" />
          <div className="h-3 w-3/4 bg-[#4a9eff]/10 rounded" />
        </div>
      </div>
    </div>
  </SWCard>
);

export const SWMovieDetailsPage = () => {
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

  const handleBack = () => navigate("/");
  const handleOpenCharacter = (person: PersonDetails) =>
    navigate(`/people/${person.uid}`);

  if (isLoading || !film) {
    return <LoadingSkeleton />;
  }

  return (
    <SWCard className="w-full p-8">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 rounded-full bg-[#4a9eff] flex items-center justify-center shadow-[0_0_20px_rgba(74,158,255,0.3)]">
          <span className="text-2xl">🎬</span>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">
            {film.properties.title}
          </h2>
          <p className="text-sm text-[#8892b0]">
            Episode {film.properties.episode_id} •{" "}
            {film.properties.release_date}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-8 md:flex-row">
        <div className="flex-1">
          <h3 className="text-sm font-bold text-[#ffd700] uppercase tracking-wider mb-3">
            Opening Crawl
          </h3>
          <div className="w-full h-px bg-[#ffd700]/50 mb-4" />
          <div className="relative p-4 rounded-lg bg-[#0a0a0f]/50 border border-[#ffd700]/10">
            <p className="text-sm text-[#c5c5c5] leading-relaxed italic">
              {film.properties.opening_crawl?.replace(/\r\n/g, " ") ||
                "No opening crawl available."}
            </p>
          </div>

          <div className="mt-6 flex items-center gap-4 text-sm text-[#8892b0]">
            <span>
              <span className="text-[#4a9eff]">Director:</span>{" "}
              {film.properties.director}
            </span>
            <span>•</span>
            <span>
              <span className="text-[#4a9eff]">Producer:</span>{" "}
              {film.properties.producer}
            </span>
          </div>

          <button
            type="button"
            onClick={handleBack}
            className="force-button mt-8 px-6 py-3 rounded-lg font-bold text-sm tracking-wider uppercase bg-[#ffd700] text-black"
          >
            Back to Search
          </button>
        </div>

        <div className="flex-1">
          <h3 className="text-sm font-bold text-[#4a9eff] uppercase tracking-wider mb-3">
            Characters
          </h3>
          <div className="w-full h-px bg-[#4a9eff]/50 mb-4" />
          {characters.length === 0 && (
            <p className="text-sm text-[#8892b0]">No characters found.</p>
          )}
          {characters.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {characters.map((person: PersonDetails) => (
                <button
                  key={person.uid}
                  type="button"
                  onClick={() => handleOpenCharacter(person)}
                  className="
                    px-3 py-1.5 rounded-lg text-sm cursor-pointer
                    bg-[#4a9eff]/10 border border-[#4a9eff]/30 text-[#4a9eff]
                    hover:bg-[#4a9eff]/20 hover:border-[#4a9eff]
                    transition-all duration-300
                  "
                >
                  {person.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </SWCard>
  );
};
