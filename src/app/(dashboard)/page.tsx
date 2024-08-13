import ChatWrapper from "@/components/chat-wrapper";
import Navbar from "@/components/navbar";
import SideBar from "@/components/sidebar";
export default async function Home() {
  return (
    <div className="flex h-full w-full flex-col lg:flex-row">
      <Navbar />

      <SideBar className="hidden w-full max-w-[240px] border-r border-neutral-200 lg:flex" />

      <ChatWrapper />
    </div>
  );
}
