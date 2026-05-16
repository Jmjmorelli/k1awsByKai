import Image from "next/image";
import TopMenuBar from "./components/TopMenuBar";
import SideMenu from "./components/SideMenu";

import leftNail from "../public/leftNails.png";
import rightNail from "../public/rightNails.png";

export default function Home() {
  return (
    <div style={{}}>

      <TopMenuBar />
      <header>
        <SideMenu />
      </header>
      <div className="kailenColors">
        K1aws By Kai
      </div>
      <div>

      </div>
      <div  style={{ display: "flex", flexDirection: "column", marginTop: "8rem", fontSize: "25px", textAlign: "center" }}>
        <div style={{ fontWeight: "bold", height: "14rem", alignSelf: "flex-start", marginLeft: "10vh", color: "#f9d9e0" }}>Me</div>
        <div style={{ fontWeight: "bold", height: "14rem", alignSelf: "flex-end", marginRight: "10vh", color: "#a5476f" }}>Policies</div>
        <div className="subKailenColors" style={{ fontWeight: "bold", height: "14rem", alignSelf: "flex-start", marginLeft: "10vh" }}>Pricing</div>
      </div>

      {/* <div style={{ marginTop: "10rem", background: "linear-gradient(to top, #830e50, #a3496f, #c27992, #dea8b7, #f9d9e0)", height: "5rem"}}>some footer!</div> */}
    </div>
  );
}
