"use client"
import EditPlantForm from "@/components/EditPlantForm";

const getPlantById = async (id) => {
  try {
    const res = await fetch(`/api/plants/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topic");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export default async function EditPlant({params}) {
  const { id } = params;
  const { plant } = await getPlantById(id);
  const { name, family, genre, species, cultivar, group, ph, exposition, humidite, category, imageUrl } = plant;

  return (
    <div className="flex justify-center">
      <EditPlantForm
        id={id}
        name={name}
        family={family}
        genre={genre}
        species={species}
        cultivar={cultivar}
        group={group}
        ph={ph}
        exposition={exposition}
        humidite={humidite}
        category={category}
        imageUrl={imageUrl} />
    </div>
  );
}
