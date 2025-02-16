import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Alert,
  Button,
  Box,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';
import imagePlaceholder from "../image_placeholder/download.png";
import Header from "../screens/header";
import ReactPlayer from "react-player";
import thumbnail from "../image_placeholder/skywayimg.jpeg";
import html2pdf from 'html2pdf.js';


import goldagent from "../images/goldagent.jpeg" 
import hudud from "../image_placeholder/hudud.jpeg"
import skywayimg from "../image_placeholder/skywayimg.jpeg"
import skywaylogo from "../image_placeholder/skywaylogo.jpeg"

import demoimage from "../image_placeholder/demoimage.jpg"


import barakaimg from "../image_placeholder/barakaimg.jpeg"
import bodyimg from "../images/images.jpeg"
import ouragentlogo from "../images/ouragentlogo.jpeg"
import assawsan from "../image_placeholder/assawsan.jpeg"
import Barcode from 'react-barcode';

import smallapplicantimage from "../image_placeholder/smallapplicantimage.jpeg"
import saudiforeignaffairslogo from "../image_placeholder/saudiforeignaffairslogo.png"


import DeleteIcon from '@mui/icons-material/Delete'; 
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

import Snackbar from "@mui/material/Snackbar"
// import Button from '@mui/material/Button';


import KaanAlRiyadhHeaderImg from "../image_placeholder/KaanAlRiyadh.png"



import phoneIcon from "../image_placeholder/phoneIcon.png"
import EmailIcon from "../image_placeholder/emailIcon.png"
import AddressIcon from "../image_placeholder/addressIcon.png"


