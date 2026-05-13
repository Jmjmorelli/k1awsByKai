import Image from "next/image";
import TopMenuBar from "./components/TopMenuBar";

import leftNail from "../public/leftNails.png";
import rightNail from "../public/rightNails.png";

export default function Home() {
  return (
    <div>

        <TopMenuBar />
        <Image src={leftNail} style={{  transform: "rotate(90deg)", width: "200px"}}  alt="home page with nails posing"/>
        <div style={{ display: "flex", justifyContent: "center", fontWeight: "bold", fontSize: "55px", marginTop: "12rem" }}>
          K1aws By Kai
        </div>
        <div>

        </div>
        <div style={{ display: "flex", alignContent: "center", justifyContent: "center", fontSize: "25px", textAlign: "center", maxWidth: "3" }}>
          <div style={{ width: "33%" }}>Me</div>
          <div style={{ width: "33%" }}>Policies</div>
          <div style={{ width: "33%" }}>Pricing</div>
        </div>

    </div>
  );
}
