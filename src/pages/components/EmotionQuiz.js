// import React, { useState, useEffect, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { ArrowLeft, Camera, Send } from 'lucide-react';
// import Webcam from 'react-webcam';
// import { useNavigate } from "react-router-dom";
// const questions = [
//   {
//     id: 1,
//     text: "How has your day been so far?",
//     placeholder: "Tell me about your day..."
//   },
//   {
//     id: 2,
//     text: "What's the one emoji that best describes your mood?",
//     placeholder: "Type or paste an emoji here..."
//   },
//   {
//     id: 3,
//     text: "What's your current mindset like?",
//     placeholder: "Describe how you're feeling..."
//   },
//   {
//     id: 4,
//     text: "What is your preferred language for songs?",
//     placeholder: "Enter your preferred language..."
//   }
// ];

// export default function EmotionQuiz({ onBack, isDarkMode }) {
//     const navigate = useNavigate();
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [answers, setAnswers] = useState({});
//   const [isTyping, setIsTyping] = useState(false);
//   const [currentInput, setCurrentInput] = useState('');
//   const [showCamera, setShowCamera] = useState(false);
//   const [cameraError, setCameraError] = useState('');
//   const [isCameraReady, setIsCameraReady] = useState(false);
//   const webcamRef = useRef(null);
//   const inputRef = useRef(null);

  

//   useEffect(() => {
//     setIsTyping(true);
//     const timer = setTimeout(() => {
//       setIsTyping(false);
//       inputRef.current?.focus();
//     }, 1000);
//     return () => clearTimeout(timer);
//   }, [currentQuestion]);

//   const handleAnswer = () => {
//     if (!currentInput.trim()) return;
    
//     setAnswers(prev => ({ ...prev, [questions[currentQuestion].text]: currentInput }));
//     setCurrentInput('');
    
//     if (currentQuestion < questions.length - 1) {
//       setTimeout(() => setCurrentQuestion(prev => prev + 1), 500);
//     } else {
//       setTimeout(() => setShowCamera(true), 500);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleAnswer();
//     }
//   };

//   const captureImage = () => {
//     if (webcamRef.current) {
//       const imageSrc = webcamRef.current.getScreenshot();
//       console.log('Captured image:', imageSrc?.slice(0, 50) + '...');
//     }
//   };

//   const progress = ((currentQuestion + 1) / questions.length) * 100;

//   if (showCamera) {
//     return (
//       <div className={`min-h-screen transition-all duration-500 ${
//         isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-pink-100 to-purple-200'
//       }`}>
//         <div className="fixed top-0 left-0 w-full h-1 bg-gray-200">
//           <motion.div
//             className="h-full bg-purple-600"
//             initial={{ width: 0 }}
//             animate={{ width: '100%' }}
//             transition={{ duration: 0.5 }}
//           />
//         </div>

//         <div className="max-w-2xl mx-auto pt-16 pb-24 px-4">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="relative"
//           >
//             {/* <button
//               onClick={onBack}
//               className="absolute top-4 left-4 flex items-center text-gray-700 dark:text-gray-300 hover:text-gray-900"
//             >
//               <ArrowLeft className="mr-2 w-5 h-5" />
//               Back to Homepage
//             </button> */}

//             <div className="mb-4 text-center">
//               <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
//                 Facial Emotion Recognition
//               </h2>
//               <p className={`mt-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
//                 Let's capture your expression to better understand your mood
//               </p>
//             </div>

//             <div className="relative rounded-2xl overflow-hidden backdrop-blur-lg bg-white/10">
//               {cameraError ? (
//                 <div className="p-8 text-center text-red-500">{cameraError}</div>
//               ) : (
//                 <Webcam
//                   ref={webcamRef}
//                   audio={false}
//                   screenshotFormat="image/jpeg"
//                   onUserMedia={() => setIsCameraReady(true)}
//                   onUserMediaError={(error) => setCameraError('Unable to access camera.')}
//                   className="w-full rounded-2xl"
//                 />
//               )}
//             </div>

//             <div className="mt-6 flex justify-center gap-4">
//               <button
//                 onClick={() => setShowCamera(false)}
//                 className="px-6 py-3 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition-colors"
//               >
//                 Back to Quiz
//               </button>
//               {isCameraReady && (
//                 <button
//                   onClick={captureImage}
//                   className="px-6 py-3 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors"
//                 >
//                   Capture Expression
//                 </button>
//               )}
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={`min-h-screen transition-all duration-500 ${
//       isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-pink-100 to-purple-200'
//     }`}>
//       <div className="fixed top-0 left-0 w-full h-1 bg-gray-200">
//         <motion.div
//           className="h-full bg-purple-600"
//           initial={{ width: 0 }}
//           animate={{ width: `${progress}%` }}
//           transition={{ duration: 0.5 }}
//         />
//       </div>

//       <div className="max-w-2xl mx-auto pt-16 pb-24 px-4">
//       {/* <button
//   onClick={onBack}
//   className="absolute bottom-4 left-4 flex items-center text-gray-700 dark:text-gray-300 hover:text-gray-900"
// >
//   <ArrowLeft className="mr-2 w-5 h-5" />
//   Back to Homepage
// </button> */}
//  <button
//           onClick={() => navigate("/")} // ✅ Navigate to homepage
//           className="absolute bottom-4 left-4 px-6 py-3 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition-colors"
//         >
//           <ArrowLeft className="mr-2 w-5 h-5" />
//           Back to Homepage
//         </button>


//         <AnimatePresence mode="wait">
//           {questions.slice(0, currentQuestion + 1).map((question, index) => (
//             <motion.div key={question.id} className="mb-8">
//               <div className="flex mb-4">
//                 <div className="max-w-[80%] bg-purple-600 text-white px-6 py-3 rounded-2xl rounded-tl-none">
//                   {question.text}
//                 </div>
//               </div>

//               {index === currentQuestion ? (
//                 <motion.div className="flex gap-2">
//                   <input
//                     ref={inputRef}
//                     type="text"
//                     value={currentInput}
//                     onChange={(e) => setCurrentInput(e.target.value)}
//                     onKeyPress={handleKeyPress}
//                     placeholder={question.placeholder}
//                     className="flex-1 px-4 py-2 rounded-xl bg-white/10 text-black placeholder-black-400"
//                   />
//                   <button onClick={handleAnswer} className="p-2 rounded-xl bg-purple-600 text-black">
//                     <Send className="w-5 h-5" />
//                   </button>
//                 </motion.div>
//               ) : (
//                 <p className="text-red-400">Your answer: {answers[question.text]}</p>
//               )}
//             </motion.div>
//           ))}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }



// import React, { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { ArrowLeft, Camera, Send } from "lucide-react";
// import Webcam from "react-webcam";
// import { useNavigate } from "react-router-dom";

// const questions = [
//   {
//     id: 1,
//     text: "How has your day been so far?",
//     placeholder: "Tell me about your day...",
//   },
//   {
//     id: 2,
//     text: "What's the one emoji that best describes your mood?",
//     placeholder: "Type or paste an emoji here...",
//   },
//   {
//     id: 3,
//     text: "What's your current mindset like?",
//     placeholder: "Describe how you're feeling...",
//   },
//   {
//     id: 4,
//     text: "What is your preferred language for songs?",
//     placeholder: "Enter your preferred language...",
//   },
// ];

// export default function EmotionQuiz({ isDarkMode }) {
//   const navigate = useNavigate();
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [answers, setAnswers] = useState({});
//   const [currentInput, setCurrentInput] = useState("");
//   const [showCamera, setShowCamera] = useState(false);
//   const [cameraError, setCameraError] = useState("");
//   const [isCameraReady, setIsCameraReady] = useState(false);
//   const webcamRef = useRef(null);
//   const inputRef = useRef(null);

//   useEffect(() => {
//     setTimeout(() => {
//       inputRef.current?.focus();
//     }, 500);
//   }, [currentQuestion]);

//   const handleAnswer = () => {
//     if (!currentInput.trim()) return;

//     setAnswers((prev) => ({
//       ...prev,
//       [questions[currentQuestion].text]: currentInput,
//     }));
//     setCurrentInput("");

//     if (currentQuestion < questions.length - 1) {
//       setTimeout(() => setCurrentQuestion((prev) => prev + 1), 500);
//     } else {
//       setTimeout(() => setShowCamera(true), 500);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleAnswer();
//     }
//   };

