import Screen1 from "components/Screen1";
import Screen2 from "components/Screen2";
import Screen3 from "components/Screen3";
import Screen4 from "components/Screen4";
import { navigatorNext } from "helpers/_index";
import React, { useEffect } from "react";
import { useDispatch, useSelector, useState } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

export default () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const page = useSelector((state) => state.navigator);

  useEffect(() => {}, [page]);

  const foot = () => {
    switch (location.pathname.split("/").slice(-1)[0]) {
      case "screen1":
        return (
          <footer>
            <button
              id="back"
              onClick={() => {
                navigate("/workflow/screen1");
              }}
            >
              {`<`} {`Back`}
            </button>
            <button
              id="next"
              onClick={() => {
                navigate("/workflow/screen2");
              }}
            >
              {`Next >`}
            </button>
          </footer>
        );
      case "screen2":
        return (
          <footer>
            <button
              id="back"
              onClick={() => {
                navigate("/workflow/screen1");
              }}
            >
              {`<`} {`Back`}
            </button>
            <button
              id="next"
              onClick={() => {
                navigate("/workflow/screen3");
              }}
            >
              {`Next >`}
            </button>
          </footer>
        );
      case "screen3":
        return (
          <footer>
            <button
              id="back"
              onClick={() => {
                navigate("/workflow/screen2");
              }}
            >
              {`<`} {`Back`}
            </button>
            <button
              id="next"
              onClick={() => {
                navigate("/workflow/screen4");
              }}
            >
              {`Next >`}
            </button>
          </footer>
        );
      case "screen4":
        return (
          <footer>
            <button
              id="back"
              onClick={() => {
                navigate("/workflow/screen3");
              }}
            >
              {`<  Back`}
            </button>
            <button
              id="next"
              onClick={() => {
                navigate("/");
              }}
            >
              Finish
            </button>
          </footer>
        );
    }
  };

  return (
    <div className="ScreenContainer">
      <header>
        <div id="logo">
          <p>
            <strong>De Olde \</strong>
          </p>
          <p>
            <strong>\ Legion of Dishonor</strong>
          </p>
          <p>museum store</p>
        </div>
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          Quit
        </button>
      </header>
      <Routes>
        <Route path="/screen1" element={<Screen1 />} />
        <Route path="/screen2" element={<Screen2 />} />
        <Route path="/screen3" element={<Screen3 />} />
        <Route path="/screen4" element={<Screen4 />} />
      </Routes>
      {foot()}
    </div>
  );
};
