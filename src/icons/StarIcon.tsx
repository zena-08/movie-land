import { FC } from 'react'

interface StarIconProps {
    filled?: boolean;
}

const StarIcon: FC<StarIconProps> = ({ filled = false }) => (
    <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill={filled ? '#ffd700' : 'none'}
        stroke="#ffd700"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="icon"
    >
        <polygon points="12 2 15 8.5 22 9.3 17 14 18.2 21 12 17.3 5.8 21 7 14 2 9.3 9 8.5 12 2" />
    </svg>
)

export default StarIcon