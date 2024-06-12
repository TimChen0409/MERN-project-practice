import axios from "axios";
const API_URL = "http://localhost:8080/api/courses";
import AuthService from "./auth";

class CourseService {
  post(title, description, price) {
    let token;
    if (AuthService.getCurrentUserInfo()) {
      token = AuthService.getCurrentUserInfo().token;
    } else {
      token = "";
    }
    return axios.post(
      API_URL,
      { title, description, price },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  getAllCourses() {
    let token;
    if (localStorage.getItem("user")) {
      token = AuthService.getCurrentUserInfo().token;
    } else {
      token = "";
    }

    return axios.get(`${API_URL}`, {
      headers: {
        Authorization: token,
      },
    });
  }

  // to get student's courses
  getEnrolledCourses(_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = AuthService.getCurrentUserInfo().token;
    } else {
      token = "";
    }

    return axios.get(`${API_URL}/student/${_id}`, {
      headers: {
        Authorization: token,
      },
    });
  }

  // to get instructor's courses
  getInstructorCourses(_id) {
    let token;
    if (AuthService.getCurrentUserInfo()) {
      token = AuthService.getCurrentUserInfo().token;
    } else {
      token = "";
    }

    return axios.get(`${API_URL}/instructor/${_id}`, {
      headers: {
        Authorization: token,
      },
    });
  }

  // to get courses by name
  getCourseByName(name) {
    let token;
    if (AuthService.getCurrentUserInfo()) {
      token = AuthService.getCurrentUserInfo().token;
    } else {
      token = "";
    }
    if (!name) {
      alert("please input search keyword!");
      return;
    }

    return axios.get(API_URL + "/findByName/" + name, {
      headers: {
        Authorization: token,
      },
    });
  }

  enroll(_id) {
    let token;
    if (AuthService.getCurrentUserInfo()) {
      token = AuthService.getCurrentUserInfo().token;
    } else {
      token = "";
    }

    return axios.post(
      API_URL + "/enroll/" + _id,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
}

export default new CourseService();
