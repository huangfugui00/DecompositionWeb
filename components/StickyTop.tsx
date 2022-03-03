import React from 'react'

type Props = {
    className?: string,
  };

const StickyTop: React.FC<Props> = ({className,children}) => {
    return (
        <div className=" sticky  right-0 top-0 left-0 z-100 bg-white">
            {children}
        </div>
    )
}

export default StickyTop
