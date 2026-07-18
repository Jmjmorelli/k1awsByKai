"use client";
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
    const [nailLength, setNailLength] = useState<string>("");
    const [nailShape, setNailShape] = useState<string>("");

    // Card visibility

    const [firstCard, setFirstCard] = useState<boolean>(true);
    const [secondCard, setSecondCard] = useState<boolean>(false);
    const [thirdCard, setThirdCard] = useState<boolean>(false);
    const [fourthCard, setFourthCard] = useState<boolean>(false);
    const [calendarCard, setCalendarCard] = useState<boolean>(false);

    return (
        <div>
            <span>
                
                <div style={{position: "absolute", left: "50%", transform: "translate(-50%)", marginTop: "4rem"}}
                     className="breadcrumbs text-sm">
                    <ul>

                         {/*TODO: Create navigation clickable backwards*/}
                        {selection1 &&
                            <li><a onClick={() => {
                                setIsGelX(false);
                                setIsGelOverlay(false);
                                setFirstCard(true);
                                setSecondCard(false);
                                setThirdCard(false);
                                setFourthCard(false);
                                setSelection1("");
                                setSelection2("");
                                setSelection3("");
                                setSelection4("");
                            }}>{selection1}</a></li>
                        }
                        {selection2 &&
                            <li><a onClick={() => {
                                setSecondCard(true);
                                setThirdCard(false);
                                setFourthCard(false);
                                setSelection2("");
                                setSelection3("");
                                setSelection4("");
                            }}>{selection2}</a></li>
                        }
                        {selection3 &&
                            <li><a onClick={() => {
                                setThirdCard(true);
                                setFourthCard(false);
                                setSelection3("");
                                setSelection4("");
                            }}>{selection3}</a></li>
                        }
                        {selection4 &&
                            <li><a onClick={() => {
                                setFourthCard(true);
                                setCalendarCard(false);
                                setSelection4("");

                            }}>{selection4}</a></li>
                        }
                    </ul>
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
                                        setSelection1("Gel Overlay");
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

                {(secondCard && isGelX) &&
                    <div className="cardGroupCss">
                        { services
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
                }

                {(secondCard && isGelOverlay) &&
                    <div className="cardGroupCss">
                        { services
                            .filter(service => service.serviceName.startsWith("Gel Overlay") && !service.serviceName.includes("Removal"))
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
                                                if (service.serviceName === "Gel Overlay") {setSelection2("Gel Overlay");}
                                                else {setSelection2(service.serviceName.replace("Gel Overlay", ""));}
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
                }

                {(thirdCard) &&
                    <div className="cardGroupCss">
                        Please select a length
                        <div className="card w-96 bg-base-100 shadow-sm cardCss">
                            <div className="card-body">
                                {/*<span className="badge badge-xs badge-warning">Most Popular</span>*/}
                                <div className="flex justify-between">
                                    <h2 className="text-3xl font-bold">Short</h2>
                                    <span className="text-xl"></span>
                                </div>
                                <ul className="mt-6 flex flex-col gap-2 text-xs">
                                    <li>

                                    </li>

                                </ul>
                                <div className="mt-6">
                                    <button onClick={() => {
                                        setSelection3("Short");
                                        setThirdCard(false);
                                        setFourthCard(true);
                                        setNailLength("Short");
                                    }}
                                            className="button-23" style={{width: "100%"}}>Select
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="card w-96 bg-base-100 shadow-sm cardCss">
                            <div className="card-body">
                                {/*<span className="badge badge-xs badge-warning">Most Popular</span>*/}
                                <div className="flex justify-between">
                                    <h2 className="text-3xl font-bold">Medium</h2>
                                    <span className="text-xl"></span>
                                </div>
                                <ul className="mt-6 flex flex-col gap-2 text-xs">
                                    <li>

                                    </li>

                                </ul>
                                <div className="mt-6">
                                    <button onClick={() => {
                                        setSelection3("Medium");
                                        setThirdCard(false);
                                        setFourthCard(true);
                                        setNailLength("Medium");

                                    }}
                                            className="button-23" style={{width: "100%"}}>Select
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="card w-96 bg-base-100 shadow-sm cardCss">
                            <div className="card-body">
                                {/*<span className="badge badge-xs badge-warning">Most Popular</span>*/}
                                <div className="flex justify-between">
                                    <h2 className="text-3xl font-bold">Long</h2>
                                    <span className="text-xl"></span>
                                </div>
                                <ul className="mt-6 flex flex-col gap-2 text-xs">
                                    <li>

                                    </li>

                                </ul>
                                <div className="mt-6">
                                    <button onClick={() => {
                                        setSelection3("Long");
                                        setThirdCard(false);
                                        setFourthCard(true);
                                        setNailLength("Long");
                                    }}
                                            className="button-23" style={{width: "100%"}}>Select
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                }

                {(fourthCard) &&
                    <div className="cardGroupCss">
                        Please select a Shape
                        <div className="card w-96 bg-base-100 shadow-sm cardCss">
                            <div className="card-body">
                                {/*<span className="badge badge-xs badge-warning">Most Popular</span>*/}
                                <div className="flex justify-between">
                                    <h2 className="text-3xl font-bold">Almond</h2>
                                    <span className="text-xl"></span>
                                </div>
                                <ul className="mt-6 flex flex-col gap-2 text-xs">
                                    <li>

                                    </li>

                                </ul>
                                <div className="mt-6">
                                    <button onClick={() => {
                                        setSelection4("Almond");
                                        setFourthCard(false);
                                        setCalendarCard(true);
                                        setNailShape("Almond");
                                    }}
                                            className="button-23" style={{width: "100%"}}>Select
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="card w-96 bg-base-100 shadow-sm cardCss">
                            <div className="card-body">
                                {/*<span className="badge badge-xs badge-warning">Most Popular</span>*/}
                                <div className="flex justify-between">
                                    <h2 className="text-3xl font-bold">Stiletto</h2>
                                    <span className="text-xl"></span>
                                </div>
                                <ul className="mt-6 flex flex-col gap-2 text-xs">
                                    <li>

                                    </li>

                                </ul>
                                <div className="mt-6">
                                    <button onClick={() => {
                                        setSelection4("Stiletto");
                                        setFourthCard(false);
                                        setCalendarCard(true);
                                        setNailLength("Stiletto");

                                    }}
                                            className="button-23" style={{width: "100%"}}>Select
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="card w-96 bg-base-100 shadow-sm cardCss">
                            <div className="card-body">
                                {/*<span className="badge badge-xs badge-warning">Most Popular</span>*/}
                                <div className="flex justify-between">
                                    <h2 className="text-3xl font-bold">Square</h2>
                                    <span className="text-xl"></span>
                                </div>
                                <ul className="mt-6 flex flex-col gap-2 text-xs">
                                    <li>

                                    </li>

                                </ul>
                                <div className="mt-6">
                                    <button onClick={() => {
                                        setSelection4("Square");
                                        setFourthCard(false);
                                        setCalendarCard(true);
                                        setNailLength("Square");
                                    }}
                                            className="button-23" style={{width: "100%"}}>Select
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                }

                {(calendarCard) &&
                    <div className="cardGroupCss">
                        <div className="card w-96 bg-base-100 shadow-sm cardCss">
                            <div className="card-body">
                                Calendar Card
                                <ul className="mt-6 flex flex-col gap-2 text-xs">
                                    <li>
                                        ...
                                    </li>

                                </ul>
                                <div className="mt-6">
                                    <button onClick={() => {
                                    }}
                                            className="button-23" style={{width: "100%"}}>Proceed
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                }




            </span>

        </div>
    )
}