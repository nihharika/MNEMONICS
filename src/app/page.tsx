import { Bug, CalendarCheck, HeartHandshake, Map, Siren } from "lucide-react";
import Link from "next/link";

import MapComponent from "@/components/client/GoogleMaps";

export default function Home() {
    const homeItems = [
        {
            name: "Help",
            link: "/help",
            icon: HeartHandshake,
        },
        {
            name: "Map",
            link: "/emergency-call",
            icon: Map,
        },
        {
            name: "Report",
            link: "/report",
            icon: Bug,
        },
        {
            name: "Events",
            link: "/event",
            icon: CalendarCheck,
        },
    ];
    return (
        <main className=" mt-7  min-h-screen mb-40">
            {/* <div className="bg-green-500 p-4 rounded-lg h-56 w-full"></div> */}
            <MapComponent />
            <div className="flex gap-8 justify-between items-center mt-7 border-b-2 border-black/ mb-2">
                {homeItems.map((item, index) => (
                    <Link href={item.link} key={index} className="flex-col justify-center items-center flex gap-3">
                        <item.icon />
                        <span className="text-md tracking-wide border-b-2 border-black/20">{item.name}</span>
                    </Link>
                ))}
            </div>
            <div className="grid mt-7 gap-4 grid-cols-2">
                <div className="border-2 rounded-lg flex flex-col gap-1 p-3 border-yellow-300">
                    <img src="https://s3-alpha-sig.figma.com/img/5e67/93ff/8bab5d20a9cc76e7fdd74584d5ab7ed7?Expires=1709510400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=G80FHmGR171~UnS-sJismW2lQA89HS7tIWW24~KDj6qNYQWjqKzjx6tLT6pLJ3SwKUwjcEaWds3kG4FNzEOXmSx5NmqxNLFZixhwVyG0k6vwXibREqE2sQT3Em0yBqKpF1iZrX6zXKFNEAWA4A1Vx2CMbd4LHgj6kJkaxRyFd~WsmIJzBQ6sxIZEe0c8Ll4ra47jQI18JJDe4QRn5zY0S8BsTtLf5sA7rm~mSn~qorrDxWjpn2Xpq7Qx2wZgzspOBuZqJEYQcDzXh~n54PsOauO3bY0hnYEW7GQsfK0KaoVuvMZNORWVIunEuO18PRv1gmXx~83DTQCcOBx3-3tO0A__" className=" rounded-lg" alt="" />
                    <h1>Theaft Items</h1>
                    <span>Shared By Students</span>
                </div>
                <div className="border-2 rounded-lg flex flex-col gap-3 justify-center p-3 items-center border-yellow-300">
                    <img src="https://s3-alpha-sig.figma.com/img/fd24/5958/11d404a3ef203d3bb35485c36f7ebd05?Expires=1709510400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=A7r9Iyf8TSwmbN-N4q4iqWGs0OPSkGUPdr~~hIg2t3YtXVEG9Rzo0UlfYMZBMxyTaFE5enGXJskD3f4F7nuGvAC2ZtFs5-EKt77uk9czASHbUfn20iv3Vz8aycTAWESddvucRKUT0fRCwB-tgSoQB4GHNU2ji6VmoCV9LMf2AlxlDWG3SIqyfdkN~EhBZ8PL1c8eN2m0-DywBELOkA7-cKb1T-THTQ8BMIsznBSe53ZmGhoug2bidiL-K7blRRKfkJWig4TnYaxiLMSo2aneGPKXrOH7KBiOTPEWXSm1k~LjmUcLzOKHtyoROHSp38AIqQKgSvkCZsnJ32-aFoZtOA__" className=" rounded-lg" alt="" />
                    <h1>Emergency Exits</h1>
                </div>
                <div className="border-2 rounded-lg flex flex-col gap-3 justify-center p-3 items-center border-yellow-300">
                    <img src="https://s3-alpha-sig.figma.com/img/8329/8333/b3dfbb6d8fd8252899b76858376ea7a1?Expires=1709510400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=pbdGEs0rig69wSD0at9UdrGG0tdxAdxeEAv1l9MgbcYhNQ-rbqN2ThJe-Vc8IebnzNRdyrjl41YbeucKaCVIfVx5WWRROflNadE239RdYvKTG7MFrod2wZZAiH-GHzxVEsXOvPIROnN4ztHu0QUL5itavgxSMe-l3ahf-hu8Vq3qMsoU14TA5gx51uFOr0NmUr~wHsjqQ7~HhiBbm57JFvpf6ll68H6FdMX94ZxSz3Y6EaSwep4DG1NmC4u7NeZWlC8OZLqSmCvAQ6q1TikWA-N8Uvl59V4V-vq69WLsQ73upGXwZeB42Ad~r7br0uVMg9HoJcyrEPJb6f2Zl~nMRg__" className=" rounded-lg" alt="" />
                    <h1>Harrasments</h1>
                </div>
                <div className="border-2 rounded-lg flex flex-col gap-3 justify-center p-3 items-center border-yellow-300">
                    <img src="https://s3-alpha-sig.figma.com/img/3c7b/607e/e30e566e83f97e347e271565a4f07d67?Expires=1709510400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=gb1uV4icWdeTRreY9QQP89uZEGEo1O~afQaBy1odAx4SJI50v-kCRFjXM6nGOyIHC-4kRrFvc9U6e7h-lQaEg87m5SWTOrVVYrCARnpVWT6YC9YqgOsjzTeNQUD7NBphvx6Gwhoxb7ImaIg4oVT3lzHLBknS~4uq9Njbk6Sm-e9Rj4DfUQFmiFYvUSVlPtwKqit50SkXLDCJmI0aiUNyzeyt9Y~O8-p35Vxv~-SN2Cj6pzI7DB-~fQn4pnS7oaX-A1ou57JoNvz7y0kEC5-0g8i2p~plZz~50ByYu5cdfHPELQg5cUZ9hdWSslqiqSxpBeNuGr1lJhpQ5ZY7G7jjmg__" className=" rounded-lg" alt="" />
                    <h1>Harrasments</h1>
                </div>
            </div>
            <div>
                <Link
                    href={"/emergency-call"}
                    className=" bg-red-600 fixed right-3 bottom-28 text-lg 
             p-3 tracking-wide flex items-center gap-2 text-center  rounded-full text-white font-bold"
                >
                    <Siren />
                    <span>Emergency</span>
                </Link>
            </div>
        </main>
    );
}
