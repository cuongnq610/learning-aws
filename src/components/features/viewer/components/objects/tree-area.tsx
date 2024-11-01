type TreeAreaProps = {
  className?: string;
};

const TreeArea = ({ className }: TreeAreaProps) => {
  return <div className={`bg-green-700 rounded-sm ${className}`} />;
};

export { TreeArea };
