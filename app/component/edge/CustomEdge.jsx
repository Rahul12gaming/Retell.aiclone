const CustomEdge = ({ id, sourceX, sourceY, targetX, targetY, source, target, label }) => {
  const edgePath = `M ${sourceX},${sourceY} C ${sourceX + 50},${sourceY} ${targetX - 50},${targetY} ${targetX},${targetY}`;

  return (
    <g>
      {/* Define Gradient */}
      <defs>
        <linearGradient id={`edgeGradient-${id}`} gradientUnits="userSpaceOnUse" x1={sourceX} y1={sourceY} x2={targetX} y2={targetY}>
          <stop offset="0%" stopColor="#007BFF" />
          <stop offset="100%" stopColor="#17a2b8" />
        </linearGradient>
      </defs>

      {/* Edge Path */}
      <path
        id={id}
        className="react-flow__edge-path"
        d={edgePath}
        style={{
          stroke: `url(#edgeGradient-${id})`,
          strokeWidth: '3px',
          fill: 'none',
          filter: 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.2))',
        }}
      />

      {/* Arrowhead */}
      <marker
        id={`arrow-${id}`}
        markerWidth="10"
        markerHeight="10"
        refX="9"
        refY="3"
        orient="auto"
        markerUnits="userSpaceOnUse"
      >
        <path d="M0,0 L0,6 L9,3 z" fill="#007BFF" />
      </marker>
      <path
        d={edgePath}
        strokeWidth="3px"
        stroke="none"
        markerEnd={`url(#arrow-${id})`}
      />

      {/* Edge Label with Background */}
      {label && (
        <g>
          <rect
            x={(sourceX + targetX) / 2 - 15}
            y={(sourceY + targetY) / 2 - 10}
            width={label.length * 8 + 10}
            height="20"
            fill="white"
            stroke="#007BFF"
            strokeWidth="1"
            rx="5"
          />
          <text
            x={(sourceX + targetX) / 2}
            y={(sourceY + targetY) / 2 + 4}
            fontSize="12"
            fill="#007BFF"
            textAnchor="middle"
            fontWeight="bold"
          >
            {label}
          </text>
        </g>
      )}
    </g>
  );
};


export default CustomEdge;