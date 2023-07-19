interface ICategory {
  icon: JSX.Element;
  label: string;
  type: string;
}

interface SwitchCategoriesProps {
  categories: ICategory[];
  touched?: boolean;
  error?: string;
  label?: string;
  className?: string;
  checked?: string;
  setFieldValue: (field: string, value: any) => void;
}

function SwitchCategories({
  error,
  categories,
  label,
  checked,
  className,
  setFieldValue,
  touched
}: SwitchCategoriesProps) {
  return (
    <div className={`w-full flex flex-col ${className}`}>
      <h5 className="mb-2 text-emerald-800 font-bold">{label}</h5>
      <div
        className={`w-full flex flex-row flex-wrap gap-2 p-2 max-h-[500px] ${
          error ? 'border-2 border-red-500' : ''
        }`}
      >
        {categories.map((item, index) => (
          <div
            onClick={() => setFieldValue('type', item.type)}
            key={index}
            className={`group relative flex flex-grow flex-shrink basis-24 justify-center border-2 rounded-md p-4 cursor-pointer text-gray-700 hover:text-emerald-800 hover:border-emerald-500 transition-all w-32 ${
              checked === item.type ? 'bg-emerald-500 !text-white' : ''
            }`}
          >
            <span
              style={{ overflowWrap: 'anywhere' }}
              className={`text-xs leading-3 rounded-md flex justify-center items-center absolute top-0 left-0 w-full h-full opacity-0 transition-opacity group-hover:opacity-100 bg-stone-100/90 text-emerald-700`}
            >
              {item.label}
            </span>
            {item.icon}
          </div>
        ))}
      </div>
      <span className="text-sm text-red-600">{error && touched ? error : undefined}</span>
    </div>
  );
}

export default SwitchCategories;
