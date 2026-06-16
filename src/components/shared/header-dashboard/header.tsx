import Profile from "./profile";

export default function HeaderDashboard() {
    return (
        <header className="w-full h-15 border-b-2 border-muted/50 flex justify-between px-4 items-center bg-sidebar ">
            <div className=" top-4 left-4 flex items-center gap-2 ">
                <svg
                    width="32"
                    height="32"
                    viewBox="0 0 200 200"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <polygon
                        points="100,10 114,86 190,100 114,114 100,190 86,114 10,100 86,86"
                        fill="#a50036"
                    />
                </svg>
                <p className="font-medium">Gacha Hub</p>
            </div>

            <Profile />
        </header>
    );
}
