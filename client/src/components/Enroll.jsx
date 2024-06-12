import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../services/course";
import { useSelector } from "react-redux";

const EnrollComponent = () => {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.userReducer.user);

  let [searchInput, setSearchInput] = useState("");
  let [searchResult, setSearchResult] = useState([]);
  const handleTakeToLogin = () => {
    navigate("/login");
  };
  const handleChangeInput = (e) => {
    setSearchInput(e.target.value);
  };
  const handleSearch = () => {
    CourseService.getCourseByName(searchInput)
      .then((data) => {
        console.log(data);
        setSearchResult(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleEnroll = (id) => {
    console.log(id);
    CourseService.enroll(id)
      .then(() => {
        window.alert("enroll successfully and redirect to course page");
        navigate("/course");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    CourseService.getAllCourses()
      .then((data) => {
        console.log(data);
        setSearchResult(data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div className="p-5">
      {!currentUser && (
        <div>
          <p>You must login first before searching for courses.</p>
          <button
            className="btn btn-primary btn-lg"
            onClick={handleTakeToLogin}
          >
            Take me to login page.
          </button>
        </div>
      )}
      {currentUser && currentUser.user.role == "instructor" && (
        <div>
          <h1>Only students can enroll in courses.</h1>
        </div>
      )}
      {currentUser && currentUser.user.role == "student" && (
        <div className="search input-group mb-3">
          <input
            onChange={handleChangeInput}
            type="text"
            className="form-control"
          />
          <button onClick={handleSearch} className="btn btn-primary">
            Search
          </button>
        </div>
      )}
      {currentUser && searchResult && searchResult.length > 0 && (
        <div>
          <p>CourseData from API。</p>
          <div className="d-flex flex-wrap">
            {searchResult.map((course) => (
              <div
                className="card m-3"
                style={{ width: "18rem" }}
                key={course._id}
              >
                <div className="card-body">
                  <h5 className="card-title">Title：{course.title}</h5>
                  <p className="card-text">{course.description}</p>
                  <p>Instructor:{course.instructor.username}</p>
                  <p>Price: {course.price}</p>
                  <p>{course.students.length} students</p>
                  <button
                    onClick={() => handleEnroll(course._id)}
                    className="card-text btn btn-outline-primary"
                  >
                    Enroll
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EnrollComponent;