//   const captureImage = () => {
//     if (webcamRef.current) {
//       const imageSrc = webcamRef.current.getScreenshot();
//       console.log("Captured image:", imageSrc?.slice(0, 50) + "...");
//     }
//   };

//   const progress = ((currentQuestion + 1) / questions.length) * 100;

//   if (showCamera) {
//     return (
//       <div
//         className={`min-h-screen transition-all duration-500 ${
//           isDarkMode
//             ? "bg-gray-900"
//             : "bg-gradient-to-br from-pink-100 to-purple-200"
//         }`}
//       >
//         <div className="fixed top-0 left-0 w-full h-1 bg-gray-200">
//           <motion.div
//             className="h-full bg-purple-600"
//             initial={{ width: 0 }}
//             animate={{ width: "100%" }}
//             transition={{ duration: 0.5 }}
//           />
//         </div>

//         <div className="max-w-2xl mx-auto pt-16 pb-24 px-4">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="relative"
//           >
//             <div className="mb-4 text-center">
//               <h2
//                 className={`text-2xl font-bold ${
//                   isDarkMode ? "text-white" : "text-gray-800"
//                 }`}
//               >
//                 Facial Emotion Recognition
//               </h2>
//               <p
//                 className={`mt-2 ${
//                   isDarkMode ? "text-gray-300" : "text-gray-600"
//                 }`}
//               >
//                 Let's capture your expression to better understand your mood
//               </p>
//             </div>

//             <div className="relative rounded-2xl overflow-hidden backdrop-blur-lg bg-white/10">
//               {cameraError ? (
//                 <div className="p-8 text-center text-red-500">
//                   {cameraError}
//                 </div>
//               ) : (
//                 <Webcam
//                   ref={webcamRef}
//                   audio={false}
//                   screenshotFormat="image/jpeg"
//                   onUserMedia={() => setIsCameraReady(true)}
//                   onUserMediaError={() => setCameraError("Unable to access camera.")}
//                   className="w-full rounded-2xl"
//                 />
//               )}
//             </div>

//             <div className="mt-6 flex justify-center gap-4">
//               <button
//                 onClick={() => setShowCamera(false)}
//                 className="px-6 py-3 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition-colors"
//               >
//                 Back to Quiz
//               </button>
//               {isCameraReady && (
//                 <button
//                   onClick={captureImage}
//                   className="px-6 py-3 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors"
//                 >
//                   Capture Expression
//                 </button>
//               )}
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div
//       className={`min-h-screen transition-all duration-500 ${
//         isDarkMode ? "bg-gray-900" : "bg-gradient-to-br from-pink-100 to-purple-200"
//       }`}
//     >
//       <div className="fixed top-0 left-0 w-full h-1 bg-gray-200">
//         <motion.div
//           className="h-full bg-purple-600"
//           initial={{ width: 0 }}
//           animate={{ width: `${progress}%` }}
//           transition={{ duration: 0.5 }}
//         />
//       </div>

//       <div className="max-w-2xl mx-auto pt-16 pb-24 px-4">
//         <button
//           onClick={() => navigate("/")}
//           className="absolute bottom-4 left-4 px-6 py-3 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition-colors"
//         >
//           <ArrowLeft className="mr-2 w-5 h-5" />
//           Back to Homepage
//         </button>

//         <AnimatePresence mode="wait">
//           <motion.div
//             key={questions[currentQuestion].id}
//             initial={{ opacity: 0, x: 50 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: -50 }}
//             transition={{ duration: 0.5 }}
//             className="mb-8"
//           >
//             <div className="flex mb-4">
//               <div className="max-w-[80%] bg-purple-600 text-white px-6 py-3 rounded-2xl rounded-tl-none">
//                 {questions[currentQuestion].text}
//               </div>
//             </div>

//             <motion.div className="flex gap-2">
//               <input
//                 ref={inputRef}
//                 type="text"
//                 value={currentInput}
//                 onChange={(e) => setCurrentInput(e.target.value)}
//                 onKeyPress={handleKeyPress}
//                 placeholder={questions[currentQuestion].placeholder}
//                 className="flex-1 px-4 py-2 rounded-xl bg-white/10 text-black placeholder-black-400"
//               />
//               <button
//                 onClick={handleAnswer}
//                 className="p-2 rounded-xl bg-purple-600 text-black"
//               >
//                 <Send className="w-5 h-5" />
//               </button>
//             </motion.div>
//           </motion.div>
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }
// import React, { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { ArrowLeft, Camera, Send } from "lucide-react";
// import Webcam from "react-webcam";
// import { useNavigate } from "react-router-dom";

// const questions = [
//   {
//     id: 1,
//     text: "How has your day been so far?",
//     placeholder: "Tell me about your day...",
//   },
//   {
//     id: 2,
//     text: "What's the one emoji that best describes your mood?",
//     placeholder: "Type or paste an emoji here...",
//   },
//   {
//     id: 3,
//     text: "What's your current mindset like?",
//     placeholder: "Describe how you're feeling...",
//   },
//   {
//     id: 4,
//     text: "What is your preferred language for songs?",
//     placeholder: "Enter your preferred language...",
//   },
// ];

// export default function EmotionQuiz({ isDarkMode }) {
//   const navigate = useNavigate();
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [answers, setAnswers] = useState({});
//   const [currentInput, setCurrentInput] = useState("");
//   const [showCamera, setShowCamera] = useState(false);
//   const [cameraError, setCameraError] = useState("");
//   const [isCameraReady, setIsCameraReady] = useState(false);
//   const webcamRef = useRef(null);
//   const inputRef = useRef(null);

//   useEffect(() => {
//     setTimeout(() => {
//       inputRef.current?.focus();
//     }, 500);
//   }, [currentQuestion]);

//   const handleAnswer = () => {
//     if (!currentInput.trim()) return;

//     setAnswers((prev) => ({
//       ...prev,
//       [questions[currentQuestion].text]: currentInput,
//     }));
//     setCurrentInput("");

//     if (currentQuestion < questions.length - 1) {
//       setTimeout(() => setCurrentQuestion((prev) => prev + 1), 500);
//     } else {
//       setTimeout(() => {
//         const confirmOpenCamera = window.confirm(
//           "We are going to capture your facial expression. Press 'OK' to proceed."
//         );
//         if (confirmOpenCamera) {
//           setShowCamera(true);
//         }
//       }, 500);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleAnswer();
//     }
//   };

//   const captureImage = () => {
//     if (webcamRef.current) {
//       const imageSrc = webcamRef.current.getScreenshot();
//       console.log("Captured image:", imageSrc?.slice(0, 50) + "...");
//     }
//   };

//   const progress = ((currentQuestion + 1) / questions.length) * 100;

//   if (showCamera) {
//     return (
//       <div
//         className={`min-h-screen transition-all duration-500 ${
//           isDarkMode
//             ? "bg-gray-900"
//             : "bg-gradient-to-br from-pink-100 to-purple-200"
//         }`}
//       >
//         <div className="fixed top-0 left-0 w-full h-1 bg-gray-200">
//           <motion.div
//             className="h-full bg-purple-600"
//             initial={{ width: 0 }}
//             animate={{ width: "100%" }}
//             transition={{ duration: 0.5 }}
//           />
//         </div>

//         <div className="flex items-center justify-center min-h-screen px-4">
//           <div className="w-full max-w-2xl">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               className="relative"
//             >
//               <div className="mb-4 text-center">
//                 <h2
//                   className={`text-2xl font-bold ${
//                     isDarkMode ? "text-white" : "text-gray-800"
//                   }`}
//                 >
//                   Facial Emotion Recognition
//                 </h2>
//                 <p
//                   className={`mt-2 ${
//                     isDarkMode ? "text-gray-300" : "text-gray-600"
//                   }`}
//                 >
//                   Let's capture your expression to better understand your mood
//                 </p>
//               </div>

//               <div className="relative rounded-2xl overflow-hidden backdrop-blur-lg bg-white/10">
//                 {cameraError ? (
//                   <div className="p-8 text-center text-red-500">
//                     {cameraError}
//                   </div>
//                 ) : (
//                   <Webcam
//                     ref={webcamRef}
//                     audio={false}
//                     screenshotFormat="image/jpeg"
//                     onUserMedia={() => setIsCameraReady(true)}
//                     onUserMediaError={() =>
//                       setCameraError("Unable to access camera.")
//                     }
//                     className="w-full rounded-2xl"
//                   />
//                 )}
//               </div>

