import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";


export default function PagNavigation(){
    return (
        <ul className="flex gap-1 items-center text-xl">
            <li>
                <button className="p-1 rounded-full border w-9 h-9 flex items-center justify-center">
                    <ArrowLeft/>
                </button>
            </li>
            <li>
                <button className="p-1 rounded-full border w-9 h-9 flex items-center justify-center bg-blue text-white">
                    1
                </button>
            </li>
            <li>
                <button className="p-1 rounded-full border w-9 h-9 flex items-center justify-center">
                    2
                </button>
            </li>
            <li>
                <button className="p-1 rounded-full border w-9 h-9 flex items-center justify-center">
                    3
                </button>
            </li>
            <li>
                <button className="p-1 rounded-full border w-9 h-9 flex items-center justify-center">
                    4
                </button>
            </li>
            <li>
                <button className="p-1 rounded-full border w-9 h-9 flex items-center justify-center">
                    <ArrowRight/>
                </button>
            </li>
        </ul>
    )
}