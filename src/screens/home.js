
import React, { useState, useEffect, useRef, useCallback, } from "react";
import {
    FacebookShareButton,
    TwitterShareButton,
    LinkedinShareButton,
    FacebookIcon, 
    TwitterIcon,
    LinkedinIcon,
} from 'react-share';



import html2pdf from 'html2pdf.js';

import jsPDF from 'jspdf';

import {Switch, FormControlLabel, Container, TextField, Typography, Box, Grid, Checkbox, Button,  } from '@mui/material';

    import {
        Dialog,
        DialogTitle,
        DialogContent,
        DialogActions,
        Alert
      } from '@mui/material';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import NameArea from "../Components/Inputs/NameAreaInputs";
import SponsorInformation from "../Components/Inputs/sponsorinformation";
import PersonalInfo from "../Components/Outputs/PersonalInfo";
import EducationInputs from "../Components/Inputs/EducationInputs";
import EducationInfo from "../Components/Outputs/educationInfo";
import CareerInputs from "../Components/Inputs/CareerInputs";
import CareerInfo from "../Components/Outputs/CareerInfo";
import ProjectInputs from "../Components/Inputs/ProjectInputs";
import ProjectInfo from "../Components/Outputs/ProjectInfo";
import SkillsInput from "../Components/Inputs/SkillsInput";
import SkillInfo from "../Components/Outputs/SkillInfo";
import ReferenceInput from "../Components/Inputs/ReferenceInput";
import ReferenceInfo from "../Components/Outputs/ReferenceInfo";
import DocumentStyle from "../Components/DocumentStyle";
import axios from "axios";
import goldagent from "../images/goldagent.jpeg" 
import hudud from "../image_placeholder/hudud.jpeg"
import skywaylogo from "../image_placeholder/skywaylogo.jpeg"
import demoimage from "../image_placeholder/demoimage.jpg"
import barakaimg from "../image_placeholder/barakaimg.jpeg"
import wasitimg from "../image_placeholder/wasitimg.jpeg"
import myImage from '../images/two.png'; 
import bodyimg from "../images/images.jpeg"
import assawsan from "../image_placeholder/assawsan.jpeg"
import imagePlaceholder from "../image_placeholder/download.png"
import ouragentlogo from "../images/ouragentlogo.jpeg"
import Header from "../screens/header"
import VidoUploaded from "../image_placeholder/videoUploaded.jpg"
import './homestyle.css'; 
// import { FormControl, useFormControlContext } from '@mui/base/FormControl';
// import { Input, inputClasses } from '@mui/base/Input';
// import { styled } from '@mui/system';
// import clsx from 'clsx';

// import {
    
    
//   } from '@mui/material';

import Barcode from 'react-barcode';
import smallapplicantimage from "../image_placeholder/smallapplicantimage.jpeg"
import saudiforeignaffairslogo from "../image_placeholder/saudiforeignaffairslogo.png"


import { useDropzone } from 'react-dropzone';
import Tesseract from 'tesseract.js';


import fullbodyapplicantimage from "../image_placeholder/fullbodyapplicantimage.jpeg"
import phoneIcon from "../image_placeholder/phoneIcon.png"
import EmailIcon from "../image_placeholder/emailIcon.png"
import AddressIcon from "../image_placeholder/addressIcon.png"

import KaanAlRiyadhHeaderImg from "../image_placeholder/KaanAlRiyadh.png"

const Home = () => {

  const [toggleState, setToggleState] = useState(false);

//   const onInputChangeforpassportimage = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//         const reader = new FileReader();
//         reader.onloadend = () => {
//             setApplicantPassportImagePreview(reader.result);
//         };
//         reader.readAsDataURL(file);
//     }
// };

const handleToggleChange = (event) => {
    setToggleState(event.target.checked);
};


const agentName = localStorage.getItem('userdata');

    const [passportData, setPassportData] = useState({
        name: '',
        surname: '',
        nationality: '',
        age: '',
        passportNumber: '',
        placeOfBirth: '',
        birthDate: ''
      });

      const initialPersonalInfo = {emptyfield: true, name: '', middleName: "", familyName: "", email: '', phone: '', about: '', surname: "", placeOfBirth: "", passportNo: "",passportIssuePlace: "", nationality: "ETHIOPIA", maritalStatus: "", numberOfChildren: "", religion: "", weight: "", height: "", educationAttainment: "", postAppliedFor: "", contractPeriod: "2", arabicDegree: "", englishDegree: "", ownPhoneNumber: "", contactPhoneNumber: "", monthlysalarySaudi: "", monthlysalaryJordan: "", idno: "", sex: "", visaNo: "", passportType: "", placeOfIssue: "", emptyfield: false, dateOfBirth: "", age:"", country: "", position: "", period: "", applicationNo: ""}
      const initialSponsorInfo = {visaNo: "", sponsorId: "", sponsorAdress: "", sponsorCity: "", nationalId: "", email: "", sponsorName: "", sponsorPhone: "", agent: "", sponsorArabic: '', visaType: "", fileNo: "", wakala: "", signedUp: "", biometricId: "", contract: "2", stickerVisa: "", currentNationality: "Ethiopia", laborId: "", sponsorInformationEmptyfield: false, destination: ""}
    const [personalInfo, setPersonalInfo] = useState(initialPersonalInfo);
    const [sponsorInformation, setSponsorInfo] = useState(initialSponsorInfo);
    const [educationInfo, setEducationInfo] = useState({ institute: [{ school: '', from: '', to: '', grade: '', areaStudy: '', overview: '' }] });
    const [careerInfo, setCareerInfo] = useState({ career: [{ title: '', company: '', from: '', to: '', overview: '' }] });
    // const initialProjectInfo = {
    //     project: [{ name: '', link: '', overview: '' }]
    //   };
    
      const [projectInfo, setProjectInfo] = useState({project: [{ name: '', link: '', overview: '', from: "", to: "", cleaning: "", laundary: "", ironingclothes: "", babycare: "", childerncare: "", careoftheelderly: "",  cooking: "", arabicCooking: "", sewingClothes: "", homeNursing: "", childrens: "", drivingCars: "", manicuring: "", arabic: "", english: ""}]});
    const [skillInfo, setSkillInfo] = useState({ skills: [''] });
    const [referenceInfo, setReferenceInfo] = useState({ reference: [{ name: '', email: '', phone: '' }] });
    const [cvitem, setCvitem] = useState([]);
    const [image, setImage] = useState(null);
    const [allImage, setAllImage] = useState(null);
    const [passportimage, setPassportimage] = useState(null)
    const [passportallimage, setPassportallimage] = useState(null) 
    const [applicantpassportimage, setApplicantPassportimage] = useState(null)
    const [applicantpassportallimage, setApplicantPassportallimage] = useState(null)
    const [fileName, setFileName] = useState("No file chosen fyet");
    const [pfileName, setPFileName] = useState("No file chosen fyet");
    const [applicantPassportfileName, setApplicantPassportFileName] = useState("No file chosen fyet");
    const fileInputRef = useRef(null);
    const pfileInputRef = useRef(null);
    const applicantFileInputRef = useRef(null)
    const [errorMessage, setErrorMessage] = useState('');


    const [validationErrors, setValidationErrors] = useState({});

    const [video, setVideo] = useState(null)
    const [videoPreview, setvideoPreview] = useState(null);
    const videofileInputRef = useRef(null);

    const [imageforpersonalimage, setImageforpersonalimage] = useState(null);
    const [imageforfullbodyimage, setImageforfullbodyimage] = useState(null);
    const [imageforpassportimage, setImageforpassportimage] = useState(null)
    


  const [applicantpersonalimagePreview, setApplicantpersonalimagePreview] = useState(null);
  const [applicantfullbodyimagePreview, setApplicantfullbodyimageimagePreview] = useState(null);
  const [applicantpassportimagePreview, setApplicantpassportimagePreview] = useState(null);


  const applicantpersonalimagefileInputRef = useRef(null);
  const applicantfullbodyimagefileInputRef = useRef(null);
  const applicantpassportimagefileInputRef = useRef(null);


  const [showModal, setShowModal] = useState(false);
  const [showsubmitModal, setShowsubmitModal] = useState(false);


    const [salaries, setSalaries] = useState({
      saudi: '',
      jordan: ''
  });


  const [checkPassportdata, setCheckPassportdata] = useState({
    firstName: '',
    MiddleName: ''
});

const [isInputFocused, setIsInputFocused] = useState(false);




  const handleClearAll = () => {
    // setPersonalInfo(initialPersonalInfo);
    // setSponsorInfo(initialSponsorInfo);
    // setProjectInfo(initialProjectInfo)
    // setDob('');
    // setAge('');
    // setExpCheck({
    //   exp1: true,
    //   exp2: true,
    //   exp3: true,
    //   exp4: false,
    //   exp5: true,
    //   all: false,
    // });
    window.location.reload();
  };

  // Effect to set default values if projectInfo is not empty
  useEffect(() => {
      if (projectInfo.project.length > 0 && projectInfo.project[0].name) {
          setSalaries({
              saudi: '1200',
              jordan: '275'
          });
      } else {
        setSalaries({
            saudi: '1000',
            jordan: '250'
        });
      }
  }, [projectInfo]);

  // Handle changes in the input fields
  const handleChange = (event) => {
      const { name, value } = event.target;
      setSalaries({
          ...salaries,
          [name]: value
      });
  };

    const [dob, setDob] = useState('');
  const [age, setAge] = useState('');

  const [styles, setStyles] = useState({
    styleOne: false,
    styleTwo: false,
    styleThree: false,
    styleFour: false,

    kaanCvStyle: false,

    QimamCvStyle: false,

    // styleFive: false,
    all: false,
  });


  const [expcheck, setExpCheck] = useState({
    exp1: true,
    exp2: true,
    exp3: true,
    exp4: false,
    exp5: true,

    childerncare: false,
    ironingclothes: false,


    all: false,
  });

  const handleExpChange = (event) => {
    const { name, checked } = event.target;

    // If "All" checkbox is checked, set all styles to true
    if (name === 'all') {
        setExpCheck({
        exp1: checked,
        exp2: checked,
        exp3: checked,
        exp4: checked,
        exp5: checked,

        childerncare: checked,
        ironingclothes: checked,
        all: checked,
      });
    } else {
      // If any style is unchecked, uncheck "All"
      if (checked) {
        setExpCheck((prev) => ({ ...prev, [name]: checked }));
      } else {
        setExpCheck((prev) => ({ ...prev, [name]: checked, all: false }));
      }
    }
  };

  const [dateOfIssue, setDateOfIssue] = useState('');
  const [dateOfExpiry, setDateOfExpiry] = useState('');
  const [expiryError, setExpiryError] = useState('');


  const today = new Date();
  // Format the date as MM/DD/YYYY
  const formattedTodayDate = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;




   // Get today's date
  //  const today = new Date();

   // Define arrays for day and month names
   const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
   const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
 
   // Get the required date parts
   const dayName = dayNames[today.getDay()];
   const monthName = monthNames[today.getMonth()];
   const dayNumber = today.getDate();
   const year = today.getFullYear();



//   useEffect(() => {
//     // Automatically set Date of Expiry to 5 years after Date of Issue

//     if(dateOfExpiry.length < 2) {
//     if (dateOfIssue) {
//         const issueDate = new Date(dateOfIssue);
//         const expiryDate = new Date(issueDate.setFullYear(issueDate.getFullYear() + 5));
//         setDateOfExpiry(expiryDate.toISOString().split('T')[0]); // Format as YYYY-MM-DD

//         // Check if expiry date has passed
//         if (expiryDate < new Date()) {
//             setExpiryError('The expiry date has passed.');
//         } else {
//             setExpiryError(''); // Clear error if valid
//         }
//     } else {
//         setDateOfExpiry('');
//         setExpiryError(''); // Clear error if no issue date is entered
//     }
// } 
// }, [dateOfIssue]);


useEffect(() => {
    // Automatically set Date of Expiry to 5 years and 1 day after Date of Issue

    if (dateOfIssue) {
        const issueDate = new Date(dateOfIssue);
        const expiryDate = new Date(issueDate.setFullYear(issueDate.getFullYear() + 5));
        expiryDate.setDate(expiryDate.getDate() - 1); // Reduce by 1 day

        setDateOfExpiry(expiryDate.toISOString().split('T')[0]); // Format as YYYY-MM-DD

        // Check if expiry date has passed
        if (expiryDate < new Date()) {
            setExpiryError('The expiry date has passed.');
        } else {
            setExpiryError(''); // Clear error if valid
        }
    } else {
        setDateOfExpiry('');
        setExpiryError(''); // Clear error if no issue date is entered
    }
}, [dateOfIssue]);


useEffect(() => {
    // Automatically set Date of Issue to 5 years and 1 day after Date of Expiry
      if(dateOfIssue.length < 2){
    if (dateOfExpiry) {
        const expiryDate = new Date(dateOfExpiry);
        const issueDate = new Date(expiryDate);
        issueDate.setFullYear(issueDate.getFullYear() - 5); // Increase by 5 years
        issueDate.setDate(issueDate.getDate() + 1); // Increase by 1 day

        setDateOfIssue(issueDate.toISOString().split('T')[0]); // Format as YYYY-MM-DD
    } else {
        setDateOfIssue(''); // Clear Date of Issue if no expiry date is entered
    }
}
}, [dateOfExpiry]);
//   const calculateAge = (dob) => {
//     const birthDate = new Date(dob);
//     const today = new Date();
//     let age = today.getFullYear() - birthDate.getFullYear();
//     const monthDiff = today.getMonth() - birthDate.getMonth();

//     if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
//       age -= 1;
//     }
//     return age;
//   };

const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age -= 1;
    }
    return age;
  };

//   useEffect(() => {
//     if (dob) {
//       const calculatedAge = calculateAge(dob);
//       setAge(calculatedAge);
//     } else {
//       setAge('');
//     }
//   }, [dob]);


