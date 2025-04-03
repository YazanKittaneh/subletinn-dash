"use client"

interface LayoutItem {
  x: string // e.g. "top-4 left-4"
  y?: string // alternative to x for more control
  width: string // e.g. "w-32"
  height: string // e.g. "h-24"
  label: string
  sublabel?: string
  className?: string
}

interface FrancisLayoutProps {
  children?: React.ReactNode
  floor: number
  items?: LayoutItem[]
  containerClassName?: string
}

export function FrancisLayout({ 
  children, 
  floor, 
  items = [],
  containerClassName = "" 
}: FrancisLayoutProps) {
  return (
    <div className={`relative border-2 border-gray-200 dark:border-gray-700 rounded-xl p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 mb-8 shadow-sm ${containerClassName}`}>
      <div className="relative h-full w-full">
        {/* Custom items */}
        {items.map((item, index) => (
          <div
            key={index}
            className={`absolute ${item.x || ''} ${item.y || ''} ${item.width} ${item.height} border border-gray-300 rounded-lg bg-white/80 backdrop-blur-sm flex items-center justify-center text-sm font-medium shadow-sm ${item.className || ''}`}
          >
            <div className="flex flex-col items-center">
              {item.sublabel && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {item.sublabel}
                </span>
              )}
              <span className={item.sublabel ? '' : 'dark:text-white'}>
                {item.label}
              </span>
            </div>
          </div>
        ))}
        {floor === 0 ? (
          // Basement layout
          <>
            <div className="absolute top-0 left-0 w-1/3 h-2 bg-gray-300 rounded-full"></div>
            <div className="absolute top-0 left-0 w-2 h-1/4 bg-gray-300 rounded-full"></div>
            <div className="absolute bottom-0 right-0 w-1/3 h-2 bg-gray-300 rounded-full"></div>
            <div className="absolute bottom-0 right-0 w-2 h-1/4 bg-gray-300 rounded-full"></div>

            <div className="absolute top-4 left-4 w-28 h-16 border border-gray-300 rounded-lg bg-white/80 backdrop-blur-sm flex items-center justify-center text-sm font-medium shadow-sm">
              <div className="flex flex-col items-center">
                <span className="text-xs text-gray-500 dark:text-gray-400">Stairs</span>
              </div>
            </div>

            <div className="absolute bottom-4 right-4 w-36 h-20 border border-gray-300 rounded-lg bg-white/80 backdrop-blur-sm flex items-center justify-center text-sm font-medium shadow-sm">
              <div className="flex flex-col items-center">
                <span className="text-xs text-gray-500">Restaurant</span>
                <span>Kitchen</span>
              </div>
            </div>

            <div className="absolute top-4 right-4 w-28 h-16 border border-gray-300 rounded-lg bg-white/80 backdrop-blur-sm flex items-center justify-center text-sm font-medium shadow-sm">
              <div className="flex flex-col items-center">
                <span className="text-xs text-gray-500">Drinks</span>
                <span>Bar</span>
              </div>
            </div>
            <div className="flex flex-col items-center">
                <span className="text-xs text-gray-500">Drinks</span>
                {children}
              </div>
          </>
        ) : floor === 1 ? (
          // First floor layout
          <>
            <div className="absolute top-0 left-0 w-full h-2 bg-gray-300 rounded-full"></div>
            <div className="absolute top-0 left-0 w-2 h-full bg-gray-300 rounded-full"></div>

            <div className="absolute top-4 left-4 w-32 h-24 border border-gray-300 rounded-lg bg-white/80 backdrop-blur-sm flex items-center justify-center text-sm font-medium shadow-sm">
              <div className="flex flex-col items-center">
                <span className="text-xs text-gray-500">Meeting</span>
                <span>Room A</span>
              </div>
            </div>

            <div className="absolute top-4 right-4 w-32 h-24 border border-gray-300 rounded-lg bg-white/80 backdrop-blur-sm flex items-center justify-center text-sm font-medium shadow-sm">
              <div className="flex flex-col items-center">
                <span className="text-xs text-gray-500">Meeting</span>
                <span>Room B</span>
              </div>
            </div>
            {children}
          </>
        ) : floor === 2 ? (
          // First floor layout
          <>
            <div className="absolute top-0 left-0 w-full h-2 bg-gray-300 rounded-full"></div>
            <div className="absolute top-0 left-0 w-2 h-full bg-gray-300 rounded-full"></div>

            <div className="absolute top-4 left-4 w-32 h-24 border border-gray-300 rounded-lg bg-white/80 backdrop-blur-sm flex items-center justify-center text-sm font-medium shadow-sm">
              <div className="flex flex-col items-center">
                <span className="text-xs text-gray-500">Meeting</span>
                <span>Room A</span>
              </div>
            </div>

            <div className="absolute top-4 right-4 w-32 h-24 border border-gray-300 rounded-lg bg-white/80 backdrop-blur-sm flex items-center justify-center text-sm font-medium shadow-sm">
              <div className="flex flex-col items-center">
                <span className="text-xs text-gray-500">Meeting</span>
                <span>Room B</span>
              </div>
            </div>
            {children}
          </>
        ) : (
          // Default/other floors layout
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-gray-500 dark:text-gray-400">
              Floor {floor} layout coming soon
            </div>
          </div>
        )}

        {/* Common decorative elements */}
      </div>
    </div>
  )
}
