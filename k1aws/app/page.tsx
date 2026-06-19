"use client";
import Image from "next/image";
import TopMenuBar from "./components/TopMenuBar";
import SideMenu from "./components/SideMenu";

import leftNail from "../public/leftNails.png";
import rightNail from "../public/rightNails.png";
import kai from "../public/k1awsProfileFinal.png";
import { relative } from "path";
import { useState } from "react";
export default function Home() {


  const [sideMenu, setSideMenu] = useState(false);
  

  return (
    <div>

      <TopMenuBar />
      <header>
        <SideMenu />
      </header>
      <div className="kailenColors">
        K1aws By Kai
      </div>
      <div>
        <div className="description" style={{ color: "#a3496f" }}>
          GEL X | HARD GEL | GEL POLISH | SOFT GEL
        </div>
        <div style={{ justifyContent: "center", display: "flex", color: "#f9d9e0", gap: "5rem", paddingTop: "2rem" }}>
          <div style={{  marginTop: "-50px" }}>
            <Image style={{zIndex: "1"}} src={kai} width={150} loading="eager"
              height={100} alt="Face" />
          </div>

          <div className="description" style={{ textAlign: "center", width: "40vw", marginTop: "10px", marginLeft: "-30px", background: "transparent", color: "#a3496f" }}>
            Welcome to K1aws! I’m Kailen and I’m a student at University of Central Florida and I’ve been doing nails for about 6 years.
            I love creating cute, quality sets while keeping my prices affordable
            :)
          </div>
        </div>
        <div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", color: "#a3496f", fontSize: "30px", marginTop: "2rem", fontWeight: "bold" }}>
          Policies
        </div>
        <div className="description" style={{ display: "flex", justifyContent: "center", gap: "1rem", padding: "1rem" }}>
          <div style={{ width: "33%", textAlign: "center", border: "2px solid #830e50", height: "15rem", fontWeight: "300", color: "#a3496f"}} >
            DEPOSIT
            <div style={{ display: "flex", justifyContent: "center" }}>
              <svg viewBox="0 0 64 64" width={"42"} xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#a3496f"><g id="SVGRepo_bgCarrier"></g><g id="SVGRepo_tracerCarrier" ></g><g id="SVGRepo_iconCarrier"><circle cx="32" cy="32" r="24"></circle><polyline points="40 44 32 32 32 16"></polyline></g></svg>
            </div>
            <p style={{ color: "#49032b", fontWeight: "300", padding: ".5rem" }}>$10 deposit to secure your appointment, you will receive an email upon confirmation</p>
          </div>
          <div style={{ width: "33%", textAlign: "center", border: "2px solid #830e50", height: "15rem", fontWeight: "300", color: "#a3496f" }}>
            LATE POLICY
            <div style={{ display: "flex", justifyContent: "center" }}>
              <svg viewBox="-0.5 0 25 25" width={"42"} fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12.7003 17.1099V18.22C12.7003 18.308 12.6829 18.395 12.6492 18.4763C12.6156 18.5576 12.5662 18.6316 12.504 18.6938C12.4418 18.7561 12.3679 18.8052 12.2867 18.8389C12.2054 18.8725 12.1182 18.8899 12.0302 18.8899C11.9423 18.8899 11.8551 18.8725 11.7738 18.8389C11.6925 18.8052 11.6187 18.7561 11.5565 18.6938C11.4943 18.6316 11.4449 18.5576 11.4113 18.4763C11.3776 18.395 11.3602 18.308 11.3602 18.22V17.0801C10.9165 17.0072 10.4917 16.8468 10.1106 16.6082C9.72943 16.3695 9.39958 16.0573 9.14023 15.6899C9.04577 15.57 8.99311 15.4226 8.99023 15.27C8.99148 15.1842 9.00997 15.0995 9.04459 15.021C9.0792 14.9425 9.12927 14.8718 9.19177 14.813C9.25428 14.7542 9.32794 14.7087 9.40842 14.679C9.4889 14.6492 9.57455 14.6359 9.66025 14.6399C9.74504 14.6401 9.82883 14.6582 9.90631 14.6926C9.98379 14.7271 10.0532 14.7773 10.1102 14.8401C10.4326 15.2576 10.8657 15.5763 11.3602 15.76V13.21C10.0302 12.69 9.36023 11.9099 9.36023 10.8999C9.38027 10.3592 9.5928 9.84343 9.9595 9.44556C10.3262 9.04769 10.8229 8.79397 11.3602 8.72998V7.62988C11.3602 7.5419 11.3776 7.45482 11.4113 7.37354C11.4449 7.29225 11.4943 7.21847 11.5565 7.15625C11.6187 7.09403 11.6925 7.04466 11.7738 7.01099C11.8551 6.97732 11.9423 6.95996 12.0302 6.95996C12.1182 6.95996 12.2054 6.97732 12.2867 7.01099C12.3679 7.04466 12.4418 7.09403 12.504 7.15625C12.5662 7.21847 12.6156 7.29225 12.6492 7.37354C12.6829 7.45482 12.7003 7.5419 12.7003 7.62988V8.71997C13.0724 8.77828 13.4289 8.91103 13.7485 9.11035C14.0681 9.30967 14.3442 9.57137 14.5602 9.87988C14.6555 9.99235 14.7117 10.1329 14.7202 10.28C14.7229 10.3662 14.7084 10.4519 14.6776 10.5325C14.6467 10.613 14.6002 10.6867 14.5406 10.749C14.481 10.8114 14.4096 10.8613 14.3306 10.8958C14.2516 10.9303 14.1665 10.9487 14.0802 10.95C13.99 10.9475 13.9013 10.9257 13.8202 10.886C13.7391 10.8463 13.6675 10.7897 13.6102 10.72C13.3718 10.4221 13.0575 10.1942 12.7003 10.0601V12.3101L12.9503 12.4099C14.2203 12.9099 15.0103 13.63 15.0103 14.77C14.9954 15.3808 14.7481 15.9629 14.3189 16.3977C13.8897 16.8325 13.3108 17.0871 12.7003 17.1099ZM11.3602 11.73V10.0999C11.1988 10.1584 11.0599 10.2662 10.963 10.408C10.8662 10.5497 10.8162 10.7183 10.8203 10.8899C10.8173 11.0676 10.8669 11.2424 10.963 11.3918C11.0591 11.5413 11.1973 11.6589 11.3602 11.73ZM13.5502 14.8C13.5502 14.32 13.2203 14.03 12.7003 13.8V15.8C12.9387 15.7639 13.1561 15.6427 13.3123 15.459C13.4685 15.2752 13.553 15.0412 13.5502 14.8Z" fill="#a3496f"></path> <path d="M18 3.96997H6C4.93913 3.96997 3.92172 4.39146 3.17157 5.1416C2.42142 5.89175 2 6.9091 2 7.96997V17.97C2 19.0308 2.42142 20.0482 3.17157 20.7983C3.92172 21.5485 4.93913 21.97 6 21.97H18C19.0609 21.97 20.0783 21.5485 20.8284 20.7983C21.5786 20.0482 22 19.0308 22 17.97V7.96997C22 6.9091 21.5786 5.89175 20.8284 5.1416C20.0783 4.39146 19.0609 3.96997 18 3.96997Z" stroke="#a3496f" strokeWidth=".5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>            </div>
            <p className="description" style={{ color: "#49032b", padding: ".5rem" }}>15 minute late policy, anything longer the appointment will be cancelled</p>
          </div>
          <div style={{ width: "33%", textAlign: "center", border: "2px solid #830e50", height: "15rem", fontWeight: "300", color: "#a3496f" }}>
            PAYMENT
            <div style={{ display: "flex", justifyContent: "center" }}>
              <svg fill="#a3496f" viewBox="0 0 32 32" width={"42"} version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>credit-card-front</title> <path d="M28 5.25h-24c-1.518 0.002-2.748 1.232-2.75 2.75v16c0.002 1.518 1.232 2.748 2.75 2.75h24c1.518-0.002 2.748-1.232 2.75-2.75v-16c-0.002-1.518-1.232-2.748-2.75-2.75h-0zM29.25 24c-0.001 0.69-0.56 1.249-1.25 1.25h-24c-0.69-0.001-1.249-0.56-1.25-1.25v-16c0.001-0.69 0.56-1.249 1.25-1.25h24c0.69 0.001 1.249 0.56 1.25 1.25v0zM10 21.25h-4c-0.414 0-0.75 0.336-0.75 0.75s0.336 0.75 0.75 0.75v0h4c0.414 0 0.75-0.336 0.75-0.75s-0.336-0.75-0.75-0.75v0zM20 21.25h-6c-0.414 0-0.75 0.336-0.75 0.75s0.336 0.75 0.75 0.75v0h6c0.414 0 0.75-0.336 0.75-0.75s-0.336-0.75-0.75-0.75v0zM24 17.25h-18c-0.414 0-0.75 0.336-0.75 0.75s0.336 0.75 0.75 0.75v0h18c0.414 0 0.75-0.336 0.75-0.75s-0.336-0.75-0.75-0.75v0zM26 9.25h-6c-0.414 0-0.75 0.336-0.75 0.75v0 4c0 0.414 0.336 0.75 0.75 0.75h6c0.414-0 0.75-0.336 0.75-0.75v0-4c-0-0.414-0.336-0.75-0.75-0.75v0zM25.25 13.25h-4.5v-2.5h4.5z"></path> </g></svg>
            </div>
            <p className="description" style={{ color: "#49032b" }}>deposits and tings</p>
          </div>

        </div>

        {/* <div className="description" style={{alignSelf: "flex-end"}}>
wewe
    </div> */}
      </div>
    

      <div style={{ display: "flex", fontSize: "25px", textAlign: "center", marginTop: "1rem", justifyContent: "center", marginBottom: "5rem" }}>
        <div className="button-23">book</div>

      </div>
      {/* <div style={{ marginTop: "10rem", background: "linear-gradient(to top, #830e50, #a3496f, #c27992, #dea8b7, #f9d9e0)", height: "5rem"}}>some footer!</div> */}
    </div>
  );
}
