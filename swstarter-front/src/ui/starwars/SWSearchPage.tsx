import { useState, useMemo } from "react";
import { SWSearchContainer } from "./SWSearchContainer";
import { SWResultsContainer, type ResultItem } from "./SWResultsContainer";
import { usePeopleSearch } from "../../hooks/usePeople";
import { useFilmsSearch } from "../../hooks/useFilms";
import { useNavigate } from "react-router-dom";
import {
  ResourceType,
  type ResourceTypeValue,
} from "../../constants/resourceTypes";

export const SWSearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState<ResourceTypeValue>(
    ResourceType.PEOPLE
  );
  const [isSearchEnabled, setIsSearchEnabled] = useState(false);
  const navigate = useNavigate();

  const peopleQuery = usePeopleSearch(
    searchQuery,
    isSearchEnabled && searchType === ResourceType.PEOPLE
  );
  const filmsQuery = useFilmsSearch(
    searchQuery,
    isSearchEnabled && searchType === ResourceType.MOVIES
  );

  const results: ResultItem[] = useMemo(() => {
    if (searchType === ResourceType.PEOPLE && peopleQuery.data) {
      return peopleQuery.data.map((person) => ({
        id: person.uid,
        label: person.properties.name,
        type: ResourceType.PEOPLE,
      }));
    }
    if (searchType === ResourceType.MOVIES && filmsQuery.data) {
      return filmsQuery.data.map((film) => ({
        id: film.uid,
        label: film.properties.title,
        type: ResourceType.MOVIES,
      }));
    }
    return [];
  }, [searchType, peopleQuery.data, filmsQuery.data]);

  const isLoading =
    searchType === ResourceType.PEOPLE
      ? peopleQuery.isLoading
      : filmsQuery.isLoading;

  const handleSearch = (query: string, type: ResourceTypeValue) => {
    setSearchQuery(query);
    setSearchType(type);
    setIsSearchEnabled(true);
  };

  const handleSeeDetails = (item: ResultItem) => {
    if (item.type === ResourceType.PEOPLE) {
      navigate(`/people/${item.id}`);
    } else {
      navigate(`/movies/${item.id}`);
    }
  };

  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-center">
      <SWSearchContainer onSearch={handleSearch} />
      <SWResultsContainer
        results={results}
        isLoading={isLoading}
        onSeeDetails={handleSeeDetails}
      />
    </div>
  );
};
