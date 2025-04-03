"use client"

interface RestaurantLayoutProps {
  children: React.ReactNode
}

export function RestaurantLayout({ children }: RestaurantLayoutProps) {
  return (
    <div className="relative border-2 border-gray-200 dark:border-gray-700 rounded-xl p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 mb-8 shadow-sm">
      <div className="relative">
        {/* Restaurant features */}
        <div className="absolute top-20 left-4 w-58 h-30 border border-gray-300 rounded-lg bg-white/80 backdrop-blur-sm flex items-center justify-center text-sm font-medium shadow-sm">
          <div className="flex flex-col items-center">
            <span className="text-xs text-gray-500 dark:text-gray-400">Stairs</span>
            <span className="dark:text-white"></span>
          </div>
        </div>

        <div className="absolute top-100 right-50 w-28 h-16 border border-gray-300 rounded-lg bg-white/80 backdrop-blur-sm flex items-center justify-center text-sm font-medium shadow-sm">
          <div className="flex flex-col items-center">
            <span className="text-xs text-gray-500">Bathroom</span>
          </div>
        </div>


        {children}
      </div>
    </div>
  )
}
