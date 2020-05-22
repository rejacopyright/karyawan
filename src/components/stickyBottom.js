import React from 'react'
export default function StickyBottom(props){
  return(
    <div className="position-sticky bg-secondary shadowx radius-10 p-3" style={{ top: 'calc(100vh - 4.75rem)', zIndex: 9 }}>
      <div className="d-block mt-1 text-right">
        {props.children}
      </div>
    </div>
  )
}
