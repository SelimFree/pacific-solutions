import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../../lib/utils";

export interface DropdownOption {
  value: string;
  label: string;
}

export interface DropdownProps {
  options: DropdownOption[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  triggerClassName?: string;
  menuClassName?: string;
  itemClassName?: string;
  activeItemClassName?: string;
}

export function Dropdown({ 
  options, 
  value, 
  onChange, 
  placeholder = "Select an option",
  className,
  triggerClassName,
  menuClassName,
  itemClassName,
  activeItemClassName
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeOption = options.find((opt) => opt.value === value);

  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className={cn("relative w-full", className)}>
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex w-full items-center justify-between rounded-sm border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm focus:outline-none focus:border-secondary transition-colors",
          triggerClassName
        )}
      >
        <span className="truncate pr-4">
          {activeOption ? activeOption.label : placeholder}
        </span>
        <ChevronDown className={cn(
          "h-5 w-5 shrink-0 transition-transform duration-300",
          !triggerClassName?.includes("text-") && "text-gray-500",
          isOpen ? "rotate-180" : "rotate-0"
        )} />
      </button>

      <div className={cn(
        "absolute left-0 right-0 top-full z-50 mt-1 origin-top overflow-hidden rounded-sm border border-gray-200 bg-white shadow-lg transition-all duration-200",
        isOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 pointer-events-none",
        menuClassName
      )}>
        <div className="max-h-[50vh] overflow-y-auto flex flex-col no-scrollbar">
          {options.map((option) => {
            const isActive = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                className={cn(
                  "w-full text-left px-4 py-3 text-sm transition-colors",
                  isActive 
                    ? cn("bg-gray-100 font-bold text-primary-950", activeItemClassName)
                    : cn("text-gray-700 hover:bg-gray-50 hover:text-primary-900", itemClassName)
                )}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>
      
    </div>
  );
}