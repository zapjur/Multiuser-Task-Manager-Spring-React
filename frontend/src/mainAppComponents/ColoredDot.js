function ColoredDot({ color }) {
    const dotStyle = {
        height: '15px',
        width: '15px',
        backgroundColor: color,
        borderRadius: '50%',
        display: 'inline-block'
    };

    return <div style={dotStyle}></div>;
}

export default ColoredDot;