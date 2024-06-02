import React from 'react'
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
export default function AchivedGoal() {
  return (
    <div className='AchivedGoal'>
      <div className='AchivedGoalContent'>
        <div className="ligneSuccess"></div>
        <div className='blueSuccessContent'>
        <div className="textSuccess">Congratulation , You achieve your Goal today</div>
        <IoCheckmarkDoneCircleOutline className='successIcon'/>
        </div>
       
      </div>
    </div>
  )
}
