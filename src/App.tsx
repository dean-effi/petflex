import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import PostFormPage from "./pages/PostFormPage";
import PostPage from "./pages/PostPage";
import HomePage from "./pages/HomePage";
import OnHold from "./pages/OnHold";
import ProfilePage from "./pages/ProfilePage";
import AppContextWrapper from "./AppContextWrapper";
export default function App() {
  return (
    <div className="h-full min-h-screen w-full bg-stone-50 text-neutral-950 dark:bg-gradient-to-b dark:from-zinc-900 dark:to-[#181826] dark:text-stone-50">
      <AppContextWrapper>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/post" element={<PostFormPage />} />
          <Route path="/onhold" element={<OnHold />} />
          <Route path="/:postId" element={<PostPage />} />
        </Routes>
      </AppContextWrapper>
    </div>
  );
}
