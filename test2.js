    import ZKLib  from 'node-zklib';
    const zkInstance = new ZKLib('10.101.0.7', 4370, 5200, 5000);
    await zkInstance.createSocket();
    const attendanceLog = await zkInstance.getAttendances();

    console.log(attendanceLog);
    await zkInstance.disconnect();


// import  ZKLib from 'node-zklib';
// import {format } from 'date-fns-tz'
// import { parse } from 'date-fns'
import { parseISO, parse, set } from 'date-fns';
// // Replace with your ZKTeco device's IP and port
// const DEVICE_IP = '10.101.0.7'; // Example IP address of the ZKTeco device
// const DEVICE_PORT = 4370; // Default port for ZKTeco devices
// const DEVICE_PASSWORD=''; // Device admin password (change as necessary)

// const zk = new ZKLib();

// // Function to connect to the device and start listening for events
// async function startListening() {
//   try {
//     // Connect to the ZKTeco device
//     await zk.connect(DEVICE_IP, DEVICE_PORT);
//     console.log(`Connected to device at ${DEVICE_IP}:${DEVICE_PORT}`);

//     // Authenticate with the device (if needed)
//     const auth = await zk.setUserPassword(DEVICE_PASSWORD);
//     if (auth) {
//       console.log('Authentication successful!');
//     } else {
//       console.log('Authentication failed!');
//       return;
//     }

//     // Start listening for real-time attendance events
//     await zk.startFetchingEvents();

//     // Set up event listener to handle attendance events
//     zk.on('attend', (data) => {
//       console.log('Real-time Event:', data);
//       // Process the attendance event data here (e.g., log it, store in DB, etc.)
//     });

//     // Optionally, set up other event listeners for specific events like "error" or "connect"
//     zk.on('error', (error) => {
//       console.error('Error occurred:', error);
//     });

//   } catch (error) {
//     console.error('Error connecting to device:', error);
//   }
// }

// // Start the listener
// startListening();
// const checkInTime = "2025-01-29 07:04:56 PM";
// const InTime = new Date(checkInTime).toLocaleTimeString('en-US', { hour12: true });

// console.log('hexaaaaa',InTime);


// const x = Math.ceil(40/15);

// // const arr = [x];
// const arr = Array(x);


// console.log(arr.fill(1));

// arr.forEach(element => {
//   console.log(element);
// });

// (pagenumber-1) * 15

// 15  (0-14)    

// 15 (15-30)

// 15 (30-45)


// const a = '07-02-2025';
// const b = '2025-02-07';
// console.log(new Date(a));
// console.log(new Date())


// Given date
// const givenDate = new Date("Wed March 19 2025 11:05:34 GMT+0530 (India Standard Time)");

// // First date of the month
// const startDate = new Date(givenDate.getFullYear(), givenDate.getMonth(), 1);

// // Last date of the month
// const endDate = new Date(givenDate.getFullYear(), givenDate.getMonth() + 1, 0);

// // Format the dates as YYYY-MM-DD
// const formatDate = (date) => {
//   const year = date.getFullYear();
//   const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero if needed
//   const day = String(date.getDate()).padStart(2, '0'); // Add leading zero if needed
//   return `${year}-${month}-${day}`;
// };

// // Output
// console.log("Start Date -", formatDate(new Date("Wed March 19 2025 11:05:34 GMT+0530 (India Standard Time)")),endDate); // Start Date - 2025-02-01

// console.log("Start Date -", formatDate(startDate)); // Start Date - 2025-02-01
// console.log("End Date -", formatDate(endDate)); // End Date - 2025-02-28


// const givenDate = new Date("Wed Sept 19 2025 11:05:34 GMT+0530 (India Standard Time)");

// const startDate = new Date(givenDate.getFullYear(), givenDate.getMonth(), 1);
// const endDate = new Date(givenDate.getFullYear(), givenDate.getMonth() + 1, 0);

// const x= startDate.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
// const y= endDate.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
// // console.log(x,y)
// // console.log(format(x, 'yyyy-MM-dd hh:mm:ss a', { timeZone: "Asia/Kolkata" }));
// // console.log(format(y, 'yyyy-MM-dd hh:mm:ss a', { timeZone: "Asia/Kolkata" }));

// const date = new Date(x);
// const p= format(date, 'yyyy-dd-MM');  // Using date-fns format function
// console.log(p);






// The 24-hour time string (e.g., "14:30")
// const time24 = "9:53:54";

// // Parse the time string into a Date object (using a dummy date)
// const parsedDate = parse(time24, 'HH:mm:ss', new Date());

// // Format the Date object into 12-hour format with AM/PM
// const time12hr = format(parsedDate, 'hh:mm:ss a');

// console.log(time12hr);

// const datess = new Date("2025-01-18T00:00:00.000+00:00");

// console.log(datess);

// const parsedDate = parseISO("2025-01-07T00:00:00.000Z");
//   const parsedTime = parse("9:52:49 AM", 'h:mm:ss a', new Date());
//   const combinedDateTime = set(parsedDate, {
//     hours: parsedTime.getHours(),
//     minutes: parsedTime.getMinutes(),
//     seconds: parsedTime.getSeconds(),
//   });
//   console.log('combinedDateTimev',combinedDateTime);



// Debounce Function 

// const abc= ()=>console.log(`this is abc function.......`);

// const debounce = (func,sec)=>{
//   let timeout;

//   return function(){
//     console.log('this is returnens function');
//     timeout = setTimeout(()=>{
//       func()
//     },sec);
//   }
// }
// function fun(){
//   const test = setTimeout(()=>{
//     abc()
//   },1000);
//   console.log(test);
// }


// const debounced = debounce(abc,2000);
// console.log(fun());

// function collection(a,b){
 
//   console.log(`this is colon function with two params ${a} and ${b} if you need the self then ${this.name}`);
// }

// collection.apply({name:'hiraku'},'tom','jerry');
// collection('tom','hanks');














// import ZKLib  from 'node-zklib';

// const test = async () => {
//   let zkInstance = new ZKLib('10.101.0.7', 4370, 5200, 10000);
//   try {
//       // Create socket to machine
      
        
//       await zkInstance.createSocket();
//       // const attendanceLogs = await zkInstance.getAttendances();
//       //   console.log(attendanceLogs);

//       await zkInstance.getRealTimeLogs((data)=>{
//         // do something when some checkin
//         console.log(data)
//     })
//   }catch(error){
//     console.log('Error Log'+error);
//   }
// }

// test();


