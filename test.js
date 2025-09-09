import ZKLib  from 'node-zklib';
import  moment from 'moment-timezone';

const checkInTime = "Tue Apr 01 2025 10:30:33 GMT+0530 (India Standard Time)";
// const da = new Date(checkInTime)
const date = new Date(checkInTime);
// Get the time in 12-hour format with AM/PM
const cumulativeStartTime = "10:00:00 AM";
const cumulativeStartMoment = moment(checkInTime).format('YYYY-MM-DD') + ' ' + cumulativeStartTime;
const result = moment(checkInTime).isAfter(moment(cumulativeStartMoment, 'YYYY-MM-DD hh:mm:ss A'));
console.log('this is reault ',result,cumulativeStartMoment);

// async function  test(){
//   try{
//       let zkInstance = new ZKLib('10.101.0.7', 4370, 5200, 5000);
//       await zkInstance.createSocket();
//         // const attendanceLog = await zkInstance.getUsers();
//         const attendanceLog =  await  zkInstance.getAttendances();

//       //  console.log(attendanceLog);

//         console.log(attendanceLog);
//         zkInstance.disconnect();
   
//   }catch(error){
//       console.log(error);
//   }
// }

// import Zkteco from "zkteco-js";

// const manageZktecoDevice = async () => {
//     const device = new Zkteco("10.101.0.7", 4370, 5200, 5000);

//     try {
//         // Create socket connection to the device
//         await device.createSocket();

//         // Retrieve and log all attendance records
//         const attendanceLogs = await device.getAttendances();
//         console.log(attendanceLogs);

//         // Listen for real-time logs
//         // await device.getRealTimeLogs((realTimeLog) => {
//         //     console.log(realTimeLog)
//         // });

//         console.log("Listening for real-time logs...");
//         console.log(device);

//         await device.getRealTimeLogs((realTimeLog) => {
//           console.log('this device is printing');
//             console.log("Real-Time Log:", realTimeLog);
//         });

//         // Manually disconnect after using real-time logs
//         // await device.disconnect();
//     } catch (error) {
//         console.error("Error:", error);
//     }
// };

// manageZktecoDevice();



// let zkInstance = new ZKLib('10.101.0.7', 4370, 5200, 5000);
//       await zkInstance.createSocket();

//       zkInstance.on('punch',(data)=>{
//         console.log('new punch',data);
//       });

// async function  test(){
//   try{
//       let zkInstance = new ZKLib('10.101.0.7', 4370, 5200, 5000);
//       await zkInstance.createSocket();
//         // const attendanceLog = await zkInstance.getUsers();
//         const attendanceLog =  await  zkInstance.getAttendances();

//       //  console.log(attendanceLog);

//         console.log(attendanceLog);
//         zkInstance.disconnect();
   
//   }catch(error){
//       console.log(error);
//   }
// }


// test();

// import { parse, isWithinInterval ,parseISO,subDays,differenceInSeconds ,isAfter, isBefore, isEqual,addDays } from 'date-fns';
// import  moment from 'moment-timezone';
// import { isSameDay } from 'date-fns';
// import { toZonedTime } from 'date-fns-tz';

// // function isTimeBetween(time3, time1, time2) {
// //   // Parse times into Date objects
// //   const format = 'hh:mm:ss a';
// //   const t1 = parse(time1, format, new Date());
// //   const t2 = parse(time2, format, new Date());
// //   const t3 = parse(time3, format, new Date());

// //   // Check if t3 is between t1 and t2
// //   return isWithinInterval(t3, { start: t1, end: t2 });
// // }

// // // Example usage
// // const time1 = "08:00:00 PM";
// // const time2 = "09:00:00 PM";
// // const time3 = "05:00:00 AM";

// // console.log("Is time3 between time1 and time2?"+new Date(), isTimeBetween(time3, time1, time2));
// // const x= new Date();
// // console.log(x.toISOString().split(/[T]/));

// // const date = new Date("2025-01-16 09:50:34 AM").toLocaleTimeString('en-US', { hour12: true })// Original date
// // const date2 = new Date("2025-01-16 07:06:13 PM").toLocaleTimeString('en-US', { hour12: true })// Original date