//               <div className="mt-6 flex justify-center gap-4">
//                 <button
//                   onClick={() => setShowCamera(false)}
//                   className="px-6 py-3 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition-colors"
//                 >
//                   Back to Quiz
//                 </button>
//                 {isCameraReady && (
//                   <button
//                     onClick={captureImage}
//                     className="px-6 py-3 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors"
//                   >
//                     Capture Expression
//                   </button>
//                 )}
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div
//       className={`min-h-screen transition-all duration-500 ${
//         isDarkMode
//           ? "bg-gray-900"
//           : "bg-gradient-to-br from-pink-100 to-purple-200"
//       }`}
//     >
//       <div className="fixed top-0 left-0 w-full h-1 bg-gray-200">
//         <motion.div
//           className="h-full bg-purple-600"
//           initial={{ width: 0 }}
//           animate={{ width: `${progress}%` }}
//           transition={{ duration: 0.5 }}
//         />
//       </div>

//       <div className="max-w-2xl mx-auto pt-16 pb-24 px-4">
//         <button
//           onClick={() => navigate("/")}
//           className="absolute bottom-4 left-4 px-6 py-3 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition-colors"
//         >
//           <ArrowLeft className="mr-2 w-5 h-5" />
//           Back to Homepage
//         </button>

//         <AnimatePresence mode="wait">
//           <motion.div
//             key={questions[currentQuestion].id}
//             initial={{ opacity: 0, x: 50 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: -50 }}
//             transition={{ duration: 0.5 }}
//             className="mb-8"
//           >
//             <div className="flex mb-4">
//               <div className="max-w-[80%] bg-purple-600 text-white px-6 py-3 rounded-2xl rounded-tl-none">
//                 {questions[currentQuestion].text}
//               </div>
//             </div>

//             <motion.div className="flex gap-2">
//               <input
//                 ref={inputRef}
//                 type="text"
//                 value={currentInput}
//                 onChange={(e) => setCurrentInput(e.target.value)}
//                 onKeyPress={handleKeyPress}
//                 placeholder={questions[currentQuestion].placeholder}
//                 className="flex-1 px-4 py-2 rounded-xl bg-white/10 text-black placeholder-black-400"
//               />
//               <button
//                 onClick={handleAnswer}
//                 className="p-2 rounded-xl bg-purple-600 text-black"
//               >
//                 <Send className="w-5 h-5" />
//               </button>
//             </motion.div>

//             <div className="mt-6 text-sm text-gray-600 text-center">
//               <p>✨ Your thoughts matter — share freely and honestly!</p>

//               <motion.div
//                 className="flex justify-center gap-6 mt-4"
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 1 }}
//               >
//                 <motion.div
//                   className="p-3 bg-purple-100 rounded-full shadow-lg"
//                   animate={{ scale: [1, 1.1, 1], y: [0, -3, 0] }}
//                   transition={{
//                     repeat: Infinity,
//                     duration: 2,
//                     ease: "easeInOut",
//                   }}
//                 >
//                   <span
//                     role="img"
//                     aria-label="lock"
//                     className="text-purple-600 text-2xl"
//                   >
//                     🔒
//                   </span>
//                 </motion.div>

//                 <motion.div
//                   className="p-3 bg-yellow-100 rounded-full shadow-lg"
//                   animate={{ scale: [1, 1.1, 1], y: [0, 3, 0] }}
//                   transition={{
//                     repeat: Infinity,
//                     duration: 2,
//                     ease: "easeInOut",
//                     delay: 1,
//                   }}
//                 >
//                   <span
//                     role="img"
//                     aria-label="sparkles"
//                     className="text-yellow-500 text-2xl"
//                   >
//                     ✨
//                   </span>
//                 </motion.div>
//               </motion.div>

//               <p className="mt-2 text-xs text-gray-500">
//                 Your honest answers will help us better understand your mood and personalize your experience.
//                 <br />
//                 Don’t worry — your data stays safe and private ✨
//               </p>

//               {/* ⚡️ Groundbreaking Emotion-Based Animation */}
//               <motion.div
//                 className="relative mt-6 h-24 flex justify-center items-center"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 1.2 }}
//               >
//                 <div className="absolute w-40 h-40 bg-gradient-to-br from-purple-400 via-pink-400 to-yellow-300 blur-2xl rounded-full opacity-30 animate-pulse"></div>
//                 <motion.div
//                   className="text-white text-lg font-semibold tracking-wide px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full shadow-lg ring-4 ring-purple-300/30"
//                   animate={{ scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }}
//                   transition={{
//                     repeat: Infinity,
//                     repeatType: "reverse",
//                     duration: 3,
//                     ease: "easeInOut",
//                   }}
//                 >
//                   🎶 Emotions shape music — let’s discover yours!
//                 </motion.div>
//               </motion.div>
//             </div>
//           </motion.div>
//         </AnimatePresence>
//       </div>
//       {/* 🎵 Disco-Style Equalizer Animation at Bottom */}
// <div className="absolute bottom-0 left-0 w-full flex justify-center gap-1 pb-4 pointer-events-none z-0">
//   {Array.from({ length: 30 }).map((_, index) => (
//     <motion.div
//       key={index}
//       className="w-1 md:w-1.5 bg-gradient-to-t from-pink-400 via-purple-500 to-indigo-500 rounded-full"
//       initial={{ height: "0.5rem" }}
//       animate={{ height: ["0.5rem", "2rem", "0.8rem", "1.5rem", "1rem"] }}
//       transition={{
//         duration: 1.5,
//         repeat: Infinity,
//         repeatType: "mirror",
//         delay: index * 0.1,
//         ease: "easeInOut",
//       }}
//     />
//   ))}
// </div>

//     </div>
//   );
// }





// import React, { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { ArrowLeft, Camera, Send } from "lucide-react";
// import Webcam from "react-webcam";
// import { useNavigate } from "react-router-dom";

// const questions = [
//   {
//     id: 1,
//     text: "How has your day been so far?",
//     placeholder: "Tell me about your day...",
//   },
//   {
//     id: 2,
//     text: "What's the one emoji that best describes your mood?",
//     placeholder: "Type or paste an emoji here...",
//   },
//   {
//     id: 3,
//     text: "What's your current mindset like?",
//     placeholder: "Describe how you're feeling...",
//   },
//   {
//     id: 4,
//     text: "What is your preferred language for songs?",
//     placeholder: "Enter your preferred language...",
//   },
// ];

// export default function EmotionQuiz({ isDarkMode }) {
//   const navigate = useNavigate();
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [answers, setAnswers] = useState({});
//   const [currentInput, setCurrentInput] = useState("");
//   const [showCamera, setShowCamera] = useState(false);
//   const [cameraError, setCameraError] = useState("");
//   const [isCameraReady, setIsCameraReady] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);
// const [pendingAnswers, setPendingAnswers] = useState({});

//   const webcamRef = useRef(null);
//   const inputRef = useRef(null);

//   useEffect(() => {
//     setTimeout(() => {
//       inputRef.current?.focus();
//     }, 500);
//   }, [currentQuestion]);

//   const handleAnswer = async () => {
//     if (!currentInput.trim()) {
//       alert("Please enter a valid response.");
//       return;
//     }
  
//     const updatedAnswers = {
//       ...answers,
//       [questions[currentQuestion].text]: currentInput,
//     };
//     setAnswers(updatedAnswers);
//     setCurrentInput("");
  
//     if (currentQuestion < questions.length - 1) {
//       setTimeout(() => setCurrentQuestion((prev) => prev + 1), 500);
//     } else {
//       try {
//         const response = await fetch("http://localhost:5000/api/submit", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ answers: updatedAnswers }),
//         });
  
//         const data = await response.json();
//         console.log("Saved to DB:", data);
  
//         const confirmCapture = window.confirm(
//           "Your answers have been submitted successfully!\n\nNext, we will capture your image using your webcam"
//         );
  
