"use client"
import { useEffect, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './swiper.css';

// import required modules
import { Pagination } from 'swiper/modules';
import Scores from '@/components/Scores';

export default function Level1({params}) {
  const {groups} = params.groups
  const {level} = params.level

  const [plants, setPlants] = useState([]);
  const [plantsCopy, setPlantsCopy] = useState([])
  const [questions, setQuestions] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const INITIAL_ANSWERS_STATE = {
    name: [""],
    family: "",
    genre: "",
    species: "",
    cultivar: ""
  };
  const [answers, setAnswers] = useState({
    name: [""],
    family: "",
    genre: "",
    species: "",
    cultivar: ""
  });

  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const [trueArray, setTrueArray] = useState([]);
  const [falseArray, setFalseArray] = useState([]);

  const [finish, setFinish] = useState(false);

  const getPlants = async () => {
    try {
      const url = `/api/${groups}`;
  
      const res = await fetch(url, {
        cache: "no-store",
      });
  
      if (!res.ok) {
        throw new Error("Failed to fetch plants");
      }
  
      return res.json();
    } catch (error) {
      console.log("Error loading plants: ", error);
    }
  };

  useEffect(() => {
    if (!finish === true) {
      generateQuestion();
    }
  }, [plants, finish])

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getPlants(groups);
        const shuffledPlants = shuffle(result?.plants || []); // Shuffle the plants here
        setPlants(shuffledPlants);
        setPlantsCopy(shuffledPlants);
        setQuestions(shuffledPlants.length);
      } catch (error) {
        console.error("Error fetching plants:", error);
      }
    }
    fetchData()
  }, [groups]);

  const usedAnswers = new Set();

  function getRandomAnswers(field) {
    let randomOptions = [];
    while (randomOptions.length < 3) {
        const rndIndex = Math.floor(Math.random() * plantsCopy.length);
        
        // Check if the field is "name" and its value is an array
        let potentialAnswer;
        if (field === "name" && Array.isArray(plantsCopy[rndIndex][field])) {
            potentialAnswer = plantsCopy[rndIndex][field][0];
        } else {
            potentialAnswer = plantsCopy[rndIndex][field];
        }
  
        if (!usedAnswers.has(potentialAnswer) && potentialAnswer !== (Array.isArray(plants[0][field]) ? plants[0][field][0] : plants[0][field])) {
            randomOptions.push(potentialAnswer);
            usedAnswers.add(potentialAnswer);
        }
    }
    return randomOptions;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const fieldNames = {
      name: "Nom commun",
      family: "Famille",
      genre: "Genre",
      species: "Espèce",
      cultivar: "Cultivar"
    };
  
    const emptyFields = Object.keys(answers).filter(key => !answers[key]);
  
    if (emptyFields.length) {
      const fieldsToFill = emptyFields.map(key => fieldNames[key]).join(', ');
      setErrorMessage(`${fieldsToFill}`);
      return; // exit function early
    }
  
    setErrorMessage(""); // Clear the error message if all fields are filled
  
    if (plants.length > 0) {
      const plant = plants[0];
  
      const allAnswersCorrect = Object.keys(fieldNames).every(key => {
        if (key === 'name' && Array.isArray(plant[key])) {
          return plant[key][0].includes(answers[key]);
        } else {
          return answers[key] === plant[key];
        }
      });
  
      if (allAnswersCorrect) {
        setTrueArray(prevArray => [...prevArray, plant]);
      } else {
    
        // Gather all answers for the plant
        const allAnswersForPlant = Object.keys(fieldNames).map(key => ({ [key]: answers[key] }));
        
        const plantWithAnswers = {
            ...plant,
            answer: Object.assign({}, ...allAnswersForPlant)
        };
        
        setFalseArray(prevArray => [...prevArray, plantWithAnswers]);
      }
      setPlants(prevPlants => prevPlants.slice(1));
    }
  
    resetForm();
    if (!finish === true) {
      generateQuestion();
    }
  };

  const resetForm = () => {
    setSelectedAnswers([]);
    setAnswers(INITIAL_ANSWERS_STATE)
    setErrorMessage("");
  };

  function getRandomIndices(length, excludeIndex, count = 3) {
    let randomIndices = [];
    while (randomIndices.length < count) {
      let rnd = Math.floor(Math.random() * length);
      if (rnd !== excludeIndex && !randomIndices.includes(rnd)) {
        randomIndices.push(rnd);
      }
    }
    return randomIndices;
  }

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function generateQuestion() {
    if (plantsCopy.length === 0) return;

    // Reset usedAnswers for each question generation
    usedAnswers.clear();

    const question = {
      name: shuffle([...getRandomAnswers('name'), plants[0].name[0]]),
      family: shuffle([...getRandomAnswers('family'), plants[0].family]),
      genre: shuffle([...getRandomAnswers('genre'), plants[0].genre]),
      species: shuffle([...getRandomAnswers('species'), plants[0].species]),
      cultivar: shuffle([...getRandomAnswers('cultivar'), plants[0].cultivar])
    };

    setCurrentQuestion(question);
  }

  
  const handleButtonClick = () => {
    setFinish(true);
  };

  return (
    <>
      {questions === 0 && finish === false &&
        <div className="flex w-full h-[80vh] justify-center items-center">
          <span className="loading loading-spinner text-success w-16 h-16"></span>
        </div>
      }
        
      {plants.length > 0 &&
        <div className="h-screen flex justify-center items-center m-auto lg:pt-[5rem]">
          <div className="bg-base-100 shadow-xl lg:rounded-lg">
            <div className="flex flex-col h-screen lg:h-[35rem] w-screen lg:max-w-[700px] justify-start">
              <Swiper
                style={{
                  "--swiper-pagination-color": "#ffffff",
                  "--swiper-pagination-bullet-inactive-color": "#000000",
                  "--swiper-pagination-bullet-inactive-opacity": "1",
                  "--swiper-pagination-bullet-size": "10px",
                  "--swiper-pagination-bullet-horizontal-gap": "3px"
                }}
                pagination={{
                  dynamicBullets: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
              >
                {plants[0].imageUrl.map((image, index) => (
                  <SwiperSlide key={index} style={{
                    backgroundImage: `url(${image})`,
                    backgroundPosition: "top",
                    backgroundSize: "contain",
                    backgroundRepeat: 'no-repeat',
                    height: '30rem'
                  }}></SwiperSlide>
                ))}
              </Swiper>
              
              {errorMessage &&
                <>
                  <div className="flex justify-center text-red-600 text-center text-sm mt-3">
                    <div className='flex flex-col'>
                      <div>Merci de remplir les champs suivants :</div>
                      <div>{errorMessage}</div>
                    </div>
                  </div>
                </>
              }

              <form onSubmit={handleSubmit} className="flex flex-col justify-center gap-3">
                <div className='flex flex-col items-center'>
                  <div className='flex mt-4 w-80 lg:w-96'>
                    <select className="select select-sm select-success w-[100%] mb-2"
                      value={answers.name}
                      onChange={(e) => setAnswers(prev => ({ ...prev, name: e.target.value }))}
                    >
                      <option className='text-neutral-500'>- Nom commun -</option>
                      {currentQuestion.name && currentQuestion.name.map((name, index) => (
                        <option key={index}>{[name]}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex w-80 lg:w-96">
                    <select className="select select-sm select-success w-[100%] mr-1"
                      value={answers.family}
                      onChange={(e) => setAnswers(prev => ({ ...prev, family: e.target.value }))}
                    >
                      <option className='text-neutral-500'>- Famille -</option>
                      {currentQuestion.family && currentQuestion.family.map((family, index) => (
                        <option key={index}>{family}</option>
                      ))}
                    </select>
                    <select className="select select-sm select-success w-[100%] ml-1"
                      value={answers.genre}
                      onChange={(e) => setAnswers(prev => ({ ...prev, genre: e.target.value }))}
                    >
                      <option className='text-neutral-500'>- Genre -</option>
                      {currentQuestion.genre && currentQuestion.genre.map((genre, index) => (
                        <option key={index}>{genre}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex mt-2 w-80 lg:w-96">
                    <select className="select select-sm select-success w-[100%] mr-1"
                      value={answers.species}
                      required
                      onChange={(e) => setAnswers(prev => ({ ...prev, species: e.target.value }))}
                    >
                      <option className='text-neutral-500'>- Espèce -</option>
                      {currentQuestion.species && currentQuestion.species.map((species, index) => (
                        <option key={index}>{species}</option>
                      ))}
                    </select>
                    <select className="select select-sm select-success w-[100%] ml-1 mb-2"
                      value={answers.cultivar}
                      onChange={(e) => setAnswers(prev => ({ ...prev, cultivar: e.target.value }))}
                    >
                      <option className='text-neutral-500'>- Cultivar -</option>
                      {currentQuestion.cultivar && currentQuestion.cultivar.map((cultivar, index) => (
                        <option key={index}>{cultivar}</option>
                      ))}
                    </select>
                  </div>

                  {plants.length === 1 ? (
                    <button
                        type="submit"
                        className="btn btn-outlined bg-green-600 w-80 lg:w-96 mb-2"
                        onClick={handleButtonClick}
                    >
                        Valider
                    </button>
                  ) : (
                    <button
                        type="submit"
                        className="btn btn-outlined bg-green-600 w-80 lg:w-96 mb-2"
                    >
                        Valider
                    </button>
                  )}
                </div>
              </form>

            </div>
          </div>
        </div>
      }

      
      {plants.length === 0 && finish === true &&
        <Scores trueArray={trueArray} falseArray={falseArray} level={level}/>
      }
    </>
  );
}
