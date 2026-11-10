import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from 'react';
import { cn } from '@/lib/utils';

const DropdownMenuContext = createContext({
  open: false,
  setOpen: () => {},
});

function DropdownMenu({ children }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open]);

  return (
    <DropdownMenuContext.Provider value={{ open, setOpen }}>
      <div ref={containerRef} className="relative inline-block text-left">
        {children}
      </div>
    </DropdownMenuContext.Provider>
  );
}

function DropdownMenuTrigger({ className, children, ...props }) {
  const { open, setOpen } = useContext(DropdownMenuContext);

  return (
    <button
      type="button"
      aria-expanded={open}
      aria-haspopup="menu"
      onClick={() => setOpen((prev) => !prev)}
      className={cn(
        'focus:outline-none ring-2 ring-transparent focus:ring-blue-500 rounded-full cursor-pointer transition-shadow',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

function DropdownMenuContent({ align = 'end', className, children, ...props }) {
  const { open } = useContext(DropdownMenuContext);

  if (!open) return null;

  return (
    <div
      role="menu"
      className={cn(
        'absolute z-50 mt-2.5 min-w-[220px] overflow-hidden rounded-xl border border-slate-200/80 bg-white p-1.5 text-slate-800 shadow-lg ring-1 ring-slate-900/5 animate-in fade-in-0 zoom-in-95 duration-150',
        align === 'end' ? 'right-0 origin-top-right' : 'left-0 origin-top-left',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function DropdownMenuLabel({ className, children, ...props }) {
  return (
    <div
      className={cn('px-3 py-2 text-xs font-semibold text-slate-900', className)}
      {...props}
    >
      {children}
    </div>
  );
}

function DropdownMenuSeparator({ className, ...props }) {
  return (
    <div
      role="separator"
      className={cn('-mx-1 my-1 h-px bg-slate-100', className)}
      {...props}
    />
  );
}

function DropdownMenuItem({
  className,
  variant = 'default',
  onSelect,
  onClick,
  children,
  ...props
}) {
  const { setOpen } = useContext(DropdownMenuContext);

  const handleClick = (event) => {
    if (onClick) onClick(event);
    if (onSelect) onSelect(event);
    setOpen(false);
  };

  return (
    <button
      type="button"
      role="menuitem"
      onClick={handleClick}
      className={cn(
        'relative flex w-full cursor-pointer select-none items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium outline-none transition-colors',
        variant === 'destructive'
          ? 'text-rose-600 hover:bg-rose-50 hover:text-rose-700 focus:bg-rose-50'
          : 'text-slate-700 hover:bg-slate-100/80 hover:text-slate-900 focus:bg-slate-100/80',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
};

