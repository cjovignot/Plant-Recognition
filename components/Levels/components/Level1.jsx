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

  const [plants, setPlants] = useState([]);
  const [questions, setQuestions] = useState(0)

  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const [trueArray, setTrueArray] = useState([]);
  const [falseArray, setFalseArray] = useState([]);

  const [finish, setFinish] = useState(false);

  const possibleAnswers = ["Nom commun", "Famille", "Genre", "Espèce", "Cultivar"];

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
    async function fetchData() {
      try {
        const result = await getPlants(groups);
        setPlants(result?.plants || []);
        setQuestions(result?.plants.length);
      } catch (error) {
        console.error("Error fetching plants:", error);
      }
    }
    fetchData()
  }, [groups]);


  const resetForm = () => {
    setSelectedAnswers([]);
    setErrorMessage("");
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
          </div>
        </div>
        </div>
      }

      
      {plants.length === 0 && finish === true &&
        <Scores trueArray={trueArray} falseArray={falseArray} />
      }
    </>
  );
}