//         if (confirmCapture) {
//           setTimeout(() => setShowCamera(true), 500);
//         } 
//         // else {
//         //   alert("Image capture has been cancelled.");
//         // }
//       } catch (error) {
//         console.error("Error saving to database:", error);
//         alert("Failed to save your answers. Please try again later.");
//       }
//     }
//   };
  

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleAnswer();
//     }
//   };

//   const captureImage = () => {
//     if (webcamRef.current) {
//       const imageSrc = webcamRef.current.getScreenshot();
//       if (imageSrc) {
//         console.log("Captured image:", imageSrc?.slice(0, 50) + "...");
//         alert("Image captured successfully!");
//       } else {
//         alert("Failed to capture image. Please try again.");
//       }
//     }
//   };

//   const progress = ((currentQuestion + 1) / questions.length) * 100;

//   if (showCamera) {
//     return (
//       <div
//         className={`min-h-screen transition-all duration-500 ${
//           isDarkMode
//             ? "bg-gray-900"
//             : "bg-gradient-to-br from-pink-100 to-purple-200"
//         }`}
//       >
//         <div className="fixed top-0 left-0 w-full h-1 bg-gray-200">
//           <motion.div
//             className="h-full bg-purple-600"
//             initial={{ width: 0 }}
//             animate={{ width: "100%" }}
//             transition={{ duration: 0.5 }}
//           />
//         </div>

//         <div className="max-w-2xl mx-auto pt-16 pb-24 px-4">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="relative"
//           >
//             <div className="mb-4 text-center">
//               <h2
//                 className={`text-2xl font-bold ${
//                   isDarkMode ? "text-white" : "text-gray-800"
//                 }`}
//               >
//                 Facial Emotion Recognition
//               </h2>
//               <p
//                 className={`mt-2 ${
//                   isDarkMode ? "text-gray-300" : "text-gray-600"
//                 }`}
//               >
//                 Let's capture your expression to better understand your mood
//               </p>
//             </div>

//             <div className="relative rounded-2xl overflow-hidden backdrop-blur-lg bg-white/10">
//               {cameraError ? (
//                 <div className="p-8 text-center text-red-500">{cameraError}</div>
//               ) : (
//                 <Webcam
//                   ref={webcamRef}
//                   audio={false}
//                   screenshotFormat="image/jpeg"
//                   onUserMedia={() => setIsCameraReady(true)}
//                   onUserMediaError={() => {
//                     const msg = "Unable to access the camera. Please allow access.";
//                     setCameraError(msg);
//                     alert(msg);
//                   }}
//                   className="w-full rounded-2xl"
//                 />
//               )}
//             </div>

//             <div className="mt-6 flex justify-center gap-4">
//               <button
//                 onClick={() => setShowCamera(false)}
//                 className="px-6 py-3 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition-colors"
//               >
//                 Back to Quiz
//               </button>
//               {isCameraReady && (
//                 <button
//                   onClick={captureImage}
//                   className="px-6 py-3 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors"
//                 >
//                   Capture Expression
//                 </button>
//               )}
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div
//       className={`min-h-screen transition-all duration-500 ${
//         isDarkMode
//           ? "bg-gray-900"
//           : "bg-gradient-to-br from-pink-100 to-purple-200"
//       }`}
//     >
//       {/* Progress Bar */}
//       <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
//         <motion.div
//           className="h-full bg-purple-600"
//           initial={{ width: 0 }}
//           animate={{ width: `${progress}%` }}
//           transition={{ duration: 0.5 }}
//         />
//       </div>
  
//       <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 relative z-10">
//         {/* Back Button */}
//         <button
//   onClick={() => navigate("/")}
//   className="fixed bottom-4 left-4 px-6 py-3 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition-colors z-50"
// >
//   <ArrowLeft className="mr-2 w-5 h-5 inline" />
//   Back to Homepage
// </button>

  
//         {/* Question UI */}
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={questions[currentQuestion].id}
//             initial={{ opacity: 0, x: 50 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: -50 }}
//             transition={{ duration: 0.5 }}
//             className="mb-8"
//           >
//             {/* Question Bubble */}
//             <div className="flex mb-4">
//               <div className="max-w-[80%] bg-purple-600 text-white px-6 py-3 rounded-2xl rounded-tl-none">
//                 {questions[currentQuestion].text}
//               </div>
//             </div>
  
//             {/* Input Section */}
//             <motion.div className="flex gap-2">
//               <input
//                 ref={inputRef}
//                 type="text"
//                 value={currentInput}
//                 onChange={(e) => setCurrentInput(e.target.value)}
//                 onKeyPress={handleKeyPress}
//                 placeholder={questions[currentQuestion].placeholder}
//                 className="flex-1 px-4 py-2 rounded-xl bg-white/10 text-black placeholder-black-400"
//               />
//               <button
//                 onClick={handleAnswer}
//                 className="p-2 rounded-xl bg-purple-600 text-black"
//               >
//                 <Send className="w-5 h-5" />
//               </button>
//             </motion.div>
  
//             {/* Encouragement Message */}
//             <div className="mt-6 text-sm text-gray-600 text-center">
//               <p>✨ Your thoughts matter — share freely and honestly!</p>
  
//               {/* Emojis Animation */}
//               <motion.div
//                 className="flex justify-center gap-6 mt-4"
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 1 }}
//               >
//                 <motion.div
//                   className="p-3 bg-purple-100 rounded-full shadow-lg"
//                   animate={{ scale: [1, 1.1, 1], y: [0, -3, 0] }}
//                   transition={{
//                     repeat: Infinity,
//                     duration: 2,
//                     ease: "easeInOut",
//                   }}
//                 >
//                   <span
//                     role="img"
//                     aria-label="lock"
//                     className="text-purple-600 text-2xl"
//                   >
//                     🔒
//                   </span>
//                 </motion.div>
  
//                 <motion.div
//                   className="p-3 bg-yellow-100 rounded-full shadow-lg"
//                   animate={{ scale: [1, 1.1, 1], y: [0, 3, 0] }}
//                   transition={{
//                     repeat: Infinity,
//                     duration: 2,
//                     ease: "easeInOut",
//                     delay: 1,
//                   }}
//                 >
//                   <span
//                     role="img"
//                     aria-label="sparkles"
//                     className="text-yellow-500 text-2xl"
//                   >
//                     ✨
//                   </span>
//                 </motion.div>
//               </motion.div>
  
//               {/* Subtext */}
//               <p className="mt-2 text-xs text-gray-500">
//                 Your honest answers will help us better understand your mood and personalize your experience.
//                 <br />
//                 Don’t worry — your data stays safe and private ✨
//               </p>
  
//               {/* Emotion Message */}
//               <motion.div
//                 className="relative mt-6 h-24 flex justify-center items-center"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 1.2 }}
//               >
//                 <div className="absolute w-40 h-40 bg-gradient-to-br from-purple-400 via-pink-400 to-yellow-300 blur-2xl rounded-full opacity-30 animate-pulse"></div>
//                 <motion.div
//                   className="text-white text-lg font-semibold tracking-wide px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full shadow-lg ring-4 ring-purple-300/30"
//                   animate={{ scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }}
//                   transition={{
//                     repeat: Infinity,
//                     repeatType: "reverse",
//                     duration: 3,
//                     ease: "easeInOut",
//                   }}
//                 >
//                   🎶 Emotions shape music — let’s discover yours!
//                 </motion.div>
//               </motion.div>
//             </div>
//           </motion.div>
//         </AnimatePresence>
//       </div>
  
//       {/* Bottom Equalizer Animation */}
//       <div className="absolute bottom-0 left-0 w-full flex justify-center gap-1 pb-4 pointer-events-none z-0">
//         {Array.from({ length: 30 }).map((_, index) => (
//           <motion.div
//             key={index}
//             className="w-1 md:w-1.5 bg-gradient-to-t from-pink-400 via-purple-500 to-indigo-500 rounded-full"
//             initial={{ height: "0.5rem" }}
//             animate={{ height: ["0.5rem", "2rem", "0.8rem", "1.5rem", "1rem"] }}
//             transition={{
//               duration: 1.5,
//               repeat: Infinity,
//               repeatType: "mirror",
//               delay: index * 0.1,
//               ease: "easeInOut",
//             }}
//           />
//         ))}
//       </div>
//     </div>
//   );
  
// }

// import React, { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { ArrowLeft, Camera, Send } from "lucide-react";
// import Webcam from "react-webcam";
// import { useNavigate } from "react-router-dom";