useEffect(() => {
    // if (dob) {
    //   const calculatedAge = calculateAge(dob);
    //   setAge(calculatedAge);

    //   // Set error message if age is less than 19
    //   if (calculatedAge < 18) {
    //     setStyles(styles.styleThree = false)
    //     setErrorMessage('Applicant age should be more than 18');
    //   } else if (calculatedAge < 21) {
    //     setStyles(styles.styleOne = false)
    //     setStyles(styles.styleTwo = false)
    //     setStyles(styles.styleFour = false)
  
    //   } else {
    //     setErrorMessage(''); // Clear error message if age is valid
    //   }
    // } else {
    //   setAge('');
    //   setErrorMessage(''); // Clear error message if no DOB is entered
    // }

  
  }, [dob]);

    useEffect(() => {
        passgetImage();
        getImage();
        fetchData();
        applicantgetImage();
        fetchCount();
      }, []);


 const [count, setCount] = useState(0);

  const fetchCount = async () => {
    try {
      const response = await fetch('http://skywayapi.ntechagent.com/api/count');
      if (!response.ok) {
        throw new Error('Failed to fetch count');
      }
      const data = await response.json();
      setCount(data.cv_count); // Set the count from the response
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to fetch count. Please try again.');
    }
  };



  const formatCount = (number) => {
    if (number < 10) {
      return `00${number}`; // Add "00" for single digits
    } else if (number < 100) {
      return `0${number}`; // Add "0" for two digits
    }
    return number.toString(); // Leave as is for three or more digits
  };


      const calculatePersonalInfoAge = (dob) => {
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
    
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age -= 1;
        }
        return age;
      };


      useEffect(() => {
        if (personalInfo.dateOfBirth) {
          const calculatedAge = calculatePersonalInfoAge(personalInfo.dateOfBirth);
        //   setAge(calculatedAge);
          personalInfo.age = calculatedAge;
    
          // Set error message if age is less than 19
          if (calculatedAge < 18) {
            // setStyles(styles.styleThree = false)
            styles.styleThree = false
            setErrorMessage('Applicant age should be more than 18');
          } else if (calculatedAge < 21) {
            // setStyles(styles.styleOne = false)
            // setStyles(styles.styleTwo = false)
            // setStyles(styles.styleFour = false)

           styles.styleOne = false
            styles.styleTwo = false
            styles.styleFour = false
            styles.kaanCvStyle = false
            styles.QimamCvStyle = false
      
          } else {
            setErrorMessage(''); // Clear error message if age is valid
          }
        } else {
          setAge('');
          setErrorMessage(''); // Clear error message if no DOB is entered
        }
    
      
      }, [personalInfo.dateOfBirth]);
    
        useEffect(() => {
            passgetImage();
            getImage();
            fetchData();
            applicantgetImage();
          }, []);



      const handleStyleChange = (event) => {
        const { name, checked } = event.target;
    
        // If "All" checkbox is checked, set all styles to true
        if (name === 'all') {
          setStyles({
            styleOne: checked,
            styleTwo: checked,
            styleThree: checked,
            styleFour: checked,
            kaanCvStyle: checked,
            QimamCvStyle: checked,
            // styleFive: checked,
            all: checked,
          });
        } else {
          // If any style is unchecked, uncheck "All"
          if (checked) {
            setStyles((prev) => ({ ...prev, [name]: checked }));
          } else {
            setStyles((prev) => ({ ...prev, [name]: checked, all: false }));
          }
        }
      };

      /*   small image uploder   */
       

     
     
      const getImage = async () => {
        const result = await axios.get("http://localhost:4000/get-image");
        console.log(result);
        setAllImage(result.data.data);
      };

    

    
    
      const passgetImage = async () => {
        const result = await axios.get("http://localhost:4000/passget-image");
        console.log(result);
        setPassportallimage(result.data.data);
      };

      // delete passport image 

   

      /////////////////////////////// on paste functionality 


      // const handlePaste = (e) => {
      //   e.preventDefault(); // Prevent the default paste behavior
      //   const pastedData = e.clipboardData.getData('text/plain');
        
    
      //   // Split the pasted data into lines
      //   const lines = pastedData.split('\n').map(line => line.trim());
    
      //   console.log("lkdffffffff", pastedData)
      //   console.log("lllllllllllllll", lines)
    
      //   // personalInfo.surname = lines[lines.indexOf("Surname") + 1]
      //   personalInfo.maritalStatus = lines[lines.indexOf("Marital Status") + 1]
    
      //   // setDob(lines[lines.indexOf("Date of Birth") + 1])
        
      //   // Create a temporary object to hold extracted values
      //   const newPersonalInfo = { ...personalInfo };
   
    
      //   // Map the fields based on the pasted data
      //   lines.forEach(line => {
          
      //       personalInfo.surname = lines[2];


      //       if(line.includes("Location")) {
      //           if(lines[lines.indexOf("Location") - 2]){
      //               sponsorInformation.sponsorName = lines[lines.indexOf("Location") - 2]
      //           }  else if (lines[0] != "Location"){
      //             sponsorInformation.sponsorName = lines[0]
      //           }
                
      //           else {
                    
      //           }
                
      //         }


      //         if(line.includes("Location")) {
      //           if(lines[lines.indexOf("Location") + 2]){
      //               sponsorInformation.sponsorAdress = lines[lines.indexOf("Location") + 2]
      //           }  
                
      //         }



      //     if(line.includes("Surname")) {
      //       newPersonalInfo.surname = lines[lines.indexOf("Surname") + 1]
      //     }
      //     if (line.includes('Given Names')) {
      //       const nextLine = lines[lines.indexOf("Given Names") + 1];
      //       const firstName = nextLine.split(' ')[0]; // Get the first part
      //       newPersonalInfo.name = firstName; // Assign the first name
      //   }

      //     if (line.includes('Given Names')) {
      //       const nextLine = lines[lines.indexOf("Given Names") + 1];
      //       const middleNameParts = nextLine.split(' '); // Split the line by space
      //       newPersonalInfo.middleName = middleNameParts[1]; // Get the second part
      //   }
      //     if (line.includes('Marital Status')) {
      //       // newPersonalInfo.maritalStatus = line.split('Marital Status')[1].trim();
      //       newPersonalInfo.maritalStatus = lines[lines.indexOf("Marital Status") + 1]
      //     }
      //     if (line.includes('Religion')) {
      //       newPersonalInfo.religion = lines[lines.indexOf("Religion") + 1]     
      //      }
      //     if (line.includes('Job')) {
      //       newPersonalInfo.postAppliedFor = lines[lines.indexOf("Job") + 1]  
      //     }
      //     if (line.includes('Qualifications')) {
      //       newPersonalInfo.educationAttainment = lines[lines.indexOf("Qualifications") + 1]  
      //     }
      //     if (line.includes('Mobile Number')) {
      //       newPersonalInfo.ownPhoneNumber = lines[lines.indexOf("Mobile Number") + 1]  
      //     }
      //     if (line.includes('Passport Number')) {
      //       newPersonalInfo.passportNo = lines[lines.indexOf("Passport Number") + 1]  
      //     }

      //     if (line.includes('Passport Number')) {
      //       newPersonalInfo.passportNo = lines[lines.indexOf("Passport Number") + 1]  
      //     }


      //   //   if (line.includes("Skills")) {
            
      //   //     expcheck.exp1= false
      //   //     expcheck.exp2= false
      //   //     expcheck.exp3= false
      //   //     expcheck.exp4= false
      //   //     expcheck.exp5= false
      //   //     newPersonalInfo.passportNo = lines[lines.indexOf("Passport Number") + 1]  

      //   //     if(lines[lines.indexOf("Skills") + 1].includes("workerBabysitting")){
      //   //        expcheck.exp1 = true
      //   //     }
      //   //      if(lines[lines.indexOf("Skills") + 1].includes("cleaningWashing")){
      //   //         expcheck.exp2 = true
      //   //     }
      //   //   }
           
          
      //     if (line.includes('Passport Issue Place')) {
      //       newPersonalInfo.passportIssuePlace = lines[lines.indexOf("Passport Issue Place") + 1]
      //     } 

      //     if (line.includes('Visa Number')) {
      //       if(lines[lines.indexOf("Visa Number") + 1] === ""){
      //           sponsorInformation.visaNo = lines[lines.indexOf("Visa Number") + 2]
      //       } else {
      //           sponsorInformation.visaNo = lines[lines.indexOf("Visa Number") + 1]
      //       }
      //       // newPersonalInfo.visaNo = lines[lines.lastIindexOf("Visa Number") + 1]
      //     } 

      //     if (line.includes('Passport Issue Date')) {
      //       setDateOfIssue(lines[lines.indexOf("Passport Issue Date") + 1]) 
      //     }
      //     if (line.includes('Passport Issue Date')) {
      //       setDateOfIssue(lines[lines.indexOf("Passport Issue Date") + 1]) 
      //     }
      //     if (line.includes("Gender")) {
      //       newPersonalInfo.sex = lines[lines.indexOf("Gender") + 1] 
      //     }
      //     if (line.includes("ID Number")) {
      //       newPersonalInfo.idno = lines[lines.indexOf("ID Number") + 1] 
      //     }
      //     if (line.includes("Date of Birth")) {
      //      setDob(lines[lines.indexOf("Date of Birth") + 1])
      //      newPersonalInfo.dateOfBirth = lines[lines.indexOf("Date of Birth") + 1]
           
      //     }

          
      //   });
    
      //   // Update the state with the new values
      //   setPersonalInfo(newPersonalInfo);
      // };



      const handlePaste = async (e) => {
        e.preventDefault(); // Prevent the default paste behavior
    
        try {
          // Use the Clipboard API to read the clipboard data
          const pastedData = await navigator.clipboard.readText();
          console.log("Raw pasted data:", pastedData);
    
          // Split the pasted data into lines
          const lines = pastedData.split('\n').map(line => line.trim());
          console.log("Processed lines:", lines);
    
          // Create a temporary object to hold extracted values
          const newPersonalInfo = { ...personalInfo };
    
          // Map the fields based on the pasted data
          lines.forEach(line => {
            personalInfo.surname = lines[2];


                  if(line.includes("Location")) {
                      if(lines[lines.indexOf("Location") - 2]){
                          sponsorInformation.sponsorName = lines[lines.indexOf("Location") - 2]
                      }  else if (lines[0] != "Location"){
                        sponsorInformation.sponsorName = lines[0]
                      }
                      
                      else {
                          
                      }
                      
                    }
      
      
                    if(line.includes("Location")) {
                      if(lines[lines.indexOf("Location") + 2]){
                          sponsorInformation.sponsorAdress = lines[lines.indexOf("Location") + 2]
                      }  
                      
                    }
      
      
      
                if(line.includes("Surname")) {
                  newPersonalInfo.surname = lines[lines.indexOf("Surname") + 1]
                }
                if (line.includes('Given Names')) {
                  const nextLine = lines[lines.indexOf("Given Names") + 1];
                  const firstName = nextLine.split(' ')[0]; // Get the first part
                  newPersonalInfo.name = firstName; // Assign the first name
              }
      
                if (line.includes('Given Names')) {
                  const nextLine = lines[lines.indexOf("Given Names") + 1];
                  const middleNameParts = nextLine.split(' '); // Split the line by space
                  newPersonalInfo.middleName = middleNameParts[1]; // Get the second part
              }
                if (line.includes('Marital Status')) {
                  // newPersonalInfo.maritalStatus = line.split('Marital Status')[1].trim();
                  newPersonalInfo.maritalStatus = lines[lines.indexOf("Marital Status") + 1]
                }
                if (line.includes('Religion')) {
                  newPersonalInfo.religion = lines[lines.indexOf("Religion") + 1]     
                 }
                if (line.includes('Job')) {
                  newPersonalInfo.postAppliedFor = lines[lines.indexOf("Job") + 1]  
                }
                if (line.includes('Qualifications')) {
                  newPersonalInfo.educationAttainment = lines[lines.indexOf("Qualifications") + 1]  
                }
                if (line.includes('Mobile Number')) {
                  // newPersonalInfo.ownPhoneNumber = lines[lines.indexOf("Mobile Number") + 1]  
                  sponsorInformation.sponsorPhone = lines[lines.indexOf("Mobile Number") + 2] 
                }
                // if (line.includes('Passport Number')) {
                //   newPersonalInfo.passportNo = lines[lines.indexOf("Passport Number") + 1]  
                // }
      
                if (line.includes('Passport Number')) {
                  newPersonalInfo.passportNo = lines[lines.indexOf("Passport Number") + 1]  
                }
      
      
              //   if (line.includes("Skills")) {
                  
              //     expcheck.exp1= false
              //     expcheck.exp2= false
              //     expcheck.exp3= false
              //     expcheck.exp4= false
              //     expcheck.exp5= false
              //     newPersonalInfo.passportNo = lines[lines.indexOf("Passport Number") + 1]  
      
              //     if(lines[lines.indexOf("Skills") + 1].includes("workerBabysitting")){
              //        expcheck.exp1 = true
              //     }
              //      if(lines[lines.indexOf("Skills") + 1].includes("cleaningWashing")){
              //         expcheck.exp2 = true
              //     }
              //   }
                 
                
                if (line.includes('Passport Issue Place')) {
                  newPersonalInfo.passportIssuePlace = lines[lines.indexOf("Passport Issue Place") + 1]
                } 
      
                if (line.includes('Visa Number')) {
                  if(lines[lines.indexOf("Visa Number") + 1] === ""){
                      sponsorInformation.visaNo = lines[lines.indexOf("Visa Number") + 2]
                  } else {
                      sponsorInformation.visaNo = lines[lines.indexOf("Visa Number") + 1]
                  }
                  // newPersonalInfo.visaNo = lines[lines.lastIindexOf("Visa Number") + 1]
                } 
      
                if (line.includes('Passport Issue Date')) {
                  setDateOfIssue(lines[lines.indexOf("Passport Issue Date") + 1]) 
                }
                if (line.includes('Passport Issue Date')) {
                  setDateOfIssue(lines[lines.indexOf("Passport Issue Date") + 1]) 
                }
                if (line.includes("Gender")) {
                  newPersonalInfo.sex = lines[lines.indexOf("Gender") + 1] 
                }

                if (line.includes("ID Number")) {
                  newPersonalInfo.idno = lines[lines.indexOf("ID Number") + 1] 
                }

                // if (line.includes("ID Number")) {
                //   sponsorInformation.sponsorId = lines[lines.indexOf("ID Number") + 1] 
                // }

                if (line.includes("Date of Birth")) {
                 setDob(lines[lines.indexOf("Date of Birth") + 1])
                 newPersonalInfo.dateOfBirth = lines[lines.indexOf("Date of Birth") + 1]
                 
                }

                sponsorInformation.visaType = "Work"
          });
    
          // Update the state with the new values
          setPersonalInfo(newPersonalInfo);
        } catch (err) {
          console.error('Failed to read clipboard contents: ', err);
        }
      };



      ////////////////////////////// on paste ll


     
      /////////////////////////////  applicant data
     

    
    
      const applicantgetImage = async () => {
        const result = await axios.get("http://localhost:4000/applicantget-image");
        console.log(result);
        setApplicantPassportallimage(result.data.data);
      };


    //////////////////////////////// applicant data ll


    ///////////////////////////////// Applicant Test data 


  


      const confirmSubmission = async () => {
        const { name, placeOfBirth, nationality, maritalStatus, religion } = personalInfo;
    
        // Check if required fields are filled (passportNo is not required)
        if (!name || !placeOfBirth || !nationality || !maritalStatus || !religion) {
          toast.error("Please fill all the required fields.", {
            position: "top-center"
          });
          return;
        }
    
        // Proceed with form submission logic here
        // ...
        toast.success("Form submitted successfully!");
        setShowModal(false); // Close the modal after submission
      };
    
      const cancelSubmission = () => {
        setShowModal(false); // Close the modal without submitting
      };


      const cancelSubmissionforsave = () => {
        setShowsubmitModal(false); 
      };


    const validateFields = () => {
        const errors = {};
        for (const key in personalInfo) {
          if (!personalInfo[key]) {
            errors[key] = 'This field is required';
          }
        }
        setValidationErrors(errors);
        return Object.keys(errors).length === 0; // return true if no errors
      };

      const [dataa, setDataa] = useState();
      const fetchDataa = async () => {
        try {
          const response = await fetch(`http://skywayapi.ntechagent.com/tt?agentname=${agentName}`);
          const result = await response.json();
          if (result.status === 'ok') {
            console.log(result.data); // Log the fetched data for debugging
            const sortedData = result.data
            setDataa(result.data)
              
          } else {
            console.error('Error fetching data:', result.message);
          }
        } catch (error) {
          console.error('Fetch error:', error);
        }
      };


      const [isSubmitting, setIsSubmitting] = useState(false); // Use state to track submission status


      const [message, setMessage] = useState('');
            const [error, setError] = useState('');
          

      const submitImageforapplicant = async (e) => {
          e.preventDefault();
          
          await fetchDataa();

          if (isSubmitting) return; // If already submitting, exit the function
          setIsSubmitting(true); // Set the flag to true
      
          
      
          if (personalInfo.applicationNo && !personalInfo.applicationNo.startsWith('E')) {
              personalInfo.applicationNo = 'E' + personalInfo.applicationNo; // Prepend 'E' if it doesn't start with 'E'
          }

          if (personalInfo.laborId && !personalInfo.laborId.startsWith('E')) {
            personalInfo.laborId = 'E' + personalInfo.laborId; // Prepend 'E' if it doesn't start with 'E'
        }
      
          const { name, placeOfBirth, nationality, maritalStatus, religion, passportNo } = personalInfo;
      
          const nameExists = dataa && dataa.some(i => i.passportnum === passportNo);
      
          if (nameExists && passportNo !== "") {
              alert(`This applicant already exists.`); // Notify user
              setIsSubmitting(false); // Reset flag before exiting
              return; // Stop function if name is not unique
          }
      
          if (!name || !placeOfBirth || !nationality || !maritalStatus || !religion || !applicantpersonalimagePreview || !applicantfullbodyimagePreview || !applicantpassportimagePreview) {
              personalInfo.emptyfield = true;
              sponsorInformation.sponsorInformationEmptyfield = true;
              toast.error("Please fill all the required fields.", {
                  position: "top-center"
              });
              setShowsubmitModal(true);
              setIsSubmitting(false); // Reset flag before exiting
              return;
          }


          
           
              const dummyData = { newValue: count + 1 }; // Ensure this is an integer
          
              try {
                const response = await fetch('http://skywayapi.ntechagent.com/api/count', {
                  method: 'PUT', // Assuming you want to update the count
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(dummyData),
                });
          
                if (!response.ok) {
                  throw new Error('Failed to post dummy data');
                }
          
                const result = await response.text(); // Adjust if your API returns JSON
                setMessage(`Successfully posted: ${result}`);
              } catch (error) {
                console.error('Error:', error);
                setError('Failed to post dummy data. Please try again.');
              }
            

          
    
        const formData = new FormData();
        // formData.append("applicantimage", applicantpassportimage);
        
        // Assuming you have a state variable for the name input
        // const name = document.getElementById("nameInput").value; // or use a state variable if applicable
        // formData.append("name", personalInfo.name + "kkkkk"); 
        // formData.append("surname", personalInfo.name + "sdfdf");    
        if (video) formData.append("video", video);
        if (imageforpersonalimage) formData.append("personalimage", imageforpersonalimage);
        if (imageforfullbodyimage) formData.append("fullbodyimage", imageforfullbodyimage);
        if (imageforpassportimage) formData.append("passportimage", imageforpassportimage);
formData.append("name", personalInfo.name);
formData.append("middleName", personalInfo.middleName);  
formData.append("familyName", personalInfo.familyName);
formData.append("surname", personalInfo.surname);
formData.append("applicationNo", personalInfo.applicationNo);
formData.append("sex", personalInfo.sex);
formData.append("placeofbirth", personalInfo.placeOfBirth);
formData.append("passportIssuePlace", personalInfo.passportIssuePlace);
formData.append("passportnum", personalInfo.passportNo);
formData.append("nationality", personalInfo.nationality);
formData.append("martialstatus", personalInfo.maritalStatus );
formData.append("numberofchildren", personalInfo.numberOfChildren);
formData.append("religion", personalInfo.religion );
formData.append("weight", personalInfo.weight);
formData.append("height", personalInfo.height);
formData.append("educationattainment", personalInfo.educationAttainment);
formData.append("postappliedfor", personalInfo.postAppliedFor );
formData.append("contractperiod", personalInfo.contractPeriod);
formData.append("arabicdegree", personalInfo.arabicDegree );
formData.append("englishdegree", personalInfo.englishDegree );
formData.append("ownphonenum", personalInfo.ownPhoneNumber);
formData.append("contactphonenum", personalInfo.contactPhoneNumber);
formData.append("dateofbirth", personalInfo.dateOfBirth );
formData.append("age", personalInfo.age);
formData.append("dateofissue", dateOfIssue);
formData.append("expireddate",dateOfExpiry);
formData.append("country", personalInfo.country );
formData.append("position", personalInfo.position);
formData.append("period", personalInfo.period);
formData.append("babysitting", expcheck.exp1 ? "true" : "false");
formData.append("cleaning", expcheck.exp2 ? "true" : "false");
formData.append("washing", expcheck.exp3 ? "true" : "false"); 
formData.append("cooking", expcheck.exp4 ? "true" : "false");
formData.append("eldercare", expcheck.exp5 ? "true" : "false");

formData.append("childerncare", expcheck.childerncare ? "true" : "false");
formData.append("ironingclothes", expcheck.ironingclothes ? "true" : "false");


formData.append("monthlysalarySaudi", salaries.saudi );
formData.append("monthlysalaryJordan", salaries.jordan );
formData.append("experience", JSON.stringify(projectInfo.project))


// sponsor information

formData.append("visaNo", sponsorInformation.visaNo);
formData.append("sponsorId", sponsorInformation.sponsorId);
formData.append("sponsorAddress", sponsorInformation.sponsorAdress);
formData.append("sponsorCity", sponsorInformation.sponsorCity);
formData.append("nationalId", sponsorInformation.nationalId);
formData.append("email", sponsorInformation.email);
formData.append("sponsorName", sponsorInformation.sponsorName);
formData.append("sponsorPhone", sponsorInformation.sponsorPhone);
formData.append("agent", sponsorInformation.agent);
formData.append("sponsorArabic", sponsorInformation.sponsorArabic);
formData.append("visaType", sponsorInformation.visaType);
formData.append("fileNo", sponsorInformation.fileNo);
formData.append("wakala", sponsorInformation.wakala);
formData.append("signedUp", sponsorInformation.signedUp);
formData.append("biometricId", sponsorInformation.biometricId);
formData.append("contract", sponsorInformation.contract);
formData.append("stickerVisa", sponsorInformation.stickerVisa);
formData.append("currentNationality", sponsorInformation.currentNationality);
formData.append("laborId", sponsorInformation.laborId);
formData.append("destination", sponsorInformation.destination);


// formData.append("cvcount", JSON.stringify(dummyData.newValue));
formData.append("cvcount", formatCount(count + 1));

formData.append("availablefor", JSON.stringify({"golden": styles.styleOne.toString(), "bela": styles.styleTwo.toString(), "skyway": styles.styleThree.toString(), "baraka": styles.styleFour.toString(), "kaan": styles.kaanCvStyle.toString(), "qimam": styles.QimamCvStyle.toString(), "admin": "true"  }));

formData.append("acceptedBy", JSON.stringify([{"agent": "golden", "accepted": "false", "comment": ""}, {"agent": "bela", "accepted": "false", "comment": ""}, {"agent": "skyway", "accepted": "false", "comment": ""}, {"agent": "baraka", "accepted": "false", "comment": ""}, {"agent": "kaan", "accepted": "false", "comment": ""}, {"agent": "qimam", "accepted": "false", "comment": ""}]))

formData.append("status", "Interview Scheduled");




try {
    const response = await axios.post(
      `http://skywayapi.ntechagent.com/tupload-image?agentname=${agentName}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
  
    // Check if the response indicates success
    if (response.status === 200) {
        toast.dismiss();
        
      toast.success("Form submitted successfully!");
      document.getElementById("nameInput").value = ""; // Reset the name input field
    } else {
      toast.error("Submission failed. Please try again."); // Handle unexpected response
    }
  
    fetchCount(); // Call fetchCount after submission attempt
  } catch (error) {
    console.error("Submission failed:", error);
    // toast.error("Submission failed. Please try again."); // Notify user on error
  } finally {
    await fetchDataa(); // Fetch data after submission attempt
    setIsSubmitting(false); // Reset the flag after the operation is completed
    fetchCount(); // Call fetchCount again if needed
  }
        
        // Reset file name and name input after submission
        // setPFileName("No file chosen after");
        // setImageforpersonalimage(null);
        // setImageforfullbodyimage(null);
        // Reset the name input field
    };

   



    const submitanyway = async (e) => {
      e.preventDefault();

      setShowsubmitModal(false);
      
          
      await fetchDataa();

      if (isSubmitting) return; // If already submitting, exit the function
      setIsSubmitting(true); // Set the flag to true
  
      
  
      if (personalInfo.applicationNo && !personalInfo.applicationNo.startsWith('E')) {
          personalInfo.applicationNo = 'E' + personalInfo.applicationNo; // Prepend 'E' if it doesn't start with 'E'
      }

      if (personalInfo.laborId && !personalInfo.laborId.startsWith('E')) {
        personalInfo.laborId = 'E' + personalInfo.laborId; // Prepend 'E' if it doesn't start with 'E'
    }
  
      const { name, placeOfBirth, nationality, maritalStatus, religion, passportNo } = personalInfo;
  
      const nameExists = dataa && dataa.some(i => i.passportnum === passportNo);
  
      if (nameExists && passportNo !== "") {
          alert(`This applicant already exists.`); // Notify user
          setIsSubmitting(false); // Reset flag before exiting
          return; // Stop function if name is not unique
      }


      const dummyData = { newValue: count + 1 }; // Ensure this is an integer
          
      try {
        const response = await fetch('http://skywayapi.ntechagent.com/api/count', {
          method: 'PUT', // Assuming you want to update the count
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dummyData),
        });
  
        if (!response.ok) {
          throw new Error('Failed to post dummy data');
        }
  
        const result = await response.text(); // Adjust if your API returns JSON
        setMessage(`Successfully posted: ${result}`);
      } catch (error) {
        console.error('Error:', error);
        setError('Failed to post dummy data. Please try again.');
      }
  
      // if (!name || !placeOfBirth || !nationality || !maritalStatus || !religion || !applicantpersonalimagePreview || !applicantfullbodyimagePreview || !applicantpassportimagePreview) {
      //     personalInfo.emptyfield = true;
      //     sponsorInformation.sponsorInformationEmptyfield = true;
      //     toast.error("Please fill all the required fields.", {
      //         position: "top-center"
      //     });
      //     setShowsubmitModal(true);
      //     setIsSubmitting(false); // Reset flag before exiting
      //     return;
      // }


          
    
        const formData = new FormData();
        // formData.append("applicantimage", applicantpassportimage);
        
        // Assuming you have a state variable for the name input
        // const name = document.getElementById("nameInput").value; // or use a state variable if applicable
        // formData.append("name", personalInfo.name + "kkkkk"); 
        // formData.append("surname", personalInfo.name + "sdfdf");    
        if (video) formData.append("video", video);
        if (imageforpersonalimage) formData.append("personalimage", imageforpersonalimage);
        if (imageforfullbodyimage) formData.append("fullbodyimage", imageforfullbodyimage);
        if (imageforpassportimage) formData.append("passportimage", imageforpassportimage);
formData.append("name", personalInfo.name);
formData.append("middleName", personalInfo.middleName);
formData.append("familyName", personalInfo.familyName);

formData.append("surname", personalInfo.surname);
formData.append("applicationNo", personalInfo.applicationNo);
formData.append("sex", personalInfo.sex);
formData.append("placeofbirth", personalInfo.placeOfBirth);
formData.append("passportIssuePlace", personalInfo.passportIssuePlace);
formData.append("passportnum", personalInfo.passportNo);
formData.append("nationality", personalInfo.nationality);
formData.append("martialstatus", personalInfo.maritalStatus );
formData.append("numberofchildren", personalInfo.numberOfChildren);
formData.append("religion", personalInfo.religion );
formData.append("weight", personalInfo.weight);
formData.append("height", personalInfo.height);
formData.append("educationattainment", personalInfo.educationAttainment);
formData.append("postappliedfor", personalInfo.postAppliedFor );
formData.append("contractperiod", personalInfo.contractPeriod);
formData.append("arabicdegree", personalInfo.arabicDegree );
formData.append("englishdegree", personalInfo.englishDegree );
formData.append("ownphonenum", personalInfo.ownPhoneNumber);
formData.append("contactphonenum", personalInfo.contactPhoneNumber);
formData.append("dateofbirth", personalInfo.dateOfBirth );
formData.append("age", personalInfo.age);
formData.append("dateofissue", dateOfIssue);
formData.append("expireddate",dateOfExpiry);
formData.append("country", personalInfo.country );
formData.append("position", personalInfo.position);
formData.append("period", personalInfo.period);
formData.append("babysitting", expcheck.exp1 ? "true" : "false");
formData.append("cleaning", expcheck.exp2 ? "true" : "false");
formData.append("washing", expcheck.exp3 ? "true" : "false"); 
formData.append("cooking", expcheck.exp4 ? "true" : "false");
formData.append("eldercare", expcheck.exp5 ? "true" : "false");

formData.append("childerncare", expcheck.childerncare ? "true" : "false");
formData.append("ironingclothes", expcheck.ironingclothes ? "true" : "false");


formData.append("monthlysalarySaudi", salaries.saudi );
formData.append("monthlysalaryJordan", salaries.jordan );
formData.append("experience", JSON.stringify(projectInfo.project))


// sponsor information

formData.append("visaNo", sponsorInformation.visaNo);
formData.append("sponsorId", sponsorInformation.sponsorId);
formData.append("sponsorAddress", sponsorInformation.sponsorAdress);
formData.append("sponsorCity", sponsorInformation.sponsorCity);
formData.append("nationalId", sponsorInformation.nationalId);
formData.append("email", sponsorInformation.email);
formData.append("sponsorName", sponsorInformation.sponsorName);
formData.append("sponsorPhone", sponsorInformation.sponsorPhone);
formData.append("agent", sponsorInformation.agent);
formData.append("sponsorArabic", sponsorInformation.sponsorArabic);
formData.append("visaType", sponsorInformation.visaType);
formData.append("fileNo", sponsorInformation.fileNo);
formData.append("wakala", sponsorInformation.wakala);
formData.append("signedUp", sponsorInformation.signedUp);
formData.append("biometricId", sponsorInformation.biometricId);
formData.append("contract", sponsorInformation.contract);
formData.append("stickerVisa", sponsorInformation.stickerVisa);
formData.append("currentNationality", sponsorInformation.currentNationality);
formData.append("laborId", sponsorInformation.laborId);
formData.append("destination", sponsorInformation.destination);


// formData.append("cvcount", JSON.stringify(dummyData.newValue));
formData.append("cvcount", formatCount(count + 1));

formData.append("availablefor", JSON.stringify({"golden": styles.styleOne.toString(), "bela": styles.styleTwo.toString(), "skyway": styles.styleThree.toString(), "baraka": styles.styleFour.toString(), "kaan": styles.kaanCvStyle.toString(), "qimam": styles.QimamCvStyle.toString(), "admin": "true"  }));

formData.append("acceptedBy", JSON.stringify([{"agent": "golden", "accepted": "false", "comment": ""}, {"agent": "bela", "accepted": "false", "comment": ""}, {"agent": "skyway", "accepted": "false", "comment": ""}, {"agent": "baraka", "accepted": "false", "comment": ""}, {"agent": "kaan", "accepted": "false", "comment": ""}, {"agent": "qimam", "accepted": "false", "comment": ""}]));

formData.append("status", "Interview Scheduled");





try {
    const response = await axios.post(
      `http://skywayapi.ntechagent.com/tupload-image?agentname=${agentName}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
  
    // Check if the response indicates success
    if (response.status === 200) { // Use response.status for axios
        toast.dismiss();
        setShowsubmitModal(false);
      toast.success("Form submitted successfully!");
      document.getElementById("nameInput").value = ""; // Reset the name input field
    } else {
      toast.error("Submission failed. Please try again."); // Handle unexpected response
      setShowsubmitModal(false);
    }
  
    fetchCount(); // Call fetchCount after successful submission
  } catch (error) {
    console.error("Submission failed:", error);
    // toast.error("Submission failed. Please try again."); // Notify user on error
    
  } finally {
    await fetchDataa(); // Fetch data after submission attempt
    setIsSubmitting(false); // Reset the flag after the operation is completed
    fetchCount(); // Call fetchCount again if needed
  }
        
        
        // setImageforpersonalimage(null);
        // setImageforfullbodyimage(null);
        // setApplicantfullbodyimageimagePreview(null)
        
        
        // document.getElementById("nameInput").value = ""; // Reset the name input field
    };


  //   const handlePastee = (e) => {
  //   e.preventDefault(); // Prevent default paste behavior
  //   const pastedData = e.clipboardData.getData('text'); // Get pasted data
  //   const targetId = e.target.id; // Get the ID of the focused input

  //   updateText({ target: { id: targetId, value: pastedData } }); // Update state
  // };


    const onInputChangeforpersonalimage = (e) => {
        const file = e.target.files[0];
        console.log(e.target.files[0]);
        setImageforpersonalimage(e.target.files[0]);
        if (file) {
            setApplicantpersonalimagePreview(URL.createObjectURL(file));
          }
      };
    
      const onInputChangeforfullbodyimage = (e) => {
        const file = e.target.files[0];
        console.log(e.target.files[0]);
        setImageforfullbodyimage(e.target.files[0]);
        if (file) {
            setApplicantfullbodyimageimagePreview(URL.createObjectURL(file))
        }
      };

    //   const onInputChangeforpassportimage = (e) => {
    //     const file = e.target.files[0];
    //     console.log(e.target.files[0]);
    //     setImageforpassportimage(e.target.files[0]);
    //     if (file) {
    //         setApplicantpassportimagePreview(URL.createObjectURL(file))
    //     }
    //   };

    const onInputChangeforpassportimage = (e) => {
        const file = e.target.files[0];
        setImageforpassportimage(e.target.files[0]);
        if (file) {
            setApplicantpassportimagePreview(URL.createObjectURL(file));
           

            if(toggleState){
              recognizeMRZ(file); 
            }
           
            
            
    
          }
    };


    const onInputChangeforVideo = (e) => {
        const file = e.target.files[0];
        setVideo(e.target.files[0]);
        if (file) {
            setvideoPreview(URL.createObjectURL(file));
          
          }
    };
    const recognizeMRZ = (file) => {
        Tesseract.recognize(
            file,
            'eng',
            {
                logger: (m) => console.log(m), // Log progress
            }
        ).then(({ data: { text } }) => {
            console.log("Extracted Text: ", text);
            const extractedData = extractPassportData(text);
            setPassportData(extractedData);
        });
      };

      const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        recognizeMRZ(file);
      }, []);
    
    //   const recognizeMRZ = (file) => {
    //     Tesseract.recognize(
    //       file,
    //       'eng',
    //       {
    //         logger: (m) => console.log(m), // Log progress
    //       }
    //     ).then(({ data: { text } }) => {
    //       console.log("Extracted Text: ", text);
    //       const extractedData = extractPassportData(text);
    //       setPassportData(extractedData);
    //     });
    //   };
    
      const extractPassportData = (text) => {
        
    
    
    
       
    
    
    
        const lines = text.split('\n');
        const mrzLines = lines.filter(line => line.match(/^[A-Z0-9<]+$/));
    
        if (mrzLines.length < 2) return { name: '', surname: '', nationality: '', age: '', passportNumber: '', placeOfBirth: '', birthDate: '' };
    
        const line1 = mrzLines[0]; // e.g., P<UTOEJANE<<<JOHN<<<<<<<<<<<<<<<<<<<<<<<<<
        const line2 = mrzLines[1]; // e.g., 1234567890UTO7408129M1204159<<<<<<<<<<<<<<<<<


        const passporttype = line1.substring(0,1)

        personalInfo.passportType = !personalInfo.passportType ? passporttype === "P" ? "Normal" : "" : personalInfo.passportType;
    
        // Extracting name
        const names = line1.substring(5, 44).replace(/</g, ' ').trim().split('<<');
        const surname = names[0] ? names[0].trim() : ''; // Add check for surname
        const name = names[1] ? names[1].trim() : ''; // Add check for given name
    
        const nationality = line2.substring(10, 13) || '';
        const passportNumber = line2.substring(0, 9) || '';
    
        // Extracting birth date and gender
        const birthDate = line2.substring(13, 19) || ''; // Birthdate in YYMMDD format
        const gender = line2.charAt(20) || '';

    
        // Calculate age
        const year = birthDate ? parseInt(birthDate.substring(0, 2), 10) : 0;
        const month = birthDate ? parseInt(birthDate.substring(2, 4), 10) : 0;
        const day = birthDate ? parseInt(birthDate.substring(4, 6), 10) : 0;
        const age = new Date().getFullYear() - (year < 50 ? 2000 + year : 1900 + year); // Basic age calculation
    
        // Extracting place of birth
        const placeOfBirth = line1.substring(44, 69).replace(/</g, ' ').trim() || '';
    
        const dateOfExpiry = line2.substring(21, 27) || '';

        const formattedDateOfExpiry = dateOfExpiry ? `20${dateOfExpiry.substring(0, 2)}-${dateOfExpiry.substring(2, 4)}-${dateOfExpiry.substring(4, 6)}` : '';
        
    
        // Format birth date as YYYY-MM-DD for display
        const formattedBirthDate = birthDate ? `20${birthDate.substring(0, 2)}-${birthDate.substring(2, 4)}-${birthDate.substring(4, 6)}` : '';
    
    
        const startIndex = 5; // Starting at character 5
        const firstEndIndex = line1.indexOf('<', startIndex); // Find the first '<' after the start index
    
        const extractedTexts = [];


        personalInfo.sex = !personalInfo.sex ? gender === "F" ? "FEMALE" : "MALE" : personalInfo.sex;


        personalInfo.passportNo = !personalInfo.passportNo ? passportNumber : personalInfo.passportNo;

    const extractNationality = line1.substring(2, 5);

    personalInfo.nationality = extractNationality === "ETH" ? "ETHIOPIA" : "NON-ETHIOPIA"; 
    sponsorInformation.currentNationality = !sponsorInformation.currentNationality ? extractNationality === "ETH" ? "ETHIOPIA" : "NON-ETHIOPIA" : sponsorInformation.currentNationality;

   console.log(`20${birthDate.substring(0, 2)}${birthDate.substring(2, 4)}${birthDate.substring(4, 6)}`, "kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkddd")

   const yearPrefix = (parseInt(birthDate.substring(0, 2)) >= 24) ? '19' : '20';

const formattedDate = `${yearPrefix}${birthDate.substring(0, 2)}-${birthDate.substring(2, 4)}-${birthDate.substring(4, 6)}`;

setDob(formattedDate);

personalInfo.dateOfBirth = !personalInfo.dateOfBirth ? formattedDate : personalInfo.dateOfBirth;
     
//    setDob( `${birthDate.substring(0, 2)} >= 24 ? 19${birthDate.substring(0, 2)}-${birthDate.substring(2, 4)}-${birthDate.substring(4, 6)} : 20${birthDate.substring(0, 2)}-${birthDate.substring(2, 4)}-${birthDate.substring(4, 6)}`)
    
//    setDateOfExpiry(formattedDateOfExpiry)
   setDateOfExpiry(`20${dateOfExpiry.substring(0, 2)}-${dateOfExpiry.substring(2, 4)}-${dateOfExpiry.substring(4, 6)}`)
   



        if (firstEndIndex !== -1) {
          // First extraction
          const firstResult = line1.substring(startIndex, firstEndIndex);
          extractedTexts.push(firstResult);
          
          // Skip two characters after the first result
          const secondStartIndex = firstEndIndex + 2;
          const secondEndIndex = line1.indexOf('<', secondStartIndex); // Find the next '<'
          
          personalInfo.surname = firstResult;
         
          if (secondEndIndex !== -1) {
            const secondResult = line1.substring(secondStartIndex, secondEndIndex);
            extractedTexts.push(secondResult);

            
            
            // Skip one character after the second result
            const thirdStartIndex = secondEndIndex + 1;
            const thirdEndIndex = line1.indexOf('<', thirdStartIndex); // Find the next '<'
             
            
            if (thirdEndIndex !== -1) {
              const thirdResult = line1.substring(thirdStartIndex, thirdEndIndex);
              extractedTexts.push(thirdResult);
              // personalInfo.name = secondResult
            //   personalInfo.name = secondResult + " " + thirdResult;
              // personalInfo.middleName = thirdResult

              checkPassportdata.firstName = secondResult
              checkPassportdata.MiddleName = thirdResult

              
            } else {
              extractedTexts.push(line1.substring(thirdStartIndex)); // If no '<' is found, return the rest of the string
            }
          }
        }
    
    
       
    
        return { name, surname, nationality, age, passportNumber, placeOfBirth, birthDate: formattedBirthDate };
      };
    
      const { getRootProps, getInputProps } = useDropzone({ onDrop });
    



    ///////////////////////////////// Applicant Test data ll


  
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:4000/cv-builder-1'); // Your API endpoint
            const data = await response.json();
            console.log(data);
            setCvitem(data.itemtests); // Update state with fetched data
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

   

    const deleteItemsByName = async () => {
        try {
            const response = await fetch(`http://localhost:4000/cv-builder-1?name=${encodeURIComponent(personalInfo.email)}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                console.log(`Items with name "${personalInfo.email}" deleted successfully.`);
                fetchData();
            } else {
                console.error('Error deleting data:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    

   const downloadMultipleCVs = async () => {

    const isSmallDevice = window.innerWidth < 768;

    const { name, placeOfBirth, nationality, maritalStatus, religion } = personalInfo;

    if (!name || !placeOfBirth || !nationality || !maritalStatus || !religion) {
        toast.error("Please fill all the required fields.", {
          position: "top-center"
        });

        setShowModal(true);
        
        return;

        
      }


      const dummyData = { newValue: count + 1 }; // Ensure this is an integer
          
      try {
        const response = await fetch('http://skywayapi.ntechagent.com/api/count', {
          method: 'PUT', // Assuming you want to update the count
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dummyData),
        });
  
        if (!response.ok) {
          throw new Error('Failed to post dummy data');
        }
  
        const result = await response.text(); // Adjust if your API returns JSON
        setMessage(`Successfully posted: ${result}`);
        fetchCount();
      } catch (error) {
        console.error('Error:', error);
        setError('Failed to post dummy data. Please try again.');
      }


        const pdfElements = [
            
            {  elementId: styles.styleOne ? 'cvContent2' : "", filename: `${`${personalInfo.name} ${personalInfo.middleName} ${personalInfo.surname} ${personalInfo.religion} ${projectInfo.project[0].name ? projectInfo.project[0].name + " Experienced" : "first time"} Golden`}.pdf`, margin: 0.5, format: "letter"  },
            { elementId: styles.styleTwo ? 'cvContent1' : "", filename: `${`${personalInfo.name} ${personalInfo.middleName} ${personalInfo.surname} ${personalInfo.religion} ${projectInfo.project[0].name ? projectInfo.project[0].name + " Experienced" : "first time"} Bela Hodod`}.pdf`, margin: 0.5, format: "letter" },
            { elementId: styles.styleThree ? 'cvContent3' : "", filename: `${`${personalInfo.name} ${personalInfo.middleName} ${personalInfo.surname} ${personalInfo.religion} ${projectInfo.project[0].name ? projectInfo.project[0].name + " Experienced" : "first time"} Skyway`}.pdf`, margin: 0.5, format: "letter" },
            { elementId: styles.styleFour ? 'cvContent4' : "", filename: `${`${personalInfo.name} ${personalInfo.middleName} ${personalInfo.surname} ${personalInfo.religion} ${projectInfo.project[0].name ? projectInfo.project[0].name + " Experienced" : "first time"} Baraka`}.pdf`, margin: 0.5, format: "letter" },
            { elementId: styles.kaanCvStyle ? 'KaanAlRiyadhCv' : "", filename: `${`${personalInfo.name} ${personalInfo.middleName} ${personalInfo.surname} ${personalInfo.religion} ${projectInfo.project[0].name ? projectInfo.project[0].name + " Experienced" : "first time"} Kaan AlRiyadh`}.pdf`, margin: [0, 0.2, 0, 0.2], format: isSmallDevice ? [9.5, 12] : "a4" },
            {elementId: styles.QimamCvStyle ? "QimamAsiaCv" : "", filename: `${`${personalInfo.name} ${personalInfo.middleName} ${personalInfo.surname} ${personalInfo.religion} ${projectInfo.project[0].name ? projectInfo.project[0].name + " Experienced" : "first time"} Qimam Asia`}.pdf`, margin: [1, 0.9, 1, 1], format: "a4" },
           // { elementId: styles.styleFive ? 'cvContent5' : "", filename: 'Al Wasit.pdf' },
           // Add more elements as needed
       ];
   
       const downloadPromises = pdfElements.map(({ elementId, filename, margin, format }) => {
           const element = document.getElementById(elementId);
           const options = {
               margin: margin,
                filename: filename,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                // jsPDF: { unit: 'in', format: [8.5, 10.99],  /*format: 'letter',*/ orientation: 'portrait' }
                jsPDF: { unit: 'in', format: format, orientation: 'portrait' }
            };
            
    
            return html2pdf().from(element).set(options).save();
        });
    
        // Wait for all downloads to complete
        await Promise.all(downloadPromises);

        // fetchCount();
    }




    // const downloadEmbassyCV = () => {
    //     const element = document.getElementById("cvContent");
    //     const options = {
    //         margin: 0.2,
    //         filename: 'embassy.pdf',
    //         image: { type: 'jpeg', quality: 0.98 },
    //         html2canvas: { scale: 2 },
    //         jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    //     };
    
    //     html2pdf()
    //         .from(element)
    //         .set(options)
    //         .save();
    // }


    const pdfRef = useRef();

    const downloadEmbassyCV = () => {
      const element = pdfRef.current;
    
      // Configuration for html2pdf
      const isMobile = window.innerWidth <= 768; // Adjust based on your breakpoints
      const config = {
        filename: 'Embassy.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: isMobile ? 1 : 2, logging: true, dpi: 300, letterRendering: true },
        jsPDF: { unit: 'mm', format: isMobile ? 'A4' : 'letter', orientation: 'Portrait' }
      };
    
      html2pdf()
        .from(element)
        .set(config)
        .toPdf()
        .get('pdf')
        .then(pdf => {
          const totalPages = pdf.internal.getNumberOfPages();
          const phoneNumber = `${dayName}, ${monthName} ${dayNumber}, ${year}`; // Replace with your phone number
          const email = "www.ntechagent.com | +251 911 454176 | ntechagent@gmail.com"; // Replace with your email
    
          for (let i = 1; i <= totalPages; i++) {
            pdf.setPage(i);
            pdf.setFontSize(10);
            pdf.setTextColor(5);
    
            // Set positions
            const pageYPosition = pdf.internal.pageSize.getHeight() - 10; // Y position for footer
            const leftXPosition = 3; // X position for left side text
            const rightXPosition = pdf.internal.pageSize.getWidth() - 22; // Base position for page number
            const centerXPosition = pdf.internal.pageSize.getWidth() / 2 + 10; // Center position
    
            // Add phone number on the left
            pdf.text(`${phoneNumber}`, leftXPosition, pageYPosition);
    
            // Add email in the center
            pdf.text(` ${email}`, centerXPosition, pageYPosition, { align: 'center' });
    
            // Add page number and total pages to the footer on the right
            pdf.text(`Page ${i} of ${totalPages}`, rightXPosition, pageYPosition);
            // pdf.text(`${email}`, rightXPosition, pageYPosition);
          }
        })
        .save();
    };


    const downloadcvanyway = async () => {
        setShowModal(false);

        const isSmallDevice = window.innerWidth < 768;
        const pdfElements = [
            
            {  elementId: styles.styleOne ? 'cvContent2' : "", filename: `${`${personalInfo.name} ${personalInfo.middleName} ${personalInfo.surname} ${personalInfo.religion} ${projectInfo.project[0].name ? projectInfo.project[0].name + " Experienced" : "first time"} Golden`}.pdf`, margin: 0.5, format: "letter"  },
            { elementId: styles.styleTwo ? 'cvContent1' : "", filename: `${`${personalInfo.name} ${personalInfo.middleName} ${personalInfo.surname} ${personalInfo.religion} ${projectInfo.project[0].name ? projectInfo.project[0].name + " Experienced" : "first time"} Bela Hodod`}.pdf`, margin: 0.5, format: "letter" },
            { elementId: styles.styleThree ? 'cvContent3' : "", filename: `${`${personalInfo.name} ${personalInfo.middleName} ${personalInfo.surname} ${personalInfo.religion} ${projectInfo.project[0].name ? projectInfo.project[0].name + " Experienced" : "first time"} Skyway`}.pdf`, margin: 0.5, format: "letter" },
            { elementId: styles.styleFour ? 'cvContent4' : "", filename: `${`${personalInfo.name} ${personalInfo.middleName} ${personalInfo.surname} ${personalInfo.religion} ${projectInfo.project[0].name ? projectInfo.project[0].name + " Experienced" : "first time"} Baraka`}.pdf`, margin: 0.5, format: "letter" },
            { elementId: styles.kaanCvStyle ? 'KaanAlRiyadhCv' : "", filename: `${`${personalInfo.name} ${personalInfo.middleName} ${personalInfo.surname} ${personalInfo.religion} ${projectInfo.project[0].name ? projectInfo.project[0].name + " Experienced" : "first time"} KaanAlRiyadh`}.pdf`, margin: [0, 0.2, 0, 0.2], format:isSmallDevice ? [9.5, 12] : "a4" },
            {elementId: styles.QimamCvStyle ? "QimamAsiaCv" : "", filename: `${`${personalInfo.name} ${personalInfo.middleName} ${personalInfo.surname} ${personalInfo.religion} ${projectInfo.project[0].name ? projectInfo.project[0].name + " Experienced" : "first time"} Qimam Asia`}.pdf`, margin: [1, 0.9, 1, 1], format: "a4" },
           // { elementId: styles.styleFive ? 'cvContent5' : "", filename: 'Al Wasit.pdf' },
           // Add more elements as needed
       ];


       const dummyData = { newValue: count + 1 }; // Ensure this is an integer
          
       try {
         const response = await fetch('http://skywayapi.ntechagent.com/api/count', {
           method: 'PUT', // Assuming you want to update the count
           headers: {
             'Content-Type': 'application/json',
           },
           body: JSON.stringify(dummyData),
         });
   
         if (!response.ok) {
           throw new Error('Failed to post dummy data');
         }
   
         const result = await response.text(); // Adjust if your API returns JSON
         setMessage(`Successfully posted: ${result}`);
         fetchCount();
       } catch (error) {
         console.error('Error:', error);
         setError('Failed to post dummy data. Please try again.');
       }

      
   
       const downloadPromises = pdfElements.map(({ elementId, filename, margin, format }) => {
           const element = document.getElementById(elementId);
           const options = {
               margin: margin,
                filename: filename,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                // jsPDF: { unit: 'in', format: [8.5, 10.99],  /*format: 'letter',*/ orientation: 'portrait' }
                jsPDF: { unit: 'in', format: format, orientation: 'portrait' }
            };
    
            return html2pdf().from(element).set(options).save();
        });
    
        // Wait for all downloads to complete

       
        await Promise.all(downloadPromises);

       
        
    }



    const clearAll = () => {
        personalInfo.name =""
        setPersonalInfo(personalInfo.name ="")
    }


    const handleReload = () => {
        // window.location.reload();
      };
    


    

    const shareCV = () => {
        const doc = new jsPDF();
        const content = ` 
            Personal Info: ${JSON.stringify(personalInfo, null, 2)}
            Education Info: ${JSON.stringify(educationInfo, null, 2)}
            Career Info: ${JSON.stringify(careerInfo, null, 2)}
            Project Info: ${JSON.stringify(projectInfo, null, 2)}
            Skills Info: ${JSON.stringify(skillInfo, null, 2)}
            Reference Info: ${JSON.stringify(referenceInfo, null, 2)}
        `;
        doc.text(content, 10, 10);
        const pdfBlob = doc.output('blob');
        const pdfUrl = URL.createObjectURL(pdfBlob);
        const message = "Check out my CV!";
        const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}%0A${encodeURIComponent(pdfUrl)}`;
        window.open(whatsappUrl, '_blank');
    };

    const updateText = (e) => {
        let targetStateArea = e.target.id.split('-')[0];
        let targetStateField = e.target.id.split('-')[1];

        const currState = { ...eval(targetStateArea) }; // Use eval carefully
        if (Array.isArray(currState[targetStateField])) {
            let arrIndex = e.target.id.split('-')[2];
            currState[targetStateField][arrIndex][e.target.id.split('-')[3]] = e.target.value;
        } else {
            currState[targetStateField] = e.target.value;
        }

        switch (targetStateArea) {
            case 'sponsorInformation': 
               setSponsorInfo(currState);
                break;
            case 'personalInfo':
                setPersonalInfo(currState);
                break;
            case 'educationInfo':
                setEducationInfo(currState);
                break;
            case 'careerInfo':
                setCareerInfo(currState);
                break;
            case 'projectInfo':
                setProjectInfo(currState);
                break;
            case 'skillInfo':
                setSkillInfo(currState);
                break;
            case 'referenceInfo':
                setReferenceInfo(currState);
                break;
            default:
                break;
        }
    };

    const addRecord = (e) => {
        let targetStateArea = e.target.id.split('-')[0];
        let targetStateField = e.target.id.split('-')[1];
        const currState = { ...eval(targetStateArea) };

        let count = currState[targetStateField];
        let newRecord = typeof count[0] === 'object' ? { ...count[0] } : '';

        for (let item in newRecord) {
            newRecord[item] = '';
        }

        count.push(newRecord);
        currState[targetStateField] = count;

        switch (targetStateArea) {
            case 'sponsorInformation': 
               setSponsorInfo(currState);
                break;
            case 'personalInfo': 
                setPersonalInfo(currState);
                break;
            case 'educationInfo':
                setEducationInfo(currState);
                break;
            case 'careerInfo':
                setCareerInfo(currState);
                break;
            case 'projectInfo':
                setProjectInfo(currState);
                break;
            case 'skillInfo':
                setSkillInfo(currState);
                break;
            case 'referenceInfo':
                setReferenceInfo(currState);
                break;
            default:
                break;
        }
    };

    const shareUrl = "https://yourwebsite.com"; // Replace with your actual URL
    const title = "Check out my CV!";


    //////////////////////////////   handle paste
    const [pastedData, setPastedData] = useState('');

    const handlePastea = async () => {
      try {
        // Use the Clipboard API to read the clipboard data
        const clipboardText = await navigator.clipboard.readText();
        setPastedData(clipboardText);
      } catch (err) {
        console.error('Failed to read clipboard contents: ', err);
      }
    };



    ////////////////////////////// handle paste end

    return (
        <div onPaste={!isInputFocused ? handlePaste : undefined}  className="" >
            
            <Header /> 
            
             
       <div className="cv-builder-container">
    <h2 className="text-center mt-2 title">N-Tech agent</h2>
   
    <Dialog open={showModal} onClose={cancelSubmission}>
        <DialogTitle>Confirm Submission</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to Download?</p>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={cancelSubmission} 
            style={{ backgroundColor: '#f44336', color: 'white' }} // Red for "Back"
          >
            Back
          </Button>
          <Button 
            onClick={downloadcvanyway} 
            style={{ backgroundColor: '#4caf50', color: 'white' }} // Green for "Proceed anyway"
          >
            Proceed anyway
          </Button>
        </DialogActions>
      </Dialog>

     


      <Dialog open={showsubmitModal} onClose={cancelSubmission}>
        <DialogTitle>Confirm Submission</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to submit the form?</p>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={cancelSubmissionforsave} 
            style={{ backgroundColor: '#f44336', color: 'white' }} // Red for "Back"
          >
            Back
          </Button>
          <Button 
            onClick={submitanyway} 
            style={{ backgroundColor: '#4caf50', color: 'white' }} // Green for "Proceed anyway"
          >
            Proceed anyway
          </Button>
        </DialogActions>
      </Dialog>

    

    {/* <div className="image-upload-section">
       
        <div className="image-upload">
            {allImage && allImage.length > 0 ? (
                <div className="image-preview">
                    <img
                        className="input-personal-image"
                        alt="Personal"
                        src={
                            fileName !== "No file chosen yet"
                                ? imagePlaceholder
                                : require(`../images/${allImage[allImage.length - 1].image}`)
                        }
                        onClick={() => fileInputRef.current.click()}
                    />
                </div>
            ) : (
                <div className="no-image">No images uploaded yet.</div>
            )}

            <form onSubmit={submitImage} className="file-upload-form">
                <input
                    type="file"
                    accept="image/*"
                    onChange={onInputChange}
                    style={{ display: "none" }}
                    ref={fileInputRef}
                />
                <label>
                    <span>Personal Image <span style={{ color: 'red' }}>*</span></span>
                    <button type="button" onClick={() => fileInputRef.current.click()}>Choose File</button>
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>

        <div className="image-upload">
          

{applicantpassportallimage && applicantpassportallimage.length > 0 ? (
                <div className="image-preview">
                    <img
                        className="input-personal-image"
                        alt="Personal"
                        src={
                            applicantPassportfileName !== "No file chosen yet"
                                ? imagePlaceholder
                                : require(`../applicantimage/${applicantpassportallimage[applicantpassportallimage.length - 1].image}`)
                        }
                        onClick={() => applicantFileInputRef.current.click()}
                    />
                </div>
            ) : (
                <div className="no-image">No images uploaded yet.</div>
            )}

            <form onSubmit={applicantssubmitImage} className="file-upload-form">
                <input
                    type="file"
                    accept="image/*"
                    onChange={applicantonInputChange}
                    style={{ display: "none" }}
                    ref={applicantFileInputRef}
                />
                <label>
                    <span>applicant Personal Image <span style={{ color: 'red' }}>*</span></span>
                <button type="button" onClick={() => applicantFileInputRef.current.click()}>Choose File</button>
                </label>
                <button type="submit">Submitkkjjjjj ${personalInfo.email}</button>
            </form>
        </div>

      
        <div className="image-upload">
            {passportallimage && passportallimage.length > 0 ? (
                <div className="image-preview">
                    <img
                        className="input-personal-image"
                        alt="Passport"
                        src={
                             require(`../passport_image/${passportallimage[passportallimage.length - 1].image}`)
                        }
                        onClick={() => pfileInputRef.current.click()}
                    />
                </div>
            ) : (
                <div className="no-image">No images uploaded yet.</div>
            )}

            <form onSubmit={passsubmitImage} className="file-upload-form">
                <input
                    type="file"
                    accept="image/*"
                    onChange={passonInputChange}
                    style={{ display: "none" }}
                    ref={pfileInputRef}
                />
                <label>
                    <span>Passport Image <span style={{ color: 'red' }}>*</span></span>
                    <button type="button" onClick={() => pfileInputRef.current.click()}>Choose Passport Image</button>
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    </div> */}



    <div className="image-upload">
           
                <div className="image-preview">
                    <img
                        className="input-personal-image"
                        alt="Personal"
                        src={
                            applicantpersonalimagePreview !== null
                                ? applicantpersonalimagePreview
                                : imagePlaceholder
                        }
                        onClick={() => applicantpersonalimagefileInputRef.current.click()}
                    />
                </div>
                <input
                    type="file"
                    accept="image/*"
                    onChange={onInputChangeforpersonalimage}
                    style={{ display: "none" }}
                    ref={applicantpersonalimagefileInputRef}
                />
                <label>
                    <span>Personal Image <span style={{ color: 'red' }}>*</span></span>
                    {/* <button type="button" onClick={() => fileInputRef.current.click()}>Choose File</button> */}
                </label>
               
                {!applicantpersonalimagePreview && personalInfo.emptyfield ? <div style={{color: "red"}}>this field is required</div> : ""}
        </div>


        {/* full body image */}


        <div className="image-upload">
           
                <div className="image-preview">
                    <img
                        className="input-personal-image"
                        alt="Personal"
                        src={
                            applicantfullbodyimagePreview !== null
                                ? applicantfullbodyimagePreview
                                : imagePlaceholder
                        }
                        onClick={() => applicantfullbodyimagefileInputRef.current.click()}
                    />
                </div>
                <input
                    type="file"
                    accept="image/*"
                    onChange={onInputChangeforfullbodyimage}
                    style={{ display: "none" }}
                    ref={applicantfullbodyimagefileInputRef}
                />
                <label>
                    <span>Full Body Image <span style={{ color: 'red' }}>*</span></span>
                    {/* <button type="button" onClick={() => fileInputRef.current.click()}>Choose File</button> */}
                </label>
               
                {!applicantfullbodyimagePreview && personalInfo.emptyfield ? <div style={{color: "red"}}>this field is required</div> : ""}
        </div>



        {/* passport image */}



        <div className="image-upload">
            <FormControlLabel
                control={
                    <Switch
                        checked={toggleState}
                        onChange={handleToggleChange}
                        color="primary"
                    />
                }
                label="Read Passport Data"
            />

            <div className="image-preview">
                <img
                    className="input-personal-image"
                    alt="Personal"
                    src={
                        applicantpassportimagePreview !== null
                            ? applicantpassportimagePreview
                            : imagePlaceholder
                    }
                    onClick={() => applicantpassportimagefileInputRef.current.click()}
                />
            </div>
            <input
                type="file"
                accept="image/*"
                onChange={onInputChangeforpassportimage}
                style={{ display: "none" }}
                ref={applicantpassportimagefileInputRef}
            />
            <label>
                <span>Passport Image <span style={{ color: 'red' }}>*</span></span>
            </label>

            {!applicantpassportimagePreview && personalInfo.emptyfield ? (
                <div style={{ color: "red" }}>This field is required</div>
            ) : null}
        </div>


      {/* video uploader */}


        <div className="image-upload">
           
                <div className="image-preview">
                    <img
                        className="input-personal-image"
                        alt="Personal"
                        src={
                            videoPreview !== null
                                ? VidoUploaded
                                : imagePlaceholder
                        }
                        onClick={() => videofileInputRef.current.click()}
                    />
                </div>
                <input
                    type="file"
                    accept="video/*"
                    onChange={onInputChangeforVideo}
                    style={{ display: "none" }}
                    ref={videofileInputRef}
                />
                <label>
                    <span>Applicant Video (optional)<span style={{ color: 'red' }}></span></span>
                    {/* <button type="button" onClick={() => fileInputRef.current.click()}>Choose File</button> */}
                </label>
               
            
        </div>


    {/* <form onSubmit={submitImageforapplicant}>
        <input type="file" accept="image/*" onChange={onInputChangeforpersonalimage} />
        {applicantpersonalimagePreview1 && <img src={applicantpersonalimagePreview1} alt="Preview 1" height={100} width={100} />}
        <input type="file" accept="image/*" onChange={onInputChangeforfullbodyimage} />
        <button type="submit">Submit</button>
      </form> */}

    {/* Input Sections */}

   {applicantpassportimagePreview && toggleState && <div style={{marginTop: "30px"}}>
    <Box mb={3}>
                <Alert severity="warning">
                    Please check passport data, especially the <span style={{color: 'red'}}>First Name</span> and <span style={{color: "red"}}>Middle Name</span> field.

                    <div style={{marginTop: "10px", display: "flex", justifyContent: "space-between"}}><span>First Name: <span style={{color: "red"}}>{checkPassportdata.firstName}</span>  <span><button onClick={() => setPersonalInfo(prev => ({ ...prev, name: checkPassportdata.firstName }))}>add</button></span> </span>  <span>Middle Name: <span style={{color: "red"}}>{checkPassportdata.MiddleName}</span> <span><button onClick={() => setPersonalInfo(prev => ({ ...prev, middleName: checkPassportdata.MiddleName }))}>add</button></span> </span></div>
                </Alert>

                {/* <Alert severity="warning">
                    
                </Alert> */}
                
            </Box>
            </div>}

           

        <div style={{ padding: '20px' }}>
      <button onClick={handlePaste}>Paste Data for Mosand</button>

      {/* <div>{projectInfo.project[0].careoftheelderly} nnnn</div> */}
      
    </div>
    <NameArea callback={updateText} validationErrors={validationErrors} info={personalInfo} newField={addRecord} onInputFocus={() => setIsInputFocused(true)} 
        onInputBlur={() => setIsInputFocused(false)}   />
    
    <SponsorInformation callback={updateText} validationErrors={validationErrors} info={sponsorInformation} newField={addRecord} onInputFocus={() => setIsInputFocused(true)} 
        onInputBlur={() => setIsInputFocused(false)}    />
    <Container maxWidth="xs">
    {/* <Grid container spacing={2} alignItems="center">
          <Grid item xs={6}>
            
            <TextField
              label="Date of Birth"
              type="date"
              fullWidth
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
            {!dob && personalInfo.emptyfield === true ? <div style={{color: "red"}}>this field is required</div> : ""}
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Age"
              type="number"
              fullWidth
              value={age}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
        </Grid> */}
        
        {/* Error Message */}
        {/* {errorMessage && (
          <Typography variant="body2" color="error" sx={{ mt: 1 }}>
            {errorMessage}
          </Typography>
        )} */}

     


<Grid container spacing={2} alignItems="center" sx={{ mt: 2 }}>
                    <Grid item xs={6}>
                        <TextField
                            label="Date of Issue"
                            type="date"
                            fullWidth
                            value={dateOfIssue}
                            onChange={(e) => setDateOfIssue(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        {!dateOfIssue && personalInfo.emptyfield == true ? <div style={{color: "red"}}>this field is required</div> : ""}
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label=""
                            type="date"
                            fullWidth
                            value={dateOfExpiry}
                            onChange={(e) => setDateOfExpiry(e.target.value)} 
                            // InputProps={{
                            //     readOnly: true,
                            // }}
                        />
                        {!dateOfExpiry && personalInfo.emptyfield == true ? <div style={{color: "red"}}>this field is required</div> : ""}
                    </Grid>
                </Grid>

                {/* Expiry Error Message */}
                {expiryError && (
                    <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                        {expiryError}
                    </Typography>
                )}
        
    </Container>
   
    {/* <EducationInputs callback={updateText} info={educationInfo} newField={addRecord} /> */}
    {/* <CareerInputs callback={updateText} info={careerInfo} newField={addRecord} /> */}
    {/* {projectInfo.project[0]?.name && <div>ssss</div>}
{projectInfo.project.map(i => <div>{i.name}</div>)}
{projectInfo.project.map(i => <div>{i.link}</div>)}
{projectInfo.project.map(i => <div>{i.overview}</div>)} */}

    <ProjectInputs callback={updateText} info={projectInfo} newField={addRecord} onInputFocus={() => setIsInputFocused(true)} 
        onInputBlur={() => setIsInputFocused(false)} />
    {/* <SkillsInput callback={updateText} info={skillInfo} newField={addRecord} /> */}
    {/* <ReferenceInput callback={updateText} info={referenceInfo} newField={addRecord} /> */}
    {/* <DocumentStyle /> */}
    <Box sx={{ boxShadow: 3, borderRadius: 2, mt: 4, p: 3 }} translate='no'>
            <Typography variant="h6" gutterBottom>
                Select EXPERIANCE
            </Typography>
            {/* <FormControlLabel
                control={
                    <Checkbox
                        checked={expcheck.all}
                        onChange={handleExpChange}
                        name="all"
                    />
                }
                label="All"
            /> */}

           
            <FormControlLabel
                control={
                    <Checkbox
                        checked={expcheck.exp1}
                        onChange={handleExpChange}
                        name="exp1"
                        // disabled={projectInfo.project[0].name === ""}
                    />
                }
                label="BABY SITTING"
            />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={expcheck.exp2}
                        onChange={handleExpChange}
                        name="exp2"
                        // disabled={projectInfo.project[0].name === ""}
                    />
                }
                label="CLEANING"
            />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={expcheck.exp3}
                        onChange={handleExpChange}
                        name="exp3"
                        // disabled={projectInfo.project[0].name === ""} // Disable if age is less than 18
                    />
                }
                label="WASHING"
            />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={expcheck.exp4}
                        onChange={handleExpChange}
                        name="exp4"
                        // disabled={projectInfo.project[0].name === ""}
                    />
                }
                label="COOKING"
            />
          
            <FormControlLabel
                control={
                    <Checkbox
                        checked={expcheck.exp5}
                        onChange={handleExpChange}
                        name="exp5"
                        // disabled={projectInfo.project[0].name === ""}
                    />
                }
                label="ELDER CARE"
            />

           

{/* <FormControlLabel
                control={
                    <Checkbox
                        checked={expcheck.childerncare}
                        onChange={handleExpChange}
                        name="childerncare"
                        // disabled={projectInfo.project[0].name === ""}
                    />
                }
                label="Childern Care"
            />*/}


<FormControlLabel
                control={
                    <Checkbox
                        checked={expcheck.ironingclothes}
                        onChange={handleExpChange}
                        name="ironingclothes"
                        // disabled={projectInfo.project[0].name === ""}
                    />
                }
                label="Ironing Clothes"
            /> 
           
        </Box>

   
    <div style={{ margin: '20px' }}>
            <Typography variant="h6" gutterBottom>
                Monthly Salary
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField 
                        fullWidth 
                        label="Saudi (SAR)" 
                        variant="outlined" 
                        type="text" 
                        name="saudi" 
                        value={salaries.saudi} 
                        onChange={handleChange} 
                        onFocus={() => setIsInputFocused(true)} // Set input focused
            onBlur={() => setIsInputFocused(false)}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField 
                        fullWidth 
                        label="Jordan ($)" 
                        variant="outlined" 
                        type="text" 
                        name="jordan" 
                        value={salaries.jordan} 
                        onChange={handleChange} 
                        onFocus={() => setIsInputFocused(true)} // Set input focused
            onBlur={() => setIsInputFocused(false)}
                    />
                </Grid>
            </Grid>
           
        </div>
        <Box sx={{ boxShadow: 3, borderRadius: 2, mt: 4, p: 3 }} translate='no'>
            <Typography variant="h6" gutterBottom>
                Select Agent
            </Typography>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={styles.all}
                        onChange={handleStyleChange}
                        name="all"
                    />
                }
                label="All"
            />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={styles.styleOne}
                        onChange={handleStyleChange}
                        name="styleOne"
                        disabled={personalInfo.age < 21}
                    />
                }
                label="Golden agent"
            />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={styles.styleTwo}
                        onChange={handleStyleChange}
                        name="styleTwo"
                        disabled={personalInfo.age < 21}
                    />
                }
                label="Bela Hodod"
            />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={styles.styleThree}
                        onChange={handleStyleChange}
                        name="styleThree"
                        disabled={personalInfo.age < 18} // Disable if age is less than 18
                    />
                }
                label="Assawsanah"
            />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={styles.styleFour}
                        onChange={handleStyleChange}
                        name="styleFour"
                        disabled={personalInfo.age < 21}
                    />
                }
                label="Baraka"
            /> 


