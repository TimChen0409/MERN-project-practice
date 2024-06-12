import React from "react";

const HomeComponent = () => {
  return (
    <main>
      <div className="container py-4">
        <div className="p-5 mb-4 bg-light rounded-3">
          <div className="container-fluid py-5">
            <h1 className="display-5 fw-bold">Learning system</h1>
            <p className="col-md-8 fs-4">
              This system uses React.js as the front-end framework, Node.js,
              MongoDB as a backend server. This kind of project is called MERN
              Project, it is one of the most popular ways to create modern
              websites.
            </p>
          </div>
        </div>

        <div className="row align-items-md-stretch">
          <div className="col-md-6">
            <div className="h-100 p-5 text-white bg-dark rounded-3">
              <h2>To be a student</h2>
              <p>Students can register for their preferred courses.</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="h-100 p-5 text-white bg-secondary border rounded-3">
              <h2>To be a instructor</h2>
              <p>
                You can become a instructor by registering and start creating
                online courses.
              </p>
            </div>
          </div>
        </div>

        <footer className="pt-3 mt-4 text-muted border-top">
          &copy; 2024 Tim Chen
        </footer>
      </div>
    </main>
  );
};

export default HomeComponent;