// const questions = [
//   {
//     id: 1,
//     text: "What's your current mood like?",
//     placeholder: "Tell me about your mood...",
//   },
//   {
//     id: 2,
//     text: "How energized do you feel right now?",
//     placeholder: "Tell me how active you are...",
//   },
//   {
//     id: 3,
//     text: "What thoughts are most influencing your mind at the moment?",
//     placeholder: "Describe how you're feeling...",
//   },
//   {
//     id: 4,
//     text: "What is your preferred language for songs?",
//     placeholder: "Enter your preferred language...",
//   },
// ];

// export default function EmotionQuiz({ isDarkMode }) {
//   const navigate = useNavigate();
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [answers, setAnswers] = useState({});
//   const [currentInput, setCurrentInput] = useState("");
//   const [showCamera, setShowCamera] = useState(false);
//   const [cameraError, setCameraError] = useState("");
//   const [isCameraReady, setIsCameraReady] = useState(false);
//   const [capturedImage, setCapturedImage] = useState(null);
//   const [cameraStopped, setCameraStopped] = useState(false);
//   const [latestImage, setLatestImage] = useState(null);

//   const webcamRef = useRef(null);
//   const inputRef = useRef(null);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       inputRef.current?.focus();
//     }, 500);

//     return () => clearTimeout(timer);
//   }, [currentQuestion]);

//   const handleAnswer = async () => {
//     if (!currentInput.trim()) {
//       alert("Please enter a valid response.");
//       return;
//     }

//     const updatedAnswers = {
//       ...answers,
//       [questions[currentQuestion].text]: currentInput,
//     };
//     setAnswers(updatedAnswers);
//     setCurrentInput("");

//     if (currentQuestion < questions.length - 1) {
//       setTimeout(() => setCurrentQuestion((prev) => prev + 1), 500);
//     } else {
//       const confirmCapture = window.confirm(
//         "Your answers have been submitted successfully!\n\nNext, we will capture your image using your webcam"
//       );

//       if (confirmCapture) {
//         setTimeout(() => setShowCamera(true), 500);
//       }
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleAnswer();
//     }
//   };

//   const handleCameraReady = () => {
//     setIsCameraReady(true);
//   };

//   const handleCameraError = (error) => {
//     setCameraError(error.message);
//     alert(`Camera Error: ${error.message}. Please ensure your camera is connected and allowed, then try again.`);



//     setShowCamera(false);
//   };

//   const captureImageFunc = async () => {
//     const imageSrc = webcamRef.current?.getScreenshot();

//     if (!imageSrc) {
//       alert("Image not captured. Please ensure your webcam is active and try again.");
//       console.error("No image captured");
//       return;
//     }


//     setCapturedImage(imageSrc);
//     setCameraStopped(true);
//     setIsCameraReady(false);

//     // Stop the camera stream
//     const stream = webcamRef.current?.video?.srcObject;
//     if (stream) {
//       stream.getTracks().forEach((track) => track.stop());
//     }



//     if (!answers || typeof answers !== 'object' || Object.keys(answers).length === 0) {
//       alert("No answers provided. Please make sure all questions are answered.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("answers", JSON.stringify(answers));


//     //  Use a function to convert base64 to file
//     const base64toFile = (base64String, filename) => {
//         let arr = base64String.split(',');
//         const mime = arr[0].match(/:(.*?);/)[1];
//         const bstr = atob(arr[1]);
//         let n = bstr.length;
//         let u8arr = new Uint8Array(n);
//         while (n--) {
//           u8arr[n] = bstr.charCodeAt(n);
//         }
//         return new File([u8arr], filename, { type: mime });
//       };

//     const imageFile = base64toFile(imageSrc, "webcam_capture.jpg");
//     formData.append("image", imageFile);


//     try {
//       const response = await fetch("http://127.0.0.1:8000/api/submit", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await response.json();
//       console.log("Response from server:", data);
//       alert("Image and answers submitted successfully!");
//     } catch (error) {
//       console.error("Error:", error);
//       alert("Failed to send image and answers. Please try again.");
//     }
//   };

//   const handleNext = () => {
//     // Define what should happen when the "Next" button is clicked.
//     // For example, you might want to navigate to the next part of your application.
//     navigate('/emotion');
//   };

//   const progress = ((currentQuestion + 1) / questions.length) * 100;

//   const getClassName = (...classes) => {
//     return classes.filter(Boolean).join(' ');
//   };

//   if (showCamera) {
//     return (
//       <div
//         className={getClassName(
//           "min-h-screen transition-all duration-500",
//           isDarkMode ? "bg-gray-900" : "bg-gradient-to-br from-pink-100 to-purple-200"
//         )}
//       >
//         {/* Progress Bar */}
//         <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
//           <motion.div
//             className="h-full bg-purple-600"
//             initial={{ width: 0 }}
//             animate={{ width: `${progress}%` }}



//             transition={{ duration: 0.5 }}
//           />
//         </div>

//         <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 relative z-10">
//           {/* Back Button */}
//           <button
//             onClick={() => navigate("/")}
//             className="fixed bottom-4 left-4 px-6 py-3 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition-colors z-50"
//           >
//             <ArrowLeft className="mr-2 w-5 h-5 inline" />
//             Back to Homepage
//           </button>

//           {/* Camera Capture UI */}
//           <div className="space-y-4">
//             {/* <h2
//               className={getClassName(
//                 "text-2xl font-semibold text-center",
//                 isDarkMode ? "text-white" : "text-gray-900"
//               )}
//             >
//               Capture Your Image
//             </h2> */}
             
// //               <h2
//                 className={`text-2xl font-bold text-center ${
//                   isDarkMode ? "text-white" : "text-gray-800"
//                 }`}
//               >
//                 Facial Emotion Recognition
//               </h2>
//               <p
//                 className={`mt-2 text-center ${
//                   isDarkMode ? "text-gray-300" : "text-gray-600"
//                 }`}
//               >
//                 Let's capture your expression to better understand your mood
//               </p>
           
//             <div className="relative rounded-2xl overflow-hidden backdrop-blur-lg bg-white/10">
//               {cameraError ? (
//                 <div className="p-8 text-center text-red-500">{cameraError}</div>
//               ) : capturedImage ? (
//                 <img
//                   src={capturedImage}
//                   alt="Captured"
//                   className="w-full rounded-2xl"
//                 />
//               ) : (
//                 <Webcam
//                   ref={webcamRef}
//                   audio={false}
//                   screenshotFormat="image/jpeg"
//                   videoConstraints={{ facingMode: "user" }}
//                   onUserMedia={handleCameraReady}
//                   onUserMediaError={handleCameraError}
//                   className="w-full rounded-2xl"
//                 />
//               )}
//             </div>
//             <button
//               onClick={captureImageFunc}
//               disabled={!isCameraReady}
//               className={getClassName(
//                 "w-full",
//                 isDarkMode
//                   ? "bg-green-500 hover:bg-green-600 text-white"
//                   : "bg-green-600 hover:bg-green-700 text-white",
//                 !isCameraReady && "opacity-50 cursor-not-allowed"
//               )}
//             >
//               <Camera className="mr-2 w-5 h-5 inline" />
//               Capture Image
//             </button>
//             {capturedImage && cameraStopped && (
//               <button
//                 onClick={handleNext}
//                 className="mt-4 w-full px-6 py-3 bg-purple-600 text-white rounded-lg shadow-lg hover:bg-purple-700 transition z-50"
//               >
//                 Next
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Bottom Equalizer Animation */}
//         <div className="absolute bottom-0 left-0 w-full flex justify-center gap-1 pb-4 pointer-events-none z-0">
//           {Array.from({ length: 30 }).map((_, index) => (
//             <motion.div
//               key={index}
//               className="w-1 md:w-1.5 bg-gradient-to-t from-pink-400 via-purple-500 to-indigo-500 rounded-full"
//               initial={{ height: "0.5rem" }}
//               animate={{ height: ["0.5rem", "2rem", "0.8rem", "1.5rem", "1rem"] }}
//               transition={{
//                 duration: 1.5,
//                 repeat: Infinity,
//                 repeatType: "mirror",
//                 delay: index * 0.1,
//                 ease: "easeInOut",
//               }}
//             />
//           ))}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div
//       className={getClassName(
//         "min-h-screen transition-all duration-500",
//         isDarkMode
//           ? "bg-gray-900"
//           : "bg-gradient-to-br from-pink-100 to-purple-200"
//       )}
//     >
//       {/* Progress Bar */}
//       <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
//         <motion.div
//           className="h-full bg-purple-600"
//           initial={{ width: 0 }}
//           animate={{ width: `${progress}%` }}

