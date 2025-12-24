import { Routes, Route } from "react-router-dom";
import { useTheme } from "./contexts/ThemeContext";
import { AppLayout } from "./layouts/AppLayout";
import { SearchPage } from "./pages/SearchPage";
import { PersonDetailsPage } from "./pages/PersonDetailsPage";
import { MovieDetailsPage } from "./pages/MovieDetailsPage";
import {
  SWLayout,
  SWSearchPage,
  SWPersonDetailsPage,
  SWMovieDetailsPage,
} from "./ui/starwars";

function App() {
  const { isStarWars } = useTheme();

  if (isStarWars) {
    return (
      <SWLayout>
        <Routes>
          <Route path="/" element={<SWSearchPage />} />
          <Route path="/people/:id" element={<SWPersonDetailsPage />} />
          <Route path="/movies/:id" element={<SWMovieDetailsPage />} />
        </Routes>
      </SWLayout>
    );
  }

  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/people/:id" element={<PersonDetailsPage />} />
        <Route path="/movies/:id" element={<MovieDetailsPage />} />
      </Routes>
    </AppLayout>
  );
}

export default App;
