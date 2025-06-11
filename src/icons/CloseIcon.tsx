import { FC } from 'react'

interface CloseIconProps {
    className?: string;
    width?: string | number;
    height?: string | number;
}

const CloseIcon: FC<CloseIconProps> = ({
    className = "icon close-icon",
    width = 24,
    height = 24
}) => (
    <svg
        viewBox="0 0 24 24"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
    >
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    </svg>
)

export default CloseIcon 