//           transition={{ duration: 0.5 }}
//         />
//       </div>

//       <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 relative z-10">
//         {/* Back Button */}
//         <button
//           onClick={() => navigate("/")}
//           className="fixed bottom-4 left-4 px-6 py-3 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition-colors z-50"
//         >
//           <ArrowLeft className="mr-2 w-5 h-5 inline" />
//           Back to Homepage
//         </button>

//         {/* Question UI */}
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={questions[currentQuestion].id}
//             initial={{ opacity: 0, x: 50 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: -50 }}
//             transition={{ duration: 0.5 }}
//             className="mb-8"
//           >
//             {/* Question Bubble */}
//             <div className="flex mb-4">
//               <div className="max-w-[80%] bg-purple-600 text-white px-6 py-3 rounded-2xl rounded-tl-none">
//                 {questions[currentQuestion].text}
//               </div>
//             </div>

//             {/* Input Section */}
//             <div className="flex gap-2">
//               <input
//                 ref={inputRef}
//                 type="text"
//                 value={currentInput}
//                 onChange={(e) => setCurrentInput(e.target.value)}
//                 onKeyDown={handleKeyPress}
//                 placeholder={questions[currentQuestion].placeholder}
//                 className="flex-1 px-4 py-2 rounded-xl bg-white/10 text-black placeholder:text-gray-400"
//               />
//               <button
//                 onClick={handleAnswer}
//                 className="p-2 rounded-xl bg-purple-600 text-black"
//               >
//                 <Send className="w-5 h-5" />
//               </button>
//             </div>

//             {/* Encouragement Message */}
//             <div className="mt-6 text-sm text-gray-600 text-center">
//               <p>✨ Your thoughts matter — share freely and honestly!</p>

//               {/* Emojis Animation */}
//               <motion.div
//                 className="flex justify-center gap-6 mt-4"
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 1 }}
//               >
//                 <motion.div
//                   className="p-3 bg-purple-100 rounded-full shadow-lg"
//                   animate={{ scale: [1, 1.1, 1], y: [0, -3, 0] }}
//                   transition={{
//                     repeat: Infinity,
//                     duration: 2,
//                     ease: "easeInOut",
//                   }}
//                 >
//                   <span
//                     role="img"
//                     aria-label="lock"
//                     className="text-purple-600 text-2xl"
//                   >
//                     🔒
//                   </span>
//                 </motion.div>

//                 <motion.div
//                   className="p-3 bg-yellow-100 rounded-full shadow-lg"
//                   animate={{ scale: [1, 1.1, 1], y: [0, 3, 0] }}
//                   transition={{
//                     repeat: Infinity,
//                     duration: 2,
//                     ease: "easeInOut",
//                     delay: 1,
//                   }}
//                 >
//                   <span
//                     role="img"
//                     aria-label="sparkles"
//                     className="text-yellow-500 text-2xl"
//                   >
//                     ✨
//                   </span>
//                 </motion.div>
//               </motion.div>

//               {/* Subtext */}
//               <p className="mt-2 text-xs text-gray-500">
//                 Your honest answers will help us better understand your mood and personalize your experience.
//                 <br />
//                 Don’t worry — your data stays safe and private ✨
//               </p>

//               {/* Emotion Message */}
//               <motion.div
//                 className="relative mt-6 h-24 flex justify-center items-center"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 1.2 }}
//               >
//                 <div className="absolute w-40 h-40 bg-gradient-to-br from-purple-400 via-pink-400 to-yellow-300 blur-2xl rounded-full opacity-30 animate-pulse"></div>
//                 <motion.div
//                   className="text-white text-lg font-semibold tracking-wide px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full shadow-lg ring-4 ring-purple-300/30"
//                   animate={{ scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }}
//                   transition={{
//                     repeat: Infinity,
//                     repeatType: "reverse",
//                     duration: 3,
//                     ease: "easeInOut",
//                   }}
//                 >
//                   🎶 Emotions shape music — let’s discover yours!
//                 </motion.div>
//               </motion.div>
//             </div>
//           </motion.div>
//         </AnimatePresence>
//       </div>

//       {/* Bottom Equalizer Animation */}
//       <div className="absolute bottom-0 left-0 w-full flex justify-center gap-1 pb-4 pointer-events-none z-0">
//         {Array.from({ length: 30 }).map((_, index) => (
//           <motion.div
//             key={index}
//             className="w-1 md:w-1.5 bg-gradient-to-t from-pink-400 via-purple-500 to-indigo-500 rounded-full"
//             initial={{ height: "0.5rem" }}
//             animate={{ height: ["0.5rem", "2rem", "0.8rem", "1.5rem", "1rem"] }}
//             transition={{
//               duration: 1.5,
//               repeat: Infinity,
//               repeatType: "mirror",
//               delay: index * 0.1,
//               ease: "easeInOut",
//             }}
//           />
//         ))}
//       </div>
//     </div>
//   );

// }

// import React, { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { ArrowLeft, Send } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const questions = [
//   {
//     id: 1,
//     text: "What's your current mood like?",
//     placeholder: "Tell me about your mood...",
//   },
//   {
//     id: 2,
//     text: "How energized do you feel right now?",
//     placeholder: "Tell me how active you are...",
//   },
//   {
//     id: 3,
//     text: "What thoughts are most influencing your mind at the moment?",
//     placeholder: "Describe how you're feeling...",
//   },
//   {
//     id: 4,
//     text: "What is your preferred language for songs?",
//     placeholder: "Enter your preferred language...",
//   },
// ];

// export default function EmotionQuiz({ isDarkMode }) {
//   const navigate = useNavigate();
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [answers, setAnswers] = useState({});
//   const [currentInput, setCurrentInput] = useState("");
//   const inputRef = useRef(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       inputRef.current?.focus();
//     }, 500);
//     return () => clearTimeout(timer);
//   }, [currentQuestion]);

//   const handleAnswer = async () => {
//     if (!currentInput.trim()) {
//       alert("Please enter a valid response.");
//       return;
//     }

//     const updatedAnswers = {
//       ...answers,
//       [questions[currentQuestion].text]: currentInput,
//     };
//     setAnswers(updatedAnswers);
//     setCurrentInput("");

//     if (currentQuestion < questions.length - 1) {
//       setTimeout(() => setCurrentQuestion((prev) => prev + 1), 300);
//     } else {
//       await submitAnswers(updatedAnswers);
//     }
//   };

//   const submitAnswers = async (finalAnswers) => {
//     try {
//       setIsSubmitting(true);
//       const formData = new FormData();
//       formData.append("answers", JSON.stringify(finalAnswers));

//       const response = await fetch("http://localhost:8000/api/submit", {
//         method: "POST",
//         body: formData,
//       });

//       if (!response.ok) {
//         const error = await response.json();
//         alert("Submission failed: " + error?.error || "Unknown error");
//         return;
//       }

//       const result = await response.json();
//       console.log("✅ Submission result:", result);
//       navigate("/emotion");
//     } catch (error) {
//       console.error("❌ Submission error:", error);
//       alert("Failed to submit answers. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleAnswer();
//     }
//   };

//   const progress = ((currentQuestion + 1) / questions.length) * 100;

//   const getClassName = (...classes) => {
//     return classes.filter(Boolean).join(" ");
//   };

//   return (
//     <div
//       className={getClassName(
//         "min-h-screen transition-all duration-500",
//         isDarkMode
//           ? "bg-gray-900"
//           : "bg-gradient-to-br from-pink-100 to-purple-200"
//       )}
//     >
//       {/* Progress Bar */}
//       <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
//         <motion.div
//           className="h-full bg-purple-600"
//           initial={{ width: 0 }}
//           animate={{ width: `${progress}%` }}
//           transition={{ duration: 0.5 }}
//         />
//       </div>

