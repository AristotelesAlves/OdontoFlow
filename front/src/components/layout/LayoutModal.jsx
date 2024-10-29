export default function LayoutModal({ children }) { 
    return (
        <div className="absolute w-screen h-screen bg-slate-600 bg-opacity-40 flex items-center justify-center top-0 left-0 animate-fade">
            <div className="p-2 rounded-lg bg-white">
                {children}
            </div>
        </div>
    );
}

