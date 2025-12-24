import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "../components/Card";
import { usePersonById } from "../hooks/usePeople";
import { useMultipleFilms } from "../hooks/useMultipleFilms";
import type { FilmDetails } from "../services/interfaces/Film";

export const PersonDetailsPage = () => {
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
    if (!value) {
      return "Unknown";
    }
    return value;
  };

  const handleBack = () => {
    navigate("/");
  };

  const handleOpenFilm = (film: FilmDetails) => {
    navigate(`/movies/${film.uid}`);
  };

  if (isLoading || !person) {
    return (
      <Card className="w-full p-6">
        <p className="text-[12px] font-semibold text-gray-600">Loading...</p>
      </Card>
    );
  }

  return (
    <Card className="w-full p-6 md:p-8">
      <h2 className="text-[18px] font-bold mb-4">{person.name}</h2>
      <div className="flex flex-col gap-8 md:flex-row">
        <div className="flex-1">
          <h3 className="text-[12px] font-bold mb-1.5">Details</h3>
          <div className="w-full h-[0.5px] bg-[#d3d3d3] mb-3" />
          <div className="text-[11px] leading-relaxed text-[#383838] space-y-0.5">
            <p>Birth Year: {formatValue(person.birth_year)}</p>
            <p>Gender: {formatValue(person.gender)}</p>
            <p>Eye Color: {formatValue(person.eye_color)}</p>
            <p>Hair Color: {formatValue(person.hair_color)}</p>
            <p>Height: {formatValue(person.height)}</p>
            <p>Mass: {formatValue(person.mass)}</p>
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
          <h3 className="text-[12px] font-bold mb-1.5">Movies</h3>
          <div className="w-full h-[0.5px] bg-[#d3d3d3] mb-3" />
          <div className="text-[11px] leading-relaxed">
            {films.length === 0 && (
              <p className="text-[11px] text-gray-500">No movies found.</p>
            )}
            {films.length > 0 && (
              <p>
                {films.map((film, index) => (
                  <button
                    key={film.uid}
                    type="button"
                    onClick={() => handleOpenFilm(film)}
                    className="inline text-left text-[#0074cc] hover:underline"
                  >
                    {film.properties.title}
                    {index < films.length - 1 && ", "}
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
