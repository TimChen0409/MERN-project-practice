import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CourseService from "../services/course";

const CourseComponent = () => {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.userReducer.user);

  const handleTakeToLogin = () => {
    navigate("/login");
  };
  const [courseData, setCourseData] = useState([]);

  useEffect(() => {
    let _id;
    if (currentUser) {
      _id = currentUser.user._id;
      if (currentUser.user.role == "instructor") {
        CourseService.getInstructorCourses(_id)
          .then((data) => {
            console.log(data);
            setCourseData(data.data);
          })
          .catch((e) => {
            console.log(e);
          });
      } else if (currentUser.user.role == "student") {
        CourseService.getEnrolledCourses(_id)
          .then((data) => {
            console.log(data);
            setCourseData(data.data);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }
  }, [currentUser]);

  return (
    <div className="p-5">
      {!currentUser && (
        <div>
          <span className="mx-2">
            You have to login first then you can see the courses you own.
          </span>
          <button
            className="btn btn-outline-primary"
            onClick={handleTakeToLogin}
          >
            Go to login page
          </button>
        </div>
      )}
      {currentUser && currentUser.user.role == "instructor" && (
        <div>
          <h1>Welcome to instructor's courses page</h1>
        </div>
      )}
      {currentUser && currentUser.user.role == "student" && (
        <div>
          <h1>Welcome to students's courses page</h1>
        </div>
      )}
      {currentUser && courseData && courseData.length != 0 && (
        <div className="d-flex flex-wrap">
          {courseData.map((course) => {
            return (
              <div
                className="card flex-wrap m-3"
                style={{ width: "18rem" }}
                key={course._id}
              >
                <div className="card-body">
                  <h5 className="card-title">Title: {course.title}</h5>
                  <p className="card-text p-1">{course.description}</p>
                  <p className="py-1">{course.students.length} students</p>
                  <p className="py-1">Price: {course.price}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CourseComponent;
