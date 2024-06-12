const router = require("express").Router();
const Course = require("../models").course;
const courseValidation = require("../config/validation").courseValidation;

router.use((req, res, next) => {
  console.log("course route...");
  next();
});

// get all courses
router.get("/", async (req, res) => {
  try {
    // query object(thenable object)
    let courseFound = await Course.find({})
      .populate("instructor", ["username", "email"])
      .exec();
    return res.send(courseFound);
  } catch (e) {
    return res.status(5000).send(e);
  }
});

// get courses by instructorId
router.get("/instructor/:_instructor_id", async (req, res) => {
  let { _instructor_id } = req.params;
  try {
    let coursesFound = await Course.find({ instructor: _instructor_id })
      .populate("instructor", ["username", "email"])
      .exec();
    return res.send(coursesFound);
  } catch (error) {
    return res.status(500).send(e);
  }
});

// get courses by studentId
router.get("/student/:_student_id", async (req, res) => {
  let { _student_id } = req.params;
  try {
    let coursesFound = await Course.find({ students: _student_id })
      .populate("instructor", ["username", "email"])
      .exec();
    return res.send(coursesFound);
  } catch (error) {
    return res.status(500).send(e);
  }
});

// get courses by CourseId
router.get("/:_id", async (req, res) => {
  let { _id } = req.params;
  try {
    let courseFound = await Course.findOne({ _id })
      .populate("instructor", ["username", "email"])
      .exec();
    return res.send(courseFound);
  } catch (e) {
    return res.status(500).send(e);
  }
});

// get courses by search
router.get("/findByName/:name", async (req, res) => {
  let { name } = req.params;
  try {
    let courseFound = await Course.find({ title: new RegExp(name, "i") })
      .populate("instructor", ["email", "username"])
      .exec();
    return res.send(courseFound);
  } catch (e) {
    return res.status(500).send(e);
  }
});

// create course
router.post("/", async (req, res) => {
  // validate data
  let { error } = courseValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  if (req.user.isStudent()) {
    return res.status(400).send("only teacher can release new course.");
  }

  let { title, description, price } = req.body;
  try {
    let newCourse = new Course({
      title,
      description,
      price,
      instructor: req.user._id,
    });
    let savedCourse = await newCourse.save();
    return res.send("create new course successfully!");
  } catch (e) {
    return res.status(500).send("create new course unsuccessfully!");
  }
});

// update course
router.patch("/:_id", async (req, res) => {
  // validate data
  let { error } = courseValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let { _id } = req.params;
  // check whether the course is existing
  try {
    let courseFound = await Course.findOne({ _id });
    if (!courseFound) {
      return res.status(400).send("find course error");
    }

    if (courseFound.instructor.equals(req.user._id)) {
      let updatedCourse = await Course.findOneAndUpdate({ _id }, req.body, {
        new: true, // return the document after update was applied.
        runValidators: true,
      });
      return res.send({
        message: "update course successfully",
        updatedCourse,
      });
    } else {
      return res
        .status(403)
        .send("only the course's instructor can update it!");
    }
  } catch (e) {
    return res.status(500).send(e);
  }
});

// delete course
router.delete("/:_id", async (req, res) => {
  let { _id } = req.params;
  // check whether the course is existing
  try {
    let courseFound = await Course.findOne({ _id }).exec();
    if (!courseFound) {
      return res.status(400).send("can't find course.");
    }

    if (courseFound.instructor.equals(req.user._id)) {
      await Course.deleteOne({ _id }).exec();
      return res.send("delete course successfully");
    } else {
      return res
        .status(403)
        .send("only the course's instructor can delete it!");
    }
  } catch (e) {
    return res.status(500).send(e);
  }
});

// let student enroll course
router.post("/enroll/:_id", async (req, res) => {
  let { _id } = req.params;
  try {
    let course = await Course.findOne({ _id }).exec();
    course.students.push(req.user._id);
    await course.save();
    return res.send("enroll successfully.");
  } catch (e) {
    return res.send(e);
  }
});

module.exports = router;