// // const dateTime1 = parse("2025-01-16 09:50:34 AM", 'yyyy-MM-dd hh:mm:ss a', new Date());
// // const dateTime2 = parse("2025-01-16 07:06:13 PM", 'yyyy-MM-dd hh:mm:ss a', new Date());

// // const differenceInSecs = differenceInSeconds(dateTime1, dateTime2);

// // const differenceInMilliseconds = new Date("2024-12-20 06:11:56 AM") - new Date("2024-12-19 09:25:50 PM");

// // const differenceInSecondss = Math.floor(differenceInMilliseconds / 1000);
// //     const hours = Math.floor(differenceInSecondss / 3600);
    
// //     const minutes = Math.floor((differenceInSecondss % 3600) / 60);
// //     const totalHours = `${hours}:${minutes}`;
// // // const newDate = subDays(date, 1).toISOString().split(/[T]/)[0]; // Subtract 1 day

// // // const y =new Date("2025-01-16 09:50:34 AM")-new Date("2025-01-16 07:06:13 PM")
// // console.log(totalHours,'ssssss',differenceInMilliseconds);

// const x= moment.utc("2025-01-17T12:56:05.434Z").tz('Asia/Kolkata')
// // const startdate = x.toDate();
// // const startdate = new Date('2025-01-17T12:56:05.434Z');
// // const enddate = new Date().toLocaleTimeString('en-US', { hour12: true });

// // const date1 = parse(startdate, 'hh:mm:ss a', new Date());
// // const date2 = parse(enddate, 'hh:mm:ss a', new Date());

// // if (isBefore(date1, date2)) {
// //   console.log('time1 is earlier than time2');
// // } else if (isAfter(date1, date2)) {
// //   console.log('time1 is later than time2');
// // } else {
// //   console.log('time1 and time2 are the same');
// // }
// console.log(new Date().toLocaleTimeString('en-US', { hour12: true }));
 
// // if(startdate >= enddate){
// // console.log('yes start date is greater');
// // }else{
// //   console.log('no end date is greater');

// // }
// // console.log(x,startdate,'=-=-=-=-=-=-=>',enddate);

// const x = moment.utc("2024-11-07T10:39:04.279Z").tz('Asia/Kolkata').toDate();
// const y = new Date();
// ;
// const g = ['monday','TuesDay','Wednesday','ThursDay','Friday','Saturday'];
// console.log('bbbbbbbbbbbbbb',new Date().toLocaleDateString("en-US",{weekday:"long"}).toLowerCase());
// const todayy = new Date().toLocaleDateString("en-US",{weekday:"long"}).toLowerCase();
// console.log(g.includes(todayy));
// const y = new Date(); // Example date
// const options = { weekday: "long" };
// const dayName = y.toLocaleDateString("en-US", options);
// console.log(dayName); // Output: "Friday"
// await MyModel.findOne().sort({ updatedAt: -1 });

// const date1 = moment.utc("2025-01-21T00:00:00.000+00:00").tz('Asia/Kolkata').format('YYYY-MM-DD');
// const date2 = moment().tz('Asia/Kolkata').format('YYYY-MM-DD');
 
// console.log(date1,date2,date1===date2);

// const momentTime1 = moment('02:00:00 PM', 'hh:mm:ss A');
// const momentTime2 = moment('02:01:00 PM', 'hh:mm:ss A');



// if (momentTime1.isAfter(momentTime2)) {
//   console.log('time1 is greater than time2');
// } else {
//   console.log('time1 is not greater than time2');
// }

// console.log(momentTime1,momentTime2, new Date());


// let daat = new Date("2025-01-22");
// let daaa = new Date("2025-01-22");

// let cc = subDays(daat, 1).toISOString().split(/[T]/)[0];
// let bb = addDays(daat, 1).toISOString().split(/[T]/)[0];

// console.log(daat.toISOString()===daaa.toISOString(),daat.toISOString(),daaa.toISOString(),cc,bb);




