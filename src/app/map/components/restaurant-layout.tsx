"use client"

interface RestaurantLayoutProps {
  children: React.ReactNode
}

export function RestaurantLayout({ children }: RestaurantLayoutProps) {
  return (
    <div className="relative border-2 border-gray-200 rounded-xl p-8 bg-gradient-to-br from-gray-50 to-gray-100 mb-8 shadow-sm">
      <div className="relative">
        {/* Walls and sections */}
        <div className="absolute top-0 left-0 w-1/3 h-2 bg-gray-300 rounded-full"></div>
        <div className="absolute top-0 left-0 w-2 h-1/4 bg-gray-300 rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-1/3 h-2 bg-gray-300 rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-2 h-1/4 bg-gray-300 rounded-full"></div>

        {/* Restaurant features */}
        <div className="absolute top-4 left-4 w-28 h-16 border border-gray-300 rounded-lg bg-white/80 backdrop-blur-sm flex items-center justify-center text-sm font-medium shadow-sm">
          <div className="flex flex-col items-center">
            <span className="text-xs text-gray-500">Main</span>
            <span>Entrance</span>
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

        {/* Decorative elements */}
        <div
          className="absolute top-1/4 left-8 w-6 h-6 rounded-full bg-green-100 border border-green-200"
          title="Plant"
        ></div>
        <div
          className="absolute bottom-1/4 right-8 w-6 h-6 rounded-full bg-green-100 border border-green-200"
          title="Plant"
        ></div>
        <div
          className="absolute top-1/2 left-1/4 w-6 h-6 rounded-full bg-green-100 border border-green-200"
          title="Plant"
        ></div>

        {children}
      </div>
    </div>
  )
}
