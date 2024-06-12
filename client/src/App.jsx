import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Course from "./components/Course";
import PostCourse from "./components/PostCourse";
import Enroll from "./components/Enroll";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="profile" element={<Profile />} />
          <Route path="course" element={<Course />} />
          <Route path="postCourse" element={<PostCourse />} />
          <Route path="enroll" element={<Enroll />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