//       <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 relative z-10">
//         {/* Back Button */}
//         <button
//           onClick={() => navigate("/")}
//           className="fixed bottom-4 left-4 px-6 py-3 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition-colors z-50"
//         >
//           <ArrowLeft className="mr-2 w-5 h-5 inline" />
//           Back to Homepage
//         </button>

//         {/* Question UI */}
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={questions[currentQuestion].id}
//             initial={{ opacity: 0, x: 50 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: -50 }}
//             transition={{ duration: 0.5 }}
//             className="mb-8"
//           >
//             <div className="flex mb-4">
//               <div className="max-w-[80%] bg-purple-600 text-white px-6 py-3 rounded-2xl rounded-tl-none">
//                 {questions[currentQuestion].text}
//               </div>
//             </div>

//             <div className="flex gap-2">
//               <input
//                 ref={inputRef}
//                 type="text"
//                 value={currentInput}
//                 onChange={(e) => setCurrentInput(e.target.value)}
//                 onKeyDown={handleKeyPress}
//                 placeholder={questions[currentQuestion].placeholder}
//                 className="flex-1 px-4 py-2 rounded-xl bg-white/10 text-black placeholder:text-gray-400"
//               />
//               <button
//                 onClick={handleAnswer}
//                 className="p-2 rounded-xl bg-purple-600 text-black"
//                 disabled={isSubmitting}
//               >
//                 <Send className="w-5 h-5" />
//               </button>
//             </div>

//             <div className="mt-6 text-sm text-gray-600 text-center">
//               <p>✨ Your thoughts matter — share freely and honestly!</p>

//               <motion.div
//                 className="flex justify-center gap-6 mt-4"
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 1 }}
//               >
//                 <motion.div
//                   className="p-3 bg-purple-100 rounded-full shadow-lg"
//                   animate={{ scale: [1, 1.1, 1], y: [0, -3, 0] }}
//                   transition={{
//                     repeat: Infinity,
//                     duration: 2,
//                     ease: "easeInOut",
//                   }}
//                 >
//                   <span role="img" aria-label="lock" className="text-purple-600 text-2xl">
//                     🔒
//                   </span>
//                 </motion.div>

//                 <motion.div
//                   className="p-3 bg-yellow-100 rounded-full shadow-lg"
//                   animate={{ scale: [1, 1.1, 1], y: [0, 3, 0] }}
//                   transition={{
//                     repeat: Infinity,
//                     duration: 2,
//                     ease: "easeInOut",
//                     delay: 1,
//                   }}
//                 >
//                   <span role="img" aria-label="sparkles" className="text-yellow-500 text-2xl">
//                     ✨
//                   </span>
//                 </motion.div>
//               </motion.div>

//               <p className="mt-2 text-xs text-gray-500">
//                 Your honest answers will help us better understand your mood and personalize your experience.
//                 <br />
//                 Don’t worry — your data stays safe and private ✨
//               </p>

//               <motion.div
//                 className="relative mt-6 h-24 flex justify-center items-center"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 1.2 }}
//               >
//                 <div className="absolute w-40 h-40 bg-gradient-to-br from-purple-400 via-pink-400 to-yellow-300 blur-2xl rounded-full opacity-30 animate-pulse"></div>
//                 <motion.div
//                   className="text-white text-lg font-semibold tracking-wide px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full shadow-lg ring-4 ring-purple-300/30"
//                   animate={{ scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }}
//                   transition={{
//                     repeat: Infinity,
//                     repeatType: "reverse",
//                     duration: 3,
//                     ease: "easeInOut",
//                   }}
//                 >
//                   🎶 Emotions shape music — let’s discover yours!
//                 </motion.div>
//               </motion.div>
//             </div>
//           </motion.div>
//         </AnimatePresence>
//       </div>

//       {/* Bottom Equalizer Animation */}
//       <div className="absolute bottom-0 left-0 w-full flex justify-center gap-1 pb-4 pointer-events-none z-0">
//         {Array.from({ length: 30 }).map((_, index) => (
//           <motion.div
//             key={index}
//             className="w-1 md:w-1.5 bg-gradient-to-t from-pink-400 via-purple-500 to-indigo-500 rounded-full"
//             initial={{ height: "0.5rem" }}
//             animate={{ height: ["0.5rem", "2rem", "0.8rem", "1.5rem", "1rem"] }}
//             transition={{
//               duration: 1.5,
//               repeat: Infinity,
//               repeatType: "mirror",
//               delay: index * 0.1,
//               ease: "easeInOut",
//             }}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }




// import React, { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { ArrowLeft, Send } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const questions = [
//   {
//     id: 1,
//     text: "What's your current mood like?",
//     placeholder: "Tell me about your mood...",
//   },
//   {
//     id: 2,
//     text: "How energized do you feel right now?",
//     placeholder: "Tell me how active you are...",
//   },
//   {
//     id: 3,
//     text: "What thoughts are most influencing your mind at the moment?",
//     placeholder: "Describe how you're feeling...",
//   },
//   {
//     id: 4,
//     text: "What is your preferred language for songs?",
//     placeholder: "Enter your preferred language...",
//   },
// ];

// export default function EmotionQuiz({ isDarkMode }) {
//   const navigate = useNavigate();
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [answers, setAnswers] = useState({});
//   const [currentInput, setCurrentInput] = useState("");
//   const inputRef = useRef(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isCompleted, setIsCompleted] = useState(false); // ✅ New state to track completion

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       inputRef.current?.focus();
//     }, 500);
//     return () => clearTimeout(timer);
//   }, [currentQuestion]);

//   const handleAnswer = async () => {
//     if (!currentInput.trim()) {
//       alert("Please enter a valid response.");
//       return;
//     }

//     const updatedAnswers = {
//       ...answers,
//       [questions[currentQuestion].text]: currentInput,
//     };
//     setAnswers(updatedAnswers);
//     setCurrentInput("");

//     if (currentQuestion < questions.length - 1) {
//       setTimeout(() => setCurrentQuestion((prev) => prev + 1), 300);
//     } else {
//       await submitAnswers(updatedAnswers);
//     }
//   };

//   const submitAnswers = async (finalAnswers) => {
//     try {
//       setIsSubmitting(true);
//       const formData = new FormData();
//       formData.append("answers", JSON.stringify(finalAnswers));

//       const response = await fetch("http://localhost:8000/api/submit", {
//         method: "POST",
//         body: formData,
//       });

//       if (!response.ok) {
//         const error = await response.json();
//         alert("Submission failed: " + error?.error || "Unknown error");
//         return;
//       }

//       const result = await response.json();
//       console.log("✅ Submission result:", result);
//       setIsCompleted(true); // ✅ Mark as completed
//     } catch (error) {
//       console.error("❌ Submission error:", error);
//       alert("Failed to submit answers. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleAnswer();
//     }
//   };

//   const progress = ((currentQuestion + 1) / questions.length) * 100;

//   const getClassName = (...classes) => {
//     return classes.filter(Boolean).join(" ");
//   };

//   return (
//     <div
//       className={getClassName(
//         "min-h-screen transition-all duration-500",
//         isDarkMode
//           ? "bg-gray-900"
//           : "bg-gradient-to-br from-pink-100 to-purple-200"
//       )}
//     >
//       {/* Progress Bar */}
//       <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
//         <motion.div
//           className="h-full bg-purple-600"
//           initial={{ width: 0 }}
//           animate={{ width: `${progress}%` }}
//           transition={{ duration: 0.5 }}
//         />
//       </div>

//       <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 relative z-10">
//         {/* Back Button */}
//         <button
//           onClick={() => navigate("/")}
//           className="fixed bottom-4 left-4 px-6 py-3 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition-colors z-50"
//         >
//           <ArrowLeft className="mr-2 w-5 h-5 inline" />
//           Back to Homepage
//         </button>

//         {/* Question UI */}
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={questions[currentQuestion].id}
//             initial={{ opacity: 0, x: 50 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: -50 }}
//             transition={{ duration: 0.5 }}
//             className="mb-8"
//           >
//             <div className="flex mb-4">
//               <div className="max-w-[80%] bg-purple-600 text-white px-6 py-3 rounded-2xl rounded-tl-none">
//                 {questions[currentQuestion].text}
//               </div>
//             </div>

