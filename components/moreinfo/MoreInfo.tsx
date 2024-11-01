import React from 'react'

function MoreInfo() {
  return (
    <div className='flex justify-between items-center mx-[4vw] h-full mt-[0.5vw]'>
        <div>
            <div className="text-[0.9vw]">Release</div>
            <div className="text-customTextColor text-[0.9vw]">08/16/2024</div>
        </div>
        <div>
            <div className="text-[0.9vw]">Genres</div>
            <div className="text-customTextColor text-[0.9vw]">Action,Scifi,Comedy</div>
        </div>
        <div>
            <div className="text-[0.9vw]">Origins</div>
            <div className="text-customTextColor text-[0.9vw]">United States</div>
        </div>
        <div>
            <div className="text-[0.9vw]">Languages</div>
            <div className="text-customTextColor text-[0.9vw]">English</div>
        </div>
        <div>
            <div className="text-[0.9vw]">Budget</div>
            <div className="text-customTextColor text-[0.9vw]">$180,000,000</div>
        </div>
        <div>
            <div className="text-[0.9vw]">Box Office</div>
            <div className="text-customTextColor text-[0.9vw]">$285,885,980</div>
        </div>
    </div>
  )
}

export default MoreInfo