<FormControlLabel
                control={
                    <Checkbox
                        checked={styles.kaanCvStyle}
                        onChange={handleStyleChange}
                        name="kaanCvStyle"
                        // disabled={personalInfo.age < 21}
                    />
                }
                label="kaan"
            />

<FormControlLabel
                control={
                    <Checkbox
                        checked={styles.QimamCvStyle}
                        onChange={handleStyleChange}
                        name="QimamCvStyle"
                        // disabled={personalInfo.age < 21}
                    />
                }
                label="Qimam"
            />
            {/* Uncomment if needed
            <FormControlLabel
                control={
                    <Checkbox
                        checked={styles.styleFive}
                        onChange={handleStyleChange}
                        name="styleFive"
                    />
                }
                label="Al wasit"
            />
            */}
        </Box>

    <div className="action-buttons">
    
        <button type="button" id="postBtn" onClick={submitImageforapplicant}>Save</button>
        {/* <div>{isSubmitting ? "ttrue" : "ffalse"}</div> */}
        {/* <button type="button" id="postBtn" onClick={applicantssubmitImage}>applicantssubmitImage</button> */}
        {/* <button type="button" id="shareBtn" onClick={shareCV}>Share CV on WhatsApp</button> */}
        <button type="button" id="clearallBtn" onClick={handleClearAll}>Clear All</button>
        {applicantpersonalimagePreview && sponsorInformation.visaNo && sponsorInformation.sponsorName && personalInfo.applicationNo && personalInfo.name && personalInfo.middleName && personalInfo.surname && personalInfo.dateOfBirth && personalInfo.placeOfBirth && sponsorInformation.currentNationality && personalInfo.sex && personalInfo.maritalStatus && personalInfo.religion && personalInfo.educationAttainment && personalInfo.postAppliedFor && sponsorInformation.visaType && personalInfo.passportIssuePlace  && personalInfo.passportNo && dateOfExpiry && <button type="button" id="downloadEmbassyBtn" onClick={downloadEmbassyCV}>Download Embassy Application</button>}
        <button type="button" onClick={downloadMultipleCVs}>Download CVs</button>
    </div>

    <div className="social-share">
        <h3>Share on Social Media:</h3>
        <FacebookShareButton url={shareUrl} quote={title}>
            <FacebookIcon margin={50} size={32} round={true} />
        </FacebookShareButton>
        <TwitterShareButton url={shareUrl} title={title}>
            <TwitterIcon size={32} round={true} />
        </TwitterShareButton>
        <LinkedinShareButton url={shareUrl} title={title}>
            <LinkedinIcon size={32} round={true} />
        </LinkedinShareButton>
    </div>
