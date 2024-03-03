// import React from "react";
// import Datepicker from "tailwind-datepicker-react";

// const options = {
//     title: "Demo Title",
//     autoHide: true,
//     todayBtn: false,
//     clearBtn: true,
//     maxDate: new Date("2030-01-01"),
//     minDate: new Date("1950-01-01"),
//     theme: {
//         background: "bg-gray-700 dark:bg-gray-800",
//         todayBtn: "",
//         clearBtn: "",
//         icons: "",
//         text: "",
//         disabledText: "bg-red-500",
//         input: "",
//         inputIcon: "",
//         selected: "",
//     },
//     icons: {
//         // () => ReactElement | JSX.Element
//         prev: () => <span>Previous</span>,
//         next: () => <span>Next</span>,
//     },
//     datepickerClassNames: "top-12",
//     defaultDate: new Date("2022-01-01"),
//     language: "en",
// };

// const CalenderPicker = () => {
//     const [show, setShow] = useState(false);
//     const handleChange = (Date) => {
//         console.log(selectedDate);
//     };
//     const handleClose = (show) => {
//         setShow(state);
//     };

//     return (
//         <div>
//             <Datepicker
//                 options={options}
//                 onChange={handleChange}
//                 show={show}
//                 setShow={handleClose}
//             />
//         </div>
//     );
// };
