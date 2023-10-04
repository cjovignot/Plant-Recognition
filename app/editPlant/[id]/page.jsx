"use client"
import EditPlantForm from "@/components/EditPlantForm";

const getPlantById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/plants/${id}`, {
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

export default async function EditPlant({ params }) {
  const { id } = params;
  const { plant } = await getPlantById(id);
  const { title, description, family } = plant;

  return (
    <div className="flex justify-center">
      <EditPlantForm id={id} title={title} description={description} family={family} />
    </div>
  );
}