</div>

<ToastContainer position="top-center" />   



    
    {/* Hidden content for PDF generation */}
    <div style={{ display: 'none' }} translate='no'>
        <div id="cvContent1">
        <div className="container">
                {/* Page 1 */}
                {/* <div>
<form onSubmit={this.submitImage}>
  <input
    type="file"
    accept="image/*"
    onChange={this.onInputChange}
  />
  <button type="submit">Submit</button>
</form>
{this.state.allImage == null
  ? ""
  : this.state.allImage.map((data, index) => (
      <img
        key={index}
        alt=""
        src={require(`.../images/${data.image}`)}
        height={100}
        width={100}
      />
    ))}
</div> */}
                <div style={{ pageBreakAfter: 'always' }}> 
                    <div className="header">
                    
<div className="personal-image-parent">
<img
className="personal-image"
alt=""
src={applicantpersonalimagePreview !== null
    ? applicantpersonalimagePreview
    : imagePlaceholder} // Get the last image

/>

</div>

                      <div className="wider-image-parent">
                      <img src={hudud} alt="Wider" className="wider-image" /></div>  
                    </div>
                    <div className="title-parent">
                        <div style={{display: "flex", justifyContent: "space-around", border: "none"}}><div style={{ border: "none"}}>Personal Information</div>  <div style={{ border: "none"}}> ممعلومات شخصية </div></div>
                        <div style={{display: "flex", justifyContent: "center", alignItems: "center",}}>CODE NO</div>
                        <div style={{display: "flex", justifyContent: "center", alignItems: "center",}}>J{formatCount(count)}</div>
                    </div>
                    <div className="table-main-parent">
                    <div class="table-parent">
<div>NAME</div>
<div>{personalInfo.name} {personalInfo.middleName}</div>
<div>الاسم</div>
<div>SURNAME</div>
<div>{personalInfo.surname}</div>
<div>اسم العائلة</div>
<div>PLACE Of Birth</div>
<div>{personalInfo.placeOfBirth}</div>
<div>مكان الولادة</div>
<div>AGE</div>
<div>{personalInfo.age}</div>
<div>العمر</div>
<div>PASSPORT NO</div>
<div>{personalInfo.passportNo}</div>
<div>رقم جواز السفر</div>
<div>DATE OF BIRTH</div>
<div>{personalInfo.dateOfBirth}</div>
<div>تاريخ الميلاد</div>
<div>DATE OF ISSUE</div>
<div>{dateOfIssue}</div>

<div>تاريخ الاصدار</div>
<div>DATE OF EXPIRY</div>
<div>{dateOfExpiry}</div>
<div>تاريخ الانتهاء</div>
<div>NATIONALITY</div>
<div>{sponsorInformation.currentNationality}</div>
<div>الجنسية</div>
<div style={{height: 35}}>MARITAL STATUS</div>
<div style={{height: 35}}>{personalInfo.maritalStatus}</div>
<div style={{height: 35}}>الحالة الاجتماعية</div>
<div style={{height: 35}} >NUMBER OF CHILDREN</div>
<div style={{height: 35}}>{personalInfo.numberOfChildren}</div>
<div style={{height: 35}}>عدد الاطفال</div>
<div>RELIGION</div>
<div>{personalInfo.religion}</div>
<div>الديانة</div>
<div>WEIGHT</div>
<div>{personalInfo.weight}{personalInfo.weight ? " km" : ""}</div>
<div>الوزن</div>
<div>HEIGHT</div>

<div>{personalInfo.height}{personalInfo.height ? " cm" : ""}</div>
<div>الطول</div>
<div style={{height: 35}}>EDUCATIONAL ATTAINMENT</div>
<div style={{height: 35}}>{personalInfo.educationAttainment}</div>
<div style={{height: 35}}>المستوى الدراسي</div>
<div style={{height: 35}}>POST APPLIED FOR</div>
<div style={{height: 35}}>{personalInfo.postAppliedFor}</div>
<div style={{height: 35}}>الوظيفة المتقدمة اليها</div>
<div style={{height: 35}}>MONTHLY SALARY</div>
<div style={{height: 35}}> {salaries.saudi}{salaries.saudi ? " SAR" : ""}</div>
<div style={{height: 35}}>الراتب الشهري</div>
<div style={{height: 35}}>CONTRACT PERIOD</div>
<div style={{height: 35}}>{sponsorInformation.contract}</div>
<div style={{height: 35}}>مدة التعاقد</div>
<div style={{height: 35}}>ARABIC DEGREE</div>
<div style={{height: 35}}>{personalInfo.arabicDegree}</div>
<div style={{height: 35}}>مستوى اللغة العربية</div>
<div style={{height: 39}}>ENGLISH DEGREE</div>
<div style={{height: 39}}>{personalInfo.englishDegree}</div>
<div style={{height: 39}}>مستوى اللغة الانجليزية</div>
</div>
                        <div className="second-side">
                            <div>
                                <img src={applicantfullbodyimagePreview !== null
    ? applicantfullbodyimagePreview
    : imagePlaceholder} alt="Full Body" className="full-body-image" />
                            </div>
                            <div>
                                <img src={demoimage} alt="Agent Logo" className="agent-logo" />
                            </div>
                        </div>
                    </div>

                    <div className="second-section-parent">

                    <div className="phone-number-sec">
                        <div>OWN PHONE NUMBER</div>
                        <div style={{background: "white"}}>{personalInfo.ownPhoneNumber}</div>
                        <div>رقم الهاتف الشخصي</div>
                    </div>
                    <div className="cphone-number-sec">
                        <div>CONTACT PHONE NUMBER</div>
                        <div style={{background: "white"}}>{personalInfo.contactPhoneNumber}</div>
                        <div>رقم الهاتف الاقارب</div>
                    </div>



                    <div className="experience-country-sec">
<div>EXPERIANCE COUNTRY</div>
<div>{projectInfo.project.map(i =>  <span style={{marginRight: "3px"}}>{i.name}{i.name ? "," : ""} </span> )} </div>
<div>خبرة البلد</div>
</div>





<div className="experience-country-sec">
<div>WORKING YEARS</div>
<div>{projectInfo.project.map(i =>  <span style={{marginRight: "3px"}}>{i.overview}{i.overview ? "," : ""} </span> )}</div>
<div>وعدد سنوات الخبرة</div>
</div>

                    {/* {projectInfo.project.map(i => 
                        
<>
<div className="experience-country-sec">
<div>EXPERIANCE COUNTRY</div>
<div>{i.name}</div>
<div>خبرة البلد</div>
</div>





<div className="experience-country-sec">
<div>WORKING YEARS</div>
<div>{i.overview}</div>
<div>وعدد سنوات الخبرة</div>
</div>

</>



                    )} */}
                   




                    <div className="specific-exp-atitle-sec">
                        <div>تربية الاطفال</div>
                        <div>النظافة</div>
                        <div>الغسيل</div>
                        <div>الطبخ</div>
                        <div>العناية بالمسنين</div>
                    </div>
                    <div className="specific-exp-etitle-sec">
                        <div>BABY SITTING</div>
                        <div>CLEANING</div>
                        <div>WASHING</div>
                        <div>COOKING</div>
                        <div>ELDER CARE</div>
                    </div>
                    <div className="exp-trueorfalse-sec">
                        <div>{expcheck.exp1 ? "YES" : "NO"}</div>
                        <div>{expcheck.exp2 ? "YES" : "NO"}</div>
                        <div>{expcheck.exp3 ? "YES" : "NO"}</div>
                        <div>{expcheck.exp4 ? "YES" : "NO"}</div>
                        <div>{expcheck.exp5 ? "YES" : "NO"}</div>
                    </div>

                    </div>

                    

                </div>

                
                {/* Page 2 */}
                <div style={{display: "flex", justifyContent: "center", fontSize: 20, marginBottom: 30}}>Passport</div>

                <div className="passport-image-parent">
                
<div>
<img
className="passport-image"
alt=""
src={applicantpassportimagePreview !== null
    ? applicantpassportimagePreview
    : imagePlaceholder} 

/>

</div>
</div>
            </div>
        </div>

        
       {/*  next content 2 */}


       <div id="cvContent2" translate='no'>
        <div className="container">
                {/* Page 1 */}
                {/* <div>
<form onSubmit={this.submitImage}>
  <input
    type="file"
    accept="image/*"
    onChange={this.onInputChange}
  />
  <button type="submit">Submit</button>
</form>
{this.state.allImage == null
  ? ""
  : this.state.allImage.map((data, index) => (
      <img
        key={index}
        alt=""
        src={require(`.../images/${data.image}`)}
        height={100}
        width={100}
      />
    ))}
</div> */}
                <div style={{ pageBreakAfter: 'always' }}> 
                    <div className="header">
                    
<div className="personal-image-parent">
<img
className="personal-image"
alt=""
src={applicantpersonalimagePreview !== null
    ? applicantpersonalimagePreview
    : imagePlaceholder} // Get the last image

/>

</div>

                      <div className="wider-image-parent">
                      <img src={goldagent} alt="Wider" className="wider-image" /></div>  
                    </div>
                    <div className="title-parent">
                        <div style={{display: "flex", justifyContent: "space-around", border: "none"}}><div style={{ border: "none"}}>Personal Information</div>  <div style={{ border: "none"}}> ممعلومات شخصية </div></div>
                        <div style={{display: "flex", justifyContent: "center", alignItems: "center",}}>CODE NO</div>
                        <div style={{display: "flex", justifyContent: "center", alignItems: "center",}}>J{formatCount(count)}</div>
                    </div>
                    <div className="table-main-parent">
                    <div class="table-parent">
<div>NAME</div>
<div>{personalInfo.name} {personalInfo.middleName}</div>
<div>الاسم</div>
<div>SURNAME</div>
<div>{personalInfo.surname}</div>
<div>اسم العائلة</div>
<div>PLACE Of Birth</div>
<div>{personalInfo.placeOfBirth}</div>
<div>مكان الولادة</div>
<div>AGE</div>
<div>{personalInfo.age}</div>
<div>العمر</div>
<div>PASSPORT NO</div>
<div>{personalInfo.passportNo}</div>
<div>رقم جواز السفر</div>
<div>DATE OF BIRTH</div>
<div>{personalInfo.dateOfBirth}</div>
<div>تاريخ الميلاد</div>
<div>DATE OF ISSUE</div>
<div>{dateOfIssue}</div>

<div>تاريخ الاصدار</div>
<div>DATE OF EXPIRY</div>
<div>{dateOfExpiry}</div>
<div>تاريخ الانتهاء</div>
<div>NATIONALITY</div>
<div>{sponsorInformation.currentNationality}</div>
<div>الجنسية</div>
<div style={{height: 35}}>MARITAL STATUS</div>
<div style={{height: 35}}>{personalInfo.maritalStatus}</div>
<div style={{height: 35}}>الحالة الاجتماعية</div>
<div style={{height: 35}} >NUMBER OF CHILDREN</div>
<div style={{height: 35}}>{personalInfo.numberOfChildren}</div>
<div style={{height: 35}}>عدد الاطفال</div>
<div>RELIGION</div>
<div>{personalInfo.religion}</div>
<div>الديانة</div>
<div>WEIGHT</div>
<div>{personalInfo.weight}{personalInfo.weight ? " km" : ""}</div>
<div>الوزن</div>
<div>HEIGHT</div>

<div>{personalInfo.height}{personalInfo.height ? " cm" : ""}</div>
<div>الطول</div>
<div style={{height: 35}}>EDUCATIONAL ATTAINMENT</div>
<div style={{height: 35}}>{personalInfo.educationAttainment}</div>
<div style={{height: 35}}>المستوى الدراسي</div>
<div style={{height: 35}}>POST APPLIED FOR</div>
<div style={{height: 35}}>{personalInfo.postAppliedFor}</div>
<div style={{height: 35}}>الوظيفة المتقدمة اليها</div>
<div style={{height: 35}}>MONTHLY SALARY</div>
<div style={{height: 35}}> {salaries.saudi}{salaries.saudi ? " SAR" : ""}</div>
<div style={{height: 35}}>الراتب الشهري</div>
<div style={{height: 35}}>CONTRACT PERIOD</div>
<div style={{height: 35}}>{sponsorInformation.contract}</div>
<div style={{height: 35}}>مدة التعاقد</div>
<div style={{height: 35}}>ARABIC DEGREE</div>
<div style={{height: 35}}>{personalInfo.arabicDegree}</div>
<div style={{height: 35}}>مستوى اللغة العربية</div>
<div style={{height: 39}}>ENGLISH DEGREE</div>
<div style={{height: 39}}>{personalInfo.englishDegree}</div>
<div style={{height: 39}}>مستوى اللغة الانجليزية</div>
</div>
                        <div className="second-side">
                            <div>
                                <img src={applicantfullbodyimagePreview !== null
    ? applicantfullbodyimagePreview
    : imagePlaceholder} alt="Full Body" className="full-body-image" />
                            </div>
                            <div>
                                <img src={demoimage} alt="Agent Logo" className="agent-logo" />
                            </div>
                        </div>
                    </div>

                    <div className="second-section-parent">

                    <div className="phone-number-sec">
                        <div>OWN PHONE NUMBER</div>
                        <div style={{background: "white"}}>{personalInfo.ownPhoneNumber}</div>
                        <div>رقم الهاتف الشخصي</div>
                    </div>
                    <div className="cphone-number-sec">
                        <div>CONTACT PHONE NUMBER</div>
                        <div style={{background: "white"}}>{personalInfo.contactPhoneNumber}</div>
                        <div>رقم الهاتف الاقارب</div>
                    </div>



                    <div className="experience-country-sec">
<div>EXPERIANCE COUNTRY</div>
<div>{projectInfo.project.map(i =>  <span style={{marginRight: "3px"}}>{i.name}{i.name ? "," : ""} </span> )} </div>
<div>خبرة البلد</div>
</div>





<div className="experience-country-sec">
<div>WORKING YEARS</div>
<div>{projectInfo.project.map(i =>  <span style={{marginRight: "3px"}}>{i.overview}{i.overview ? "," : ""} </span> )}</div>
<div>وعدد سنوات الخبرة</div>
</div>

                    {/* {projectInfo.project.map(i => 
                        
<>
<div className="experience-country-sec">
<div>EXPERIANCE COUNTRY</div>
<div>{i.name}</div>
<div>خبرة البلد</div>
</div>





<div className="experience-country-sec">
<div>WORKING YEARS</div>
<div>{i.overview}</div>
<div>وعدد سنوات الخبرة</div>
</div>

</>



                    )} */}
                   




                    <div className="specific-exp-atitle-sec">
                        <div>تربية الاطفال</div>
                        <div>النظافة</div>
                        <div>الغسيل</div>
                        <div>الطبخ</div>
                        <div>العناية بالمسنين</div>
                    </div>
                    <div className="specific-exp-etitle-sec">
                        <div>BABY SITTING</div>
                        <div>CLEANING</div>
                        <div>WASHING</div>
                        <div>COOKING</div>
                        <div>ELDER CARE</div>
                    </div>
                    <div className="exp-trueorfalse-sec">
                        <div>{expcheck.exp1 ? "YES" : "NO"}</div>
                        <div>{expcheck.exp2 ? "YES" : "NO"}</div>
                        <div>{expcheck.exp3 ? "YES" : "NO"}</div>
                        <div>{expcheck.exp4 ? "YES" : "NO"}</div>
                        <div>{expcheck.exp5 ? "YES" : "NO"}</div>
                    </div>

                    </div>

                    

                </div>

                
                {/* Page 2 */}
                <div style={{display: "flex", justifyContent: "center", fontSize: 20, marginBottom: 30}}>Passport</div>

                <div className="passport-image-parent">
                
