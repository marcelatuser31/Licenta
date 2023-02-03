export const dialogContentStyle = (width?: (number | string), height?: number | string): React.CSSProperties => {
    return {
        width: width || '406px',
        height: height || 600
    }
}