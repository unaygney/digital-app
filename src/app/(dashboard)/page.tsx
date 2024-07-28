import ImageUploader from "@/components/image-uploader";
import { Progress } from "@/components/ui/progress";

export default function Home() {
  return (
    <div className="py-20">
      <ImageUploader />
      <Progress value={50} className="h-[6px] text-indigo-700" />
    </div>
  );
}