//             <div className="flex gap-2">
//               <input
//                 ref={inputRef}
//                 type="text"
//                 value={currentInput}
//                 onChange={(e) => setCurrentInput(e.target.value)}
//                 onKeyDown={handleKeyPress}
//                 placeholder={questions[currentQuestion].placeholder}
//                 className="flex-1 px-4 py-2 rounded-xl bg-white/10 text-black placeholder:text-gray-400"
//               />
//               <button
//                 onClick={handleAnswer}
//                 className="p-2 rounded-xl bg-purple-600 text-black"
//                 disabled={isSubmitting}
//               >
//                 <Send className="w-5 h-5" />
//               </button>
//             </div>

//             <div className="mt-6 text-sm text-gray-600 text-center">
//               <p>✨ Your thoughts matter — share freely and honestly!</p>

//               <motion.div
//                 className="flex justify-center gap-6 mt-4"
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 1 }}
//               >
//                 <motion.div
//                   className="p-3 bg-purple-100 rounded-full shadow-lg"
//                   animate={{ scale: [1, 1.1, 1], y: [0, -3, 0] }}
//                   transition={{
//                     repeat: Infinity,
//                     duration: 2,
//                     ease: "easeInOut",
//                   }}
//                 >
//                   <span role="img" aria-label="lock" className="text-purple-600 text-2xl">
//                     🔒
//                   </span>
//                 </motion.div>

//                 <motion.div
//                   className="p-3 bg-yellow-100 rounded-full shadow-lg"
//                   animate={{ scale: [1, 1.1, 1], y: [0, 3, 0] }}
//                   transition={{
//                     repeat: Infinity,
//                     duration: 2,
//                     ease: "easeInOut",
//                     delay: 1,
//                   }}
//                 >
//                   <span role="img" aria-label="sparkles" className="text-yellow-500 text-2xl">
//                     ✨
//                   </span>
//                 </motion.div>
//               </motion.div>

//               <p className="mt-2 text-xs text-gray-500">
//                 Your honest answers will help us better understand your mood and personalize your experience.
//                 <br />
//                 Don’t worry — your data stays safe and private ✨
//               </p>
//             </div>
//           </motion.div>
//         </AnimatePresence>

//         {/* ✅ Explore Songs Button after submission */}
//         {isCompleted && (
//           <div className="mt-10 flex justify-center">
//             <button
//               onClick={() => navigate("/emotion")}
//               className="px-6 py-3 rounded-full bg-pink-500 text-white font-semibold hover:bg-pink-600 transition-colors shadow-lg"
//             >
//               🎵 Explore Songs
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Bottom Equalizer Animation */}
//       <div className="absolute bottom-0 left-0 w-full flex justify-center gap-1 pb-4 pointer-events-none z-0">
//         {Array.from({ length: 30 }).map((_, index) => (
//           <motion.div
//             key={index}
//             className="w-1 md:w-1.5 bg-gradient-to-t from-pink-400 via-purple-500 to-indigo-500 rounded-full"
//             initial={{ height: "0.5rem" }}
//             animate={{ height: ["0.5rem", "2rem", "0.8rem", "1.5rem", "1rem"] }}
//             transition={{
//               duration: 1.5,
//               repeat: Infinity,
//               repeatType: "mirror",
//               delay: index * 0.1,
//               ease: "easeInOut",
//             }}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }



import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";

const questions = [
  {
    id: 1,
    text: "What's your current mood like?",
    placeholder: "Tell me about your mood...",
  },
  {
    id: 2,
    text: "How energized do you feel right now?",
    placeholder: "Tell me how active you are...",
  },
  {
    id: 3,
    text: "What thoughts are most influencing your mind at the moment?",
    placeholder: "Describe how you're feeling...",
  },
  {
    id: 4,
    text: "What is your preferred language for songs?",
    placeholder: "Enter your preferred language...",
  },
];

export default function EmotionQuiz({ isDarkMode }) {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [currentInput, setCurrentInput] = useState("");
  const inputRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 500);
    return () => clearTimeout(timer);
  }, [currentQuestion]);

  const handleAnswer = async () => {
    if (!currentInput.trim()) {
      alert("Please enter a valid response.");
      return;
    }

    const updatedAnswers = {
      ...answers,
      [questions[currentQuestion].text]: currentInput,
    };
    setAnswers(updatedAnswers);
    setCurrentInput("");

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion((prev) => prev + 1), 300);
    } else {
      await submitAnswers(updatedAnswers);
    }
  };

  const submitAnswers = async (finalAnswers) => {
    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("answers", JSON.stringify(finalAnswers));

      const response = await fetch("http://localhost:8000/api/submit", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        alert("Submission failed: " + (error?.error || "Unknown error"));
        return;
      }

      const result = await response.json();
      console.log("✅ Submission result:", result);
      setIsCompleted(true);
    } catch (error) {
      console.error("❌ Submission error:", error);
      alert("Failed to submit answers. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAnswer();
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const getClassName = (...classes) => {
    return classes.filter(Boolean).join(" ");
  };

  return (
    <div
      className={getClassName(
        "min-h-screen transition-all duration-500",
        isDarkMode
          ? "bg-gray-900"
          : "bg-gradient-to-br from-pink-100 to-purple-200"
      )}
    >
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <motion.div
          className="h-full bg-purple-600"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 relative z-10">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="fixed bottom-4 left-4 px-6 py-3 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition-colors z-50"
        >
          <ArrowLeft className="mr-2 w-5 h-5 inline" />
          Back to Homepage
        </button>

        {/* Question UI */}
        <AnimatePresence mode="wait">
          <motion.div
            key={questions[currentQuestion].id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex mb-4">
              <div className="max-w-[80%] bg-purple-600 text-white px-6 py-3 rounded-2xl rounded-tl-none">
                {questions[currentQuestion].text}
              </div>
            </div>

            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={questions[currentQuestion].placeholder}
                className="flex-1 px-4 py-2 rounded-xl bg-white/10 text-black placeholder:text-gray-400"
              />
              <button
                onClick={handleAnswer}
                className="p-2 rounded-xl bg-purple-600 text-black"
                disabled={isSubmitting}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-6 text-sm text-gray-600 text-center">
              <p>✨ Your thoughts matter — share freely and honestly!</p>

              <motion.div
                className="flex justify-center gap-6 mt-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                <motion.div
                  className="p-3 bg-purple-100 rounded-full shadow-lg"
                  animate={{ scale: [1, 1.1, 1], y: [0, -3, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut",
                  }}
                >
                  <span role="img" aria-label="lock" className="text-purple-600 text-2xl">
                    🔒
                  </span>
                </motion.div>

                <motion.div
                  className="p-3 bg-yellow-100 rounded-full shadow-lg"
                  animate={{ scale: [1, 1.1, 1], y: [0, 3, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                >
                  <span role="img" aria-label="sparkles" className="text-yellow-500 text-2xl">
                    ✨
                  </span>
                </motion.div>
              </motion.div>

              <p className="mt-2 text-xs text-gray-500">
                Your honest answers will help us better understand your mood and personalize your experience.
                <br />
                Don’t worry — your data stays safe and private ✨
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Loader shown after last question is answered */}
        {isSubmitting && (
          <div className="flex flex-col items-center mt-12">
            <div className="loader mb-4 animate-spin rounded-full h-10 w-10 border-t-4 border-purple-500 border-opacity-75"></div>
            <p className="text-purple-700 text-lg font-medium">
              Finding best playlist for your mood...
            </p>
          </div>
        )}

        {/* Explore Songs Button after submission */}
        {isCompleted && !isSubmitting && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => navigate("/emotion")}
              className="px-6 py-3 rounded-full bg-pink-500 text-white font-semibold hover:bg-pink-600 transition-colors shadow-lg"
            >
              🎵 Explore Songs
            </button>
          </div>
        )}
      </div>

      {/* Bottom Equalizer Animation */}
      <div className="absolute bottom-0 left-0 w-full flex justify-center gap-1 pb-4 pointer-events-none z-0">
        {Array.from({ length: 30 }).map((_, index) => (
          <motion.div
            key={index}
            className="w-1 md:w-1.5 bg-gradient-to-t from-pink-400 via-purple-500 to-indigo-500 rounded-full"
            initial={{ height: "0.5rem" }}
            animate={{ height: ["0.5rem", "2rem", "0.8rem", "1.5rem", "1rem"] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "mirror",
              delay: index * 0.1,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}








