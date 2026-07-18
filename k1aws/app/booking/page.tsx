"use client";
import {Calendar} from "@/components/ui/calendar"
import React, {useEffect} from "react";
import {useState} from "react";

//adidas acid orange

interface Service {
    serviceID: number;
    serviceName: string;
    servicePrice: string;
    serviceDuration: string;
    serviceDescription: string;
}

export default function Booking() {
    const [date, setDate] = useState<Date | undefined>(new Date())

    const [services, setServices] = useState<Service[]>([]);

    useEffect(() => {
        async function getServices() {
            try {
                const response = await fetch("http://localhost:5283/api/services");
                const data: Service[] = await response.json();
                setServices(data);

            } catch (error) {
                console.error("Failed to fetch services:", error);
            }
        }

        getServices();
    }, []);


    // Navigation text
    const [selection1, setSelection1] = useState<string>("");
    const [selection2, setSelection2] = useState<string>("");
    const [selection3, setSelection3] = useState<string>("");
    const [selection4, setSelection4] = useState<string>("");
    const [selection5, setSelection5] = useState<string>("");
    const [selection6, setSelection6] = useState<string>("");
    const [selection7, setSelection7] = useState<string>("");
    const [selection8, setSelection8] = useState<string>("");
    const [selection9, setSelection9] = useState<string>("");


    // Selections for API
    const [isGelX, setIsGelX] = useState<boolean>(false);
    const [isGelOverlay, setIsGelOverlay] = useState<boolean>(false);
    const [soakOff, setSoakOff] = useState<boolean>(false);

    // Card visibility

    const [firstCard, setFirstCard] = useState<boolean>(true);
    const [secondCard, setSecondCard] = useState<boolean>(false);
    const [thirdCard, setThirdCard] = useState<boolean>(false);
    const [fourthCard, setFourthCard] = useState<boolean>(false);

    return (
        <div>
            <span>
                
                <div style={{position: "absolute", left: "50%", transform: "translate(-50%)", marginTop: "4rem"}}
                     className="breadcrumbs text-sm">
                    <ul>
                        {selection1 &&
                            <li><a>{selection1}</a></li>
                        }
                        {selection2 &&
                            <li><a>{selection2}</a></li>
                        }
                        {selection3 &&
                            <li><a>{selection3}</a></li>
                        }
                    </ul>
                    {/*<button onClick={() => {*/}
                    {/*    console.log("isgelx: ", isGelX, "isgelOverlay: ", isGelOverlay);*/}
                    {/*    console.log(firstCard, secondCard, thirdCard);*/}
                    {/*}}> test</button>*/}
                </div>


                {(firstCard) &&
                    <div className="cardGroupCss">
                        <div className="card w-96 bg-base-100 shadow-sm cardCss">
                            <div className="card-body">
                                {/*<span className="badge badge-xs badge-warning">Most Popular</span>*/}
                                <div className="flex justify-between">
                                    <h2 className="text-3xl font-bold">GEL-X</h2>
                                    <span className="text-xl">$35+</span>
                                </div>
                                <ul className="mt-6 flex flex-col gap-2 text-xs">
                                    <li>
                                        ...
                                    </li>

                                </ul>
                                <div className="mt-6">
                                    <button onClick={() => {
                                        setSelection1("Gel X");
                                        setIsGelX(true);
                                        setFirstCard(false);
                                        setSecondCard(true);
                                    }}
                                            className="button-23" style={{width: "100%"}}>Select
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="card w-96 bg-base-100 shadow-sm cardCss">
                            <div className="card-body">
                                {/* <span className="badge badge-xs badge-warning">Most Popular</span> */}
                                <div className="flex justify-between">
                                    <h2 className="text-3xl font-bold">Gel Overlay </h2>
                                    <span className="text-xl">$25+</span>
                                </div>
                                <ul className="mt-6 flex flex-col gap-2 text-xs">
                                    <li>
                                        <span>...</span>
                                    </li>
                                </ul>
                                <div className="mt-6">
                                    <button onClick={() => {
                                        setSelection2("Gel Overlay");
                                        setIsGelOverlay(true);
                                        setFirstCard(false);
                                        setSecondCard(true);

                                    }}
                                            className="button-23" style={{width: "100%"}}>Select
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                }

                <div className="cardGroupCss">
                {(secondCard && isGelX) && services
                    .filter(service => service.serviceName.startsWith("Gel X") && !service.serviceName.includes("Soak"))
                    .map(service => (<div key={service.serviceName}>
                        <div className="card w-96 bg-base-100 shadow-sm cardCss">
                            <div className="card-body">
                                {/*<span className="badge badge-xs badge-warning">Most Popular</span>*/}
                                <div className="flex justify-between">
                                    <h2 className="text-3xl font-bold">{service.serviceName}</h2>
                                    <span className="text-xl">${service.servicePrice}</span>
                                </div>
                                <ul className="mt-6 flex flex-col gap-2 text-xs">
                                    <li>
                                        {service.serviceDescription}
                                    </li>

                                </ul>
                                <div className="mt-6">
                                    <button onClick={() => {
                                        setSelection2(service.serviceName.replace("Gel X", ""));
                                        setSecondCard(false);
                                        setThirdCard(true);
                                    }}
                                            className="button-23" style={{width: "100%"}}>Select
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>))}
                </div>
            </span>

        </div>
    )
}