// const x= [
//   {"userSn":42667,"deviceUserId":"208","recordTime":"2025-01-02T13:31:18.000Z","ip":"10.101.0.7"}
//   ,{"userSn":42724,"deviceUserId":"208","recordTime":"2025-01-03T04:23:07.000Z","ip":"10.101.0.7"}
//   ,{"userSn":42741,"deviceUserId":"208","recordTime":"2025-01-03T13:57:17.000Z","ip":"10.101.0.7"}
//   ,{"userSn":42795,"deviceUserId":"208","recordTime":"2025-01-06T04:25:38.000Z","ip":"10.101.0.7"}
// ];

// console.log(x.filter((value)=>value.recordTime.includes("2025-01-03")));




// let defaultData= [
//     {"userSn":42667,"deviceUserId":"208","recordTime":"2025-01-02T13:31:18.000Z","ip":"10.101.0.7"}
//     ,{"userSn":42724,"deviceUserId":"208","recordTime":"2025-01-03T04:23:07.000Z","ip":"10.101.0.7"}
//     ,{"userSn":42741,"deviceUserId":"208","recordTime":"2025-01-23T13:57:17.000Z","ip":"10.101.0.7"}
//     ,{"userSn":42795,"deviceUserId":"208","recordTime":"2025-01-23T04:25:38.000Z","ip":"10.101.0.7"}
//   ];
  

// const startDate = new Date("2025-01-23"); // Start date
// const today = new Date(); // Current date

// let modArr =defaultData;
// for(let currentDate = new Date(startDate); currentDate <= today; currentDate=addDays(currentDate, 1)) {
//   const format_today = currentDate.toISOString().split("T")[0];
//   const arr = [];
//    defaultData.find((value)=>{
//        value.recordTime.includes(format_today) && arr.push({"username":'dfdfdf'});
//     })
//     console.log('============defaultData',arr,arr.length);
//     if(arr.length > 0)
//       modArr.push({"userSn":42795,"deviceUserId":"208","recordTime":"2025-01-23T04:25:38.000Z","ip":"10.101.0.7"})
// }
// console.log('value of x sdsd',defaultData);


// let date1 = moment.utc("2025-01-28T00:00:00.000+00:00").tz('Asia/Kolkata').format('YYYY-MM-DD');
// let da2 = moment.utc().tz('Asia/Kolkata').format('YYYY-MM-DD');
// let date1 = new Date("2025-01-28T00:00:00.000+00:00");

// const timeZone = 'Asia/Kolkata';
// const currentDate = toZonedTime(new Date(), timeZone);
// console.log(isSameDay(date1,currentDate));

// const todayDay =moment("2025-01-31T00:33:42.000Z").tz('Asia/Kolkata').toDate();;
// const aa= moment.utc("2025-01-28T09:17:08.784Z").tz('Asia/Kolkata').toDate()
// const r = new Date("2024-12-02T00:00:00Z")
// console.log(todayDay,aa < new Date(todayDay),r );

// const d1 = new Date(new Date("2024-12-01"));
// const d2 = new Date("2024-12-31");

// console.log(d1,d2,d1<d2);

// import {CronJob} from 'cron';


// const job = new CronJob('0 */2 * * * *',async ()=>{
//   console.log('cron job started for  every 1 min....');
// });

// job.start();

// const arr = [];
// const aii =null;
// if(aii){
//   console.log('yessssddsdsd');
// }else{
//   console.log('nonononnno');
// }



// const initialDate = new Date("2025-01-31");
// const x = new Date();


// console.log(initialDate,',',x);
// 1,2,3    ===> length <= 1 || 1,2,3  2,3,4  3,4,5, 4,5,6 5,6,7  6,7,8  7,8,9  ||    7,8,9 ---> length === page

// const arr = [1,2,3,4,5,6,7,8,9];

//  arr.forEach((value,key)=>{
//   const y = 7; const pageno = ++key;
//   let next = y+1;
//   let prev = y-1;
//   if(y < 2){
//     next = y+2;
//     prev = y;
//   }else if(arr.length == y){
//     next = y;
//     prev = y-2;
//   }
//   if(pageno >= prev && pageno <=next){
//     console.log(key);
//   }
// });













