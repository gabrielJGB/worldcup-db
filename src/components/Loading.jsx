import React from "react";


const Loading = () => {
    
    return (
        <div className="w-full pt-10 flex flex-col items-center justify-center gap-2" role="status" aria-live="polite">
            <span className="text-xs text-gray-300 font-semibold  select-none">CARGANDO...</span>
        </div>
    );
};

export default Loading;


