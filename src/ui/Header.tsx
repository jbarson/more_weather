import Searchbar from "@/ui/Searchbar";
import SunriseIcon from "@/ui/icons/Sunrise";

export default async function Header() {
 return (
  <header className="flex items-center py-4">
        <div className="flex items-center gap-4">
          <SunriseIcon className="w-8 h-8 text-cyan-600" />
          <div className="hidden md:flex flex-col">
            <p className="text-lg font-semibold">Yet Another Weather Widget</p>
            <p className="text-sm text-gray-500 ">Local weather conditions</p>
          </div>
        </div>
        <Searchbar />
      </header>
 )
}
