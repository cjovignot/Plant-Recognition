import TopicsList from "@/components/TopicsList";
import PlantList from "@/components/PlantList";

export default function Home() {
  
  return (
    <div className="hero min-h-screen" style={{backgroundImage: 'url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)'}}>
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="">
          <h1 className="mb-5 text-9xl text-white font-bold">Vegetal Reco&apos;</h1>
          <button className="btn btn-primary">Commencer</button>
        </div>
      </div>
    </div>
  );
}