<div>
<img
className="passport-image"
alt=""
src={applicantpassportimagePreview !== null
    ? applicantpassportimagePreview
    : imagePlaceholder} 

/>

</div>
</div>
            </div>
        </div>


        {/* next content 3 */}


        <div id="cvContent3" translate='no'>
        <div className="container">
                {/* Page 1 */}
                {/* <div>
<form onSubmit={this.submitImage}>
  <input
    type="file"
    accept="image/*"
    onChange={this.onInputChange}
  />
  <button type="submit">Submit</button>
</form>
{this.state.allImage == null
  ? ""
  : this.state.allImage.map((data, index) => (
      <img
        key={index}
        alt=""
        src={require(`.../images/${data.image}`)}
        height={100}
        width={100}
      />
    ))}
</div> */}
                <div style={{ pageBreakAfter: 'always' }}> 
                    <div className="header">
                    
<div className="personal-image-parent">
<img
className="personal-image"
alt=""
src={applicantpersonalimagePreview !== null
    ? applicantpersonalimagePreview
    : imagePlaceholder} // Get the last image

/>

</div>

                      <div className="wider-image-parent">
                      <img src={demoimage} alt="Wider" className="wider-image" /></div>  
                    </div>
                    <div className="title-parent">
                        <div style={{display: "flex", justifyContent: "space-around", border: "none"}}><div style={{ border: "none"}}>Personal Information</div>  <div style={{ border: "none"}}> ممعلومات شخصية </div></div>
                        <div style={{display: "flex", justifyContent: "center", alignItems: "center",}}>CODE NO</div>
                        <div style={{display: "flex", justifyContent: "center", alignItems: "center",}}>J{formatCount(count)}</div>
                    </div>
                    <div className="table-main-parent">
                    <div class="table-parent">
<div>NAME</div>
<div>{personalInfo.name} {personalInfo.middleName}</div>
<div>الاسم</div>
<div>SURNAME</div>
<div>{personalInfo.surname}</div>
<div>اسم العائلة</div>
<div>PLACE Of Birth</div>
<div>{personalInfo.placeOfBirth}</div>
<div>مكان الولادة</div>
<div>AGE</div>
<div>{personalInfo.age}</div>
<div>العمر</div>
<div>PASSPORT NO</div>
<div>{personalInfo.passportNo}</div>
<div>رقم جواز السفر</div>
<div>DATE OF BIRTH</div>
<div>{personalInfo.dateOfBirth}</div>
<div>تاريخ الميلاد</div>
<div>DATE OF ISSUE</div>
<div>{dateOfIssue}</div>

<div>تاريخ الاصدار</div>
<div>DATE OF EXPIRY</div>
<div>{dateOfExpiry}</div>
<div>تاريخ الانتهاء</div>
<div>NATIONALITY</div>
<div>{sponsorInformation.currentNationality}</div>
<div>الجنسية</div>
<div style={{height: 35}}>MARITAL STATUS</div>
<div style={{height: 35}}>{personalInfo.maritalStatus}</div>
<div style={{height: 35}}>الحالة الاجتماعية</div>
<div style={{height: 35}} >NUMBER OF CHILDREN</div>
<div style={{height: 35}}>{personalInfo.numberOfChildren}</div>
<div style={{height: 35}}>عدد الاطفال</div>
<div>RELIGION</div>
<div>{personalInfo.religion}</div>
<div>الديانة</div>
<div>WEIGHT</div>
<div>{personalInfo.weight}{personalInfo.weight ? " km" : ""}</div>
<div>الوزن</div>
<div>HEIGHT</div>

<div>{personalInfo.height}{personalInfo.height ? " cm" : ""}</div>
<div>الطول</div>
<div style={{height: 35}}>EDUCATIONAL ATTAINMENT</div>
<div style={{height: 35}}>{personalInfo.educationAttainment}</div>
<div style={{height: 35}}>المستوى الدراسي</div>
<div style={{height: 35}}>POST APPLIED FOR</div>
<div style={{height: 35}}>{personalInfo.postAppliedFor}</div>
<div style={{height: 35}}>الوظيفة المتقدمة اليها</div>
<div style={{height: 35}}>MONTHLY SALARY</div>
<div style={{height: 35}}> {salaries.jordan}{salaries.jordan ? "$" : ""}</div>
<div style={{height: 35}}>الراتب الشهري</div>
<div style={{height: 35}}>CONTRACT PERIOD</div>
<div style={{height: 35}}>{sponsorInformation.contract}</div>
<div style={{height: 35}}>مدة التعاقد</div>
<div style={{height: 35}}>ARABIC DEGREE</div>
<div style={{height: 35}}>{personalInfo.arabicDegree}</div>
<div style={{height: 35}}>مستوى اللغة العربية</div>
<div style={{height: 39}}>ENGLISH DEGREE</div>
<div style={{height: 39}}>{personalInfo.englishDegree}</div>
<div style={{height: 39}}>مستوى اللغة الانجليزية</div>
</div>
                        <div className="second-side">
                            <div>
                                <img src={applicantfullbodyimagePreview !== null
    ? applicantfullbodyimagePreview
    : imagePlaceholder} alt="Full Body" className="full-body-image" />
                            </div>
                            <div>
                                <img src={assawsan} alt="Agent Logo" className="agent-logo" />
                            </div>
                        </div>
                    </div>

                    <div className="second-section-parent">

                    <div className="phone-number-sec">
                        <div>OWN PHONE NUMBER</div>
                        <div style={{background: "white"}}>{personalInfo.ownPhoneNumber}</div>
                        <div>رقم الهاتف الشخصي</div>
                    </div>
                    <div className="cphone-number-sec">
                        <div>CONTACT PHONE NUMBER</div>
                        <div style={{background: "white"}}>{personalInfo.contactPhoneNumber}</div>
                        <div>رقم الهاتف الاقارب</div>
                    </div>



                    <div className="experience-country-sec">
<div>EXPERIANCE COUNTRY</div>
<div>{projectInfo.project.map(i =>  <span style={{marginRight: "3px"}}>{i.name}{i.name ? "," : ""} </span> )} </div>
<div>خبرة البلد</div>
</div>





<div className="experience-country-sec">
<div>WORKING YEARS</div>
<div>{projectInfo.project.map(i =>  <span style={{marginRight: "3px"}}>{i.overview}{i.overview ? "," : ""} </span> )}</div>
<div>وعدد سنوات الخبرة</div>
</div>

                    {/* {projectInfo.project.map(i => 
                        
<>
<div className="experience-country-sec">
<div>EXPERIANCE COUNTRY</div>
<div>{i.name}</div>
<div>خبرة البلد</div>
</div>





<div className="experience-country-sec">
<div>WORKING YEARS</div>
<div>{i.overview}</div>
<div>وعدد سنوات الخبرة</div>
</div>

</>



                    )} */}
                   




                    <div className="specific-exp-atitle-sec">
                        <div>تربية الاطفال</div>
                        <div>النظافة</div>
                        <div>الغسيل</div>
                        <div>الطبخ</div>
                        <div>العناية بالمسنين</div>
                    </div>
                    <div className="specific-exp-etitle-sec">
                        <div>BABY SITTING</div>
                        <div>CLEANING</div>
                        <div>WASHING</div>
                        <div>COOKING</div>
                        <div>ELDER CARE</div>
                    </div>
                    <div className="exp-trueorfalse-sec">
                        <div>{expcheck.exp1 ? "YES" : "NO"}</div>
                        <div>{expcheck.exp2 ? "YES" : "NO"}</div>
                        <div>{expcheck.exp3 ? "YES" : "NO"}</div>
                        <div>{expcheck.exp4 ? "YES" : "NO"}</div>
                        <div>{expcheck.exp5 ? "YES" : "NO"}</div>
                    </div>

                    </div>

                    

                </div>

                
                {/* Page 2 */}
                <div style={{display: "flex", justifyContent: "center", fontSize: 20, marginBottom: 30}}>Passport</div>

                <div className="passport-image-parent">
                
<div>
<img
className="passport-image"
alt=""
src={applicantpassportimagePreview !== null
    ? applicantpassportimagePreview
    : imagePlaceholder} 

/>

</div>
</div>
            </div>
        </div>



        {/* next content 4 */}


        <div id="cvContent4" translate='no'>
        <div className="container">
                {/* Page 1 */}
                {/* <div>
<form onSubmit={this.submitImage}>
  <input
    type="file"
    accept="image/*"
    onChange={this.onInputChange}
  />
  <button type="submit">Submit</button>
</form>
{this.state.allImage == null
  ? ""
  : this.state.allImage.map((data, index) => (
      <img
        key={index}
        alt=""
        src={require(`.../images/${data.image}`)}
        height={100}
        width={100}
      />
    ))}
</div> */}
                <div style={{ pageBreakAfter: 'always' }}> 
                    <div className="header">
                    
<div className="personal-image-parent">
<img
className="personal-image"
alt=""
src={applicantpersonalimagePreview !== null
    ? applicantpersonalimagePreview
    : imagePlaceholder} // Get the last image

/>

</div>

                      <div className="wider-image-parent">
                      <img src={barakaimg} alt="Wider" className="wider-image" /></div>  
                    </div>
                    <div className="title-parent">
                        <div style={{display: "flex", justifyContent: "space-around", border: "none"}}><div style={{ border: "none"}}>Personal Information</div>  <div style={{ border: "none"}}> ممعلومات شخصية </div></div>
                        <div style={{display: "flex", justifyContent: "center", alignItems: "center",}}>CODE NO</div>
                        <div style={{display: "flex", justifyContent: "center", alignItems: "center",}}>J{formatCount(count)}</div>
                    </div>
                    <div className="table-main-parent">
                    <div class="table-parent">
<div>NAME</div>
<div>{personalInfo.name} {personalInfo.middleName}</div>
<div>الاسم</div>
<div>SURNAME</div>
<div>{personalInfo.surname}</div>
<div>اسم العائلة</div>
<div>PLACE Of Birth</div>
<div>{personalInfo.placeOfBirth}</div>
<div>مكان الولادة</div>
<div>AGE</div>
<div>{personalInfo.age}</div>
<div>العمر</div>
<div>PASSPORT NO</div>
<div>{personalInfo.passportNo}</div>
<div>رقم جواز السفر</div>
<div>DATE OF BIRTH</div>
<div>{personalInfo.dateOfBirth}</div>
<div>تاريخ الميلاد</div>
<div>DATE OF ISSUE</div>
<div>{dateOfIssue}</div>

<div>تاريخ الاصدار</div>
<div>DATE OF EXPIRY</div>
<div>{dateOfExpiry}</div>
<div>تاريخ الانتهاء</div>
<div>NATIONALITY</div>
<div>{sponsorInformation.currentNationality}</div>
<div>الجنسية</div>
<div style={{height: 35}}>MARITAL STATUS</div>
<div style={{height: 35}}>{personalInfo.maritalStatus}</div>
<div style={{height: 35}}>الحالة الاجتماعية</div>
<div style={{height: 35}} >NUMBER OF CHILDREN</div>
<div style={{height: 35}}>{personalInfo.numberOfChildren}</div>
<div style={{height: 35}}>عدد الاطفال</div>
<div>RELIGION</div>
<div>{personalInfo.religion}</div>
<div>الديانة</div>
<div>WEIGHT</div>
<div>{personalInfo.weight}{personalInfo.weight ? " km" : ""}</div>
<div>الوزن</div>
<div>HEIGHT</div>

<div>{personalInfo.height}{personalInfo.height ? " cm" : ""}</div>
<div>الطول</div>
<div style={{height: 35}}>EDUCATIONAL ATTAINMENT</div>
<div style={{height: 35}}>{personalInfo.educationAttainment}</div>
<div style={{height: 35}}>المستوى الدراسي</div>
<div style={{height: 35}}>POST APPLIED FOR</div>
<div style={{height: 35}}>{personalInfo.postAppliedFor}</div>
<div style={{height: 35}}>الوظيفة المتقدمة اليها</div>
<div style={{height: 35}}>MONTHLY SALARY</div>
<div style={{height: 35}}> {salaries.saudi}{salaries.saudi ? " SAR" : ""}</div>
<div style={{height: 35}}>الراتب الشهري</div>
<div style={{height: 35}}>CONTRACT PERIOD</div>
<div style={{height: 35}}>{sponsorInformation.contract}</div>
<div style={{height: 35}}>مدة التعاقد</div>
<div style={{height: 35}}>ARABIC DEGREE</div>
<div style={{height: 35}}>{personalInfo.arabicDegree}</div>
<div style={{height: 35}}>مستوى اللغة العربية</div>
<div style={{height: 39}}>ENGLISH DEGREE</div>
<div style={{height: 39}}>{personalInfo.englishDegree}</div>
<div style={{height: 39}}>مستوى اللغة الانجليزية</div>
</div>
                        <div className="second-side">
                            <div>
                                <img src={applicantfullbodyimagePreview !== null
    ? applicantfullbodyimagePreview
    : imagePlaceholder} alt="Full Body" className="full-body-image" />
                            </div>
                            <div>
                                <img src={demoimage} alt="Agent Logo" className="agent-logo" />
                            </div>
                        </div>
                    </div>

                    <div className="second-section-parent">

                    <div className="phone-number-sec">
                        <div>OWN PHONE NUMBER</div>
                        <div style={{background: "white"}}>{personalInfo.ownPhoneNumber}</div>
                        <div>رقم الهاتف الشخصي</div>
                    </div>
                    <div className="cphone-number-sec">
                        <div>CONTACT PHONE NUMBER</div>
                        <div style={{background: "white"}}>{personalInfo.contactPhoneNumber}</div>
                        <div>رقم الهاتف الاقارب</div>
                    </div>



                    <div className="experience-country-sec">
<div>EXPERIANCE COUNTRY</div>
<div>{projectInfo.project.map(i =>  <span style={{marginRight: "3px"}}>{i.name}{i.name ? "," : ""} </span> )} </div>
<div>خبرة البلد</div>
</div>





<div className="experience-country-sec">
<div>WORKING YEARS</div>
<div>{projectInfo.project.map(i =>  <span style={{marginRight: "3px"}}>{i.overview}{i.overview ? "," : ""} </span> )}</div>
<div>وعدد سنوات الخبرة</div>
</div>

                    {/* {projectInfo.project.map(i => 
                        
<>
<div className="experience-country-sec">
<div>EXPERIANCE COUNTRY</div>
<div>{i.name}</div>
<div>خبرة البلد</div>
</div>





<div className="experience-country-sec">
<div>WORKING YEARS</div>
<div>{i.overview}</div>
<div>وعدد سنوات الخبرة</div>
</div>

</>



                    )} */}
                   




                    <div className="specific-exp-atitle-sec">
                        <div>تربية الاطفال</div>
                        <div>النظافة</div>
                        <div>الغسيل</div>
                        <div>الطبخ</div>
                        <div>العناية بالمسنين</div>
                    </div>
                    <div className="specific-exp-etitle-sec">
                        <div>BABY SITTING</div>
                        <div>CLEANING</div>
                        <div>WASHING</div>
                        <div>COOKING</div>
                        <div>ELDER CARE</div>
                    </div>
                    <div className="exp-trueorfalse-sec">
                        <div>{expcheck.exp1 ? "YES" : "NO"}</div>
                        <div>{expcheck.exp2 ? "YES" : "NO"}</div>
                        <div>{expcheck.exp3 ? "YES" : "NO"}</div>   
                        <div>{expcheck.exp4 ? "YES" : "NO"}</div>
                        <div>{expcheck.exp5 ? "YES" : "NO"}</div>
                    </div>

                    </div>

                    

                </div>

                
                {/* Page 2 */}
                <div style={{display: "flex", justifyContent: "center", fontSize: 20, marginBottom: 30}}>Passport</div>

                <div className="passport-image-parent">
                
<div>
<img
className="passport-image"
alt=""
src={applicantpassportimagePreview !== null
    ? applicantpassportimagePreview
    : imagePlaceholder} 

/>

</div>
</div>
            </div>
        </div>


        {/* kaan agent cv */}

        <div id="KaanAlRiyadhCv" translate='no'>
            <div  style={{ pageBreakAfter: 'always' }}>
                {/* First Table */}
                <div style={{ background: "" }}>
    <img
        src={KaanAlRiyadhHeaderImg}
        alt="header"
        style={{ maxWidth: '100%', height: 'auto' }} // Ensures the image is contained
    />
</div>


                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
    <thead>
        <tr>
            <th style={{ backgroundColor: '#D050C9', border: '1px solid black', padding: '4px', color: 'white', textAlign: 'left' }}>
                <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <span style={{ fontSize: '10px', color: 'black' }}>First Name</span>
                    <span style={{ fontSize: '10px', color: 'black' }}>الاسم الأول</span>
                </div>
            </th>
            <th style={{ backgroundColor: '#D050C9', border: '1px solid black', padding: '4px', color: 'white', textAlign: 'left' }}>
                <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <span style={{ fontSize: '10px', color: 'black' }}>Middle Name</span>
                    <span style={{ fontSize: '10px', color: 'black' }}>الاسم الأوسط</span>
                </div>
            </th>
            <th style={{ backgroundColor: '#D050C9', border: '1px solid black', padding: '4px', color: 'white', textAlign: 'left' }}>
                <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <span style={{ fontSize: '10px', color: 'black' }}>Last Name</span>
                    <span style={{ fontSize: '10px', color: 'black' }}>اسم العائلة</span>
                </div>
            </th>
            <th style={{ backgroundColor: '#D050C9', border: '1px solid black', padding: '4px', color: 'white', textAlign: 'left' }}>
                <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <span style={{ fontSize: '10px', color: 'black' }}>Surname</span>
                    <span style={{ fontSize: '10px', color: 'black' }}>اللقب</span>
                </div>
            </th>
            <th style={{ backgroundColor: '#D050C9', border: '1px solid black', padding: '4px', color: 'white', textAlign: 'left' }}>
                <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <span style={{ fontSize: '10px', color: 'black' }}>CV Code</span>
                    <span style={{ fontSize: '10px', color: 'black' }}>رمز السيرة الذاتية</span>
                </div>
            </th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style={{ border: '1px solid black', padding: '4px', textAlign: 'center', fontSize: '10px' }}>{personalInfo.name}</td>
            <td style={{ border: '1px solid black', padding: '4px', textAlign: 'center', fontSize: '10px' }}>{personalInfo.middleName}</td>
            <td style={{ border: '1px solid black', padding: '4px', textAlign: 'center', fontSize: '10px' }}>{personalInfo.familyName}</td>
            <td style={{ border: '1px solid black', padding: '4px', textAlign: 'center', fontSize: '10px' }}>{personalInfo.surname}</td>
            <td style={{ border: '1px solid black', padding: '4px', textAlign: 'center', fontSize: '10px' }}>CV{formatCount(count)}</td>
        </tr>
        {/* Add more rows as needed */}
    </tbody>
</table>

                {/* Second Table */}
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
    <thead>
        <tr>
            <th style={{ backgroundColor: '#D050C9', border: '1px solid black', padding: '4px', color: 'white', textAlign: 'left' }}>
                <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <span style={{ fontSize: '10px', color: 'black' }}>Position Applied</span>
                    <span style={{ fontSize: '10px', color: 'black' }}>الوظيفة المتقدم لها</span>
                </div>
            </th>
            <th style={{ backgroundColor: '#D050C9', border: '1px solid black', padding: '4px', color: 'white', textAlign: 'left' }}>
                <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <span style={{ fontSize: '10px', color: 'black' }}>Contract Period</span>
                    <span style={{ fontSize: '10px', color: 'black' }}>مدة العقد</span>
                </div>
            </th>
            <th style={{ backgroundColor: '#D050C9', border: '1px solid black', padding: '4px', color: 'white', textAlign: 'left' }}>
                <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <span style={{ fontSize: '10px', color: 'black' }}>Monthly Salary</span>
                    <span style={{ fontSize: '10px', color: 'black' }}>الراتب الشهري</span>
                </div>
            </th>
            <th style={{ backgroundColor: '#D050C9', border: '1px solid black', padding: '4px', color: 'white', textAlign: 'left' }}>
                <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <span style={{ fontSize: '10px', color: 'black' }}>City</span>
                    <span style={{ fontSize: '10px', color: 'black' }}>المدينة</span>
                </div>
            </th>
            <th style={{ backgroundColor: '#D050C9', border: '1px solid black', padding: '4px', color: 'white', textAlign: 'left' }}>
                <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <span style={{ fontSize: '10px', color: 'black' }}>Address</span>
                    <span style={{ fontSize: '10px', color: 'black' }}>العنوان</span>
                </div>
            </th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style={{ border: '1px solid black', padding: '4px', textAlign: 'center', fontSize: '10px' }}>{personalInfo.postAppliedFor}</td>
            <td style={{ border: '1px solid black', padding: '4px', textAlign: 'center', fontSize: '10px' }}>{sponsorInformation.contract}</td>
            <td style={{ border: '1px solid black', padding: '4px', textAlign: 'center', fontSize: '10px' }}>{salaries.saudi ? salaries.saudi + " SAR" : ""}</td>
            <td style={{ border: '1px solid black', padding: '4px', textAlign: 'center', fontSize: '10px' }}>{sponsorInformation.sponsorCity}</td>
            <td style={{ border: '1px solid black', padding: '4px', textAlign: 'center', fontSize: '10px' }}>{sponsorInformation.sponsorAdress}</td>
        </tr>
        {/* Add more rows as needed */}
    </tbody>
</table>

                {/* Third Table - Passport Information */}
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
    <thead>
        <tr>
            <th style={{ backgroundColor: '#D050C9', border: '1px solid black', padding: '4px', color: 'white', textAlign: 'left' }}>
                <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <span style={{ fontSize: '10px', color: 'black' }}>Passport No</span>
                    <span style={{ fontSize: '10px', color: 'black' }}>رقم الجواز</span>
                </div>
            </th>
            <th style={{ backgroundColor: '#D050C9', border: '1px solid black', padding: '4px', color: 'white', textAlign: 'left' }}>
                <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <span style={{ fontSize: '10px', color: 'black' }}>Issued Date</span>
                    <span style={{ fontSize: '10px', color: 'black' }}>تاريخ الإصدار</span>
                </div>
            </th>
            <th style={{ backgroundColor: '#D050C9', border: '1px solid black', padding: '4px', color: 'white', textAlign: 'left' }}>
                <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <span style={{ fontSize: '10px', color: 'black' }}>Expired Date</span>
                    <span style={{ fontSize: '10px', color: 'black' }}>تاريخ الانتهاء</span>
                </div>
            </th>
            <th style={{ backgroundColor: '#D050C9', border: '1px solid black', padding: '4px', color: 'white', textAlign: 'left' }}>
                <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <span style={{ fontSize: '10px', color: 'black' }}>Issued Place</span>
                    <span style={{ fontSize: '10px', color: 'black' }}>مكان الإصدار</span>
                </div>
            </th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style={{ border: '1px solid black', padding: '4px', textAlign: 'center', fontSize: '10px' }}>{personalInfo.passportNo}</td>
            <td style={{ border: '1px solid black', padding: '4px', textAlign: 'center', fontSize: '10px' }}>{dateOfIssue}</td>
            <td style={{ border: '1px solid black', padding: '4px', textAlign: 'center', fontSize: '10px' }}>{dateOfExpiry}</td>
            <td style={{ border: '1px solid black', padding: '4px', textAlign: 'center', fontSize: '10px' }}>{personalInfo.passportIssuePlace}</td>
        </tr>
        {/* Add more rows as needed */}
    </tbody>
