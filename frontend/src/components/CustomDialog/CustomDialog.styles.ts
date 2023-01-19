export const dialogContentStyle = (width?: (number | string), height?: number | string): React.CSSProperties => {
    return {
        width: width || 'initial',
        height: height || 600
    }
}