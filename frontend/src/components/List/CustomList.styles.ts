export const deleteButtonStyle: React.CSSProperties = {
    fontSize: "0.8125rem",
    padding: "4px 5px"
}

export const addButtonStyle: React.CSSProperties = {
    ...deleteButtonStyle,
    border: 0
}

export const dataGridStyle = (heigth?: number, width?: number): React.CSSProperties => {
    return {
        height: heigth || 700,
        width: width || 700
    }
}