const DetailPage = () => {
  const id = useParams();
  const [data, setData] = useState(null);
  const [data2, setData2] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const [fileName, setFileName] = useState("E776062468");

  
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [editData, setEditData] = React.useState({});

  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const [pdfUrl, setPdfUrl] = useState(null); // State to hold PDF URL
    const pdfRef2 = useRef();


  const [base64Image, setBase64Image] = useState(null);

  const [comment, setComment] = useState('');

  const agentName = localStorage.getItem('userdata');

  // const xx = data.experience ? JSON.parse(data.experience) : "";
  
  // Menu state
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedRow, setSelectedRow] = React.useState(null);


  useEffect(() => {
    const fetchData = async () => {
      console.log(agentName, " aaaaaaaaaaaa")
      try {
        const response = await fetch(`https://skywayapi.ntechagent.com/detail/tget-images/${id}?agentname=${agentName}`);
        const result = await response.json();
        if (result.status === 'ok') {
          setData(result.data); // Ensure this is an array
        } else {
          console.error('Error fetching data:', result.message);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleEdit = (row) => {
    setEditData(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditData({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {

    if (editData.applicationNo && !editData.applicationNo.startsWith('E')) {
      editData.applicationNo = 'E' + editData.applicationNo; // Prepend 'E' if it doesn't start with 'E'
    }


    try {
      const response = await fetch(`https://skywayapi.ntechagent.com/tget-images/${editData.id}?agentname=${agentName}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editData),
      });
      const result = await response.json();

      if (result.status === 'ok') {
        // Update data in state immediately
        setData((prev) => ({
          ...prev,
          ...result.data, // Use the updated data directly
        }));
        handleClose();
      } else {
        console.error('Error updating data:', result.message);
        alert(`Update failed: ${result.message}`);
      }
    } catch (error) {
      console.error('Update error:', error);
      alert('An error occurred while updating data.');
    }
  };


  const handleMenuOptionClick = (option, event) => {
    event.stopPropagation(); // Prevents navigation when the menu option is clicked
    // handleMenuClose();
    if (option === 'copy-link') {
      // Construct the detail page URL
      const link = `${window.location.origin}/list/${selectedRow._id}`;
      
      // Copy the link to the clipboard
      navigator.clipboard.writeText(link)
        .then(() => {
          console.log('Link copied to clipboard:', link);
          alert('Link copied to clipboard!'); // Optional: give feedback to the user
        })
        .catch(err => {
          console.error('Failed to copy link:', err);
        });
    } else if (option === 'detail') {
      // navigate(`/list/${selectedRow._id}`);
    } else if (option === 'send') {
      // Implement send functionality here
      console.log('Send option for:', selectedRow);
    }
  };

  const [styles, setStyles] = useState({
    styleOne: agentName === "golden" ? true : false,
    styleTwo: agentName === "bela" ? true : false,
    styleThree: agentName === "skyway" ? true : false,
    styleFour: agentName === "baraka" ? true : false,
    styleFive:  false,

    styleKaan: agentName === "kaan" ? true : false,
    styleQimam: agentName === "qimam" ? true : false,

    // styleFive: false,
    all: false,
  });


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



  const handleStyleChange = (event) => {
    const { name, checked } = event.target;

    // If "All" checkbox is checked, set all styles to true
    if (name === 'all') {
      setStyles({
        styleOne: checked,
        styleTwo: checked,
        styleThree: checked,
        styleFour: checked,
        styleFive: checked,

        styleKaan: checked,
        styleQimam: checked,
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


//   const downloadCV = () => {
//     const element = document.getElementById("embassycvContent");
//     const options = {
//         margin: 0.2,
//         marginBottom: 0,
//         filename: 'Embassy.pdf',
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

// const downloadCV = () => {
//   const element = pdfRef.current;

//   // Configuration for html2pdf
//   const config = {
//     filename: 'Embassy.pdf',
//     image: { type: 'jpeg', quality: 0.98 },
//     html2canvas: { scale: 2, logging: true, dpi: 300, letterRendering: true },
//     jsPDF: { unit: 'mm', format: 'letter', orientation: 'Portrait' }
//   };

//   html2pdf()
//     .from(element)
//     .set(config)
//     .toPdf()
//     .get('pdf')
//     .then(pdf => {
//       const totalPages = pdf.internal.getNumberOfPages();
//       const phoneNumber = `${dayName}, ${monthName} ${dayNumber}, ${year}`; // Replace with your phone number
//       const email = "www.ntechagent.com | +251 911 454176 | ntechagent@gmail.com"; // Replace with your email

//       for (let i = 1; i <= totalPages; i++) {
//         pdf.setPage(i);
//         pdf.setFontSize(10);
//         pdf.setTextColor(5);

//         // Set positions
//         const pageYPosition = pdf.internal.pageSize.getHeight() - 10; // Y position for footer
//         const leftXPosition = 3; // X position for left side text
//         const rightXPosition = pdf.internal.pageSize.getWidth() - 22; // Base position for page number
//         const centerXPosition = pdf.internal.pageSize.getWidth() / 2; // Center position

//         // Add phone number on the left
//         pdf.text(`${phoneNumber}`, leftXPosition, pageYPosition);

//         // Add email in the center   
//         pdf.text(` ${email}`, centerXPosition, pageYPosition, { align: 'center' });

//         // Add page number and total pages to the footer on the right
//         pdf.text(`Page ${i} of ${totalPages}`, rightXPosition, pageYPosition);
//         // pdf.text(`of ${totalPages}`, rightXPosition - 20, pageYPosition); // Adjust to fit
//       }
//     })
//     .save();
// };

const downloadCV = () => {
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

// const downloadCV = () => {
//   const element = pdfRef.current;

//   // Configuration for html2pdf
//   const config = {
//     filename: 'Embassy.pdf',
//     margin: { top: 10, bottom: 20, left: 10, right: 10 }, // Adjust margins here
//     image: { type: 'jpeg', quality: 0.98 },
//     html2canvas: { scale: 2, logging: true, dpi: 300, letterRendering: true },
//     jsPDF: { unit: 'mm', format: 'a4', orientation: 'Portrait' }
//   };

//   html2pdf()
//     .from(element)
//     .set(config)
//     .toPdf()
//     .get('pdf')
//     .then(pdf => {
//       const totalPages = pdf.internal.getNumberOfPages();

//       for (let i = 1; i <= totalPages; i++) {
//         pdf.setPage(i);
//         pdf.setFontSize(10);
//         pdf.setTextColor(150);
//         // Adjust the footer position as needed
//         const pageHeight = pdf.internal.pageSize.getHeight();
//         const yPosition = pageHeight - 15; // Set a better position for the footer text

//         // Add page number and total pages to the footer
//         pdf.text(`Page ${i}`, pdf.internal.pageSize.getWidth() - 30, yPosition);
//         pdf.text(`of ${totalPages}`, pdf.internal.pageSize.getWidth() - 50, yPosition);
//       }
//     })
//     .save();
// };



  const downloadMultipleCVs = async () => {

    const isSmallDevice = window.innerWidth < 768;


        const pdfElements = [
          { elementId: styles.styleTwo ? 'cvContent1' : "", filename: `${`${data.name} ${data.middleName} ${data.surname} ${data.religion} ${JSON.parse(data.experience)[0].name ? JSON.parse(data.experience)[0].name + " Experienced"  : "First TIme"} Bela Hodod`}.pdf`, margin: 0.5 , format: "letter" },
          {  elementId: styles.styleOne ? 'cvContent2' : "", filename:  `${`${data.name} ${data.middleName} ${data.surname} ${data.religion} ${JSON.parse(data.experience)[0].name ? JSON.parse(data.experience)[0].name + " Experienced"  : "First TIme"} Golden`}.pdf`, margin: 0.5, format: "letter" },
          { elementId: styles.styleFour ? 'cvAssawsanahContent' : "", filename:  `${`${data.name} ${data.middleName} ${data.surname} ${data.religion} ${JSON.parse(data.experience)[0].name ? JSON.parse(data.experience)[0].name + " Experienced"  : "First TIme"} Baraka`}.pdf`, margin: 0.5, format: "letter" },
          { elementId: styles.styleThree ? 'cvBarakaContent' : "", filename:  `${`${data.name} ${data.middleName} ${data.surname} ${data.religion} ${JSON.parse(data.experience)[0].name ? JSON.parse(data.experience)[0].name + " Experienced"  : "First TIme"} Skyway`}.pdf`, margin: 0.5, format: "letter" },
          { elementId: styles.styleKaan ? 'KaanAlRiyadhCv' : "", filename:  `${`${data.name} ${data.middleName} ${data.surname} ${data.religion} ${JSON.parse(data.experience)[0].name ? JSON.parse(data.experience)[0].name + " Experienced"  : "First TIme"} Kaan AlRiyadh`}.pdf`, margin: [0, 0.2, 0, 0.2], format: isSmallDevice ? [9.5, 12] : "a4" },
          {elementId: styles.styleQimam ? 'QimamAsiaCv' : "", filename:  `${`${data.name} ${data.middleName} ${data.surname} ${data.religion} ${JSON.parse(data.experience)[0].name ? JSON.parse(data.experience)[0].name + " Experienced"  : "First TIme"} Qimam Asia`}.pdf`, margin: [1, 0.9, 1, 1], format: "a4" },
          // {elementId: styles.styleFive ? "embassy" : "", filename: "Embassycv.pdf", margin: 0.5, format: "letter"}
            
            
        ];
    
        const downloadPromises = pdfElements.map(({ elementId, filename, margin, format }) => {
            const element = document.getElementById(elementId);
            const options = {
                margin: margin,
                marginBottom: 0,
                filename: filename,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true },
                // jsPDF: { unit: 'in', format: [8.5, 10.99],  /*format: 'letter',*/ orientation: 'portrait' }
                jsPDF: { unit: 'in', format: format, orientation: 'portrait' }
            };
    
            return agentName !== "admin" ? html2pdf()
                  .from(element)
                  .set(options)
                  .output('blob') // Get the PDF as a Blob
                  .then((blob) => {
                    const url = URL.createObjectURL(blob); // Create a URL for the blob
                    setPdfUrl(url); // Set the PDF URL in state
                  }) 
                  : html2pdf().from(element).set(options).save() 
        });
    
        // Wait for all downloads to complete
        await Promise.all(downloadPromises);
    }


    const onlyfordownloadcv = async () => {

    
      const isSmallDevice = window.innerWidth < 768;

      const pdfElements = [
        { elementId: styles.styleTwo ? 'cvContent1' : "", filename: `${`${data.name} ${data.middleName} ${data.surname} ${data.religion} ${JSON.parse(data.experience)[0].name ? JSON.parse(data.experience)[0].name + " Experienced"  : "First TIme"} Bela Hodod`}.pdf`, margin: 0.5 , format: "letter" },
        {  elementId: styles.styleOne ? 'cvContent2' : "", filename:  `${`${data.name} ${data.middleName} ${data.surname} ${data.religion} ${JSON.parse(data.experience)[0].name ? JSON.parse(data.experience)[0].name + " Experienced"  : "First TIme"} Golden`}.pdf`, margin: 0.5, format: "letter" },
        { elementId: styles.styleFour ? 'cvAssawsanahContent' : "", filename:  `${`${data.name} ${data.middleName} ${data.surname} ${data.religion} ${JSON.parse(data.experience)[0].name ? JSON.parse(data.experience)[0].name + " Experienced"  : "First TIme"} Baraka`}.pdf`, margin: 0.5, format: "letter" },
        { elementId: styles.styleThree ? 'cvBarakaContent' : "", filename:  `${`${data.name} ${data.middleName} ${data.surname} ${data.religion} ${JSON.parse(data.experience)[0].name ? JSON.parse(data.experience)[0].name + " Experienced"  : "First TIme"} Skyway`}.pdf`, margin: 0.5, format: "letter" },
        { elementId: styles.styleKaan ? 'KaanAlRiyadhCv' : "", filename:  `${`${data.name} ${data.middleName} ${data.surname} ${data.religion} ${JSON.parse(data.experience)[0].name ? JSON.parse(data.experience)[0].name + " Experienced"  : "First TIme"} Kaan AlRiyadh`}.pdf`, margin: [0, 0.2, 0, 0.2], format: isSmallDevice ? [9.5, 12] : "a4"},
        {elementId: styles.styleQimam ? 'QimamAsiaCv' : "", filename:  `${`${data.name} ${data.middleName} ${data.surname} ${data.religion} ${JSON.parse(data.experience)[0].name ? JSON.parse(data.experience)[0].name + " Experienced"  : "First TIme"} Qimam Asia`}.pdf`, margin: [1, 0.9, 1, 1], format: "a4" },
        // {elementId: styles.styleFive ? "embassy" : "", filename: "Embassycv.pdf", margin: 0.5, format: "letter"}
          
          
      ];
  
      const downloadPromises = pdfElements.map(({ elementId, filename, margin, format }) => {
          const element = document.getElementById(elementId);
          const options = {
              margin: margin,
              marginBottom: 0,
              filename: filename,
              image: { type: 'jpeg', quality: 0.98 },
              html2canvas: { scale: 2, useCORS: true },
              // jsPDF: { unit: 'in', format: [8.5, 10.99],  /*format: 'letter',*/ orientation: 'portrait' }
              jsPDF: { unit: 'in', format: format, orientation: 'portrait' }
          };
  
          return  html2pdf().from(element).set(options).save() 
      });
  
      // Wait for all downloads to complete
      await Promise.all(downloadPromises);
  }

 
    const url = window.location.href;
  const createdAt = url.split('_')[1]; // This gets the timestamp after the underscore

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setIsAdmin(payload.isAdmin || false); // Set admin status
      } catch (error) {
        console.error("Token decoding failed:", error);
      }
    }

    

    fetchData();
  }, [createdAt]);


  const fetchData = async () => {
      try {
        const response = await fetch(`https://skywayapi.ntechagent.com/detail/tget-images?createdAt=${createdAt}&agentname=${agentName}`);
        const result = await response.json();
        if (result.status === 'ok') {
          console.log('Fetched dataaaaaaa:', result.data); // Log the fetched data
          setData(result.data);

          console.log(JSON.parse(result.data.experience)[0].name, "  vvvvvvvvvvvvvvvvvvv")

          if (result.data.personalImageUrl) {
            console.log('Fetched personal imageeeeeeeeee', result.data.personalImageUrl)
            const base64 = await toBase64(result.data.personalImageUrl);
            setBase64Image(base64);
            console.log('Fetched personalllll', base64Image)
          }
        } else {
          console.error('Error fetching data:', result.message);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

  const toBase64 = async (url) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };
  


  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     try {
  //       const payload = JSON.parse(atob(token.split('.')[1]));
  //       setIsAdmin(payload.isAdmin || false); // Set admin status
  //     } catch (error) {
  //       console.error("Token decoding failed:", error);
  //     }
  //   }


   

  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(`http://localhost:4000/tget-images/${id.listid}`);
  //       const result = await response.json();
  //       if (result.status === 'ok') {
  //         setData(result.data);
  //       } else {
  //         console.error('Error fetching data:', result.message);
  //       }
  //     } catch (error) {
  //         console.error('Fetch error:', error);
  //     } finally {
  //         setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [id]);

  if (loading) return <CircularProgress />;
  if (!data) return <Alert severity="error">No data found</Alert>;

  const handleDownload = () => {
    console.log("Download clicked");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  };

  const handleSend = () => {
    console.log("Send clicked");
  };

  const handleInstall = () => {
    const userAgent = navigator.userAgent;

    if (userAgent.includes("Chrome")) {
      window.open("https://chrome.google.com/webstore/detail/your-chrome-extension-id", "_blank");
    } else if (userAgent.includes("Firefox")) {
      window.open("https://addons.mozilla.org/addon/nuratech-tools/", "_blank");
    } else {
      alert("This extension is only available for Chrome and Firefox.");
    }
  };

  const handleShareWhatsApp = () => {
    const url = encodeURIComponent(window.location.href);
    const message = encodeURIComponent(`Check out this page: ${window.location.href}`);
    window.open(`https://api.whatsapp.com/send?text=${message}`, '_blank');
  };

  const handleShareTelegram = () => {
    const url = encodeURIComponent(window.location.href);
    const message = encodeURIComponent(`Check out this page: ${window.location.href}`);
    window.open(`https://t.me/share/url?url=${url}&text=${message}`, '_blank');
  };

  
  
  // Usage
  // const base64Image = toBase64(data.personalImageUrl);

  

  

  // Function to handle comment change
  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };


  const handleAccept = async (applicantId, acceptedby, comment) => {
    // console.log(agentName, "  nnnnnnnnnnnnnnnnnnnn")
  try {
    // Parse acceptedBy if it's a JSON string
    const acceptedByArray = typeof data.acceptedBy === 'string' ? JSON.parse(data.acceptedBy) : data.acceptedBy;

    console.log("Current acceptedBy data:", acceptedByArray); // Debug log

    const updatedAcceptedBy = acceptedByArray.map(entry => {
      // Update the "golden" agent's accepted status to true
      if (entry.agent === agentName) {
        if(acceptedby !== "no"){
          return { ...entry, accepted: "true",  }; // Ensure this is the correct structure
        } else if(comment !== "no"){
          return { ...entry, comment: comment,  }; // Ensure this is the correct structure
        }
        
      }
      return entry;
    });

    console.log("Updated acceptedBy data:", updatedAcceptedBy); // Debug log

    // Send the updated data back to the server
    const updateResponse = await fetch(`https://skywayapi.ntechagent.com/tget-images/${data.id}?agentname=${agentName}`, {
      method: 'PUT',

      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ acceptedBy: JSON.stringify(updatedAcceptedBy) }), // Ensure this matches your backend expectations
    });

    const updateResult = await updateResponse.json();

    if (updateResult.status === 'ok') {
      console.log(`Accepted applicant with ID: ${applicantId}`);
      // Optionally, you might want to update local state or notify the user

      setSuccess(acceptedby !== "no" ? 'Accepted successfully!' : "Comment submitted successfully");
      setOpenSnackbar(true);

      setComment("")

      fetchData()
     
    } else {
      console.error('Error updating applicant:', updateResult.message);
      setError('Request failed');
        setOpenSnackbar(true);
    }
  } catch (error) {
    console.error('Error in handleAccept:', error);
    setError('Request failed');
        setOpenSnackbar(true);
  }
};
   
const handleCloseSnackbar = () => {
  setOpenSnackbar(false);
};

  return (
    <Container maxWidth={false} style={{ padding: '0 ' }}>
      <Header />

      <Container>
      {!isAdmin && (() => {
  const acceptedEntries = JSON.parse(data.acceptedBy) || [];
  const isAgentAccepted = acceptedEntries.some(entry => entry.agent === agentName && entry.accepted === "true");
  const isAnyAccepted = acceptedEntries.some(entry => entry.accepted === "true");

  if (isAgentAccepted) {
    return (
      <>
      <Container style={{ marginTop: '20px' }}>
        <Box sx={{ border: '1px solid #ccc', padding: 2, borderRadius: 2, color: "green" }}>
          <Typography variant="h6">You Accepted</Typography>
        </Box>
      </Container>

      <Container style={{ marginTop: '20px', marginBottom: "20px" }}>
        <Box sx={{ border: '1px solid #ccc', padding: 2, borderRadius: 2, color: "green" }}>
          <Typography variant="h6">Status: {data.status}</Typography>
        </Box>
      </Container>

      </>
    );
  } else if (isAnyAccepted) {
    return (
      <Box sx={{ border: '1px solid red', padding: 2, marginTop: 2, marginBottom: 2 }}>
        <Typography variant="body1" style={{ color: 'red' }}>
          This applicant is reserved.
        </Typography>
      </Box>
    );
  } else {
    return <div></div>;
  }
})()}
        <Typography variant="h4" gutterBottom>
          Details for <span style={{ color: "green",  }}>{data.name} {data.surname}</span>
        </Typography>

        {/* Centering the video and adding top margin with thumbnail */}
        {/* {data.video && (
          <Container style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
            <ReactPlayer
              controls={true}
              url={data.videoUrl}
              light={thumbnail} // Add your thumbnail image here
            />
          </Container>
        )} */}

        {/* <Typography variant="h5" gutterBottom>
          Images
        </Typography> */}
        <Grid container spacing={1}>
        <Grid container spacing={2}>
  <Grid item xs={12} sm={4}>
    <Card>
      <CardMedia
        component="img"
        height="550"  // Increased height for Personal Image
        image={data.personalImageUrl || imagePlaceholder}
        alt="Personal"
      />
      <CardContent>
        <Typography variant="body2">Personal Image </Typography>
      </CardContent>
    </Card>
  </Grid>
  <Grid item xs={12} sm={4}>
    <Card>
      <CardMedia
        component="img"
        height="550"  // Increased height for Full Body Image
        image={data.fullBodyImageUrl || imagePlaceholder}
        alt="Full Body"
      />
      <CardContent>
        <Typography variant="body2">Full Body Image</Typography>
      </CardContent>
    </Card>
  </Grid>
  {/* Uncomment if you need the passport image */}
  {/* <Grid item xs={12} sm={4}>
    <Card>
      <CardMedia
        component="img"
        height="300"  // Increased height for Passport Image
        image={data.passportImageUrl || imagePlaceholder}
        alt="Passport"
      />
      <CardContent>
        <Typography variant="body2">Passport Image</Typography>
      </CardContent>
    </Card>
  </Grid> */}

  {data.video && (
    <Grid item xs={12} sm={4}>
      <Card>
        <Container style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
          <ReactPlayer
            controls={true}
            url={data.videoUrl}
            light={thumbnail} // Add your thumbnail image here
            width="100%"  // Make the video responsive
            height="510px"  // Increased height for the video
          />
        </Container>
        <CardContent>
          <Typography variant="body2">Video</Typography>
        </CardContent>
      </Card>
    </Grid>
  )}
</Grid>
</Grid>

        <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
          Personal Information
        </Typography>
        <Grid container spacing={2}>
          {[
            { label: 'Name', value: data.name, htmlFor: "EFIRSTNAME", id: "EFIRSTNAME"   },
            { label: 'Middle Name', value: data.middleName, htmlFor: "EFATHER", id: "EFATHER"   },
            { label: 'Surname', value: data.surname, htmlFor: "ESURNAME", id: "EFAMILY" },
            { label: 'Applicant No', value: data.applicationNo, id: "applicantNo" },
            { label: 'Sex', value: data.sex, htmlFor: "Sex", id: "Sex" },
            { label: 'Place of Birth', value: data.placeofbirth, htmlFor: "EPLACEOFBIRTH", id: "BIRTH_PLACE" },
            { label: 'Passport Number', value: data.passportnum, htmlFor: "EPASSPORTNUM", id: "PASSPORTnumber" },
            { label: 'passport Issue Place', value: data.passportIssuePlace, htmlFor: "passportIssuePlace", id: "passportIssuePlace" },
            { label: 'Nationality', value: data.currentNationality, htmlFor: "ENATIONALITY", id: "NATIONALITY" },
            { label: 'Marital Status', value: data.martialstatus, htmlFor: "EMARTIALSTATUS", id: "SOCIAL_STATUS" },
            { label: 'Number of Children', value: data.numberofchildren, htmlFor: "ENUMBEROFCHILDREN", id: "ENUMBEROFCHILDREN" },
            { label: 'Religion', value: data.religion /*"Islam"*/, htmlFor: "ERELIGION", id: "RELIGION" },
            { label: 'Weight', value: data.weight + " km", htmlFor: "EWEIGHT", id: "EWEIGHT"  },
            { label: 'Height', value: data.height + " cm" , htmlFor: "EHEIGHT", id: "EHEIGHT" },
            { label: 'Education Attainment', value: data.educationattainment, htmlFor: "EEDUCATION", id: "DEGREE" },
            { label: 'Position Applied For', value: data.postappliedfor, htmlFor: "EPOSITION", id: "EPOSITION" },
            
            { label: 'Contract Period', value: data.contract, htmlFor: "ECONTRACTPERIOD", id: "ECONTRACTPERIOD" },
            { label: 'Arabic Degree', value: data.arabicdegree, htmlFor: "EARABICDEGREE", id: "EARABICDEGREE" },
            { label: 'English Degree', value: data.englishdegree, htmlFor: "EENGLISHDEGREE", id: "EENGLISHDEGREE" },
            { label: 'Own Phone Number', value: data.ownphonenum, htmlFor: "EOWNPHONENUM", id: "EOWNPHONENUM" },
            { label: 'Contact Phone Number', value: data.contactphonenum, htmlFor: "ECONTACTPHONENUM", id: "ECONTACTPHONENUM" },
            { label: 'Date of Birth', value: data.dateofbirth, htmlFor: "BIRTH_DATE", id: "BIRTH_DATE" },
            { label: 'Age', value: data.age, htmlFor: "EAGE", id: "EAGE" },
            { label: 'Date of Issue', value: data.dateofissue, htmlFor: "EDATEOFISSUE", id: "PASSPORT_ISSUE_DATE" },
            { label: 'Expiration Date', value: data.expireddate, htmlFor: "PASSPORT_EXPIRY_DATe", id: "PASSPORT_EXPIRY_DATe" },
            // { label: 'Country', value: data.country, htmlFor: "ECOUNTRY", id: "ECOUNTRY" },
            // { label: 'Position', value: data.position, htmlFor: "EPOSITION", id: "EPOSITION" },
            // { label: 'Period', value: data.period, htmlFor: "EPERIOD", id: "EPERIOD" },
            { label: 'Babysitting', value: data.babysitting ? 'Yes' : 'No', htmlFor: "EBABYSITTING", id: "EBABYSITTING" },
            { label: 'Cleaning', value: data.cleaning ? 'Yes' : 'No', htmlFor: "ECLEANING", id: "ECLEANING" },
            { label: 'Washing', value: data.washing ? 'Yes' : 'No', htmlFor: "EWASHING", id: "EWASHING" },
            { label: 'Cooking', value: data.cooking ? 'Yes' : 'No', htmlFor: "ECOOKING", id: "ECOOKING" },
            { label: 'Eldercare', value: data.eldercare ? 'Yes' : 'No', htmlFor: "EELDERCARE", id: "EELDERCARE" },
            { label: 'Monthly Salary (Saudi)', value: data.monthlysalarySaudi, htmlFor: "EMONTHLYSALARYSAUDI", id: "EMONTHLYSALARYSAUDI" },
            { label: 'Monthly Salary (Jordan)', value: data.monthlysalaryJordan, htmlFor: "EMONTHLYSALARYJORDAN", id: "EMONTHLYSALARYJORDAN" },
            { label: 'visa Type', value: data.visaType, id: "VisaKind" },

            { label: 'Home Address', value: data.sponsorAddress, id: "ADDRESS_HOME" },

            // { label: 'Address', value: "4086,32273 الدمام, طيبة انس بن سالم", id: "ADDRESS_HOME" },
            
            { label: 'Sponsor Address', value: data.sponsorAddress, id: "SPONSER_ADDRESS" },

            // { label: 'Sponsor Address', value: "MATAR ALZHRANI", id: "SPONSER_NAME" },

            { label: 'Passport Type', value: "Normal", id: "PASSPORType" },
            { label: 'Isussing Country', value: data.passportIssuePlace, id: "PASSPORT_ISSUE_PLACE" },
            { label: 'Email', value: "skywayagencyoffice@gmail.com", id: "Personal_Email" },
            { label: 'Comming Through', value: "By Air", id: "COMING_THROUGH" },   
            { label: 'Email', value: "skywayagencyoffice@gmail.com", id: "emailLabel" },    
            { label: 'Sponsor Id NO', value: data.visaNo, id: "SPONSER_NUMBER" },  
            { label: 'Sponsor Phone', value: data.sponsorPhone, id: "SPONSER_PHONE" },
            { label: 'porpose', value: data.visaType, id: "porpose", htmlFor: "porpose" },
            
            

            // { label: 'toggle', value: "0", htmlFor: "EMONTHLYSALARYJORDAN" , id: "No"},
          ].map((item, index) => (
            <Grid item xs={12} md={6} key={index}>
              <label htmlFor={item.htmlFor}>
                <Typography variant="body1">
                  <strong>{item.label}:</strong> <label id={item.id} translate='no'>{item.value}</label>
                  {item.id === "applicantNo" && isAdmin ? <Button variant="contained" color="primary" onClick={() => handleEdit(data)}>
        Add 
      </Button> : ""}
                </Typography>
              </label>
            </Grid>
          ))}

          

          <Grid item xs={12}>
            <Typography variant="h6">Experience:</Typography>
            {data.experience && JSON.parse(data.experience).map(exp => (
              <Typography key={exp.id} variant="body2" translate='no'>
                {!exp.name && !exp.link && !exp.overview ? "No Experience" : ""}
                {exp.name ? exp.name + " -" : ""} {exp.link ? exp.link + " -" : ""}  {exp.overview ? exp.overview + " Years": ""} 
              </Typography>
            ))}

            {/* {data.experience.map(i => i.name)}dfsdfs */}

            {/* {data.experience}dfsd */}

            {/* {JSON.parse(data.experience).map(exp => exp.name)} - aaa */}
           
            {/* {JSON.parse(data.experience).map(exp => () => exp.link)} - bbb */}
            {/* {xx.map(exp => exp.name)}bbb */}

            {/* {Array.isArray(data.experience) && data.experience.length > 0 ? (
  data.experience.map((exp, index) => (
    <Typography key={index} variant="body2">
      {exp.name} - {exp.link} - {exp.overview} Years
    </Typography>
  ))
) : (
  <Typography variant="body2">No experience data available.</Typography>
)} */}
           
          </Grid>
        </Grid>

      {isAdmin && <Container margin={100} >

    <Box sx={{ boxShadow: 3, borderRadius: 2, mt: 4, p: 3 }} translate='no'>
          <Typography variant="h6" gutterBottom>
              Select Styles
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
                      // disabled={age < 21}
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
                      // disabled={age < 21}
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
                      // disabled={age < 18} // Disable if age is less than 18
                  />
              }
              label="Skyway"
          />
          <FormControlLabel
              control={
                  <Checkbox
                      checked={styles.styleFour}
                      onChange={handleStyleChange}
                      name="styleFour"
                      // disabled={age < 21}
                  />
              }
              label="Baraka"
          />


<FormControlLabel
              control={
                  <Checkbox
                      checked={styles.styleKaan}
                      onChange={handleStyleChange}
                      name="styleKaan"
                      // disabled={age < 21}
                  />
              }
              label="Kaan Al Riyadh"
          />

<FormControlLabel
              control={
                  <Checkbox
                      checked={styles.styleQimam}
                      onChange={handleStyleChange}
                      name="styleQimam"
                      // disabled={age < 21}
                  />
              }
              label="Qimam"
          />


        
      </Box>
      </Container>}

     

      {!isAdmin &&

      <Container>
    

    {/* Comment box and buttons at the bottom */}
   
    
    <Grid container spacing={2} style={{ marginTop: '20px', marginBottom: '20px' }}>
        
        {
          JSON.parse(data.acceptedBy)?.some(entry => entry.accepted === "true") ?
         <div></div> :
         <>
         <Grid item xs={12}>
           <TextField
             label="Comment"
             multiline
             rows={4}
             fullWidth
             variant="outlined"
             value={comment} // Bind the value to the state
             onChange={handleCommentChange} // Update state on change
           />
         </Grid>
         <Grid item>
           <Button
             variant="contained"
             color="primary"
             onClick={(event) => {
               event.stopPropagation(); // Prevent row click
               handleAccept(data.id, "no", comment); // Call the accept function
             }}
           >
             Submit
           </Button>


         </Grid>
         </>
}

          
          <Grid item>


           


            {/* {JSON.parse(data.acceptedBy)?.some(entry => entry.agent === agentName && entry.accepted === "true") ? (
                      <Typography 
                      variant="body1" 
                      style={{ color: 'green', cursor: 'default' }} // Style for the green text
                    >
                      Accepted
                    </Typography>
                    ) :
                     (
                     
            
                      <Button
                      variant="contained"
                      color="success"
                      onClick={(event) => {
                         event.stopPropagation(); // Prevent row click
                         handleAccept(data.id, data.acceptedBy, "no"); // Call the accept function
                       }}
                       >
                       Accept
                     </Button>
                    )
                    
                  } */}






          </Grid>
        </Grid>
  </Container> }


  {isAdmin && JSON.parse(data.acceptedBy)?.some(entry => entry.comment !== "") ? (
      <>
        {JSON.parse(data.acceptedBy).map(entry => (
          entry.comment !== "" && (
            <Container style={{ marginTop: '20px' }} key={entry.agent}>
              
              <Box sx={{ border: '1px solid #ccc', padding: 2, borderRadius: 2, color: "red" }}>
              
                <Typography variant="h6" translate='no'>{entry.agent}`s comment: {entry.comment}</Typography>
              </Box>
            </Container>
          )
        ))}
      </>
    ) : (
      <div></div>
    )}


{isAdmin && JSON.parse(data.acceptedBy)?.some(entry => entry.accepted === "true") ? (
    // If at least one agent is accepted, display their names
    JSON.parse(data.acceptedBy)?.map(entry => (
      entry.accepted === "true" ? (
        <Container style={{ marginTop: '20px' }} key={entry.agent}>
              <Box sx={{ border: '1px solid #ccc', padding: 2, borderRadius: 2, color: "green" }}>
                <Typography variant="h6" translate='no'>Accepted By: {entry.agent}</Typography>
              </Box>
            </Container>
      ) : null // Do not render anything for non-accepted agents
    ))
  ) : (
    // If no agents are accepted, display "Live"
   <div></div>
  )}

  
{!isAdmin &&
  
  <Grid container spacing={2} style={{ marginTop: '20px', marginBottom: '20px' }}>
  <Grid item >
  <Button variant="contained" color="primary" onClick={downloadMultipleCVs}>
    View CV
  </Button>
</Grid>

<Grid item >
  <Button variant="contained" color="primary" onClick={onlyfordownloadcv}>
    Download CV
  </Button>
</Grid>

{JSON.parse(data.acceptedBy)?.every(entry => entry.accepted === "false") && <Grid item >
  <Button variant="contained" color="primary" style={{background:"green"}} onClick={(event) => {
                        event.stopPropagation(); // Prevent row click
                        handleAccept(data.id, data.acceptedBy, "no"); // Call the accept function
                      }}>
    Accept
  </Button>
</Grid>}

</Grid>

}

        {/* Buttons at the bottom with margin */}
        {isAdmin && <Grid container spacing={2} style={{ marginTop: '20px', marginBottom: '20px' }}>
        {data.personalImageUrl && data.visaNo && data.sponsorName && data.applicationNo && data.name && data.middleName && data.surname && data.religion && data.dateofbirth && data.placeofbirth && data.currentNationality && data.sex && data.martialstatus && data.religion && data.educationattainment && data.postappliedfor && data.visaType && data.passportIssuePlace && data.dateofissue && data.passportnum && data.expireddate && <Grid item>
            <Button variant="contained" color="primary" onClick={downloadCV}>
              Download Embassy Application
            </Button>
          </Grid>}

          <Grid item>
            <Button variant="contained" color="primary" onClick={downloadMultipleCVs}>
              Download CV
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="secondary" onClick={handleCopyLink} >
              Copy Link
            </Button>
          </Grid>
          {/* <Grid item>
            <Button variant="contained" color="default" onClick={handleInstall}>
              Send
            </Button>
          </Grid> */}
          <Grid item>
            <Button
              variant="contained"
              color="success"
              startIcon={<WhatsAppIcon />}
              onClick={handleShareWhatsApp}
            >
              Share on WhatsApp
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="info"
              startIcon={<TelegramIcon />}
              onClick={handleShareTelegram}
            >
              Share on Telegram
            </Button>
          </Grid>
        </Grid>}


        

        {/* {!isAdmin && <Grid container spacing={2} style={{ marginTop: '20px', marginBottom: '20px' }}>

          
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleDownload}>
              Download
            </Button>
          </Grid>
         
        </Grid>} */}

      </Container>


      <Container>
     

      <Dialog open={open} onClose={handleClose} >
        <DialogTitle>Edit Entry</DialogTitle>
        <DialogContent>
         
          <TextField
            margin="dense"
            name="applicationNo"
            label="Applicant Number"
            fullWidth
            variant="outlined"
            value={editData.applicationNo || ''}
            onChange={handleInputChange}
          />
          {/* Add more fields as necessary */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Display other data as needed */}



       <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                      <Alert onClose={handleCloseSnackbar} severity={error ? 'error' : 'success'}>
                        {error || success}
                      </Alert>
                    </Snackbar>


                    {pdfUrl && (
        <div style={{ marginTop: '20px' }}>
          <h2>{data.name} {data.surname} CV:</h2>
          <embed src={pdfUrl} type="application/pdf" width="100%" height="1500" />
          {/* Alternatively, you could use <iframe> */}
          {/* <iframe src={pdfUrl} width="600" height="400" /> */}
        </div>
      )}
     
    </Container>


      



       <div style={{ display: 'none' }} translate='no'>


        {/* next content */}


        <div id="cvContent1" >
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
                <div style={{ pageBreakAfter: 'always' }} > 
                    <div className="header">
                    
<div className="personal-image-parent">
<img
className="personal-image"
alt=""
src={data.personalImageUrl || imagePlaceholder} // Get the last image

/>

</div>

                      <div className="wider-image-parent">
                      <img src={hudud} alt="Wider" className="wider-image" /></div>  
                    </div>
                    <div className="title-parent">
                        <div style={{display: "flex", justifyContent: "space-around", border: "none"}}><div style={{ border: "none"}}>Personal Information</div>  <div style={{ border: "none"}}> ممعلومات شخصية </div></div>
                        <div style={{display: "flex", justifyContent: "center", alignItems: "center",}}>CODE NO</div>
                        <div style={{display: "flex", justifyContent: "center", alignItems: "center",}}>J{data.cvcount}</div>
                    </div>
                    <div className="table-main-parent">
                    <div class="table-parent">
<div>NAME</div>
<div>{data.name} {data.middleName}</div>
<div>الاسم</div>
<div>SURNAME</div>
<div>{data.surname}</div>
<div>اسم العائلة</div>
<div>PLACE Of Birth</div>
<div>{data.placeofbirth}</div>
<div>مكان الولادة</div>
<div>AGE</div>
<div>{data.age}</div>
<div>العمر</div>
<div>PASSPORT NO</div>
<div>{data.passportnum}</div>
<div>رقم جواز السفر</div>
<div>DATE OF BIRTH</div>
<div>{data.dateofbirth}</div>
<div>تاريخ الميلاد</div>
<div>DATE OF ISSUE</div>
<div>{data.dateofissue}</div>

<div>تاريخ الاصدار</div>
<div>DATE OF EXPIRY</div>
<div>{data.expireddate}</div>
<div>تاريخ الانتهاء</div>
<div>NATIONALITY</div>
<div>{data.currentNationality}</div>
<div>الجنسية</div>
<div style={{height: 35}}>MARITAL STATUS</div>
<div style={{height: 35}}>{data.martialstatus}</div>
<div style={{height: 35}}>الحالة الاجتماعية</div>
<div style={{height: 35}} >NUMBER OF CHILDREN</div>
<div style={{height: 35}}>{data.numberofchildren}</div>
<div style={{height: 35}}>عدد الاطفال</div>
<div>RELIGION</div>
<div>{data.religion}</div>
<div>الديانة</div>
<div>WEIGHT</div>
<div>{data.weight} km</div>
<div>الوزن</div>
<div>HEIGHT</div>

<div>{data.height} cm</div>
<div>الطول</div>
<div style={{height: 35}}>EDUCATIONAL ATTAINMENT</div>
<div style={{height: 35}}>{data.educationattainment}</div>
<div style={{height: 35}}>المستوى الدراسي</div>
<div style={{height: 35}}>POST APPLIED FOR</div>
<div style={{height: 35}}>{data.postappliedfor}</div>
<div style={{height: 35}}>الوظيفة المتقدمة اليها</div>
<div style={{height: 35}}>MONTHLY SALARY</div>
<div style={{height: 35}}> {data.monthlysalarySaudi} SAR</div>
<div style={{height: 35}}>الراتب الشهري</div>
<div style={{height: 35}}>CONTRACT PERIOD</div>
<div style={{height: 35}}>{data.contract}</div>
<div style={{height: 35}}>مدة التعاقد</div>
<div style={{height: 35}}>ARABIC DEGREE</div>
<div style={{height: 35}}>{data.arabicdegree}</div>
<div style={{height: 35}}>مستوى اللغة العربية</div>
<div style={{height: 39}}>ENGLISH DEGREE</div>
<div style={{height: 39}}>{data.englishdegree}</div>
<div style={{height: 39}}>مستوى اللغة الانجليزية</div>
</div>
                        <div className="second-side">
                            <div>
                                <img src={data.fullBodyImageUrl || imagePlaceholder} alt="Full Body" className="full-body-image" />
                            </div>
                            <div>
                                <img src={ouragentlogo} alt="Agent Logo" className="agent-logo" />
                            </div>
                        </div>
                    </div>

                    <div className="second-section-parent">

                    <div className="phone-number-sec">
                        <div>OWN PHONE NUMBER</div>
                        <div style={{background: "white"}}>{data.ownphonenum}</div>
                        <div>رقم الهاتف الشخصي</div>
                    </div>
                    <div className="cphone-number-sec">
                        <div>CONTACT PHONE NUMBER</div>
                        <div style={{background: "white"}}>{data.contactphonenum}</div>
                        <div>رقم الهاتف الاقارب</div>
                    </div>



                    <div className="experience-country-sec">
<div>EXPERIANCE COUNTRY</div>
{/* <div>{projectInfo.project.map(i =>  <span style={{marginRight: "3px"}}>{i.name}, </span> )} </div> */}
<div>{data.experience && JSON.parse(data.experience).map(i =>  <span style={{marginRight: "3px"}}>{i.name}, </span> )} </div>
{/* <div>
            </div> */}
<div>خبرة البلد</div>
</div>





<div className="experience-country-sec">
<div>WORKING YEARS</div>
{/* <div>{projectInfo.project.map(i =>  <span style={{marginRight: "3px"}}>{i.overview}, </span> )}</div> */}
<div>{data.experience && JSON.parse(data.experience).map(i =>  <span style={{marginRight: "3px"}}>{i.overview}, </span> )}</div>
{/* <div>
              </div> */}
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
                        <div>{data.babysitting ? "YES" : "NO"}</div>
                        <div>{data.cleaning ? "YES" : "NO"}</div>
                        <div>{data.washing ? "YES" : "NO"}</div>
                        <div>{data.cooking ? "YES" : "NO"}</div>
                        <div>{data.eldercare ? "YES" : "NO"}</div>
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
src={data.passportImageUrl || imagePlaceholder} 

/>

</div>
</div>
            </div>
        </div>



{/* next content */}



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
src={data.personalImageUrl || imagePlaceholder} // Get the last image

/>

</div>

                      <div className="wider-image-parent">
                      <img src={goldagent} alt="Wider" className="wider-image" /></div>  
                    </div>
                    <div className="title-parent">
                        <div style={{display: "flex", justifyContent: "space-around", border: "none"}}><div style={{ border: "none"}}>Personal Information</div>  <div style={{ border: "none"}}> ممعلومات شخصية </div></div>
                        <div style={{display: "flex", justifyContent: "center", alignItems: "center",}}>CODE NO</div>
                        <div style={{display: "flex", justifyContent: "center", alignItems: "center",}}>J{data.cvcount}</div>
                    </div>
                    <div className="table-main-parent">
                    <div class="table-parent">
<div>NAME</div>
<div>{data.name} {data.middleName}</div>
<div>الاسم</div>
<div>SURNAME</div>
<div>{data.surname}</div>
<div>اسم العائلة</div>
<div>PLACE Of Birth</div>
<div>{data.placeofbirth}</div>
<div>مكان الولادة</div>
<div>AGE</div>
<div>{data.age}</div>
<div>العمر</div>
<div>PASSPORT NO</div>
<div>{data.passportnum}</div>
<div>رقم جواز السفر</div>
<div>DATE OF BIRTH</div>
<div>{data.dateofbirth}</div>
<div>تاريخ الميلاد</div>
<div>DATE OF ISSUE</div>
<div>{data.dateofissue}</div>

<div>تاريخ الاصدار</div>
<div>DATE OF EXPIRY</div>
<div>{data.expireddate}</div>
<div>تاريخ الانتهاء</div>
<div>NATIONALITY</div>
<div>{data.currentNationality}</div>
<div>الجنسية</div>
<div style={{height: 35}}>MARITAL STATUS</div>
<div style={{height: 35}}>{data.martialstatus}</div>
<div style={{height: 35}}>الحالة الاجتماعية</div>
<div style={{height: 35}} >NUMBER OF CHILDREN</div>
<div style={{height: 35}}>{data.numberofchildren}</div>
<div style={{height: 35}}>عدد الاطفال</div>
<div>RELIGION</div>
<div>{data.religion}</div>
<div>الديانة</div>
<div>WEIGHT</div>
<div>{data.weight} km</div>
<div>الوزن</div>
<div>HEIGHT</div>

<div>{data.height} cm</div>
<div>الطول</div>
<div style={{height: 35}}>EDUCATIONAL ATTAINMENT</div>
<div style={{height: 35}}>{data.educationattainment}</div>
<div style={{height: 35}}>المستوى الدراسي</div>
<div style={{height: 35}}>POST APPLIED FOR</div>
<div style={{height: 35}}>{data.postappliedfor}</div>
<div style={{height: 35}}>الوظيفة المتقدمة اليها</div>
<div style={{height: 35}}>MONTHLY SALARY</div>
<div style={{height: 35}}> {data.monthlysalarySaudi} SAR</div>
<div style={{height: 35}}>الراتب الشهري</div>
<div style={{height: 35}}>CONTRACT PERIOD</div>
<div style={{height: 35}}>{data.contract}</div>
<div style={{height: 35}}>مدة التعاقد</div>
<div style={{height: 35}}>ARABIC DEGREE</div>
<div style={{height: 35}}>{data.arabicdegree}</div>
<div style={{height: 35}}>مستوى اللغة العربية</div>
<div style={{height: 39}}>ENGLISH DEGREE</div>
<div style={{height: 39}}>{data.englishdegree}</div>
<div style={{height: 39}}>مستوى اللغة الانجليزية</div>
</div>
                        <div className="second-side">
                            <div>
                                <img src={data.fullBodyImageUrl || imagePlaceholder} alt="Full Body" className="full-body-image" />
                            </div>
                            <div>
                                <img src={ouragentlogo} alt="Agent Logo" className="agent-logo" />
                            </div>
                        </div>
                    </div>

                    <div className="second-section-parent">

                    <div className="phone-number-sec">
                        <div>OWN PHONE NUMBER</div>
                        <div style={{background: "white"}}>{data.ownphonenum}</div>
                        <div>رقم الهاتف الشخصي</div>
                    </div>
                    <div className="cphone-number-sec">
                        <div>CONTACT PHONE NUMBER</div>
                        <div style={{background: "white"}}>{data.contactphonenum}</div>
                        <div>رقم الهاتف الاقارب</div>
                    </div>



                    <div className="experience-country-sec">
<div>EXPERIANCE COUNTRY</div>
{/* <div>{projectInfo.project.map(i =>  <span style={{marginRight: "3px"}}>{i.name}, </span> )} </div> */}
<div>{data.experience && JSON.parse(data.experience).map(i =>  <span style={{marginRight: "3px"}}>{i.name}, </span> )} </div>
{/* <div>
            </div> */}
<div>خبرة البلد</div>
</div>





<div className="experience-country-sec">
<div>WORKING YEARS</div>
{/* <div>{projectInfo.project.map(i =>  <span style={{marginRight: "3px"}}>{i.overview}, </span> )}</div> */}
<div>{data.experience && JSON.parse(data.experience).map(i =>  <span style={{marginRight: "3px"}}>{i.overview}, </span> )}</div>
{/* <div>
              </div> */}
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
                        <div>{data.babysitting ? "YES" : "NO"}</div>
                        <div>{data.cleaning ? "YES" : "NO"}</div>
                        <div>{data.washing ? "YES" : "NO"}</div>
                        <div>{data.cooking ? "YES" : "NO"}</div>
                        <div>{data.eldercare ? "YES" : "NO"}</div>
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
src={data.passportImageUrl || imagePlaceholder} 

/>

</div>
</div>
            </div>
        </div>



{/* next content */}


<div id="cvBarakaContent" translate='no'>
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
src={data.personalImageUrl || imagePlaceholder} // Get the last image

/>

</div>

                      <div className="wider-image-parent">
                      <img src={ouragentlogo} alt="Wider" className="wider-image" /></div>  
                    </div>
                    <div className="title-parent">
                        <div style={{display: "flex", justifyContent: "space-around", border: "none"}}><div style={{ border: "none"}}>Personal Information</div>  <div style={{ border: "none"}}> ممعلومات شخصية </div></div>
                        <div style={{display: "flex", justifyContent: "center", alignItems: "center",}}>CODE NO</div>
                        <div style={{display: "flex", justifyContent: "center", alignItems: "center",}}>J{data.cvcount}</div>
                    </div>
                    <div className="table-main-parent">
                    <div class="table-parent">
<div>NAME</div>
<div>{data.name} {data.middleName}</div>
<div>الاسم</div>
<div>SURNAME</div>
<div>{data.surname}</div>
<div>اسم العائلة</div>
<div>PLACE Of Birth</div>
<div>{data.placeofbirth}</div>
<div>مكان الولادة</div>
<div>AGE</div>
<div>{data.age}</div>
<div>العمر</div>
<div>PASSPORT NO</div>
<div>{data.passportnum}</div>
<div>رقم جواز السفر</div>
<div>DATE OF BIRTH</div>
<div>{data.dateofbirth}</div>
<div>تاريخ الميلاد</div>
<div>DATE OF ISSUE</div>
<div>{data.dateofissue}</div>

<div>تاريخ الاصدار</div>
<div>DATE OF EXPIRY</div>
<div>{data.expireddate}</div>
<div>تاريخ الانتهاء</div>
<div>NATIONALITY</div>
<div>{data.currentNationality}</div>
<div>الجنسية</div>
<div style={{height: 35}}>MARITAL STATUS</div>
<div style={{height: 35}}>{data.martialstatus}</div>
<div style={{height: 35}}>الحالة الاجتماعية</div>
<div style={{height: 35}} >NUMBER OF CHILDREN</div>
<div style={{height: 35}}>{data.numberofchildren}</div>
<div style={{height: 35}}>عدد الاطفال</div>
<div>RELIGION</div>
<div>{data.religion}</div>
<div>الديانة</div>
<div>WEIGHT</div>
<div>{data.weight} km</div>
<div>الوزن</div>
<div>HEIGHT</div>

<div>{data.height} cm</div>
<div>الطول</div>
<div style={{height: 35}}>EDUCATIONAL ATTAINMENT</div>
<div style={{height: 35}}>{data.educationattainment}</div>
<div style={{height: 35}}>المستوى الدراسي</div>
<div style={{height: 35}}>POST APPLIED FOR</div>
<div style={{height: 35}}>{data.postappliedfor}</div>
<div style={{height: 35}}>الوظيفة المتقدمة اليها</div>
<div style={{height: 35}}>MONTHLY SALARY</div>
<div style={{height: 35}}> {data.monthlysalaryJordan}$</div>
<div style={{height: 35}}>الراتب الشهري</div>
<div style={{height: 35}}>CONTRACT PERIOD</div>
<div style={{height: 35}}>{data.contract}</div>
<div style={{height: 35}}>مدة التعاقد</div>
<div style={{height: 35}}>ARABIC DEGREE</div>
<div style={{height: 35}}>{data.arabicdegree}</div>
<div style={{height: 35}}>مستوى اللغة العربية</div>
<div style={{height: 39}}>ENGLISH DEGREE</div>
<div style={{height: 39}}>{data.englishdegree}</div>
<div style={{height: 39}}>مستوى اللغة الانجليزية</div>
</div>
                        <div className="second-side">
                            <div>
                                <img src={data.fullBodyImageUrl || imagePlaceholder} alt="Full Body" className="full-body-image" />
                            </div>
                            <div>
                                <img src={assawsan} alt="Agent Logo" className="agent-logo" />
                            </div>
                        </div>
                    </div>

                    <div className="second-section-parent">

                    <div className="phone-number-sec">
                        <div>OWN PHONE NUMBER</div>
                        <div style={{background: "white"}}>{data.ownphonenum}</div>
                        <div>رقم الهاتف الشخصي</div>
                    </div>
                    <div className="cphone-number-sec">
                        <div>CONTACT PHONE NUMBER</div>
                        <div style={{background: "white"}}>{data.contactphonenum}</div>
                        <div>رقم الهاتف الاقارب</div>
                    </div>



                    <div className="experience-country-sec">
<div>EXPERIANCE COUNTRY</div>
{/* <div>{projectInfo.project.map(i =>  <span style={{marginRight: "3px"}}>{i.name}, </span> )} </div> */}
<div>{data.experience && JSON.parse(data.experience).map(i =>  <span style={{marginRight: "3px"}}>{i.name}, </span> )} </div>
{/* <div>
            </div> */}
<div>خبرة البلد</div>
</div>





<div className="experience-country-sec">
<div>WORKING YEARS</div>
{/* <div>{projectInfo.project.map(i =>  <span style={{marginRight: "3px"}}>{i.overview}, </span> )}</div> */}
<div>{data.experience && JSON.parse(data.experience).map(i =>  <span style={{marginRight: "3px"}}>{i.overview}, </span> )}</div>
{/* <div>
              </div> */}
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
                        <div>{data.babysitting ? "YES" : "NO"}</div>
                        <div>{data.cleaning ? "YES" : "NO"}</div>
                        <div>{data.washing ? "YES" : "NO"}</div>
                        <div>{data.cooking ? "YES" : "NO"}</div>
                        <div>{data.eldercare ? "YES" : "NO"}</div>
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
src={data.passportImageUrl || imagePlaceholder} 

/>

</div>
</div>
            </div>
        </div>



{/* four content */}



<div id="cvAssawsanahContent" translate='no'>
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
src={data.personalImageUrl || imagePlaceholder} // Get the last image

/>

</div>

                      <div className="wider-image-parent">
                      <img src={barakaimg} alt="Wider" className="wider-image" /></div>  
                    </div>
                    <div className="title-parent">
                        <div style={{display: "flex", justifyContent: "space-around", border: "none"}}><div style={{ border: "none"}}>Personal Information</div>  <div style={{ border: "none"}}> ممعلومات شخصية </div></div>
                        <div style={{display: "flex", justifyContent: "center", alignItems: "center",}}>CODE NO</div>
                        <div style={{display: "flex", justifyContent: "center", alignItems: "center",}}>J{data.cvcount}</div>
                    </div>
                    <div className="table-main-parent">
                    <div class="table-parent">
<div>NAME</div>
<div>{data.name} {data.middleName}</div>
<div>الاسم</div>
<div>SURNAME</div>
<div>{data.surname}</div>
<div>اسم العائلة</div>
<div>PLACE Of Birth</div>
<div>{data.placeofbirth}</div>
<div>مكان الولادة</div>
<div>AGE</div>
<div>{data.age}</div>
<div>العمر</div>
<div>PASSPORT NO</div>
<div>{data.passportnum}</div>
<div>رقم جواز السفر</div>
<div>DATE OF BIRTH</div>
<div>{data.dateofbirth}</div>
<div>تاريخ الميلاد</div>
<div>DATE OF ISSUE</div>
<div>{data.dateofissue}</div>

<div>تاريخ الاصدار</div>
<div>DATE OF EXPIRY</div>
<div>{data.expireddate}</div>
<div>تاريخ الانتهاء</div>
<div>NATIONALITY</div>
<div>{data.currentNationality}</div>
<div>الجنسية</div>
<div style={{height: 35}}>MARITAL STATUS</div>
<div style={{height: 35}}>{data.martialstatus}</div>
<div style={{height: 35}}>الحالة الاجتماعية</div>
<div style={{height: 35}} >NUMBER OF CHILDREN</div>
<div style={{height: 35}}>{data.numberofchildren}</div>
<div style={{height: 35}}>عدد الاطفال</div>
<div>RELIGION</div>
<div>{data.religion}</div>
<div>الديانة</div>
<div>WEIGHT</div>
<div>{data.weight} km</div>
<div>الوزن</div>
<div>HEIGHT</div>

<div>{data.height} cm</div>
<div>الطول</div>
<div style={{height: 35}}>EDUCATIONAL ATTAINMENT</div>
<div style={{height: 35}}>{data.educationattainment}</div>
<div style={{height: 35}}>المستوى الدراسي</div>
<div style={{height: 35}}>POST APPLIED FOR</div>
<div style={{height: 35}}>{data.postappliedfor}</div>
<div style={{height: 35}}>الوظيفة المتقدمة اليها</div>
<div style={{height: 35}}>MONTHLY SALARY</div>
<div style={{height: 35}}> {data.monthlysalarySaudi} SAR</div>
<div style={{height: 35}}>الراتب الشهري</div>
<div style={{height: 35}}>CONTRACT PERIOD</div>
<div style={{height: 35}}>{data.contract}</div>
<div style={{height: 35}}>مدة التعاقد</div>
<div style={{height: 35}}>ARABIC DEGREE</div>
<div style={{height: 35}}>{data.arabicdegree}</div>
<div style={{height: 35}}>مستوى اللغة العربية</div>
<div style={{height: 39}}>ENGLISH DEGREE</div>
<div style={{height: 39}}>{data.englishdegree}</div>
<div style={{height: 39}}>مستوى اللغة الانجليزية</div>
</div>
                        <div className="second-side">
                            <div>
                                <img src={data.fullBodyImageUrl || imagePlaceholder} alt="Full Body" className="full-body-image" />
                            </div>
                            <div>
                                <img src={ouragentlogo} alt="Agent Logo" className="agent-logo" />
                            </div>
                        </div>
                    </div>

                    <div className="second-section-parent">

                    <div className="phone-number-sec">
                        <div>OWN PHONE NUMBER</div>
                        <div style={{background: "white"}}>{data.ownphonenum}</div>
                        <div>رقم الهاتف الشخصي</div>
                    </div>
                    <div className="cphone-number-sec">
                        <div>CONTACT PHONE NUMBER</div>
                        <div style={{background: "white"}}>{data.contactphonenum}</div>
                        <div>رقم الهاتف الاقارب</div>
                    </div>



                    <div className="experience-country-sec">
<div>EXPERIANCE COUNTRY</div>
{/* <div>{projectInfo.project.map(i =>  <span style={{marginRight: "3px"}}>{i.name}, </span> )} </div> */}
<div>{data.experience && JSON.parse(data.experience).map(i =>  <span style={{marginRight: "3px"}}>{i.name}, </span> )} </div>
{/* <div>
            </div> */}
<div>خبرة البلد</div>
</div>





<div className="experience-country-sec">
<div>WORKING YEARS</div>
{/* <div>{projectInfo.project.map(i =>  <span style={{marginRight: "3px"}}>{i.overview}, </span> )}</div> */}
<div>{data.experience && JSON.parse(data.experience).map(i =>  <span style={{marginRight: "3px"}}>{i.overview}, </span> )}</div>
{/* <div>
              </div> */}
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
                        <div>{data.babysitting ? "YES" : "NO"}</div>
                        <div>{data.cleaning ? "YES" : "NO"}</div>
                        <div>{data.washing ? "YES" : "NO"}</div>
                        <div>{data.cooking ? "YES" : "NO"}</div>
                        <div>{data.eldercare ? "YES" : "NO"}</div>
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
src={data.passportImageUrl || imagePlaceholder} 

/>

</div>
</div>
            </div>
        </div>




        {/* Kann cv */}


        <div id="KaanAlRiyadhCv"  translate='no'>
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
            <td style={{ border: '1px solid black', padding: '4px', textAlign: 'center', fontSize: '10px' }}>{data.name}</td>
            <td style={{ border: '1px solid black', padding: '4px', textAlign: 'center', fontSize: '10px' }}>{data.middleName}</td>
            <td style={{ border: '1px solid black', padding: '4px', textAlign: 'center', fontSize: '10px' }}>{data.familyName}</td>
            <td style={{ border: '1px solid black', padding: '4px', textAlign: 'center', fontSize: '10px' }}>{data.surname}</td>
            <td style={{ border: '1px solid black', padding: '4px', textAlign: 'center', fontSize: '10px' }}>CV{data.cvcount}</td>
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
            <td style={{ border: '1px solid black', padding: '4px', textAlign: 'center', fontSize: '10px' }}>{data.postappliedfor}</td>
            <td style={{ border: '1px solid black', padding: '4px', textAlign: 'center', fontSize: '10px' }}>{data.contract}</td>
            <td style={{ border: '1px solid black', padding: '4px', textAlign: 'center', fontSize: '10px' }}>{data.monthlysalarySaudi ? data.monthlysalarySaudi + " SAR" : ""}</td>
            <td style={{ border: '1px solid black', padding: '4px', textAlign: 'center', fontSize: '10px' }}>{data.sponsorCity}</td>
            <td style={{ border: '1px solid black', padding: '4px', textAlign: 'center', fontSize: '10px' }}>{data.sponsorAddress}</td>
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
            <td style={{ border: '1px solid black', padding: '4px', textAlign: 'center', fontSize: '10px' }}>{data.passportnum}</td>
            <td style={{ border: '1px solid black', padding: '4px', textAlign: 'center', fontSize: '10px' }}>{data.dateofbirth}</td>
            <td style={{ border: '1px solid black', padding: '4px', textAlign: 'center', fontSize: '10px' }}>{data.expireddate}</td>
            <td style={{ border: '1px solid black', padding: '4px', textAlign: 'center', fontSize: '10px' }}>{data.passportIssuePlace}</td>
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
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>{data.currentNationality}</td>
        </tr>
        <tr>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>Religion / الدين</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>{data.religion}</td>
        </tr>
        <tr>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>Age / العمر</td> 
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>{data.age}</td>
        </tr>
        <tr>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>Gender / الجنس</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>{data.sex}</td>
        </tr>
        <tr>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>Birthday / تاريخ الميلاد</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>{data.dateofbirth}</td>
        </tr>
        <tr>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>Birthplace / مكان الميلاد</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>{data.placeofbirth}</td>
        </tr>
        <tr>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>Marital Status / الحالة الاجتماعية</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>{data.martialstatus}</td>
        </tr>
        <tr>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>Number of Children / عدد الأطفال</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>{data.numberofchildren}</td>
        </tr>
        <tr>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>Height / الطول</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>{data.height}</td>
        </tr>
        <tr>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>Weight / الوزن</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>{data.weight}</td>
        </tr>
        <tr>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>Education / التعليم</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>{data.educationattainment}</td>
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
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{/*projectInfo.project[0].cleaning === "Excellent" ? "✔️"  : "" */}  {JSON.parse(data.experience)[0].cleaning && JSON.parse(data.experience)[0].cleaning === "Excellent" ? "✔️"  : ""}</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{/*projectInfo.project[0].cleaning === "Very Good" ? "✔️"  : ""*/} {JSON.parse(data.experience)[0].cleaning && JSON.parse(data.experience)[0].cleaning === "Very Good" ? "✔️"  : ""} </td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{/*projectInfo.project[0].cleaning === "Good" ? "✔️"  : ""*/}  {JSON.parse(data.experience)[0].cleaning && JSON.parse(data.experience)[0].cleaning === "Good" ? "✔️"  : ""}</td>
        </tr>
        <tr>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>Laundry (غسيل)</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{/*projectInfo.project[0].laundary === "Excellent" ? "✔️"  : ""*/} {JSON.parse(data.experience)[0].laundary && JSON.parse(data.experience)[0].laundary === "Excellent" ? "✔️"  : ""}</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{/*projectInfo.project[0].laundary === "Very Good" ? "✔️"  : ""*/} {JSON.parse(data.experience)[0].laundary && JSON.parse(data.experience)[0].laundary === "Very Good" ? "✔️"  : ""}</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{/*projectInfo.project[0].laundary === "Good" ? "✔️"  : ""*/}  {JSON.parse(data.experience)[0].laundary && JSON.parse(data.experience)[0].laundary === "Good" ? "✔️"  : ""}</td>
        </tr>
        <tr>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>Ironing Clothes (كي الملابس)</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{/*projectInfo.project[0].ironingclothes === "Excellent" ? "✔️"  : ""*/} {JSON.parse(data.experience)[0].ironingclothes && JSON.parse(data.experience)[0].ironingclothes === "Excellent" ? "✔️"  : ""} </td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{/*projectInfo.project[0].ironingclothes === "Very Good" ? "✔️"  : ""*/} {JSON.parse(data.experience)[0].ironingclothes && JSON.parse(data.experience)[0].ironingclothes === "Very Good" ? "✔️"  : ""}</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{/*projectInfo.project[0].ironingclothes === "Good" ? "✔️"  : ""*/} {JSON.parse(data.experience)[0].ironingclothes && JSON.parse(data.experience)[0].ironingclothes === "Good" ? "✔️"  : ""}</td>
        </tr>
        <tr>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>Baby Care (رعاية الأطفال)</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{/*projectInfo.project[0].babycare === "Excellent" ? "✔️"  : "" */}  {JSON.parse(data.experience)[0].babycare && JSON.parse(data.experience)[0].babycare === "Excellent" ? "✔️"  : ""}</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{/*projectInfo.project[0].babycare === "Very Good" ? "✔️"  : "" */} {JSON.parse(data.experience)[0].babycare && JSON.parse(data.experience)[0].babycare === "Very Good" ? "✔️"  : ""}</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{/*projectInfo.project[0].babycare === "Good" ? "✔️"  : "" */}  {JSON.parse(data.experience)[0].babycare && JSON.parse(data.experience)[0].babycare === "Good" ? "✔️"  : ""}</td>
        </tr>
        <tr>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>Children Care (رعاية الأطفال)</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{/*projectInfo.project[0].childerncare === "Excellent" ? "✔️"  : ""*/} {JSON.parse(data.experience)[0].childerncare && JSON.parse(data.experience)[0].childerncare === "Excellent" ? "✔️"  : ""}</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{/*projectInfo.project[0].childerncare === "Very Good" ? "✔️"  : ""*/} {JSON.parse(data.experience)[0].childerncare && JSON.parse(data.experience)[0].childerncare === "Very Good" ? "✔️"  : ""}</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{/*projectInfo.project[0].childerncare === "Good" ? "✔️"  : ""*/} {JSON.parse(data.experience)[0].childerncare && JSON.parse(data.experience)[0].childerncare === "Good" ? "✔️"  : ""}</td>
        </tr>
        <tr>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>Care of the Elderly (رعاية المسنين)</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{/*projectInfo.project[0].careoftheelderly === "Excellent" ? "✔️"  : ""*/} {JSON.parse(data.experience)[0].careoftheelderly && JSON.parse(data.experience)[0].careoftheelderly === "Excellent" ? "✔️"  : ""} </td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{/*projectInfo.project[0].careoftheelderly === "Very Good" ? "✔️"  : ""*/} {JSON.parse(data.experience)[0].careoftheelderly && JSON.parse(data.experience)[0].careoftheelderly === "Very Good" ? "✔️"  : ""}</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{/*projectInfo.project[0].careoftheelderly === "Good" ? "✔️"  : ""*/} {JSON.parse(data.experience)[0].careoftheelderly && JSON.parse(data.experience)[0].careoftheelderly === "Good" ? "✔️"  : ""}</td>
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
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{/*projectInfo.project[0].cooking === "Excellent" ? "✔️"  : ""*/}  {JSON.parse(data.experience)[0].cooking && JSON.parse(data.experience)[0].cooking === "Excellent" ? "✔️"  : ""}</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{/*projectInfo.project[0].cooking === "Very Good" ? "✔️"  : ""*/}  {JSON.parse(data.experience)[0].cooking && JSON.parse(data.experience)[0].cooking === "Very Good" ? "✔️"  : ""}</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{/*projectInfo.project[0].cooking === "Good" ? "✔️"  : ""*/}  {JSON.parse(data.experience)[0].cooking && JSON.parse(data.experience)[0].cooking === "Good" ? "✔️"  : ""}</td>
        </tr>
        <tr>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>Arabic Cooking (الطبخ العربي)</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{/*projectInfo.project[0].arabicCooking === "Excellent" ? "✔️"  : ""*/} {JSON.parse(data.experience)[0].arabicCooking && JSON.parse(data.experience)[0].arabicCooking === "Excellent" ? "✔️"  : ""}</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{/*projectInfo.project[0].arabicCooking === "Very Good" ? "✔️"  : ""*/}  {JSON.parse(data.experience)[0].arabicCooking && JSON.parse(data.experience)[0].arabicCooking === "Very Good" ? "✔️"  : ""}</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{/*projectInfo.project[0].arabicCooking === "Good" ? "✔️"  : ""*/} {JSON.parse(data.experience)[0].arabicCooking && JSON.parse(data.experience)[0].arabicCooking === "Good" ? "✔️"  : ""}</td>
        </tr>
        <tr>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>Sewing Clothes (خياطة الملابس)</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{/*projectInfo.project[0].sewingClothes === "Excellent" ? "✔️"  : ""*/} {JSON.parse(data.experience)[0].sewingClothes && JSON.parse(data.experience)[0].sewingClothes === "Excellent" ? "✔️"  : ""}</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{/*projectInfo.project[0].sewingClothes === "Very Good" ? "✔️"  : ""*/} {JSON.parse(data.experience)[0].sewingClothes && JSON.parse(data.experience)[0].sewingClothes === "Very Good" ? "✔️"  : ""}</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{/*projectInfo.project[0].sewingClothes === "Good" ? "✔️"  : ""*/} {JSON.parse(data.experience)[0].sewingClothes && JSON.parse(data.experience)[0].sewingClothes === "Good" ? "✔️"  : ""}</td>
        </tr>
        <tr>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>Home Nursing (تمريض منزلي)</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{/*projectInfo.project[0].homeNursing === "Excellent" ? "✔️"  : ""*/}  {JSON.parse(data.experience)[0].homeNursing && JSON.parse(data.experience)[0].homeNursing === "Excellent" ? "✔️"  : ""}</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{/*projectInfo.project[0].homeNursing === "Very Good" ? "✔️"  : ""*/}  {JSON.parse(data.experience)[0].homeNursing && JSON.parse(data.experience)[0].homeNursing === "Very Good" ? "✔️"  : ""}</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{/*projectInfo.project[0].homeNursing === "Good" ? "✔️"  : ""*/}  {JSON.parse(data.experience)[0].homeNursing && JSON.parse(data.experience)[0].homeNursing === "Good" ? "✔️"  : ""}</td>
        </tr>
        <tr>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>Children's Care (رعاية الأطفال)</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{/*projectInfo.project[0].childrens === "Excellent" ? "✔️"  : ""*/}  {JSON.parse(data.experience)[0].childrens && JSON.parse(data.experience)[0].childrens === "Excellent" ? "✔️"  : ""}</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{/*projectInfo.project[0].childrens === "Very Good" ? "✔️"  : ""*/} {JSON.parse(data.experience)[0].childrens && JSON.parse(data.experience)[0].childrens === "Very Good" ? "✔️"  : ""}</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{/*projectInfo.project[0].childrens === "Good" ? "✔️"  : ""*/} {JSON.parse(data.experience)[0].childrens && JSON.parse(data.experience)[0].childrens === "Good" ? "✔️"  : ""}</td>
        </tr>
        <tr>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>Driving Cars (قيادة السيارات)</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{/*projectInfo.project[0].drivingCars === "Excellent" ? "✔️"  : ""*/}  {JSON.parse(data.experience)[0].drivingCars && JSON.parse(data.experience)[0].drivingCars === "Excellent" ? "✔️"  : ""}</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{/*projectInfo.project[0].drivingCars === "Very Good" ? "✔️"  : ""*/} {JSON.parse(data.experience)[0].drivingCars && JSON.parse(data.experience)[0].drivingCars === "Very Good" ? "✔️"  : ""}</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{/*projectInfo.project[0].drivingCars === "Good" ? "✔️"  : ""*/} {JSON.parse(data.experience)[0].drivingCars && JSON.parse(data.experience)[0].drivingCars === "Good" ? "✔️"  : ""}</td>
        </tr>
        <tr>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>Manicure Massage (مانيكير مساج)</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{/*projectInfo.project[0].manicuring === "Excellent" ? "✔️"  : ""*/}  {JSON.parse(data.experience)[0].manicuring && JSON.parse(data.experience)[0].manicuring === "Excellent" ? "✔️"  : ""}</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{/*projectInfo.project[0].manicuring === "Very Good" ? "✔️"  : ""*/}  {JSON.parse(data.experience)[0].manicuring && JSON.parse(data.experience)[0].manicuring === "Very Good" ? "✔️"  : ""}</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{/*projectInfo.project[0].manicuring === "Good" ? "✔️"  : ""*/}  {JSON.parse(data.experience)[0].manicuring && JSON.parse(data.experience)[0].manicuring === "Good" ? "✔️"  : ""}</td>
        </tr>
        <tr>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>Arabic (العربية)</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{/*projectInfo.project[0].arabic === "Excellent" ? "✔️"  : ""*/} {JSON.parse(data.experience)[0].arabic && JSON.parse(data.experience)[0].arabic === "Excellent" ? "✔️"  : ""}</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{/*projectInfo.project[0].arabic === "Very Good" ? "✔️"  : ""*/} {JSON.parse(data.experience)[0].arabic && JSON.parse(data.experience)[0].arabic === "Very Good" ? "✔️"  : ""}</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{/*projectInfo.project[0].arabic === "Good" ? "✔️"  : ""*/}  {JSON.parse(data.experience)[0].arabic && JSON.parse(data.experience)[0].arabic === "Good" ? "✔️"  : ""}</td>
        </tr>
        <tr>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>English (الإنجليزية)</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{/*projectInfo.project[0].english === "Excellent" ? "✔️"  : ""*/}  {JSON.parse(data.experience)[0].english && JSON.parse(data.experience)[0].english === "Excellent" ? "✔️"  : ""}</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{/*projectInfo.project[0].english === "Very Good" ? "✔️"  : ""*/}  {JSON.parse(data.experience)[0].english && JSON.parse(data.experience)[0].english === "Very Good" ? "✔️"  : ""}</td>
            <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', textAlign: 'center' }}>{/*projectInfo.project[0].english === "Good" ? "✔️"  : ""*/}  {JSON.parse(data.experience)[0].english && JSON.parse(data.experience)[0].english === "Good" ? "✔️"  : ""}</td>
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

{data.experience && JSON.parse(data.experience).map((proj, index) => (
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
            src={data.fullBodyImageUrl || imagePlaceholder} 
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
src={data.passportImageUrl || imagePlaceholder} 

/>

</div>
</div>
          
        </div>


        {/* Kaan cv end */}


        {/* Qimam cv  */}


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
    <div style={{ display: "flex", border: "2px solid black", width: "30%", fontSize: "12px", justifyContent: "center", color: data.postappliedFor ? "black" : "transparent"  }}>{data.postappliedFor ? data.postappliedFor : "no"}</div>
    <div style={{ display: "flex", border: "2px solid black", width: "30%", fontSize: "12px", justifyContent: "center", color: "#AB1319" }}>
        الوظيفة
    </div>
</div>



<div style={{ display: "flex", alignItems: "center" }}>
    <div style={{ display: "flex", border: "2px solid black", width: "30%", fontSize: "12px", justifyContent: "center", color: "#2ca2d4" }}>
 MONTHLY SALARY    </div>
    <div style={{ display: "flex", border: "2px solid black", width: "30%", fontSize: "12px", justifyContent: "center", color: data.monthlysalarySaudi ? "black" : "transparent" }}>{data.monthlysalarySaudi ? data.monthlysalarySaudi + " SAR" : "-"}</div>
    <div style={{ display: "flex", border: "2px solid black", width: "30%", fontSize: "12px", justifyContent: "center", color: "#AB1319" }}>
        
        الراتب الشهري
    </div>
</div>


<div style={{ display: "flex", alignItems: "center" }}>
    <div style={{ display: "flex", border: "2px solid black", width: "30%", fontSize: "12px", justifyContent: "center", color: "#2ca2d4" }}>
        CONTRACT PERIOD
    </div>
    <div style={{ display: "flex", border: "2px solid black", width: "30%", fontSize: "12px", justifyContent: "center", color: data.contract ? "black" : "transparent"  }}>{data.contract ? data.contract : "-"}</div>
    <div style={{ display: "flex", border: "2px solid black", width: "30%", fontSize: "12px", justifyContent: "center", color: "#AB1319" }}>
        مدة العقد
    </div>
</div>


</div>


                      <div  style={{width: "100%"}}>
                      <img src={data.personalImageUrl || imagePlaceholder} alt="Wider" className="wider-image" style={{width: "100%"}} />
                      </div>  


                                          



                    </div>
                {/* header end */}

                {/* full name section */}

                <div style={{display: "flex", marginTop: "10px", marginBottom: "10px"}}>
                    <div style={{display: "flex", justifyContent: "center", border: "2px solid black", width: "25%", color: "#2ca2d4", background: "#CECEEF"}}>FULL NAME</div>
                    <div style={{display: "flex", justifyContent: "center", border: "2px solid black", width: "50%"}}>{data.name} {data.middleName} {data.surname}</div>
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
<div>{data.currentNationality}</div>
<div style={{color: "#AB1319"}}>الجنسية</div>

<div style={{color: "#2ca2d4"}}>RELIGION</div>
<div>{data.religion}</div>
<div style={{color: "#AB1319"}}>الديانة</div>

<div style={{color: "#2ca2d4"}}>DATE OF BIRTH</div>
<div>{data.dateofbirth}</div>
<div style={{color: "#AB1319"}}>تاريخ الميلاد</div>

<div style={{color: "#2ca2d4"}}>PLACE Of Birth</div>
<div>{data.placeofbirth}</div>
<div style={{color: "#AB1319"}}>مكان الولادة</div>

<div style={{color: "#2ca2d4"}}>AGE</div>
<div>{data.age}</div>
<div style={{color: "#AB1319"}}>العمر</div>

<div style={{color: "#2ca2d4"}}>LIVING TOWN</div>
<div>{data.placeofbirth}</div>
<div style={{color: "#AB1319"}}>مكان السكن</div>

<div style={{height: 35, color: "#2ca2d4"}}>MARITAL STATUS</div>
<div style={{height: 35,}}>{data.martialstatus}</div>
<div style={{height: 35, color: "#AB1319"}}>الحالة الاجتماعية</div>

<div style={{height: 35, color: "#2ca2d4"}} >NUMBER OF CHILDREN</div>
<div style={{height: 35}}>{data.numberofchildren}</div>
<div style={{height: 35, color: "#AB1319"}}>عدد الاطفال</div>

<div style={{color: "#2ca2d4",}}>WEIGHT</div>
<div>{data.weight ? data.weight + " KG" : ""}</div>
<div style={{color: "#AB1319"}}>الوزن</div>

<div style={{color: "#2ca2d4"}}>HEIGHT</div>
<div>{data.height ? data.height + " CM" : ""}</div>
<div style={{color: "#AB1319"}}>الطول</div>

<div style={{color: "#2ca2d4"}}>COMPLEXION</div>
<div>-</div>
<div style={{color: "#AB1319"}}>لون البشرة</div>

<div style={{height: 35, color: "#2ca2d4"}}>EDUCATIONAL Qualification</div>
<div style={{height: 35}}>{data.educationattainment}</div>
<div style={{height: 35, color: "#AB1319"}}> الدرجة العلمية</div>

<div style={{width: "200px", color: "#2ca2d4"}}>CONTACT NUMBER</div>
<div style={{borderColor: "transparent"}}></div>
<div style={{borderColor: "transparent black transparent transparent", paddingRight: "5px"}}>{data.contactphonenum}</div>


<div style={{ width: "300px", fontSize: "15px", background: "#CECEEF", paddingLeft: "10px", position: "relative", zIndex: 2, display: "flex", justifyContent: "flex-start", borderColor: "black transparent black black" }}>
    Previous experience
</div>
<div style={{ borderColor: "black transparent black transparent", background: "#CECEEF",  position: "relative", zIndex: -1, }}></div>
<div style={{ borderColor: "black black black transparent", background: "#CECEEF",  position: "relative", zIndex: 1, }}></div>


<div style={{color: "#2ca2d4"}}>COUNTRY</div>
<div >{data.experience && JSON.parse(data.experience).map(i =>  <span style={{marginRight: "3px"}}>{i.name ? i.name + "," : ""} </span> )}</div>
<div >  </div>

<div style={{color: "#2ca2d4"}}>DURATION</div>
<div >{data.experience && JSON.parse(data.experience).map(i =>  <span style={{marginRight: "3px"}}>{i.overview ? i.overview + "," : ""} </span> )}</div>
<div >  </div>

<div style={{color: "#2ca2d4"}}>POSITION</div>
<div >{data.experience && JSON.parse(data.experience).map(i =>  <span style={{marginRight: "3px"}}>{i.link ? i.link + "," : ""} </span> )}</div>
<div >  </div>












</div>
<div style={{ height: "100%", background: "" }}>
    <div style={{ height: "100%" }}>
        <img 
            src={data.fullBodyImageUrl || imagePlaceholder} 
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
                                        <div style={{background: "white"}}>{data.babysitting ? "YES" : "NO"}</div>
                                        <div style={{background: "white"}}>{data.washing ? "YES" : "NO"}</div>
                                        <div style={{background: "white"}}>{data.cooking ? "YES" : "NO"}</div>
                                        <div style={{background: "white"}}>{data.ironingclothes ? "YES" : "NO"}</div>
                                        <div style={{background: "white"}}>{data.cleaning ? "YES" : "NO"}</div>
                                        <div style={{background: "white"}}>{data.eldercare ? "YES" : "NO"}</div>
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
    <div style={{ display: "flex", border: "2px solid black", width: "45%", fontSize: "12px", justifyContent: "center", color: data.passportnum ? "black" : "transparent" }}>{data.passportnum ? data.passportnum : "-"}</div>
   
</div>


<div style={{ display: "flex", alignItems: "center" }}>
    <div style={{ display: "flex", border: "2px solid black", width: "45%", fontSize: "12px", justifyContent: "center", color: "#2ca2d4" }}>
        DATE ISSUED
    </div>
    <div style={{ display: "flex", border: "2px solid black", width: "45%", fontSize: "12px", justifyContent: "center", color: data.dateofissue ? "black" : "transparent" }}>{data.dateofissue ? data.dateofissue : "-"}</div>
   
</div>



<div style={{ display: "flex", alignItems: "center" }}>
    <div style={{ display: "flex", border: "2px solid black", width: "45%", fontSize: "12px", justifyContent: "center", color: "#2ca2d4" }}>
        DATE EXPIRY
    </div>
    <div style={{ display: "flex", border: "2px solid black", width: "45%", fontSize: "12px", justifyContent: "center", color: data.expireddate ? "black" : "transparent" }}>{data.expireddate  ? data.expireddate : "-"}</div>
   
</div>


<div style={{ display: "flex", alignItems: "center" }}>
    <div style={{ display: "flex", border: "2px solid black", width: "45%", fontSize: "12px", justifyContent: "center", color: "#2ca2d4" }}>
        PLACE OF ISSUE
    </div>
    <div style={{ display: "flex", border: "2px solid black", width: "45%", fontSize: "12px", justifyContent: "center", color: data.passportIssuePlace ? "black" : "transparent" }}>{data.passportIssuePlace ? data.passportIssuePlace : "-"}</div>
   
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

        {/* Qimam cv end */}




        {/* content end */}

        
       





      {/* end embassy cv content */}


      {/* second embassy cv */}



      <div style={{ display: 'none' }} translate='no'>
                <div className="embassy-cv-main-parent" id="embassycvContent" ref={pdfRef} style={{ minHeight: "auto", backround: "red"}} >
                    <div className='embassy-header'>
                        <div className='embassy-header-first-child' style={{ display: 'flex', flexDirection: 'column', }}>
                            <div style={{ display: 'flex', flexDirection: 'column',  }}>
                                <Barcode
                                       displayValue={false}
                                                value={"E776062468"} height={23} width={1.7} marginBottom={2} />

                                                
                                <span style={{ display: "flex", justifyContent: "space-between", marginLeft: '10px',  }}><span style={{ fontFamily: "serif", fontSize: "8px",  }}>VISA No:</span> <span style={{marginRight: "10px", fontSize: "13px", fontWeight: "bold"}}>{data.visaNo}</span></span>

                                <span style={{ display: "flex", justifyContent: "space-between", marginLeft: '10px',  }}><span style={{ fontFamily: "serif", fontSize: "13px",  }}>sponsor:</span> <span style={{marginRight: "10px", fontSize: "13px"}}>{data.sponsorName}</span></span>
                            </div>
                            
                            <div className="embassy-header-first-child-img-div" style={{marginLeft: "7px"}}>
                            <img
                            style={{marginTop: "10px", width: "150px", height: "150px"}}
                        className="embassy-header-first-child-img"
                        alt="Personal"
                        src={base64Image}
                       
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

{/* <div style={{fontFamily: "serif",  fontSize: "12px", background: "none", marginTop: "20px", marginLeft: "-18px" }} >SKY WAY FOREIGN EMPLOYMENT AGENT</div>
<div style={{fontFamily: "serif", marginTop: "10px", fontWeight: "bold", marginLeft: "-10px"}}>skywayagencyoffice@gmail.com</div> */}

{/* <div style={{fontFamily: "serif",  fontSize: "12px", background: "none", marginTop: "20px", marginLeft: "" }} >SKY WAY FOREIGN EMPLOYMENT AGENT</div>
<div style={{fontFamily: "serif", marginTop: "10px", fontWeight: "bold", marginLeft: "10px", marginRight: ""}}>skywayagencyoffice@gmail.com</div> */}
</div>
 
    

                           
                        </div>
                    </div>

                    <div className="content-parent" style={{ height: "100%"}}>

                        {/* 1th line */}

                        <div className="first-line" style={{fontFamily: "serif",  fontSize: "13px", display: "flex", justifyContent: "space-between", borderBottom: "2px solid black", paddingBottom: "5px"}}>
                                      <div style={{fontFamily: "serif",  fontSize: "13px",  display: "flex", justifyContent: "space-between", width: "35%"}}>
                                        <span style={{fontFamily: "serif",  fontSize: "13px",}}>Full Name</span>
                                        <span style={{fontWeight:"bold", fontSize: "13px", fontFamily: "serif",}}>{data.name} {data.middleName} {data.surname}</span>
                                        </div>

                                        <div>الاسم الكامل</div>
                        </div>

                        {/* 2th line */}

                        <div className="first-line" style={{fontFamily: "serif",  fontSize: "13px", display: "flex", justifyContent: "space-between", borderBottom: "2px solid black", paddingBottom: window.innerWidth <= 768 ? "2px" : "5px", marginTop: "1px"}}>
                                      <div style={{fontFamily: "serif",  fontSize: "13px",  display: "flex", justifyContent: "space-between", width: "35%"}}>
                                        <span style={{fontFamily: "serif",  fontSize: "13px",}}>Mother Name</span>
                                        {/* <span style={{fontWeight:"bold", fontSize: "13px", fontFamily: "serif",}}>NIYASA GETANA AREDA </span> */}
                                        </div>

                                        <div>{data.religion === "Muslim" || data.religion === "islam" ? "الاسلام" : "Non-Muslim"}</div>
                        </div>

                    {/* 3th line */}


                        <div className="first-line" style={{fontFamily: "serif",  fontSize: "13px", display: "flex", justifyContent: "space-between", borderBottom: "2px solid black", paddingBottom: window.innerWidth <= 768 ? "2px" : "5px", marginTop: "1px"}}>


                                      <div style={{fontFamily: "serif",  fontSize: "13px",  display: "flex", justifyContent: "space-between", width: "47%"}}>


                                        
                                            <span style={{fontFamily: "serif",  fontSize: "13px",}}>Date of Birth:</span>
                                            <span style={{fontWeight:"bold", fontFamily: "serif",  fontSize: "13px",}}>{data.dateofbirth}</span>
                                           


                                            
                                            <span style={{fontWeight:"bold", fontSize: "13px", fontFamily: "serif",}}>تاريخ الميلاد</span>
                                      


                                        </div>

                                        <div style={{fontFamily: "serif",  fontSize: "13px",  display: "flex", justifyContent: "space-between", width: "47%"}}>


           <div style={{display: "flex", justifyContent: "space-between", width: "58%",}}>                         
<span style={{fontFamily: "serif",  fontSize: "13px"}}>Place of Birth : </span>
<span style={{fontWeight:"bold", fontFamily: "serif",  fontSize: "13px",}}>{data.placeofbirth}</span>
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
<span style={{fontWeight:"bold",fontFamily: "serif",  fontSize: window.innerWidth <= 768 && data.currentNationality !== "Ethiopia" ? "10px" : "13px"}}>{data.currentNationality}</span>
</div>




<span style={{fontWeight:"bold", fontSize: "13px", fontFamily: "serif",}}> الجنسية الحالية
</span>



</div>

</div>

{/* 5th line */}

<div className="first-line" style={{fontFamily: "serif",  fontSize: "13px", display: "flex", justifyContent: "space-between", borderBottom: "2px solid black", paddingBottom: window.innerWidth <= 768 ? "2px" : "5px", marginTop: "1px"}}>


<div style={{fontFamily: "serif",  fontSize: "13px",  display: "flex", justifyContent: "space-between", width: "47%"}}>


  
      <span style={{fontFamily: "serif",  fontSize: "13px",}}>Sex:</span>
      <span style={{fontWeight:"bold", fontFamily: "serif",  fontSize: "13px",}}>{data.sex}</span>
     


      
      <span style={{fontWeight:"bold", fontSize: "13px", fontFamily: "serif",}}> الجنس</span>



  </div>

  <div style={{fontFamily: "serif",  fontSize: "13px",  display: "flex", justifyContent: "space-between", width: "47%"}}>


<div  style={{display: "flex", justifyContent: "space-between", width: "58%",}}>                         
<span style={{fontFamily: "serif",  fontSize: "13px", }}>Marital Status: </span>
<span style={{fontWeight:"bold", fontFamily: "serif",  fontSize: "13px",}}>{data.martialstatus}</span>
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
<span style={{fontWeight:"bold", fontFamily: "serif",  fontSize: "13px",}}>{data.religion === "Muslim" || data.religion === "islam" ? "الاسلام" : "Non-Muslim"}</span>
</div>    




<span style={{fontWeight:"bold", fontSize: "13px", fontFamily: "serif",}}> الديانة</span>



</div>
</div>


{/* 7th line */}

<div className="first-line" style={{fontFamily: "serif",  fontSize: "13px", display: "flex", justifyContent: "space-between", borderBottom: "2px solid black", paddingBottom: window.innerWidth <= 768 ? "2px" : "5px", marginTop: "1px"}}>


<div style={{fontFamily: "serif",  fontSize: "13px",  display: "flex", justifyContent: "space-between", width: "47%"}}>


  
      <span style={{fontFamily: "serif",  fontSize: "13px",}}>Qualification:</span>
      <span style={{fontWeight:"bold", fontFamily: "serif",  fontSize: "13px",}}>{data.educationattainment}</span>
      
     


      
      <span style={{fontWeight:"bold", fontSize: "13px", fontFamily: "serif",}}> المؤهل العلمي</span>



  </div>

  <div style={{fontFamily: "serif",  fontSize: "13px",  display: "flex", justifyContent: "space-between", width: "47%"}}>


<div style={{display: "flex", justifyContent: "space-between", width: "58%",}}>                         
<span style={{fontFamily: "serif",  fontSize: "13px",}}>Profession: </span>
<span style={{fontWeight:"bold", fontFamily: "serif",  fontSize: "13px",}}>{data.postappliedfor}</span>
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
                                        <span style={{fontFamily: "serif",  fontSize: "13px", fontWeight: "bold", marginLeft: "60px"}}>{data.sponsorCity}</span>
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
                                        <span style={{fontFamily: "serif",  fontSize: "13px", fontWeight: "bold", marginLeft: "60px"}}>{data.sponsorPhone}</span>
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
                                        {/* <span style={{fontFamily: "serif",  fontSize: "15px", background: `${data.visaType.toLowerCase() === "work" ? "#88898a" : ""}`, marginTop: "-7px", marginBottom: "-5px", paddingTop: "7px", width: "50px", paddingLeft: "7px"}}>Work</span>
                                        <span style={{fontFamily: "serif",  fontSize: "15px", background: `${data.visaType.toLowerCase() === "transit" ? "#88898a" : ""}`, marginTop: "-7px", marginBottom: "-5px", paddingTop: "7px", width: "55px", paddingLeft: "7px"}}>Transit</span>

                                        <span style={{fontFamily: "serif",  fontSize: "15px", background: `${data.visaType.toLowerCase() === "workingvisit" ? "#88898a" : ""}`, marginTop: "-7px", marginBottom: "-5px", paddingTop: "7px", width: "50px", paddingLeft: "7px"}}>Visit</span>
                                        <span style={{fontFamily: "serif",  fontSize: "15px", background: `${data.visaType.toLowerCase() === "umrah" ? "#88898a" : ""}`, marginTop: "-7px", marginBottom: "-5px", paddingTop: "7px", width: "55px", paddingLeft: "7px"}}>Umrah</span>

                                        <span style={{fontFamily: "serif",  fontSize: "15px", background: `${data.visaType.toLowerCase() === "residence" ? "#88898a" : ""}`, marginTop: "-7px", marginBottom: "-5px", paddingTop: "7px", width: "73px", paddingLeft: "7px"}}>Residence</span>
                                        <span style={{fontFamily: "serif",  fontSize: "15px", background: `${data.visaType.toLowerCase() === "hajj" ? "#88898a" : ""}`, marginTop: "-7px", marginBottom: "-5px", paddingTop: "7px", width: "45px", paddingLeft: "7px"}}>Hajj</span>

                                        <span style={{fontFamily: "serif",  fontSize: "15px", background: `${data.visaType.toLowerCase() === "diplomacy" ? "#88898a" : ""}`, marginTop: "-7px", marginBottom: "-5px", paddingTop: "7px", width: "80px", paddingLeft: "7px"}}>Diplomacy</span>
                                        <span style={{fontFamily: "serif",  fontSize: "15px", background: `${data.visaType.toLowerCase() === "other" ? "#88898a" : ""}`, marginTop: "-7px", marginBottom: "-5px", paddingTop: "7px", width: "50px", paddingLeft: "7px"}}>Other</span> */}




                                        <span style={{fontFamily: "serif",  fontSize: "15px", background: `${data.visaType === "work" ? "#88898a" : ""}`, marginTop: "-7px", marginBottom: "-5px", paddingTop: "7px", width: window.innerWidth <= 768 ? "55px" : "50px", paddingLeft: "7px"}}>Work</span>
                                        <span style={{fontFamily: "serif",  fontSize: "15px", background: `${data.visaType === "transit" ? "#88898a" : ""}`, marginTop: "-7px", marginBottom: "-5px", paddingTop: "7px", width: window.innerWidth <= 768 ? "60px" : "55px", paddingLeft: "7px"}}>Transit</span>

                                        <span style={{fontFamily: "serif",  fontSize: "15px", background: `${data.visaType === "workingvisit" ? "#88898a" : ""}`, marginTop: "-7px", marginBottom: "-5px", paddingTop: "7px", width: window.innerWidth <= 768 ? "55px" : "50px", paddingLeft: "7px"}}>Visit</span>
                                        <span style={{fontFamily: "serif",  fontSize: "15px", background: `${data.visaType === "umrah" ? "#88898a" : ""}`, marginTop: "-7px", marginBottom: "-5px", paddingTop: "7px", width: window.innerWidth <= 768 ? "60px" : "55px", paddingLeft: "7px"}}>Umrah</span>

                                        <span style={{fontFamily: "serif",  fontSize: "15px", background: `${data.visaType === "residence" ? "#88898a" : ""}`, marginTop: "-7px", marginBottom: "-5px", paddingTop: "7px", width: window.innerWidth <= 768 ? "82px" : "73px", paddingLeft: "7px"}}>Residence</span>
                                        <span style={{fontFamily: "serif",  fontSize: "15px", background: `${data.visaType === "hajj" ? "#88898a" : ""}`, marginTop: "-7px", marginBottom: "-5px", paddingTop: "7px", width: window.innerWidth <= 768 ? "50px" : "45px", paddingLeft: "7px"}}>Hajj</span>

                                        <span style={{fontFamily: "serif",  fontSize: "15px", background: `${data.visaType === "diplomacy" ? "#88898a" : ""}`, marginTop: "-7px", marginBottom: "-5px", paddingTop: "7px", width: window.innerWidth <= 768 ? "89px" : "80px", paddingLeft: "7px"}}>Diplomacy</span>
                                        <span style={{fontFamily: "serif",  fontSize: "15px", background: `${data.visaType === "other" ? "#88898a" : ""}`, marginTop: "-7px", marginBottom: "-5px", paddingTop: "7px", width: window.innerWidth <= 768 ? "55px" : "50px", paddingLeft: "7px"}}>Other</span>

                                        </div>





                                        <div> الغرض
                                        </div>
                        </div>


{/* 13th line */}


<div style={{borderBottom: "2px solid black",}}>

<div className="first-line" style={{fontFamily: "serif",  fontSize: "13px", display: "flex", justifyContent: "space-between", borderBottom: "2px solid transparent", paddingBottom: "5px", marginTop: "2px"}}>


<div style={{fontFamily: "serif",  fontSize: "13px",  display: "flex", justifyContent: "space-between", }}>


  
      <span style={{fontFamily: "serif",  fontSize: "13px",marginRight: "5px"}}>Place of Issue :</span>
      <span style={{fontWeight:"bold", fontFamily: "serif",  fontSize: "13px",}}>{data.passportissueplace}</span>



  </div>

  <div style={{fontFamily: "serif",  fontSize: "13px",  display: "flex", justifyContent: "space-between",}}>


<div style={{display: "flex", justifyContent: "space-between", }}>                         
<span style={{fontFamily: "serif",  fontSize: "13px", marginRight: "5px"}}>مكان الاصدار Date of issue: </span>
<span style={{fontWeight:"bold", fontFamily: "serif",  fontSize: "13px", marginRight: "15px"}}>{data.dateofissue}</span>
<span style={{fontWeight:"bold", fontFamily: "serif",  fontSize: "13px", }}>تاريخ الاصدار</span>
</div>    


{/* <span style={{fontWeight:"bold", fontSize: "15px", fontFamily: "serif",}}>مكان الميلاد</span> */}

</div>


<div style={{fontFamily: "serif",  fontSize: "13px",  display: "flex", justifyContent: "space-between",}}>


<div style={{display: "flex", justifyContent: "space-between", }}>                         
<span style={{fontFamily: "serif",  fontSize: "13px", marginRight: "5px"}}>Passport No: </span>
<span style={{fontWeight:"bold", fontFamily: "serif",  fontSize: "13px",}}>{data.passportnum}</span>
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
      <span style={{fontWeight:"bold", fontFamily: "serif",  fontSize: "13px",}}>{data.expireddate}</span>



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
                                        <span style={{fontFamily: "serif", fontSize: window.innerWidth <= 768 ? "10px" : "13px",}}>I will abide by the lows of the Kingdom during the period of my residence in it. </span>
                                        {/* <span style={{fontWeight:"bold", fontSize: "13px", fontFamily: "serif",}}>NIYASA GETANA AREDA </span> */}
                                        </div>

                                        <div  style={{fontFamily: "serif",  fontSize: "13px",}}>       وسأكون ملتزمآ يقوانين المملكة أثناء فترة وجودي بها                                        </div>
                        </div>



{/* 23th line */}


<div className="first-line" style={{fontFamily: "serif",  fontSize: "13px", display: "flex", justifyContent: "space-between", borderBottom: "2px solid transparent", paddingBottom: "5px", marginTop: window.innerWidth <= 768 ? "-3px" : "5px"}}>


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
<span style={{fontWeight:"bold", fontFamily: "serif",  fontSize: "13px",}}>{data.name} {data.middleName} {data.surname}</span>
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



<div className="first-line" style={{fontFamily: "serif",  fontSize: "13px", display: "flex", justifyContent: "space-between", borderBottom: "2px solid transparent", paddingBottom: window.innerWidth <= 768 ? "-1px" : "5px", marginTop: window.innerWidth <= 768 ? "-3px" : "3px"}}>


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


<div className="first-line" style={{fontFamily: "serif",  fontSize: "8px", display: "flex", justifyContent: "space-between", borderBottom: "2px solid transparent", marginTop: window.innerWidth <= 768 ? "-3px" : "3px" }}>
                                      <div style={{fontFamily: "serif",  fontSize: "8px",  display: "flex", justifyContent: "space-between", width: "35%"}}>
                                        <span style={{fontFamily: "serif",  fontSize: "13px",}}>Type</span>
                                        {/* <span style={{fontWeight:"bold", fontSize: "13px", fontFamily: "serif",}}>NIYASA GETANA AREDA </span> */}
                                        </div>

                                        <div  style={{fontFamily: "serif",  fontSize: "13px",}}>       زيادة او العمل من أجل                                        </div>
                        </div>



{/* 27th line */}




<div className="first-line" style={{fontFamily: "serif",  fontSize: "13px", display: "flex", justifyContent: "space-between", borderBottom: "2px solid transparent", paddingBottom: window.innerWidth <= 768 ? "0" : "5px", marginTop: window.innerWidth <= 768 ? "-3px" : "3px"}}>


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



<div className="first-line" style={{fontFamily: "serif",  fontSize: "8px", display: "flex", justifyContent: "space-between", borderBottom: "2px solid transparent", marginTop: window.innerWidth <= 768 ? "-3px" : "3px",}}>
                                      <div style={{fontFamily: "serif",  fontSize: "8px",  display: "flex", justifyContent: "space-between", width: "35%"}}>
                                        <span style={{fontFamily: "serif",  fontSize: "13px",}}>Head of consular section</span>
                                        {/* <span style={{fontWeight:"bold", fontSize: "13px", fontFamily: "serif",}}>NIYASA GETANA AREDA </span> */}
                                        </div>

                                        <div  style={{fontFamily: "serif",  fontSize: "13px",}}>     Checked by  </div>
                        </div> 



{/* 30th line */}

{/* <div style={{display: "flex", flexDirection: "column", justifyContent: "flex-end",  height: "4%",  }}>
<div className="first-line" style={{fontFamily: "serif",  fontSize: "13px", display: "flex", justifyContent: "space-between", borderBottom: "2px solid transparent",    }}>


<div style={{fontFamily: "serif",  fontSize: "13px",  display: "flex", justifyContent: "space-between", }}>


  
      <span style={{fontFamily: "serif",  fontSize: "13px", fontWeight: "bold"}}>{dayName}, {monthName} {dayNumber}, {year}</span> */}
      {/* <span style={{fontWeight:"bold", fontFamily: "serif",  fontSize: "15px",}}>02/11/1997</span> */}
     

  {/* </div>

  <div style={{fontFamily: "serif",  fontSize: "13px",  display: "flex", justifyContent: "space-between", }}>


<div style={{display: "flex", justifyContent: "space-between", }}>                         
<span style={{fontFamily: "serif",  fontSize: "13px", fontWeight: "bold", marginRight: "5px"}}>www.ntechagent.com | </span>
<span style={{fontWeight:"bold", fontFamily: "serif",  fontSize: "13px",  marginRight: "5px"}}> <span> </span> +251 911 454176 | <span> </span></span>
<span style={{fontWeight:"bold", fontFamily: "serif",  fontSize: "13px",}}>ntechagent@gmail.com</span>
</div>     */}


{/* <span style={{fontWeight:"bold", fontSize: "15px", fontFamily: "serif",}}>مكان الميلاد</span> */}

{/* </div>




<div style={{fontFamily: "serif",  fontSize: "13px",  display: "flex", justifyContent: "space-between", }}>


<div style={{display: "flex", justifyContent: "space-between", }}>                          */}
{/* <span style={{fontFamily: "serif",  fontSize: "15px", marginRight: "5px"}}>Place of Birth : </span> */}
{/* <span style={{fontWeight:"bold", fontFamily: "serif",  fontSize: "13px",}}>page 1 of 1</span>
</div>     */}


{/* <span style={{fontWeight:"bold", fontSize: "15px", fontFamily: "serif",}}>مكان الميلاد</span> */}

{/* 

</div>



</div>

</div> */}


{/* 31th line */}
                    </div>
                </div>
            </div>


      {/* second embassy cv end */}
        
</div>


      
    </Container>
  );
};

export default DetailPage;