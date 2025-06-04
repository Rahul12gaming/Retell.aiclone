import {
  FaComments,
  FaPowerOff,
  FaTh,
  FaPhone,
} from 'react-icons/fa';

const nodeTypes = [
  {label:'Conversation', name: 'Conversation', color: 'text-[#EF5DA8]', icon: <FaComments /> }, // pink
  {label:'TransferCall', name: 'Call Transfer', color: 'text-[#F68A4B]', icon: <FaPhone /> }, // orange
  {label:'PressDigit', name: 'Press Digit', color: 'text-[#00A2FF]', icon: <FaTh /> }, // blue
  {label:'EndCall', name: 'Ending', color: 'text-[#8E8E93]', icon: <FaPowerOff /> }, // gray
];


const NodeSidebar = () => {
  const handleDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify({
      label:nodeType
    }));
    event.dataTransfer.effectAllowed = 'move';
    
  };
  
                
  return (
    <div className="h-full w-[150px] bg-bg-weak-50 p-2">
        <div className="ml-2 text-[11px] font-medium uppercase leading-3 tracking-tight text-text-soft-400">ADD NEW NODE</div>
      <div className="mt-2 flex flex-col gap-2">

      </div>
      {nodeTypes.map((node) => (
        <div
          key={node.name}
          draggable
          onDragStart={(e) => handleDragStart(e, node.label)}
          className="inline-flex h-6 cursor-pointer items-center justify-start gap-2 rounded-md px-2 hover:bg-alpha-neutral-alpha-10"
        >
          <span className={`text-[12px] ${node.color}`}>{node.icon}</span>
          <span className="text-xs font-normal leading-none text-text-sub-600">{node.name}</span>
        </div>
      ))}
    </div>
  );
};

export default NodeSidebar;