</table>

                {/* Personal Information and Previous Experience Tables */}
                <div style={{ display: 'flex', marginTop: '20px', background: "" }}>
                    {/* Personal Information Table */}

                    <div style={{ flex: '1', borderCollapse: 'collapse', marginRight: '10px' }}>
                    
                    <table style={{ borderCollapse: 'collapse', minWidth: "100%" }}>
    <thead>
        <tr>
            <th colSpan="2" style={{ backgroundColor: '#D050C9', border: '1px solid black', padding: '4px', color: 'black', textAlign: 'left', fontSize: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <span >Personal Information</span>
                    <span >المعلومات الشخصية</span>
                </div>
            </th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>Nationality / الجنسية</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>{sponsorInformation.currentNationality}</td>
        </tr>
        <tr>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>Religion / الدين</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>{personalInfo.religion}</td>
        </tr>
        <tr>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>Age / العمر</td> 
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>{personalInfo.age}</td>
        </tr>
        <tr>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>Gender / الجنس</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>{personalInfo.sex}</td>
        </tr>
        <tr>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>Birthday / تاريخ الميلاد</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>{personalInfo.dateOfBirth}</td>
        </tr>
        <tr>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>Birthplace / مكان الميلاد</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>{personalInfo.placeOfBirth}</td>
        </tr>
        <tr>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>Marital Status / الحالة الاجتماعية</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>{personalInfo.maritalStatus}</td>
        </tr>
        <tr>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>Number of Children / عدد الأطفال</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>{personalInfo.numberOfChildren}</td>
        </tr>
        <tr>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>Height / الطول</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>{personalInfo.height}</td>
        </tr>
        <tr>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>Weight / الوزن</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>{personalInfo.weight}</td>
        </tr>
        <tr>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>Education / التعليم</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>{personalInfo.educationAttainment}</td>
        </tr>
    </tbody>
</table>




<table style={{ borderCollapse: 'collapse', minWidth: '100%', marginTop: '20px' }}>
    <thead>
        <tr>
            <th style={{ border: '1px solid black', padding: '4px', fontSize: '10px', width: '50%', backgroundColor: '#D050C9' }}>Training (التدريب)</th>
            <th style={{ border: '1px solid black', padding: '4px', fontSize: '10px', backgroundColor: '#D050C9' }}>Excellent (ممتاز)</th>
            <th style={{ border: '1px solid black', padding: '4px', fontSize: '10px', backgroundColor: '#D050C9' }}>Very Good (جيد جداً)</th>
            <th style={{ border: '1px solid black', padding: '4px', fontSize: '10px', backgroundColor: '#D050C9' }}>Good (جيد)</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>Cleaning (تنظيف)</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{projectInfo.project[0].cleaning === "Excellent" ? "✔️"  : ""}</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{projectInfo.project[0].cleaning === "Very Good" ? "✔️"  : ""}</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{projectInfo.project[0].cleaning === "Good" ? "✔️"  : ""}</td>
        </tr>
        <tr>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>Laundry (غسيل)</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{projectInfo.project[0].laundary === "Excellent" ? "✔️"  : ""}</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{projectInfo.project[0].laundary === "Very Good" ? "✔️"  : ""}</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{projectInfo.project[0].laundary === "Good" ? "✔️"  : ""}</td>
        </tr>
        <tr>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>Ironing Clothes (كي الملابس)</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{projectInfo.project[0].ironingclothes === "Excellent" ? "✔️"  : ""}</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{projectInfo.project[0].ironingclothes === "Very Good" ? "✔️"  : ""}</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{projectInfo.project[0].ironingclothes === "Good" ? "✔️"  : ""}</td>
        </tr>
        <tr>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>Baby Care (رعاية الأطفال)</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{projectInfo.project[0].babycare === "Excellent" ? "✔️"  : ""}</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{projectInfo.project[0].babycare === "Very Good" ? "✔️"  : ""}</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{projectInfo.project[0].babycare === "Good" ? "✔️"  : ""}</td>
        </tr>
        <tr>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>Children Care (رعاية الأطفال)</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{projectInfo.project[0].childerncare === "Excellent" ? "✔️"  : ""}</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{projectInfo.project[0].childerncare === "Very Good" ? "✔️"  : ""}</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{projectInfo.project[0].childerncare === "Good" ? "✔️"  : ""}</td>
        </tr>
        <tr>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>Care of the Elderly (رعاية المسنين)</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{projectInfo.project[0].careoftheelderly === "Excellent" ? "✔️"  : ""}</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{projectInfo.project[0].careoftheelderly === "Very Good" ? "✔️"  : ""}</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{projectInfo.project[0].careoftheelderly === "Good" ? "✔️"  : ""}</td>
        </tr>
    </tbody>
</table>


<table style={{ borderCollapse: 'collapse', minWidth: '100%', marginTop: '20px' }}>
    <thead>
        <tr>
            <th style={{ border: '1px solid black', padding: '4px', fontSize: '10px', width: '50%', backgroundColor: '#D050C9' }}>Skills (المهارات)</th>
            <th style={{ border: '1px solid black', padding: '4px', fontSize: '10px', backgroundColor: '#D050C9' }}>Excellent (ممتاز)</th>
            <th style={{ border: '1px solid black', padding: '4px', fontSize: '10px', backgroundColor: '#D050C9' }}>Good (جيد)</th>
            <th style={{ border: '1px solid black', padding: '4px', fontSize: '10px', backgroundColor: '#D050C9' }}>Poor (ضعيف)</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>Cooking (طبخ)</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{projectInfo.project[0].cooking === "Excellent" ? "✔️"  : ""}</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{projectInfo.project[0].cooking === "Very Good" ? "✔️"  : ""}</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{projectInfo.project[0].cooking === "Good" ? "✔️"  : ""}</td>
        </tr>
        <tr>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>Arabic Cooking (الطبخ العربي)</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{projectInfo.project[0].arabicCooking === "Excellent" ? "✔️"  : ""}</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{projectInfo.project[0].arabicCooking === "Very Good" ? "✔️"  : ""}</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{projectInfo.project[0].arabicCooking === "Good" ? "✔️"  : ""}</td>
        </tr>
        <tr>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>Sewing Clothes (خياطة الملابس)</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{projectInfo.project[0].sewingClothes === "Excellent" ? "✔️"  : ""}</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{projectInfo.project[0].sewingClothes === "Very Good" ? "✔️"  : ""}</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{projectInfo.project[0].sewingClothes === "Good" ? "✔️"  : ""}</td>
        </tr>
        <tr>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>Home Nursing (تمريض منزلي)</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{projectInfo.project[0].homeNursing === "Excellent" ? "✔️"  : ""}</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{projectInfo.project[0].homeNursing === "Very Good" ? "✔️"  : ""}</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{projectInfo.project[0].homeNursing === "Good" ? "✔️"  : ""}</td>
        </tr>
        <tr>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>Children's Care (رعاية الأطفال)</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{projectInfo.project[0].childrens === "Excellent" ? "✔️"  : ""}</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{projectInfo.project[0].childrens === "Very Good" ? "✔️"  : ""}</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{projectInfo.project[0].childrens === "Good" ? "✔️"  : ""}</td>
        </tr>
        <tr>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>Driving Cars (قيادة السيارات)</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{projectInfo.project[0].drivingCars === "Excellent" ? "✔️"  : ""}</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{projectInfo.project[0].drivingCars === "Very Good" ? "✔️"  : ""}</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{projectInfo.project[0].drivingCars === "Good" ? "✔️"  : ""}</td>
        </tr>
        <tr>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>Manicure Massage (مانيكير مساج)</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{projectInfo.project[0].manicuring === "Excellent" ? "✔️"  : ""}</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{projectInfo.project[0].manicuring === "Very Good" ? "✔️"  : ""}</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{projectInfo.project[0].manicuring === "Good" ? "✔️"  : ""}</td>
        </tr>
        <tr>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>Arabic (العربية)</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{projectInfo.project[0].arabic === "Excellent" ? "✔️"  : ""}</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{projectInfo.project[0].arabic === "Very Good" ? "✔️"  : ""}</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{projectInfo.project[0].arabic === "Good" ? "✔️"  : ""}</td>
        </tr>
        <tr>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>English (الإنجليزية)</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{projectInfo.project[0].english === "Excellent" ? "✔️"  : ""}</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{projectInfo.project[0].english === "Very Good" ? "✔️"  : ""}</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{projectInfo.project[0].english === "Good" ? "✔️"  : ""}</td>
        </tr>
    </tbody>
</table>

</div>

                    {/* Previous Experience Table */}

                    <div style={{ flex: '1', borderCollapse: 'collapse', marginLeft: '10px', display: "flex", flexDirection: "column", justifyContent: "center",  alignItems:"center" }}>

                        <>
                        <table style={{ borderCollapse: 'collapse', minWidth: "100%" }}>
    <thead>
        <tr>
            <th colSpan="5" style={{ 
                backgroundColor: '#D050C9', 
                border: '1px solid black', 
                padding: '4px', 
                color: 'white', 
                textAlign: 'left', 
                fontSize: '10px' 
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', color: "black" }}>
                    <span>Previous Experience</span>
                    <span>الخبرة السابقة</span>
                </div>
            </th>
        </tr>
        <tr>
            <th style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>Country</th>
            <th style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>Position</th>
            <th style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>No of Years</th>
            <th style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>From</th>
            <th style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>To</th>
        </tr>
        {/* <tr>
            <th style={{ border: '1px solid black', padding: '4px', fontSize: '10px', fontWeight: "normal" }}>{projectInfo.project[0].name} ?? {projectInfo.project[0].name}</th>
            <th style={{ border: '1px solid black', padding: '4px', fontSize: '10px', fontWeight: "normal" }}>{projectInfo.project[0].link} ?? {projectInfo.project[0].link}</th>
            <th style={{ border: '1px solid black', padding: '4px', fontSize: '10px', fontWeight: "normal" }}>{projectInfo.project[0].overview} ?? {projectInfo.project[0].overview}</th>
            <th style={{ border: '1px solid black', padding: '4px', fontSize: '10px', fontWeight: "normal" }}>{projectInfo.project[0].from} ?? {projectInfo.project[0].from}</th>
            <th style={{ border: '1px solid black', padding: '4px', fontSize: '10px', fontWeight: "normal" }}>{projectInfo.project[0].to} ?? {projectInfo.project[0].to}</th>
        </tr>
        <tr>
        <th style={{ border: '1px solid black', padding: '4px', fontSize: '10px', fontWeight: "normal" }}>{projectInfo.project[1].name} ?? {projectInfo.project[1].name}</th>
            <th style={{ border: '1px solid black', padding: '4px', fontSize: '10px', fontWeight: "normal" }}>{projectInfo.project[1].link} ?? {projectInfo.project[1].link}</th>
            <th style={{ border: '1px solid black', padding: '4px', fontSize: '10px', fontWeight: "normal" }}>{projectInfo.project[1].overview} ?? {projectInfo.project[1].overview}</th>
            <th style={{ border: '1px solid black', padding: '4px', fontSize: '10px', fontWeight: "normal" }}>{projectInfo.project[1].from} ?? {projectInfo.project[1].from}</th>
            <th style={{ border: '1px solid black', padding: '4px', fontSize: '10px', fontWeight: "normal" }}>{projectInfo.project[1].to} ?? {projectInfo.project[1].to}</th>
        </tr> */}
        {/* <tr>
        <th style={{ border: '1px solid black', padding: '4px', fontSize: '10px', fontWeight: "normal" }}>{projectInfo.project[2].name} ?? {projectInfo.project[2].name}</th>
            <th style={{ border: '1px solid black', padding: '4px', fontSize: '10px', fontWeight: "normal" }}>{projectInfo.project[2].link} ?? {projectInfo.project[2].link}</th>
            <th style={{ border: '1px solid black', padding: '4px', fontSize: '10px', fontWeight: "normal" }}>{projectInfo.project[2].overview} ?? {projectInfo.project[2].overview}</th>
            <th style={{ border: '1px solid black', padding: '4px', fontSize: '10px', fontWeight: "normal" }}>{projectInfo.project[2].from} ?? {projectInfo.project[2].from}</th>
            <th style={{ border: '1px solid black', padding: '4px', fontSize: '10px', fontWeight: "normal" }}>{projectInfo.project[2].to} ?? {projectInfo.project[2].to}</th>
        </tr> */}

{projectInfo.project.map((proj, index) => (
    <tr key={index}>
        <th style={{ border: '1px solid black', padding: '4px', fontSize: '10px', fontWeight: "normal" }}>
            {proj.name ?? 'N/A'}
        </th>
        <th style={{ border: '1px solid black', padding: '4px', fontSize: '10px', fontWeight: "normal" }}>
            {proj.link ?? 'N/A'}
        </th>
        <th style={{ border: '1px solid black', padding: '4px', fontSize: '10px', fontWeight: "normal" }}>
            {proj.overview ?? 'N/A'}
        </th>
        <th style={{ border: '1px solid black', padding: '4px', fontSize: '10px', fontWeight: "normal" }}>
            {proj.from ?? 'N/A'}
        </th>
        <th style={{ border: '1px solid black', padding: '4px', fontSize: '10px', fontWeight: "normal" }}>
            {proj.to ?? 'N/A'}
        </th>
    </tr>
))}
        
    </thead>
    <tbody>
        {/* Add more rows as needed */}
    </tbody>
</table>


</>


{/* full body box */}
<div style={{border: "10px solid green", borderRadius: "23px", marginTop: '20px', background: "red", height: '520px'}}>
    <div style={{
        background: "blue", 
        maxWidth: "300px", 
        minWidth: "300px", 
        height: "100%", 
        border: "10px solid red", 
        borderRadius: "10px", 
        overflow: 'hidden' // Ensure anything exceeding the bounds is hidden
    }}>
        <img 
            src={applicantfullbodyimagePreview !== null
                ? applicantfullbodyimagePreview
                : imagePlaceholder} 
            style={{
                height: "100%", 
                width: "100%", 
                display: 'block' // Prevents any extra space at the bottom
            }} 
            alt="" 
        />
    </div>
</div>



</div>
                </div>


                {/* footer */}
                <div style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
                <div style={{display: "flex", justifyContent: "space-between", flexDirection: "row", background: "", width: "100%" }}>

                    <div style={{display: "flex", flexDirection: "column",}}>
                          
                          <div style={{display: "flex", flexDirection: "row", background: "" }}>

                          

                          <div style={{background: ""}} >
                          <img  src={phoneIcon} alt='' />
                          </div>

                          <div style={{marginLeft: "20px"}}>Phone</div>
                        
                        </div>

                        <div>0500000000 & 0500000000&</div>

                        <div>0500000000 & 0500000000</div>

                    </div>

                    <div style={{display: "flex", flexDirection: "column",}}>
                          
                          <div style={{display: "flex", flexDirection: "row", background: "" }}>

                          

                          <div style={{background: ""}} >
                          <img  src={EmailIcon} alt='' />
                          </div>

                          <div style={{marginLeft: "20px"}}>Email</div>
                        
                        </div>

                        <div>canoffice16@gmail.co</div>

                        

                    </div>

                    <div style={{display: "flex", flexDirection: "column",}}>
                          
                          <div style={{display: "flex", flexDirection: "row", background: "" }}>

                          

                          <div style={{background: ""}} >
                          <img  src={AddressIcon} alt='' />
                          </div>

                          <div style={{marginLeft: "20px"}}>Address</div>
                        
                        </div>

                        <div>
  Prince Saud bin Abdul Aziz Al Saud <br /> Al Kabeer – Riyadh KSA PO
</div>
                       

                    </div>


                    </div>


                </div>
                {/* footer end */}


            </div>

            <div style={{display: "flex", justifyContent: "center", fontSize: 20, marginBottom: 30, marginTop: "30px"}}>Passport</div>

<div className="passport-image-parent">

<div>
<img
className="passport-image"
alt=""
src={applicantpassportimagePreview !== null
? applicantpassportimagePreview
: imagePlaceholder} 

/>

</div>
</div>
          
        </div>




        {/* end content */}




        {/* qimam cv */}


        <div id="QimamAsiaCv" style={{ display: '' }} translate='no'>
               

               <div >


                 {/* header */}
                 <div style={{display: "grid", gridTemplateColumns: "75% 25%"}}>


                 <div style={{display: "flex", flexDirection: "column"}}>

                    <div style={{marginBottom: "20px", fontSize: "large", color: "#2ca2d4"}}>APPLICATION FOR EMPLOYMENT</div>

{/* <div style={{display: "flex", marginBottom: "20px" }}>
    <div style={{display: "flex", justifyContent: "center", border: "2px solid black", width: "40%", fontSize: "12px", color: "#2ca2d4"}}>DATE APPLIED</div>
    <div style={{display: "flex", justifyContent: "center", border: "2px solid black", width: "40%", fontSize: "12px"}}>{monthName} {dayNumber}, {year}</div>
    
</div> */}

<div style={{ display: "flex", marginBottom: "20px" }}>
    <div style={{ display: "flex", justifyContent: "center", border: "2px solid black", width: "40%", fontSize: "12px", color: "#2ca2d4" }}>
        DATE APPLIED
    </div>
    <div style={{ display: "flex", justifyContent: "center", border: "2px solid black", width: "40%", fontSize: "12px" }}>
        {monthName.substring(0, 3)} {dayNumber}, {year}
    </div>
</div>


<div style={{ display: "flex", alignItems: "center" }}>
    <div style={{ display: "flex", border: "2px solid black", width: "30%", fontSize: "12px", justifyContent: "center", color: "#2ca2d4" }}>
        POSITION APPLIED FOR
    </div>
    <div style={{ display: "flex", border: "2px solid black", width: "30%", fontSize: "12px", justifyContent: "center", color: personalInfo.postAppliedFor ? "black" : "transparent"  }}>{personalInfo.postAppliedFor ? personalInfo.postAppliedFor : "no"}</div>
    <div style={{ display: "flex", border: "2px solid black", width: "30%", fontSize: "12px", justifyContent: "center", color: "#AB1319" }}>
        الوظيفة
    </div>
</div>



<div style={{ display: "flex", alignItems: "center" }}>
    <div style={{ display: "flex", border: "2px solid black", width: "30%", fontSize: "12px", justifyContent: "center", color: "#2ca2d4" }}>
 MONTHLY SALARY    </div>
    <div style={{ display: "flex", border: "2px solid black", width: "30%", fontSize: "12px", justifyContent: "center", color: salaries.saudi ? "black" : "transparent" }}>{salaries.saudi ? salaries.saudi + " SAR" : "-"}</div>
    <div style={{ display: "flex", border: "2px solid black", width: "30%", fontSize: "12px", justifyContent: "center", color: "#AB1319" }}>
        
        الراتب الشهري
    </div>
</div>


<div style={{ display: "flex", alignItems: "center" }}>
    <div style={{ display: "flex", border: "2px solid black", width: "30%", fontSize: "12px", justifyContent: "center", color: "#2ca2d4" }}>
        CONTRACT PERIOD
    </div>
    <div style={{ display: "flex", border: "2px solid black", width: "30%", fontSize: "12px", justifyContent: "center", color: sponsorInformation.contract ? "black" : "transparent"  }}>{sponsorInformation.contract ? sponsorInformation.contract : "-"}</div>
    <div style={{ display: "flex", border: "2px solid black", width: "30%", fontSize: "12px", justifyContent: "center", color: "#AB1319" }}>
        مدة العقد
    </div>
</div>


</div>


                      <div  style={{width: "100%"}}>
                      <img src={applicantpersonalimagePreview !== null
    ? applicantpersonalimagePreview
    : imagePlaceholder} alt="Wider" className="wider-image" style={{width: "100%"}} />
                      </div>  


                                          



                    </div>
                {/* header end */}

                {/* full name section */}

                <div style={{display: "flex", marginTop: "10px", marginBottom: "10px"}}>
                    <div style={{display: "flex", justifyContent: "center", border: "2px solid black", width: "25%", color: "#2ca2d4", background: "#CECEEF"}}>FULL NAME</div>
                    <div style={{display: "flex", justifyContent: "center", border: "2px solid black", width: "50%"}}>{personalInfo.name} {personalInfo.middleName} {personalInfo.familyName}</div>
                    <div style={{display: "flex", justifyContent: "center", border: "2px solid black", width: "25%", color: "#AB1319", background: "#CECEEF"}}>الاسم الاول</div>
                </div>

                <div className='table-main-parent' style={{display: "", height: "20px",  }}>
                    <div style={{display: "flex", justifyContent: "space-between", border: "2px solid black", background: "#CECEEF" }}><span style={{marginLeft: "10px", color: "#2ca2d4"}}>DETAILS OF APPLICATION</span> <span style={{marginRight: "10px", color: "#AB1319"}}>بيانات صاحب الطلب</span></div>
                    <div style={{display: "none", justifyContent: "center", border: "2px solid black", width: "50%"}}></div>
                   
                </div>

                {/* full name section end */}


                {/* full body image and table */}


                <div className="table-main-parent" style={{background: "", height: "100%"}}>
                    
                    <div class="table-parent"  style={{background: "", height: "100%"}}>



<div style={{color: "#2ca2d4"}}>NATIONALITY</div>
<div>{sponsorInformation.currentNationality}</div>
<div style={{color: "#AB1319"}}>الجنسية</div>

<div style={{color: "#2ca2d4"}}>RELIGION</div>
<div>{personalInfo.religion}</div>
<div style={{color: "#AB1319"}}>الديانة</div>

<div style={{color: "#2ca2d4"}}>DATE OF BIRTH</div>
<div>{personalInfo.dateOfBirth}</div>
<div style={{color: "#AB1319"}}>تاريخ الميلاد</div>

<div style={{color: "#2ca2d4"}}>PLACE Of Birth</div>
<div>{personalInfo.placeOfBirth}</div>
<div style={{color: "#AB1319"}}>مكان الولادة</div>

<div style={{color: "#2ca2d4"}}>AGE</div>
<div>{personalInfo.age}</div>
<div style={{color: "#AB1319"}}>العمر</div>

<div style={{color: "#2ca2d4"}}>LIVING TOWN</div>
<div>{personalInfo.placeOfBirth}</div>
<div style={{color: "#AB1319"}}>مكان السكن</div>

<div style={{height: 35, color: "#2ca2d4"}}>MARITAL STATUS</div>
<div style={{height: 35,}}>{personalInfo.maritalStatus}</div>
<div style={{height: 35, color: "#AB1319"}}>الحالة الاجتماعية</div>

<div style={{height: 35, color: "#2ca2d4"}} >NUMBER OF CHILDREN</div>
<div style={{height: 35}}>{personalInfo.numberOfChildren}</div>
<div style={{height: 35, color: "#AB1319"}}>عدد الاطفال</div>

<div style={{color: "#2ca2d4",}}>WEIGHT</div>
<div>{personalInfo.weight ? personalInfo.weight + " KG" : ""}</div>
<div style={{color: "#AB1319"}}>الوزن</div>

<div style={{color: "#2ca2d4"}}>HEIGHT</div>
<div>{personalInfo.height ? personalInfo.height + " CM" : ""}</div>
<div style={{color: "#AB1319"}}>الطول</div>

<div style={{color: "#2ca2d4"}}>COMPLEXION</div>
<div>-</div>
<div style={{color: "#AB1319"}}>لون البشرة</div>

<div style={{height: 35, color: "#2ca2d4"}}>EDUCATIONAL Qualification</div>
<div style={{height: 35}}>{personalInfo.educationAttainment}</div>
<div style={{height: 35, color: "#AB1319"}}> الدرجة العلمية</div>

<div style={{width: "200px", color: "#2ca2d4"}}>CONTACT NUMBER</div>
<div style={{borderColor: "transparent"}}></div>
<div style={{borderColor: "transparent black transparent transparent", paddingRight: "5px"}}>{personalInfo.contactPhoneNumber}</div>


<div style={{ width: "300px", fontSize: "15px", background: "#CECEEF", paddingLeft: "10px", position: "relative", zIndex: 2, display: "flex", justifyContent: "flex-start", borderColor: "black transparent black black" }}>
    Previous experience
</div>
<div style={{ borderColor: "black transparent black transparent", background: "#CECEEF",  position: "relative", zIndex: -1, }}></div>
<div style={{ borderColor: "black black black transparent", background: "#CECEEF",  position: "relative", zIndex: 1, }}></div>


<div style={{color: "#2ca2d4"}}>COUNTRY</div>
<div >{projectInfo.project.map(i =>  <span style={{marginRight: "3px"}}>{i.name}{i.name ? "," : ""} </span> )}</div>
<div >  </div>

<div style={{color: "#2ca2d4"}}>DURATION</div>
<div >{projectInfo.project.map(i =>  <span style={{marginRight: "3px"}}>{i.overview}{i.overview ? "," : ""} </span> )}</div>
<div >  </div>

<div style={{color: "#2ca2d4"}}>POSITION</div>
<div >{projectInfo.project.map(i =>  <span style={{marginRight: "3px"}}>{i.link}{i.link ? "," : ""} </span> )}</div>
<div >  </div>












</div>
<div style={{ height: "100%", background: "" }}>
    <div style={{ height: "100%" }}>
        <img 
            src={applicantfullbodyimagePreview !== null
                ? applicantfullbodyimagePreview
                : imagePlaceholder} 
            alt="Full Body" 
            style={{ height: "100%", width: "100%", objectFit: "cover" }} 
        />
    </div>
    {/* <div>
        <img src={fullbodyapplicantimage} alt="Agent Logo" className="agent-logo" />
    </div> */}
</div>
                    </div>

                  

                {/* full body image and table end */}


                {/* experience boolean */}


                 <div  style={{background: "red", height: "auto"}}>
                
                    
                
                                    <div className="specific-exp-atitle-sec" style={{borderColor: " black black transparent black", backgroundColor: "white", display: "grid", gridTemplateColumns: "20% 16% 16% 16% 16% 16%"}}>
                                        <div style={{borderColor: "transparent black", backgroundColor: "white", display: "flex", flexDirection: "column", justifyContent: "flex-end", color: "#AB1319"}}>تربية الاطفال</div>
                                        <div style={{borderColor: "transparent black", backgroundColor: "white", display: "flex", flexDirection: "column", justifyContent: "flex-end", color: "#AB1319"}}>الغسيل</div>
                                        <div style={{borderColor: "transparent black", backgroundColor: "white", display: "flex", flexDirection: "column", justifyContent: "flex-end", color: "#AB1319"}}>الطبخ</div>
                                        <div style={{borderColor: "transparent black", backgroundColor: "white", display: "flex", flexDirection: "column", justifyContent: "flex-end", color: "#AB1319"}}>كي الملابس</div>
                                        <div style={{borderColor: "transparent black", backgroundColor: "white", display: "flex", flexDirection: "column", justifyContent: "flex-end", color: "#AB1319"}}>النظافة</div>
                                        <div style={{borderColor: "transparent black", backgroundColor: "white", display: "flex", flexDirection: "column", justifyContent: "flex-end", color: "#AB1319"}}>تقديم الرعاية </div>

                                        
                                        
                                        
                                        
                                        
                                    </div>
                                    <div className="specific-exp-etitle-sec" style={{borderColor: "transparent black black black", backgroundColor: "white", display: "grid", gridTemplateColumns: "20% 16% 16% 16% 16% 16%" }}>
                                        <div style={{borderColor: "transparent black", backgroundColor: "white", display: "flex", flexDirection: "column", justifyContent: "flex-start", color: "#AB1319", marginTop: "-5px"}}>BABY SITTING</div>
                                        <div style={{borderColor: "transparent black", backgroundColor: "white", display: "flex", flexDirection: "column", justifyContent: "flex-start", color: "#AB1319", marginTop: "-5px"}}>WASHING</div>
                                        <div style={{borderColor: "transparent black", backgroundColor: "white", display: "flex", flexDirection: "column", justifyContent: "flex-start", color: "#AB1319", marginTop: "-3px"}}>COOKING</div>
                                        <div style={{borderColor: "transparent black", backgroundColor: "white", display: "flex", flexDirection: "column", justifyContent: "flex-start", color: "#AB1319", marginTop: "-5px"}}>IRONING</div>
                                        <div style={{borderColor: "transparent black", backgroundColor: "white", display: "flex", flexDirection: "column", justifyContent: "flex-start", color: "#AB1319", marginTop: "-5px"}}>CLEANING</div>
                                        <div style={{borderColor: "transparent black", backgroundColor: "white", display: "flex", flexDirection: "column", justifyContent: "flex-start", color: "#AB1319", marginTop: "-3px"}}>CAREGIVING</div>


                                        
                                        

                                        
                                        
                                    </div>
                                    <div className="exp-trueorfalse-sec" style={{background: "white", display: "grid", gridTemplateColumns: "20% 16% 16% 16% 16% 16%"}}>
                                        <div style={{background: "white"}}>{expcheck.exp1 ? "YES" : "NO"}</div>
                                        <div style={{background: "white"}}>{expcheck.exp3 ? "YES" : "NO"}</div>
                                        <div style={{background: "white"}}>{expcheck.exp4 ? "YES" : "NO"}</div>
                                        <div style={{background: "white"}}>{expcheck.ironingclothes ? "YES" : "NO"}</div>
                                        <div style={{background: "white"}}>{expcheck.exp2 ? "YES" : "NO"}</div>
                                        <div style={{background: "white"}}>{expcheck.exp5 ? "YES" : "NO"}</div>
                                    </div>
                
                                    </div>


                {/* experience boolean end */}


                {/* footer  */}


                <div style={{display: "grid", gridTemplateColumns: "50% 50%", marginTop: "20px", }}>


                 <div style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>




<div style={{ display: "flex", alignItems: "center" }}>
    <div style={{ display: "flex", border: "2px solid black", width: "45%", fontSize: "12px", justifyContent: "center", color: "#2ca2d4" }}>
        PASSPORT NO.
    </div>
    <div style={{ display: "flex", border: "2px solid black", width: "45%", fontSize: "12px", justifyContent: "center" , color: personalInfo.passportNo ? "black" : "transparent" }}>{personalInfo.passportNo ? personalInfo.passportNo : "-"}</div>
   
</div>


<div style={{ display: "flex", alignItems: "center" }}>
    <div style={{ display: "flex", border: "2px solid black", width: "45%", fontSize: "12px", justifyContent: "center", color: "#2ca2d4" }}>
        DATE ISSUED
    </div>
    <div style={{ display: "flex", border: "2px solid black", width: "45%", fontSize: "12px", justifyContent: "center", color: dateOfIssue ? "black" : "transparent" }}>{dateOfIssue ? dateOfIssue : "-"}</div>
   
</div>



<div style={{ display: "flex", alignItems: "center" }}>
    <div style={{ display: "flex", border: "2px solid black", width: "45%", fontSize: "12px", justifyContent: "center", color: "#2ca2d4" }}>
        DATE EXPIRY
    </div>
    <div style={{ display: "flex", border: "2px solid black", width: "45%", fontSize: "12px", justifyContent: "center", color: dateOfExpiry ? "black" : "transparent" }}>{dateOfExpiry ? dateOfExpiry : "-"}</div>
   
</div>


<div style={{ display: "flex", alignItems: "center" }}>
    <div style={{ display: "flex", border: "2px solid black", width: "45%", fontSize: "12px", justifyContent: "center", color: "#2ca2d4" }}>
        PLACE OF ISSUE
    </div>
    <div style={{ display: "flex", border: "2px solid black", width: "45%", fontSize: "12px", justifyContent: "center", color: personalInfo.passportIssuePlace ? "black" : "transparent" }}>{personalInfo.passportIssuePlace ? personalInfo.passportIssuePlace : "-"}</div>
   
</div>


</div>


                      <div  style={{width: "100%", border: "2px solid black", }}>

                      <div style={{color: "#2ca2d4", fontWeight: "bold", marginLeft: "5px"}}>REMARK</div>

                      <div style={{ fontSize: "10px", marginLeft: "5px"}}>SHE IS FIRST TIME.</div>
                      <div style={{ fontSize: "10px", marginLeft: "5px"}}>SHE CAN DO ALL AROUND HOUSEHOLD CHORES.</div>
                      <div style={{ fontSize: "10px", marginLeft: "5px"}}>SHE IS WILLING TO TAKE CARE BABY.</div>
                      <div style={{ fontSize: "10px", marginLeft: "5px"}}>SHE CAN WASH AND IRON CLOTHES.</div>
                      <div style={{ fontSize: "10px", marginLeft: "5px"}}>SHE IS WILLING TO LEARN ARABIC FOOD WITH HELP OF THE SPONSOR.</div>
                      <div style={{ fontSize: "10px", marginLeft: "5px"}}>FAIR/ENGLISH LANGUAGE.</div>


                      </div>  


                                          



                    </div>

                {/* footer end */}


               </div>
              

            </div>


        {/* qimam cv end */}


       


      
        
</div>





{/* embassy cv content */}



<div style={{ display: 'none' }}>
                <div className="embassy-cv-main-parent" ref={pdfRef} id="cvContent">
                    <div className='embassy-header'>
                        <div className='embassy-header-first-child' style={{ display: 'flex', flexDirection: 'column', }}>
                            <div style={{ display: 'flex', flexDirection: 'column',  }}>
                                <Barcode
                                       displayValue={false}
                                                value={"E776062468"} height={23} width={1.7} marginBottom={2} />

                                                
                                <span style={{ display: "flex", justifyContent: "space-between", marginLeft: '10px',  }}><span style={{ fontFamily: "serif", fontSize: "8px",  }}>VISA No:</span> <span style={{marginRight: "10px", fontSize: "13px", fontWeight: "bold"}}>{sponsorInformation.visaNo}</span></span>

                                <span style={{ display: "flex", justifyContent: "space-between", marginLeft: '10px',  }}><span style={{ fontFamily: "serif", fontSize: "13px",  }}>sponsor:</span> <span style={{marginRight: "10px", fontSize: "13px"}}>{sponsorInformation.sponsorName}</span></span>
                            </div>
                            
                            <div className="embassy-header-first-child-img-div" style={{marginLeft: "7px"}}>
                            <img
                            style={{marginTop: "10px", width: "150px", height: "150px"}}
                        className="embassy-header-first-child-img"
                        alt="Personal"
                        src={applicantpersonalimagePreview !== null
                          ? applicantpersonalimagePreview
                          : imagePlaceholder}
                       
                    />
                            </div>
                        </div>

                        {/* <div className='embassy-header-second-child' style={{display: "flex", flexDirection: "column", justifyContent: "space-between",  }}>
                            <div></div>
                            <div style={{margin: 0, padding: 0, marginLeft: "50px"}}>
                            <img
                            style={{width: "150px", height: "150px",}}
                        className="embassy-header-first-child-img"
                        alt="Personal"
                        src={saudiforeignaffairslogo}
                       
                    />
                            </div>
                        </div> */}
                          <div style={{display: "flex", flexDirection: "row", }}>
                          <div className='embassy-header-second-child' style={{display: "flex", flexDirection: "column", justifyContent: "space-between",  }}>
                            <div></div>
                            <div style={{margin: 0, padding: 0, marginLeft: "60px"}}>
                            <img
                            style={{width: "150px", height: "150px",}}
                        className="embassy-header-first-child-img"
                        alt="Personal"
                        src={saudiforeignaffairslogo}
                       
                    />
                            </div>
                        </div>
                        <div className='embassy-header-third-child' style={{fontFamily: "serif",  background: 'none', display: 'flex', flexDirection: "column", paddingLeft: "100px", flexBasis: "70%"  }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Barcode value={"E776062468"} fontWeight={"bold"} height={23} width={1.7} marginBottom={2} />
                                
                            </div>
                            <div style={{ marginTop: "5px", fontFamily: "serif", fontSize: "13px", display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "center", background: "none", marginRight: "20px"  }}>
    <div style={{fontFamily: "serif", textAlign: "center" }}>
        EMBASSY OF SAUDI ARABIA
    </div>
    <div style={{fontFamily: "serif", textAlign: "center" }}>
        CONSULAR SECTION
    </div>

    <div style={{ fontFamily: "serif", textAlign: "center", fontSize: "18px", marginTop: "10px", fontWeight: "bold" }}>
        سفارة المملكة العربية السعودية القسم القنصلي
    </div>

    <div style={{fontFamily: "serif",  fontSize: "12px", background: "none", marginTop: "10px",}} >SKY WAY FOREIGN EMPLOYMENT AGENT</div>
<div style={{fontFamily: "serif", marginTop: "10px", fontWeight: "bold", }}>skywayagencyoffice@gmail.com</div>
</div>

{/* <div style={{fontFamily: "serif",  fontSize: "12px", background: "none", marginTop: "20px", marginLeft: "" }} >SKY WAY FOREIGN EMPLOYMENT AGENT</div>
<div style={{fontFamily: "serif", marginTop: "10px", fontWeight: "bold", marginLeft: "10px", marginRight: ""}}>skywayagencyoffice@gmail.com</div> */}
</div>
 
    

                           
                        </div>
                    </div>

                    <div className="content-parent">

                        {/* 1th line */}

                        <div className="first-line" style={{fontFamily: "serif",  fontSize: "13px", display: "flex", justifyContent: "space-between", borderBottom: "2px solid black", paddingBottom: "5px"}}>
                                      <div style={{fontFamily: "serif",  fontSize: "13px",  display: "flex", justifyContent: "space-between", width: "35%"}}>
                                        <span style={{fontFamily: "serif",  fontSize: "13px",}}>Full Name</span>
                                        <span style={{fontWeight:"bold", fontSize: "13px", fontFamily: "serif",}}>{personalInfo.name} {personalInfo.middleName} {personalInfo.surname}</span>
                                        </div>

                                        <div>الاسم الكامل</div>
                        </div>

                        {/* 2th line */}

                        <div className="first-line" style={{fontFamily: "serif",  fontSize: "13px", display: "flex", justifyContent: "space-between", borderBottom: "2px solid black", paddingBottom: window.innerWidth <= 768 ? "2px" : "5px", marginTop: "1px"}}>
                                      <div style={{fontFamily: "serif",  fontSize: "13px",  display: "flex", justifyContent: "space-between", width: "35%"}}>
                                        <span style={{fontFamily: "serif",  fontSize: "13px",}}>Mother Name</span>
                                        {/* <span style={{fontWeight:"bold", fontSize: "13px", fontFamily: "serif",}}>NIYASA GETANA AREDA </span> */}
                                        </div>

                                        <div>{personalInfo.religion === "Muslim" || personalInfo.religion === "islam" ? "الاسلام" : "Non-Muslim"}</div>
                        </div>

                    {/* 3th line */}


                        <div className="first-line" style={{fontFamily: "serif",  fontSize: "13px", display: "flex", justifyContent: "space-between", borderBottom: "2px solid black", paddingBottom: window.innerWidth <= 768 ? "2px" : "5px", marginTop: "1px"}}>


                                      <div style={{fontFamily: "serif",  fontSize: "13px",  display: "flex", justifyContent: "space-between", width: "47%"}}>


                                        
                                            <span style={{fontFamily: "serif",  fontSize: "13px",}}>Date of Birth:</span>
                                            <span style={{fontWeight:"bold", fontFamily: "serif",  fontSize: "13px",}}>{personalInfo.dateOfBirth}</span>
                                           


                                            
                                            <span style={{fontWeight:"bold", fontSize: "13px", fontFamily: "serif",}}>تاريخ الميلاد</span>
                                      


                                        </div>

                                        <div style={{fontFamily: "serif",  fontSize: "13px",  display: "flex", justifyContent: "space-between", width: "47%"}}>


           <div style={{display: "flex", justifyContent: "space-between", width: "58%",}}>                         
<span style={{fontFamily: "serif",  fontSize: "13px"}}>Place of Birth : </span>
<span style={{fontWeight:"bold", fontFamily: "serif",  fontSize: "13px",}}>{personalInfo.placeOfBirth}</span>
</div>    




<span style={{fontWeight:"bold", fontSize: "13px", fontFamily: "serif",}}>مكان الميلاد</span>



</div>
                        </div>

{/* 4th line */}

                        <div className="first-line" style={{fontFamily: "serif",  fontSize: "13px", display: "flex", justifyContent: "space-between", borderBottom: "2px solid black", paddingBottom: window.innerWidth <= 768 ? "2px" : "5px", marginTop: "1px"}}>


<div style={{fontFamily: "serif",  fontSize: "13px",  display: "flex", justifyContent: "space-between", width: "47%"}}>


  
      <span style={{fontFamily: "serif",  fontSize: "13px",}}>Past Nationality:</span>
     
     


      
      <span style={{fontWeight:"bold", fontSize: "13px", fontFamily: "serif",}}> الجنسية السابقة      </span>



  </div>

  <div style={{fontFamily: "serif",  fontSize: "13px",  display: "flex", justifyContent: "space-between", width: "47%"}}>


 <div  style={{display: "flex", justifyContent: "space-between", width: "58%",}}>
<span style={{fontFamily: "serif",  fontSize: "13px",}}>Current Nationality : </span>
<span style={{fontWeight:"bold",fontFamily: "serif",  fontSize: window.innerWidth <= 768 && sponsorInformation.currentNationality !== "Ethiopia" ? "10px" : "13px" }}>{sponsorInformation.currentNationality}</span>
</div>




<span style={{fontWeight:"bold", fontSize: "13px", fontFamily: "serif",}}> الجنسية الحالية
</span>



</div>

</div>

{/* 5th line */}

<div className="first-line" style={{fontFamily: "serif",  fontSize: "13px", display: "flex", justifyContent: "space-between", borderBottom: "2px solid black", paddingBottom: window.innerWidth <= 768 ? "2px" : "5px", marginTop: "1px"}}>


<div style={{fontFamily: "serif",  fontSize: "13px",  display: "flex", justifyContent: "space-between", width: "47%"}}>


  
      <span style={{fontFamily: "serif",  fontSize: "13px",}}>Sex:</span>
      <span style={{fontWeight:"bold", fontFamily: "serif",  fontSize: "13px",}}>{personalInfo.sex}</span>
     


      
      <span style={{fontWeight:"bold", fontSize: "13px", fontFamily: "serif",}}> الجنس</span>



  </div>

  <div style={{fontFamily: "serif",  fontSize: "13px",  display: "flex", justifyContent: "space-between", width: "47%"}}>


<div  style={{display: "flex", justifyContent: "space-between", width: "58%",}}>                         
<span style={{fontFamily: "serif",  fontSize: "13px", }}>Marital Status: </span>
<span style={{fontWeight:"bold", fontFamily: "serif",  fontSize: "13px",}}>{personalInfo.maritalStatus}</span>
</div>    




<span style={{fontWeight:"bold", fontSize: "13px", fontFamily: "serif",}}> الحالة الاجتماعية
</span>



</div>
</div>


{/* 6th line */}


<div className="first-line" style={{fontFamily: "serif",  fontSize: "13px", display: "flex", justifyContent: "space-between", borderBottom: "2px solid black", paddingBottom: window.innerWidth <= 768 ? "2px" : "5px", marginTop: "1px"}}>


<div style={{fontFamily: "serif",  fontSize: "13px",  display: "flex", justifyContent: "space-between", width: "47%"}}>


  
      <span style={{fontFamily: "serif",  fontSize: "13px",}}>Sect:</span>
      


  </div>

  <div style={{fontFamily: "serif",  fontSize: "13px",  display: "flex", justifyContent: "space-between", width: "47%"}}>


<div  style={{display: "flex", justifyContent: "space-between", width: "58%",}}>                         
<span style={{fontFamily: "serif",  fontSize: "13px", marginRight: "7px"}}>Religion: </span>
<span style={{fontWeight:"bold", fontFamily: "serif",  fontSize: "13px",}}>{personalInfo.religion === "Muslim" || personalInfo.religion === "islam" ? "الاسلام" : "Non-Muslim"}</span>
</div>    




<span style={{fontWeight:"bold", fontSize: "13px", fontFamily: "serif",}}> الديانة</span>



</div>
</div>


{/* 7th line */}

<div className="first-line" style={{fontFamily: "serif",  fontSize: "13px", display: "flex", justifyContent: "space-between", borderBottom: "2px solid black", paddingBottom: window.innerWidth <= 768 ? "2px" : "5px", marginTop: "1px"}}>


<div style={{fontFamily: "serif",  fontSize: "13px",  display: "flex", justifyContent: "space-between", width: "47%"}}>


  
      <span style={{fontFamily: "serif",  fontSize: "13px",}}>Qualification:</span>
      <span style={{fontWeight:"bold", fontFamily: "serif",  fontSize: "13px",}}>{personalInfo.educationAttainment}</span>
      
     


      
      <span style={{fontWeight:"bold", fontSize: "13px", fontFamily: "serif",}}> المؤهل العلمي</span>



  </div>

  <div style={{fontFamily: "serif",  fontSize: "13px",  display: "flex", justifyContent: "space-between", width: "47%"}}>


<div style={{display: "flex", justifyContent: "space-between", width: "58%",}}>                         
<span style={{fontFamily: "serif",  fontSize: "13px",}}>Profession: </span>
<span style={{fontWeight:"bold", fontFamily: "serif",  fontSize: "13px",}}>{personalInfo.postAppliedFor}</span>
</div>    




<span style={{fontWeight:"bold", fontSize: "13px", fontFamily: "serif",}}> المهنة</span>



</div>
</div>

{/* 8th line */}


<div className="first-line" style={{fontFamily: "serif",  fontSize: "13px", display: "flex", justifyContent: "space-between", borderBottom: "2px solid black", paddingBottom: window.innerWidth <= 768 ? "2px" : "5px", marginTop: "1px"}}>
                                      <div style={{fontFamily: "serif",  fontSize: "13px",  display: "flex", justifyContent: "space-between", width: "35%"}}>
                                        <span style={{fontFamily: "serif",  fontSize: "13px",}}>Home address and telephone No. :</span>
                                        {/* <span style={{fontWeight:"bold", fontSize: "13px", fontFamily: "serif",}}>NIYASA GETANA AREDA </span> */}
                                        </div>

                                        <div> عنوان السكن</div>
                        </div>


{/* 9th line */}

<div className="first-line" style={{fontFamily: "serif",  fontSize: "13px", display: "flex", justifyContent: "space-between", borderBottom: "2px solid black", paddingBottom: "5px", marginTop: "1px"}}>
                                      <div style={{fontFamily: "serif",  fontSize: "13px",  display: "flex", justifyContent: "space-between", width: "35%"}}>
                                        <span style={{fontFamily: "serif",  fontSize: "13px", fontWeight: "bold", marginLeft: "60px"}}>{sponsorInformation.sponsorCity}</span>
                                        {/* <span style={{fontWeight:"bold", fontSize: "13px", fontFamily: "serif",}}>NIYASA GETANA AREDA </span> */}
                                        </div>

                                        <div> </div>
                        </div>

{/* 10th line */}


<div className="first-line" style={{fontFamily: "serif",  fontSize: "13px", display: "flex", justifyContent: "space-between", borderBottom: "2px solid black", paddingBottom: window.innerWidth <= 768 ? "2px" : "5px", marginTop: "1px"}}>
                                      <div style={{fontFamily: "serif",  fontSize: "13px",  display: "flex", justifyContent: "space-between", width: "35%"}}>
                                        <span style={{fontFamily: "serif",  fontSize: "13px",}}>Business address and telephone No. :</span>
                                        {/* <span style={{fontWeight:"bold", fontSize: "13px", fontFamily: "serif",}}>NIYASA GETANA AREDA </span> */}
                                        </div>

                                        <div> عنوان العمل ورقم الهاتف
                                        </div>
                        </div>


{/* 11th line */}


<div className="first-line" style={{fontFamily: "serif",  fontSize: "13px", display: "flex", justifyContent: "space-between", borderBottom: "2px solid black", paddingBottom: "5px", marginTop: "1px"}}>
                                      <div style={{fontFamily: "serif",  fontSize: "13px",  display: "flex", justifyContent: "space-between", width: "35%"}}>
                                        <span style={{fontFamily: "serif",  fontSize: "13px", fontWeight: "bold", marginLeft: "60px"}}>{sponsorInformation.sponsorPhone}</span>
                                        {/* <span style={{fontWeight:"bold", fontSize: "13px", fontFamily: "serif",}}>NIYASA GETANA AREDA </span> */}
                                        </div>

                                        <div> </div>
                        </div>

{/* 12th line */}


<div className="first-line" style={{fontFamily: "serif",  fontSize: "13px", display: "flex", justifyContent: "space-between", borderBottom: "2px solid black",paddingBottom: "5px", marginTop: "7px"}}>
                                      <div style={{fontFamily: "serif",  fontSize: "13px",  display: "flex", justifyContent: "space-between", }}>
                                        <span style={{fontFamily: "serif",  fontSize: "13px",}}>Purpose Of Travel :</span>
                                        {/* <span style={{fontWeight:"bold", fontSize: "13px", fontFamily: "serif",}}>NIYASA GETANA AREDA </span> */}
                                        </div>



                                        <div style={{display: "flex", justifyContent: "space-between",  width: "75%",}}>
                                        <span style={{fontFamily: "serif",  fontSize: "15px", background: `${sponsorInformation.visaType === "work" ? "#88898a" : ""}`, marginTop: "-7px", marginBottom: "-5px", paddingTop: "7px", width: window.innerWidth <= 768 ? "55px" : "50px", paddingLeft: "7px"}}>Work</span>
                                        <span style={{fontFamily: "serif",  fontSize: "15px", background: `${sponsorInformation.visaType === "transit" ? "#88898a" : ""}`, marginTop: "-7px", marginBottom: "-5px", paddingTop: "7px", width: window.innerWidth <= 768 ? "60px" : "55px", paddingLeft: "7px"}}>Transit</span>

                                        <span style={{fontFamily: "serif",  fontSize: "15px", background: `${sponsorInformation.visaType === "workingvisit" ? "#88898a" : ""}`, marginTop: "-7px", marginBottom: "-5px", paddingTop: "7px", width: window.innerWidth <= 768 ? "55px" : "50px", paddingLeft: "7px"}}>Visit</span>
                                        <span style={{fontFamily: "serif",  fontSize: "15px", background: `${sponsorInformation.visaType === "umrah" ? "#88898a" : ""}`, marginTop: "-7px", marginBottom: "-5px", paddingTop: "7px", width: window.innerWidth <= 768 ? "60px" : "55px", paddingLeft: "7px"}}>Umrah</span>

                                        <span style={{fontFamily: "serif",  fontSize: "15px", background: `${sponsorInformation.visaType === "residence" ? "#88898a" : ""}`, marginTop: "-7px", marginBottom: "-5px", paddingTop: "7px", width: window.innerWidth <= 768 ? "82px" : "73px", paddingLeft: "7px"}}>Residence</span>
                                        <span style={{fontFamily: "serif",  fontSize: "15px", background: `${sponsorInformation.visaType === "hajj" ? "#88898a" : ""}`, marginTop: "-7px", marginBottom: "-5px", paddingTop: "7px", width: window.innerWidth <= 768 ? "50px" : "45px", paddingLeft: "7px"}}>Hajj</span>

                                        <span style={{fontFamily: "serif",  fontSize: "15px", background: `${sponsorInformation.visaType === "diplomacy" ? "#88898a" : ""}`, marginTop: "-7px", marginBottom: "-5px", paddingTop: "7px", width: window.innerWidth <= 768 ? "89px" : "80px", paddingLeft: "7px"}}>Diplomacy</span>
                                        <span style={{fontFamily: "serif",  fontSize: "15px", background: `${sponsorInformation.visaType === "other" ? "#88898a" : ""}`, marginTop: "-7px", marginBottom: "-5px", paddingTop: "7px", width: window.innerWidth <= 768 ? "55px" : "50px", paddingLeft: "7px"}}>Other</span>

                                        </div>





                                        <div> الغرض
                                        </div>
                        </div>


{/* 13th line */}


<div style={{borderBottom: "2px solid black",}}>

<div className="first-line" style={{fontFamily: "serif",  fontSize: "13px", display: "flex", justifyContent: "space-between", borderBottom: "2px solid transparent", paddingBottom: "5px", marginTop: "2px"}}>


<div style={{fontFamily: "serif",  fontSize: "13px",  display: "flex", justifyContent: "space-between", }}>


  
      <span style={{fontFamily: "serif",  fontSize: "13px",marginRight: "5px"}}>Place of Issue :</span>
      <span style={{fontWeight:"bold", fontFamily: "serif",  fontSize: "13px",}}>{personalInfo.passportIssuePlace}</span>



  </div>

  <div style={{fontFamily: "serif",  fontSize: "13px",  display: "flex", justifyContent: "space-between",}}>


<div style={{display: "flex", justifyContent: "space-between", }}>                         
<span style={{fontFamily: "serif",  fontSize: "13px", marginRight: "5px"}}>مكان الاصدار Date of issue: </span>
<span style={{fontWeight:"bold", fontFamily: "serif",  fontSize: "13px", marginRight: "15px"}}>{dateOfIssue}</span>
<span style={{fontWeight:"bold", fontFamily: "serif",  fontSize: "13px", }}>تاريخ الاصدار</span>
</div>    


{/* <span style={{fontWeight:"bold", fontSize: "15px", fontFamily: "serif",}}>مكان الميلاد</span> */}

</div>


<div style={{fontFamily: "serif",  fontSize: "13px",  display: "flex", justifyContent: "space-between",}}>


<div style={{display: "flex", justifyContent: "space-between", }}>                         
<span style={{fontFamily: "serif",  fontSize: "13px", marginRight: "5px"}}>Passport No: </span>
<span style={{fontWeight:"bold", fontFamily: "serif",  fontSize: "13px",}}>{personalInfo.passportNo}</span>
</div>    


{/* <span style={{fontWeight:"bold", fontSize: "15px", fontFamily: "serif",}}>مكان الميلاد</span> */}



</div>


<div style={{fontFamily: "serif",  fontSize: "13px",  display: "flex", justifyContent: "space-between",}}>


<div style={{display: "flex", justifyContent: "space-between", }}>                         
<span style={{fontFamily: "serif",  fontSize: "13px", marginRight: "5px"}}>رقم الجواز</span>
{/* <span style={{fontWeight:"bold", fontFamily: "serif",  fontSize: "13px",}}>CHORA</span> */}
</div>    


{/* <span style={{fontWeight:"bold", fontSize: "15px", fontFamily: "serif",}}>مكان الميلاد</span> */}



</div>



</div>


<div>


<div className="first-line" style={{fontFamily: "serif",  fontSize: "13px", display: "flex", justifyContent: "space-between", borderBottom: "2px solid transparent", paddingBottom: window.innerWidth <= 768 ? "2px" : "5px", marginTop: "2px"}}>


<div style={{fontFamily: "serif",  fontSize: "13px",  display: "flex", justifyContent: "space-between", }}>


  
      <span style={{fontFamily: "serif",  fontSize: "13px",marginRight: "5px"}}>Date of Expiry :</span>
      <span style={{fontWeight:"bold", fontFamily: "serif",  fontSize: "13px",}}>{dateOfExpiry}</span>



  </div>

  <div style={{fontFamily: "serif",  fontSize: "13px",  display: "flex", justifyContent: "space-between",}}>


<div style={{display: "flex", justifyContent: "space-between", }}>                         
<span style={{fontFamily: "serif",  fontSize: "13px", marginRight: "5px"}}></span>
<span style={{fontWeight:"bold", fontFamily: "serif",  fontSize: "13px",}}></span>
</div>    


{/* <span style={{fontWeight:"bold", fontSize: "15px", fontFamily: "serif",}}>مكان الميلاد</span> */}

</div>


<div style={{fontFamily: "serif",  fontSize: "13px",  display: "flex", justifyContent: "space-between",}}>


<div style={{display: "flex", justifyContent: "space-between", }}>                         
<span style={{fontFamily: "serif",  fontSize: "15px", marginRight: "5px"}}></span>
<span style={{fontWeight:"bold", fontFamily: "serif",  fontSize: "15px",}}></span>
</div>    


{/* <span style={{fontWeight:"bold", fontSize: "15px", fontFamily: "serif",}}>مكان الميلاد</span> */}



</div>


<div style={{fontFamily: "serif",  fontSize: "13px",  display: "flex", justifyContent: "space-between",}}>


<div style={{display: "flex", justifyContent: "space-between", }}>                         
<span style={{fontFamily: "serif",  fontSize: "13px", marginRight: "5px"}}></span>
<span style={{fontWeight:"bold", fontFamily: "serif",  fontSize: "13px",}}>تاريخ الانتهاء</span>
</div>    


{/* <span style={{fontWeight:"bold", fontSize: "15px", fontFamily: "serif",}}>مكان الميلاد</span> */}



</div>



</div>

</div>


</div>


{/* 14th line */}



<div style={{borderBottom: "2px solid black",}}>

<div className="first-line" style={{fontFamily: "serif",  fontSize: "13px", display: "flex", justifyContent: "space-between", flexDirection: "row-reverse" , borderBottom: "2px solid transparent", paddingBottom: "5px", marginTop: "2px"}}>


<div style={{fontFamily: "serif",  fontSize: "13px",  display: "flex", justifyContent: "space-between", }}>


  
      <span style={{fontFamily: "serif",  fontSize: "13px",marginRight: "5px"}}>تاريخ المغادرة      </span>
      {/* <span style={{fontWeight:"bold", fontFamily: "serif",  fontSize: "13px",}}></span> */}



  </div>

  <div style={{fontFamily: "serif",  fontSize: "13px",  display: "flex", justifyContent: "space-between",}}>


<div style={{display: "flex", justifyContent: "space-between", }}>                         
<span style={{fontFamily: "serif",  fontSize: "13px", marginRight: "5px"}}>تاريخ الوصول</span>
{/* <span style={{fontWeight:"bold", fontFamily: "serif",  fontSize: "13px",}}>CHORA</span> */}
</div>    


{/* <span style={{fontWeight:"bold", fontSize: "15px", fontFamily: "serif",}}>مكان الميلاد</span> */}

</div>


<div style={{fontFamily: "serif",  fontSize: "13px",  display: "flex", justifyContent: "space-between",}}>


<div style={{display: "flex", justifyContent: "space-between", }}>                         
<span style={{fontFamily: "serif",  fontSize: "13px", marginRight: "5px"}}>مدة الإقامة بالمملكة</span>
{/* <span style={{fontWeight:"bold", fontFamily: "serif",  fontSize: "13px",}}>CHORA</span> */}
</div>    






</div>


<div style={{fontFamily: "serif",  fontSize: "13px",  display: "flex", justifyContent: "space-between",}}>


<div style={{display: "flex", justifyContent: "space-between", }}>                         
<span style={{fontFamily: "serif",  fontSize: "13px", marginRight: "5px"}}></span>
<span style={{fontWeight:"bold", fontFamily: "serif",  fontSize: "13px",}}></span>
</div>    


{/* <span style={{fontWeight:"bold", fontSize: "15px", fontFamily: "serif",}}>مكان الميلاد</span> */}



</div>



</div>









<div>


<div className="first-line" style={{fontFamily: "serif",  fontSize: "13px", display: "flex", justifyContent: "space-between",  borderBottom: "2px solid transparent", paddingBottom: "5px", marginTop: "2px"}}>


<div style={{fontFamily: "serif",  fontSize: "13px",  display: "flex", justifyContent: "space-between", }}>


  
      <span style={{fontFamily: "serif",  fontSize: "13px",marginRight: "5px"}}>Duration of stay in the Kingdom :</span>
      {/* <span style={{fontWeight:"bold", fontFamily: "serif",  fontSize: "13px",}}>Date of arrival :</span> */}



  </div>

  <div style={{fontFamily: "serif",  fontSize: "13px",  display: "flex", justifyContent: "space-between",}}>


<div style={{display: "flex", justifyContent: "space-between", }}>                         
<span style={{fontFamily: "serif",  fontSize: "13px", marginRight: "5px"}}>Date of arrival :</span>
{/* <span style={{fontWeight:"bold", fontFamily: "serif",  fontSize: "13px",}}>CHORA</span> */}
</div>    


{/* <span style={{fontWeight:"bold", fontSize: "15px", fontFamily: "serif",}}>مكان الميلاد</span> */}

</div>


<div style={{fontFamily: "serif",  fontSize: "13px",  display: "flex", justifyContent: "space-between",}}>


<div style={{display: "flex", justifyContent: "space-between", }}>                         
<span style={{fontFamily: "serif",  fontSize: "13px", marginRight: "5px"}}>Date of departuer :</span>
{/* <span style={{fontWeight:"bold", fontFamily: "serif",  fontSize: "13px",}}>CHORA</span> */}
</div>    






</div>


<div style={{fontFamily: "serif",  fontSize: "13px",  display: "flex", justifyContent: "space-between",}}>


<div style={{display: "flex", justifyContent: "space-between", }}>                         
<span style={{fontFamily: "serif",  fontSize: "13px", marginRight: "5px"}}></span>
<span style={{fontWeight:"bold", fontFamily: "serif",  fontSize: "13px",}}></span>
</div>    


{/* <span style={{fontWeight:"bold", fontSize: "15px", fontFamily: "serif",}}>مكان الميلاد</span> */}



</div>



</div>
</div>












</div>



{/* 15th line */}


<div className="first-line" style={{fontFamily: "serif",  fontSize: "13px", display: "flex", justifyContent: "space-between", borderBottom: "2px solid black", paddingBottom: "5px", marginTop: "2px"}}>


<div style={{fontFamily: "serif",  fontSize: "13px",  display: "flex", justifyContent: "space-between", }}>


  
      <span style={{fontFamily: "serif",  fontSize: "13px",marginRight: "5px"}}>Mode of Payment:</span>
      {/* <span style={{fontWeight:"bold", fontFamily: "serif",  fontSize: "13px",}}>02/11/1997</span> */}



  </div>

  <div style={{fontFamily: "serif",  fontSize: "13px",  display: "flex", justifyContent: "space-between",}}>


<div style={{display: "flex", justifyContent: "space-between", }}>                         
<span style={{fontFamily: "serif",  fontSize: "13px", marginRight: "5px"}}>طريقة الدفع Payment No: </span>
{/* <span style={{fontWeight:"bold", fontFamily: "serif",  fontSize: "13px",}}>CHORA</span> */}
</div>    


{/* <span style={{fontWeight:"bold", fontSize: "15px", fontFamily: "serif",}}>مكان الميلاد</span> */}

</div>


<div style={{fontFamily: "serif",  fontSize: "13px",  display: "flex", justifyContent: "space-between",}}>


<div style={{display: "flex", justifyContent: "space-between", }}>                         
<span style={{fontFamily: "serif",  fontSize: "13px", marginRight: "5px"}}>رقم الدفع Date: </span>
{/* <span style={{fontWeight:"bold", fontFamily: "serif",  fontSize: "13px",}}>CHORA</span> */}
</div>    


{/* <span style={{fontWeight:"bold", fontSize: "15px", fontFamily: "serif",}}>مكان الميلاد</span> */}



</div>


<div style={{fontFamily: "serif",  fontSize: "13px",  display: "flex", justifyContent: "space-between",}}>


<div style={{display: "flex", justifyContent: "space-between", }}>                         
{/* <span style={{fontFamily: "serif",  fontSize: "15px", marginRight: "5px"}}>Place of Birth : </span> */}
<span style={{fontWeight:"bold", fontFamily: "serif",  fontSize: "13px",}}>تاريخ</span>
</div>    


{/* <span style={{fontWeight:"bold", fontSize: "15px", fontFamily: "serif",}}>مكان الميلاد</span> */}



</div>



</div>

{/* 16th line */}


<div className="first-line" style={{fontFamily: "serif",  fontSize: "13px", display: "flex", justifyContent: "space-between", borderBottom: "2px solid black", paddingBottom: "1px", marginTop: "1px"}}>
                                      <div style={{fontFamily: "serif",  fontSize: "13px",  display: "flex", justifyContent: "space-between", width: "35%"}}>
                                        <span style={{fontFamily: "serif",  fontSize: "13px", fontWeight: "bold"}}>Relationship :</span>
                                        {/* <span style={{fontWeight:"bold", fontSize: "13px", fontFamily: "serif",}}>NIYASA GETANA AREDA </span> */}
                                        </div>

                                        <div> </div>
                        </div>






{/* 17th line */}


<div className="first-line" style={{fontFamily: "serif",  fontSize: "13px", display: "flex", justifyContent: "space-between", borderBottom: "2px solid black", paddingBottom: window.innerWidth <= 768 ? "2px" : "5px", marginTop: "2px"}}>


<div style={{fontFamily: "serif",  fontSize: "13px",  display: "flex", justifyContent: "space-between", }}>


  
      <span style={{fontFamily: "serif",  fontSize: "13px",}}>Destination:</span>
      {/* <span style={{fontWeight:"bold", fontFamily: "serif",  fontSize: "15px",}}>02/11/1997</span> */}



  </div>

  <div style={{fontFamily: "serif",  fontSize: "13px",  display: "flex", justifyContent: "space-between", }}>


<div style={{display: "flex", justifyContent: "space-between", }}>                         
<span style={{fontFamily: "serif",  fontSize: "13px", }}>المكان المقصود Dealer Name: </span>
{/* <span style={{fontWeight:"bold", fontFamily: "serif",  fontSize: "13px",}}>CHORA</span> */}
</div>    


{/* <span style={{fontWeight:"bold", fontSize: "15px", fontFamily: "serif",}}>مكان الميلاد</span> */}

</div>




<div style={{fontFamily: "serif",  fontSize: "13px",  display: "flex", justifyContent: "space-between", }}>


<div style={{display: "flex", justifyContent: "space-between", }}>                         
{/* <span style={{fontFamily: "serif",  fontSize: "15px", marginRight: "5px"}}>Place of Birth : </span> */}
<span style={{fontWeight:"bold", fontFamily: "serif",  fontSize: "13px",}}>اسم البائع</span>
</div>    


{/* <span style={{fontWeight:"bold", fontSize: "15px", fontFamily: "serif",}}>مكان الميلاد</span> */}



</div>



</div>


{/* 18th line */}


<div className="first-line" style={{fontFamily: "serif",  fontSize: "13px", display: "flex", justifyContent: "space-between", borderBottom: "2px solid transparent", marginTop: "4px"}}>
                                      <div style={{fontFamily: "serif",  fontSize: "13px",  display: "flex", justifyContent: "space-between", width: "35%"}}>
                                        <span style={{fontFamily: "serif",  fontSize: "13px",}}>Dependents traveling in the same passport:</span>
                                        {/* <span style={{fontWeight:"bold", fontSize: "13px", fontFamily: "serif",}}>NIYASA GETANA AREDA </span> */}
                                        </div>

                                        <div>  ايضاحات تخص أفراد العائلة المضافين على نفس جواز السفر    </div>
                        </div>


{/* 19th line */}


<div className="first-line" style={{fontFamily: "serif",  fontSize: "13px", display: "flex", justifyContent: "space-between", border: "1px solid black",  marginTop: "1px", height: "50px"}}>


<div style={{fontFamily: "serif",  fontSize: "13px",  display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", borderRight: "1px solid black", height: "100%", width: "35%"}}>


  
      <span style={{fontFamily: "serif",  fontSize: "13px",marginRight: "5px"}}>صلة  </span>
      <span style={{fontWeight:"bold", fontFamily: "serif",  fontSize: "13px",}}>Relationship</span>



  </div>

  <div style={{fontFamily: "serif",  fontSize: "13px",  display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", borderRight: "1px solid black", height: "100%", width: "15%"}}>


  
      <span style={{fontFamily: "serif",  fontSize: "13px",marginRight: "5px"}}>تاريخ الميلاد      </span>
      <span style={{fontWeight:"bold", fontFamily: "serif",  fontSize: "13px",}}>Date of Birth</span>



  </div>


  <div style={{fontFamily: "serif",  fontSize: "13px",  display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", borderRight: "1px solid black", height: "100%", width: "30%"}}>


  
<span style={{fontFamily: "serif",  fontSize: "13px",marginRight: "5px"}}>الجنس</span>
<span style={{fontWeight:"bold", fontFamily: "serif",  fontSize: "13px",}}>Sex</span>



</div>


<div style={{fontFamily: "serif",  fontSize: "13px",  display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", height: "100%", width: "20%"}}>


  
      <span style={{fontFamily: "serif",  fontSize: "13px",marginRight: "5px"}}>الاسم الكامل      </span>
      <span style={{fontWeight:"bold", fontFamily: "serif",  fontSize: "13px",}}>Full Name</span>



  </div>



</div>


{/* 20th line */}


<div className="first-line" style={{fontFamily: "serif",  fontSize: "13px", display: "flex", justifyContent: "space-between", borderBottom: "1px solid black", marginTop: "4px"}}>
                                      <div style={{fontFamily: "serif",  fontSize: "13px",  display: "flex", justifyContent: "space-between", width: "50%"}}>
                                        <span style={{fontFamily: "serif",  fontSize: "13px",}}>Name and address of company or individual in the Kingdom:</span>
                                        {/* <span style={{fontWeight:"bold", fontSize: "13px", fontFamily: "serif",}}>NIYASA GETANA AREDA </span> */}
                                        </div>

                                        <div style={{borderBottom: "1px solid black", marginBottom: "4px", width:"40%", display: "flex", justifyContent: "flex-end"}}> اسم وعنوان الشركه او اسم الشخص وعنوانه بالمملكة                                        </div>
                        </div>



{/* 21th line */}


<div className="first-line" style={{fontFamily: "serif",  fontSize: "13px", display: "flex", justifyContent: "space-between", borderBottom: "2px solid transparent", marginTop: "1px", }}>
                                      <div style={{fontFamily: "serif",  fontSize: "13px",  display: "flex", justifyContent: "space-between", width: "60%"}}>
                                        <span style={{fontFamily: "serif",  fontSize: window.innerWidth <= 768 ? "10px" : "13px",}}>The undersigned hereby certify that all the information I have provided are correct</span>
                                        {/* <span style={{fontWeight:"bold", fontSize: "13px", fontFamily: "serif",}}>NIYASA GETANA AREDA </span> */}
                                        </div>

                                        <div  style={{fontFamily: "serif",  fontSize: "13px",}}>       أقر انا الموقع أدناه بأن كل المعلومات التي دونتها صحيحة                                        </div>
                        </div>


{/* 22th line */}


<div className="first-line" style={{fontFamily: "serif",  fontSize: "8px", display: "flex", justifyContent: "space-between", borderBottom: "2px solid transparent", marginTop: window.innerWidth <= 768 ? "0" : "-3px", }}>
                                      <div style={{fontFamily: "serif",  fontSize: "8px",  display: "flex", justifyContent: "space-between", width: "60%"}}>
                                        <span style={{fontFamily: "serif",  fontSize: window.innerWidth <= 768 ? "10px" : "13px",}}>I will abide by the lows of the Kingdom during the period of my residence in it. </span>
                                        {/* <span style={{fontWeight:"bold", fontSize: "13px", fontFamily: "serif",}}>NIYASA GETANA AREDA </span> */}
                                        </div>

                                        <div  style={{fontFamily: "serif",  fontSize: "13px",}}>       وسأكون ملتزمآ يقوانين المملكة أثناء فترة وجودي بها                                        </div>
                        </div>



{/* 23th line */}


<div className="first-line" style={{fontFamily: "serif",  fontSize: "13px", display: "flex", justifyContent: "space-between", borderBottom: "2px solid transparent", paddingBottom: "5px", marginTop: window.innerWidth <= 768 ? "-3px" : "5px",}}>


<div style={{fontFamily: "serif",  fontSize: "13px",  display: "flex", justifyContent: "space-between", width: "46%"}}>


  <div>
      <span style={{fontFamily: "serif",  fontSize: "13px", marginRight: "5px"}}>Date:</span>
      <span style={{fontWeight:"bold", fontFamily: "serif",  fontSize: "13px",}}>{formattedTodayDate}</span>
      </div>
     


      <div style={{display: "flex", alignItems: "center"}}>
    <span style={{fontWeight:"bold", fontSize: "13px", fontFamily: "serif"}}>Signature: </span>
    <hr style={{borderBottom: "1px solid black", flexGrow: "1", marginTop: "13px",   width: "80px"}} />
    <span style={{fontWeight:"bold", fontSize: "13px", fontFamily: "serif"}}>التوقيع</span>
</div>



  </div>

  <div style={{fontFamily: "serif",  fontSize: "13px",  display: "flex", justifyContent: "space-between", width: "53%"}}>


<div style={{display: "flex", justifyContent: "space-between", }}>                         
<span style={{fontFamily: "serif",  fontSize: "13px", marginRight: "5px"}}>Name : </span>
<span style={{fontWeight:"bold", fontFamily: "serif",  fontSize: "13px",}}>{personalInfo.name} {personalInfo.middleName} {personalInfo.surname}</span>
</div>    




<span style={{fontWeight:"bold", fontSize: "13px", fontFamily: "serif",}}> الاسم الكامل</span>



</div>
</div>


{/* 24th line */}




<div className="first-line" style={{fontFamily: "serif",  fontSize: "8px", display: "flex", justifyContent: "space-between", borderBottom: "2px solid transparent", marginTop: window.innerWidth <= 768 ? "-3px" : "3px", }}>
                                      <div style={{fontFamily: "serif",  fontSize: "8px",  display: "flex", justifyContent: "space-between", width: "35%"}}>
                                        <span style={{fontFamily: "serif",  fontSize: "13px",}}>For offical use only:</span>
                                        {/* <span style={{fontWeight:"bold", fontSize: "13px", fontFamily: "serif",}}>NIYASA GETANA AREDA </span> */}
                                        </div>

                                        <div  style={{fontFamily: "serif",  fontSize: "13px",}}>     للاستخدام الرسمي فقط                                        </div>
                        </div>




{/* 25th line */}



<div className="first-line" style={{fontFamily: "serif",  fontSize: "13px", display: "flex", justifyContent: "space-between", borderBottom: "2px solid transparent", paddingBottom: window.innerWidth <= 768 ? "-1px" : "5px", marginTop: window.innerWidth <= 768 ? "-3px" : "3px",}}>


<div style={{fontFamily: "serif",  fontSize: "13px",  display: "flex", justifyContent: "space-between", width: "46%"}}>


  <div>
      <span style={{fontFamily: "serif",  fontSize: "13px", marginRight: "5px"}}>Visit / Work For :</span>
      {/* <span style={{fontWeight:"bold", fontFamily: "serif",  fontSize: "13px",}}>02/11/1997</span> */}
      </div>
     


      <div style={{display: "flex", alignItems: "center"}}>
    <span style={{fontWeight:"bold", fontSize: "13px", fontFamily: "serif"}}>التاريخ    </span>
    {/* <hr style={{borderBottom: "1px solid black", flexGrow: "1", marginTop: "13px",   width: "80px"}} />
    <span style={{fontWeight:"bold", fontSize: "13px", fontFamily: "serif"}}>التوقيع</span> */}
</div>



  </div>

  <div style={{fontFamily: "serif",  fontSize: "13px",  display: "flex", justifyContent: "space-between", width: "53%"}}>


<div style={{display: "flex", justifyContent: "space-between", }}>                         
<span style={{fontFamily: "serif",  fontSize: "13px", marginRight: "5px"}}>Authorization: </span>
{/* <span style={{fontWeight:"bold", fontFamily: "serif",  fontSize: "13px",}}>NIYASA GETANA AREDA</span> */}
</div>    




<span style={{fontWeight:"bold", fontSize: "13px", fontFamily: "serif",}}> تفويض</span>



</div>
</div>



{/* 26th line */}


<div className="first-line" style={{fontFamily: "serif",  fontSize: "8px", display: "flex", justifyContent: "space-between", borderBottom: "2px solid transparent", marginTop: window.innerWidth <= 768 ? "-3px" : "3px", }}>
                                      <div style={{fontFamily: "serif",  fontSize: "8px",  display: "flex", justifyContent: "space-between", width: "35%"}}>
                                        <span style={{fontFamily: "serif",  fontSize: "13px",}}>Type</span>
                                        {/* <span style={{fontWeight:"bold", fontSize: "13px", fontFamily: "serif",}}>NIYASA GETANA AREDA </span> */}
                                        </div>

                                        <div  style={{fontFamily: "serif",  fontSize: "13px",}}>       زيادة او العمل من أجل                                        </div>
                        </div>



{/* 27th line */}




<div className="first-line" style={{fontFamily: "serif",  fontSize: "13px", display: "flex", justifyContent: "space-between", borderBottom: "2px solid transparent", paddingBottom: window.innerWidth <= 768 ? "0" : "5px", marginTop: window.innerWidth <= 768 ? "-3px" : "3px",}}>


<div style={{fontFamily: "serif",  fontSize: "13px",  display: "flex", justifyContent: "space-between", width: "49.7%"}}>


  <div>
      <span style={{fontFamily: "serif",  fontSize: "13px", marginRight: "5px"}}>Date of Birth:</span>
      {/* <span style={{fontWeight:"bold", fontFamily: "serif",  fontSize: "13px",}}>02/11/1997</span> */}
      </div>
     


      <div style={{display: "flex", alignItems: "center"}}>
    <span style={{fontWeight:"bold", fontSize: "13px", fontFamily: "serif"}}>نوع </span>
    {/* <hr style={{borderBottom: "1px solid black", flexGrow: "1", marginTop: "13px",   width: "80px"}} />
    <span style={{fontWeight:"bold", fontSize: "13px", fontFamily: "serif"}}>التوقيع</span> */}
</div>



  </div>

  <div style={{fontFamily: "serif",  fontSize: "13px",  display: "flex", justifyContent: "space-between", width: "49.7%"}}>


<div style={{display: "flex", justifyContent: "space-between", }}>                         
<span style={{fontFamily: "serif",  fontSize: "13px", marginRight: "5px"}}>Duration: </span>
{/* <span style={{fontWeight:"bold", fontFamily: "serif",  fontSize: "13px",}}>NIYASA GETANA AREDA</span> */}
</div>    




<span style={{fontWeight:"bold", fontSize: "13px", fontFamily: "serif",}}> المدة الزمنية</span>



</div>
</div>


{/* 28th line */}



<div className="first-line" style={{fontFamily: "serif",  fontSize: "8px", display: "flex", justifyContent: "space-between", borderBottom: "2px solid transparent", marginTop: window.innerWidth <= 768 ? "-3px" : "3px", }}>
                                      <div style={{fontFamily: "serif",  fontSize: "8px",  display: "flex", justifyContent: "space-between", width: "35%"}}>
                                        <span style={{fontFamily: "serif",  fontSize: "13px",}}>رئيس القسم القنصلي</span>
                                        {/* <span style={{fontWeight:"bold", fontSize: "13px", fontFamily: "serif",}}>NIYASA GETANA AREDA </span> */}
                                        </div>

                                        <div  style={{fontFamily: "serif",  fontSize: "13px",}}>      فحص بواسطة                                        </div>
                        </div>




{/* 29th line */}



<div className="first-line" style={{fontFamily: "serif",  fontSize: "8px", display: "flex", justifyContent: "space-between", borderBottom: "2px solid transparent", marginTop: window.innerWidth <= 768 ? "-3px" : "3px", }}>
                                      <div style={{fontFamily: "serif",  fontSize: "8px",  display: "flex", justifyContent: "space-between", width: "35%"}}>
                                        <span style={{fontFamily: "serif",  fontSize: "13px",}}>Head of consular section</span>
                                        {/* <span style={{fontWeight:"bold", fontSize: "13px", fontFamily: "serif",}}>NIYASA GETANA AREDA </span> */}
                                        </div>

                                        <div  style={{fontFamily: "serif",  fontSize: "13px",}}>     Checked by  </div>
                        </div>



{/* 30th line */}






{/* 31th line */}
                    </div>
                </div>
            </div>





{/* end embassy cv content */}

       
        
       
    </div>
    );
};

export default Home;