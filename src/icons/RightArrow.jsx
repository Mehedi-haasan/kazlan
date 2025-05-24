const RightArrow = ({ className = '',onClick }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" onClick={onClick} className={className} width="22" height="22" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m10 17l5-5l-5-5" /></svg>
    )
}

export default RightArrow