/* eslint-disable react/prop-types */

import Footer from "./Footer";
import Navbar from "./Navbar";

function Layoutt(props) {
  return (
    <div className="layout">
      <header>
        <Navbar />
      </header>
      <main className="main-container">{props.children}</main>
    {/* props.children reprezinta componentele react din interiorul lui Layout din main.jsx */}
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Layoutt;
