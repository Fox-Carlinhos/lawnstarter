import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SWCard } from "./SWCard";
import { usePersonById } from "../../hooks/usePeople";
import { useMultipleFilms } from "../../hooks/useMultipleFilms";
import type { FilmDetails } from "../../services/interfaces/Film";

const LoadingSkeleton = () => (
  <SWCard className="w-full p-8">
    <div className="animate-pulse">
      <div className="h-8 w-48 bg-[#4a9eff]/20 rounded mb-6" />
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 space-y-3">
          <div className="h-4 w-20 bg-[#4a9eff]/20 rounded" />
          <div className="space-y-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-3 w-full bg-[#4a9eff]/10 rounded" />
            ))}
          </div>
        </div>
        <div className="flex-1 space-y-3">
          <div className="h-4 w-20 bg-[#4a9eff]/20 rounded" />
          <div className="h-3 w-3/4 bg-[#4a9eff]/10 rounded" />
        </div>
      </div>
    </div>
  </SWCard>
);

export const SWPersonDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: person, isLoading: personLoading } = usePersonById(id);

  const filmIds = useMemo(() => {
    if (!person?.films?.length) return [];
    return person.films
      .map((url) => url.split("/").filter(Boolean).pop() || "")
      .filter(Boolean);
  }, [person?.films]);

  const { data: films, isLoading: filmsLoading } = useMultipleFilms(filmIds);
  const isLoading = personLoading || filmsLoading;

  const formatValue = (value?: string | null) => {
    if (!value) return "Unknown";
    return value;
  };

  const handleBack = () => navigate("/");
  const handleOpenFilm = (film: FilmDetails) => navigate(`/movies/${film.uid}`);

  if (isLoading || !person) {
    return <LoadingSkeleton />;
  }

  return (
    <SWCard className="w-full p-8">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 rounded-full bg-[#ffd700] flex items-center justify-center shadow-[0_0_20px_rgba(255,215,0,0.3)]">
          <span className="text-2xl">👤</span>
        </div>
        <h2 className="text-2xl font-bold text-[#ffd700]">{person.name}</h2>
      </div>

      <div className="flex flex-col gap-8 md:flex-row">
        <div className="flex-1">
          <h3 className="text-sm font-bold text-[#4a9eff] uppercase tracking-wider mb-3">
            Character Details
          </h3>
          <div className="w-full h-px bg-[#4a9eff]/50 mb-4" />
          <div className="space-y-2">
            {[
              { label: "Birth Year", value: person.birth_year },
              { label: "Gender", value: person.gender },
              { label: "Eye Color", value: person.eye_color },
              { label: "Hair Color", value: person.hair_color },
              { label: "Height", value: person.height },
              { label: "Mass", value: person.mass },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 text-sm">
                <span className="text-[#8892b0]">{item.label}:</span>
                <span className="text-white font-medium">
                  {formatValue(item.value)}
                </span>
              </div>
            ))}
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
            Featured In
          </h3>
          <div className="w-full h-px bg-[#4a9eff]/50 mb-4" />
          {films.length === 0 && (
            <p className="text-sm text-[#8892b0]">No movies found.</p>
          )}
          {films.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {films.map((film) => (
                <button
                  key={film.uid}
                  type="button"
                  onClick={() => handleOpenFilm(film)}
                  className="
                    px-3 py-1.5 rounded-lg text-sm cursor-pointer
                    bg-[#4a9eff]/10 border border-[#4a9eff]/30 text-[#4a9eff]
                    hover:bg-[#4a9eff]/20 hover:border-[#4a9eff]
                    transition-all duration-300
                  "
                >
                  {film.properties.title}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </SWCard>
  );
};
