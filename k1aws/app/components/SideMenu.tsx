"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { text } from "stream/consumers";
export default function SideMenu() {
    const [open, setOpen] = useState(false);

    return (
        <div>

            <div
                style={{ position: "absolute", right: 0, paddingRight: "1.5rem", color: "red" }}>
                <div className="hamburgers">
                    <label className="hamburger">
                        <input onClick={() => setOpen(prev => !prev)} type="checkbox" />
                        <span style={open ? { backgroundColor: "black" } : { background: "linear-gradient(to bottom, #830e50, #f9d9e0)", backgroundAttachment: "fixed" }} className="bar"></span>
                        <span style={open ? { backgroundColor: "black" } : { background: "linear-gradient(to bottom, #830e50, #f9d9e0)", backgroundAttachment: "fixed" }} className="bar"></span>
                        <span style={open ? { backgroundColor: "black" } : { background: "linear-gradient(to bottom, #830e50, #f9d9e0)", backgroundAttachment: "fixed" }} className="bar"></span>
                    </label>
                </div>
            </div>

            <div className={`menu ${open ? "active" : ""}`}>
                <a style={{ fontWeight: "bold" }} href="#">Home</a>
                <a style={{ fontWeight: "bold" }} href="#">Bookings</a>
                <a style={{ fontWeight: "bold" }} href="#">Gallery</a>
                <a style={{ fontWeight: "bold" }} href="#">Contact</a>
                <a style={{ fontWeight: "bold" }} href="#">Dashboard</a>
                {/* display: flex;
  justify-content: center;
  font-size: 30px;
  font-weight: bold;
  margin-top: 3rem;
  background: linear-gradient(to bottom, #830e50, #f9d9e0);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent; */}


                {/* <span className="" style={{justifyContent: "center", display: "flex", fontFamily: "blostaFont"}}>
                    K1aws By Kai
                    <span className="text-rotate text-3xl duration-3000 ">
                        <div className="justify-items-center">
                            <div className="kailenColorsReverse">DESIGN</div>
                            <div className="kailenColorsReverse">DEVELOP</div>
                            <div className="kailenColorsReverse">DEPLOY</div>
                            <div className="kailenColorsReverse">SCALE</div>
                            <div className="kailenColorsReverse">MAINTAIN</div>
                            <div className="kailenColorsReverse">REPEAT</div>
                        </div>
                    </span>
                </span> */}

                <div className="card">
                    <div className="loader" style={{display: "flex", justifyContent: "center", fontWeight: "bold", color: "#830e50"}}>
                        <p>klaws by</p>
                        <div className="words">
                            <div className="word"></div>
                            <div className="word">KIMORA</div>
                            <div className="word">KAILEN</div>
                            <div className="word">KAYSLAY</div>
                            <div className="word">KK</div>
                        </div>
                    </div>
                </div>



                {/* <div className="kailenColorsReverse">K1aws By Kai
                </div> */}


            </div>


        </div>



    );
}