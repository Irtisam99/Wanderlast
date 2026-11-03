import AddDestinationForm from "@/components/forms/add-destination-form";

export default function AddDestinationPage() {
  return (
    <div className="font-display mx-auto w-[90%] max-w-[1440px] pb-24">
      <h1 className="text-4xl font-normal text-[#16191a] md:text-[40px] md:leading-[1.2] flex justify-center">
        Add New Travel Package
      </h1>
      <AddDestinationForm />
    </div>
  );
}
