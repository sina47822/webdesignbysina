import { LoaderPinwheel } from "lucide-react"

export default function Loading() {
  // Or a custom loading skeleton component
  return ( 
    <div className="flex items-center justify-center h-screen">
      <p className="animate-pulse text-lg">
        <LoaderPinwheel />  
      </p>
    </div>
  );
}