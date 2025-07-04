import { Navigate } from "react-router-dom";

const LandingRouter = () => {
  const isLoggedIn = !!localStorage.getItem("token");
  const isDraftCompleted = localStorage.getItem("draftStatus") === "completed";

  if (!isLoggedIn) {
    return <Navigate to="/pre-signup" replace />;
  }

  if (isLoggedIn && !isDraftCompleted) {
    return <Navigate to="/commissioner-lobby" replace />;
  }

  if (isLoggedIn && isDraftCompleted) {
    return <Navigate to="/post-draft" replace />;
  }

  return <Navigate to="/" replace />;
};

export default LandingRouter;